from common.arangodb import get_db
from zhconv import convert as zhconv_convert
import re
from common.queries import SUTTAPLEX_LIST
from search import dictionaries, constant
import enchant
en_dict = enchant.Dict("en_US")

INSTANT_SEARCH_VIEW = 'instant_search'
AQL_INSTANT_SEARCH_FIRST_PART = 'FOR d IN instant_search '

POSSIBLE_UIDS = '''
FOR r IN super_nav_details
FILTER r.uid IN @uids AND r.type == "leaf"
LIMIT 1
RETURN r.uid
'''

POSSIBLE_SUTTA_BY_NAME = '''
FOR doc IN super_nav_details
FILTER doc.type == 'leaf' AND (doc.name == @name OR doc.name == @name + 'sutta')
RETURN doc.uid
'''

LIST_AUTHORS = '''
FOR a IN author_edition
SORT a.uid
RETURN {
    uid: @query,
    author: a.long_name,
    author_uid: a.uid,
    author_short: a.short_name,
    content: 'content',
    param_lang: @lang
}
'''


def instant_search_query(query, lang, restrict, limit, offset):
    db = get_db()
    query = query.strip()
    hits = []
    total = 0
    original_query = query
    query_param = {
        'query': query,
        'lang': lang,
        'limit': limit,
        'offset': offset,
    }
    if restrict != 'dictionaries':
        search_aql, aql_condition_part = generate_general_query_aql(query, limit, offset)

        query_conditions = extract_query_conditions(query)
        if is_complex_query(query_conditions):
            bind_param, search_aql, aql_condition_part = compute_complex_query_aql(query_conditions, query_param)
        else:
            bind_param, search_aql, aql_condition_part = compute_query_aql(search_aql, aql_condition_part, query_param)

        query = bind_param['query']
        total = fetch_record_count(INSTANT_SEARCH_VIEW, aql_condition_part, query)
        cursor = db.aql.execute(search_aql, bind_vars=bind_param)
        hits = list(cursor)
        if total[0] == 0:
            total = len(hits)

        hits = sort_hits(hits)

        if original_query != constant.CMD_LIST_AUTHORS:
            highlight_keyword(hits, query)

    suttaplexs = try_to_fetch_suttaplex(db, hits, lang, original_query, query)
    lookup_dictionary(hits, lang, query, restrict)

    return {'total': total, 'hits': hits, 'suttaplex': suttaplexs}


def generate_general_query_aql(query, limit, offset):
    aql_condition_part = '''        
        SEARCH (PHRASE(d.content, @query, "common_text") 
        OR PHRASE(d.name, @query, "common_text") 
        OR d.uid == @query  
    '''
    aql_condition_part += f'OR LIKE(d.volpage, "%{query}%") OR LIKE(d.name, "%{query}%") '

    if possible_pali_words := [query]:
        aql_condition_part += ''' OR ('''
        for pali_word in possible_pali_words:
            aql_condition_part += f'LIKE(d.segmented_text, "%{pali_word}%") OR '
        aql_condition_part = aql_condition_part[:-4]
        aql_condition_part += '''))'''

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + ''' 
    ''' + aql_limit_part(limit, offset) + '''
    ''' + aql_return_part(True) + '''
    '''

    return full_aql, aql_condition_part


def fetch_record_count(collection, condition, query):
    aql = f'''
        LET record_count = (FOR d IN {collection}
        {condition}
        COLLECT WITH COUNT INTO length
        RETURN length)[0]

        RETURN record_count
    '''
    return list(get_db().aql.execute(aql, bind_vars={"query": query}))


def generate_author_query_aql(query_param):
    aql_condition_part = '''
        SEARCH d.author_uid == @query
        FILTER d.is_segmented == False AND d.author_uid != null 
    '''

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + '''
    ''' + aql_limit_part(query_param['limit'], query_param['offset']) + '''
    ''' + aql_return_part(True) + '''
    '''

    return full_aql, aql_condition_part


def generate_title_query_aql(query_param):
    aql_condition_part = '''
        SEARCH PHRASE(d.name, @query, "common_text")
        FILTER d.is_segmented == False
        '''

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + ''' 
    ''' + aql_limit_part(query_param['limit'], query_param['offset']) + '''
    ''' + aql_return_part(True) + '''
    '''

    return full_aql, aql_condition_part


def generate_collection_query_aql(query_param):
    aql_condition_part = f'SEARCH (STARTS_WITH(d.uid, @query) AND STARTS_WITH(d.acronym, "{query_param["query"].upper()} ")) '
    aql_condition_part += '''
        FILTER d.is_segmented == False
        FILTER d.author_uid != null
    '''

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + ''' 
    ''' + aql_limit_part(query_param['limit'], query_param['offset']) + '''
    ''' + aql_return_part(True) + '''
    '''

    return full_aql, aql_condition_part


def generate_volpage_query_aql(possible_volpages):
    aql = '''
    FOR d IN instant_volpage_search
    SEARCH (PHRASE(d.volpage, @query, "common_text") OR PHRASE(d.alt_volpage, @query, "common_text") OR
    '''

    for volpage in possible_volpages:
        aql += f'PHRASE(d.volpage, "{volpage}", "common_text") OR PHRASE(d.alt_volpage, "{volpage}", "common_text") OR '
    aql = aql[:-4]
    aql += '''

    )
    SORT d.uid

    LET translation_title = (
        FOR name IN names
            FILTER name.uid == d.uid AND name.lang == @lang
            LIMIT 1
            RETURN name.name
    )[0]

    LET root_title = (
        FOR name IN names
            FILTER name.uid == d.uid AND name.is_root == True
            LIMIT 1
            RETURN name.name
    )[0]

    LET all_reference = (
        FOR tr IN text_references
        FILTER tr.uid == d.uid
        RETURN tr.volpage
    )[0]

    RETURN {
        acronym: d.acronym,
        uid: d.uid,
        lang: d.lang,
        name: translation_title ? translation_title : root_title,
        volpage: d.volpage,
        alt_volpage: d.alt_volpage,
        all_reference: all_reference,
        content: '',
        segmented_text: '',
    }
    '''

    return aql


def generate_multi_keyword_query_aql(keywords, query_param):
    aql_condition_part = '''
    SEARCH (PHRASE(d.content, @query, "common_text") OR 
    '''
    aql_condition_part += '''('''
    for keyword in keywords:
        aql_condition_part += f'PHRASE(d.content, "{keyword}", "common_text") AND '
    aql_condition_part = aql_condition_part[:-4]
    aql_condition_part += ''')'''

    aql_condition_part += ''' OR ('''
    for keyword in keywords:
        aql_condition_part += f'PHRASE(d.content, "{keyword}", "common_text") OR LIKE(d.segmented_text, "%{keyword}%") OR '
    aql_condition_part = aql_condition_part[:-4]
    aql_condition_part += ''')'''

    aql_condition_part += ''')'''

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + '''
    ''' + aql_limit_part(query_param['limit'], query_param['offset']) + '''
    ''' + aql_return_part(True) + '''
    '''
    return full_aql, aql_condition_part


def generate_and_query_aql(keywords, query_param):
    aql_condition_part = '''
    SEARCH PHRASE(d.content, @query, "common_text") OR  
    '''

    for keyword in keywords:
        aql_condition_part += f'(PHRASE(d.content, "{keyword}", "common_text") OR LIKE(d.segmented_text, "%{keyword}%")) AND '
    aql_condition_part = aql_condition_part[:-5]

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + '''
    ''' + aql_limit_part(query_param['limit'], query_param['offset']) + '''
    ''' + aql_return_part(True) + '''
    '''

    return full_aql, aql_condition_part


def generate_query_aql_by_conditions(query_conditions, query_param):
    aql_condition_part = '''
    SEARCH ((PHRASE(d.content, @query, "common_text") OR 
    '''
    if 'or' in query_conditions:
        for keyword in query_conditions['or']:
            aql_condition_part += f'(PHRASE(d.content, "{keyword}", "common_text") OR LIKE(d.segmented_text, "%{keyword}%")) OR '
        aql_condition_part = aql_condition_part[:-4]

    if 'and' in query_conditions:
        for keyword in query_conditions['and']:
            aql_condition_part += f'(PHRASE(d.content, "{keyword}", "common_text") OR LIKE(d.segmented_text, "%{keyword}%")) AND '
        aql_condition_part = aql_condition_part[:-5]

    aql_condition_part += '''
    )
    ''' + add_collection_condition_to_query_aql(query_conditions) + '''
    ''' + add_author_condition_to_query_aql(query_conditions) + '''
    )
    '''

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + ''' 
    ''' + aql_limit_part(query_param['limit'], query_param['offset']) + '''
    ''' + aql_return_part(True) + '''
    '''

    return full_aql, aql_condition_part


def add_author_condition_to_query_aql(condition_combination):
    if 'author' not in condition_combination:
        return ''
    author = condition_combination['author']
    return f'AND (d.author_uid == "{author}") '


def add_volpage_condition_to_query_aql(volpage):
    return f'AND (PHRASE(d.volpage, "{volpage}", "common_text"))'


def add_collection_condition_to_query_aql(condition_combination):
    if 'collection' not in condition_combination:
        return ''
    collection = condition_combination['collection'].lower()
    if collection != 'ebt':
        return f'AND (STARTS_WITH(d.uid, "{collection}")  AND STARTS_WITH(d.acronym, "{collection.upper()} "))'
    ebt_collections = ["dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an", "ea", "ea-2", "kp", "iti", "ud", "snp", "dhp",
                       "thig", "thag", "up", "pli-tv", "lzh-mg", "lzh-mi", "lzh-dg", "lzh-sarv", "lzh-mu", "lzh-ka",
                       "lzh-upp", "san-mg", "san-lo"]
    ebt_collections += fetch_children_by_uid("da-ot")
    ebt_collections += fetch_children_by_uid("ma-ot")
    ebt_collections += fetch_children_by_uid("sa-ot")
    ebt_collections += fetch_children_by_uid("ea-ot")
    ebt_collections += fetch_children_by_uid("d")
    return f'AND (STARTS_WITH(d.uid, {ebt_collections})) '


def fetch_children_by_uid(uid):
    db = get_db()
    return list(
        db.aql.execute(
            "FOR doc IN 1..1 OUTBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges RETURN doc.uid",
            bind_vars={'uid': uid},
        )
    )


def aql_return_part(include_content=True):
    aql = '''
    return {
        acronym: d.acronym,
        uid: d.uid,
        lang: d.lang,
        full_lang: d.full_lang,
        name: d.name,
        volpage: d.volpage,
        author: d.author,
        author_uid: d.author_uid,
        author_short: d.author_short,
        is_root: d.is_root,
        heading: d.heading,
        content: 'content',
        segmented_id: d.segmented_id,
        segmented_text: d.segmented_text,
        is_segmented: d.is_segmented,
        param_lang: @lang
    }
    '''
    if include_content:
        aql = aql.replace('\'content\'', 'd.content')
    return aql


def aql_limit_part(limit, offset):
    return f'LIMIT {offset}, {limit}'


def generate_chinese_keyword_query_aql(keywords, limit, offset):
    aql_condition_part = '''
    SEARCH PHRASE(d.content, @query, "common_text") OR 
    '''

    for keyword in keywords:
        aql_condition_part += f'PHRASE(d.content, "{keyword}", "common_text") OR '
    aql_condition_part = aql_condition_part[:-4]
    aql_condition_part += '''
    '''

    full_aql = AQL_INSTANT_SEARCH_FIRST_PART + aql_condition_part + '''
    ''' + aql_limit_part(limit, offset) + '''
    ''' + aql_return_part(True) + '''
    '''

    return full_aql, aql_condition_part


def try_to_fetch_suttaplex(db, hits, lang, original_query, query):
    suttaplex = fetch_suttaplex(db, lang, query)
    if not suttaplex:
        suttaplex = fetch_suttaplex_by_name(db, lang, f'{query}sutta')
    suttaplexs = [suttaplex]
    if original_query.startswith('title:'):
        suttaplexs.extend(fetch_suttaplexs(db, lang, hits))
    suttaplexs.extend(fetch_suttaplex_by_name(db, lang, query))
    return suttaplexs


def merge_duplicate_hits(hits):
    merged = {}
    other_type_hits = []
    for item in hits:
        if 'uid' in item and 'author_uid' in item and 'highlight' in item and 'content' in item['highlight']:
            key = (item['uid'], item['author_uid'])
            if key in merged:
                merged[key]['highlight']['content'].extend(item['highlight']['content'])
            else:
                merged[key] = item
        else:
            other_type_hits.append(item)

    return other_type_hits + list(merged.values())


def is_complex_query(query_conditions):
    return ('author' in query_conditions or 'collection' in query_conditions) \
        and ('or' in query_conditions or 'and' in query_conditions)


def compute_complex_query_aql(query_conditions, query_param):
    search_aql, aql_condition_part = generate_query_aql_by_conditions(query_conditions, query_param)
    bind_param = {
        'query': query_param['query'],
        'lang': query_param['lang']
    }
    return bind_param, search_aql, aql_condition_part


def compute_query_aql(search_aql, aql_condition_part, query_param):
    search_aql, aql_condition_part = \
        generate_aql_by_and_operator(search_aql, aql_condition_part, query_param)

    search_aql, aql_condition_part = \
        generate_aql_by_chinese_keywords(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_by_author(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_by_volpage(search_aql, aql_condition_part, query_param)

    search_aql, aql_condition_part = \
        generate_aql_by_multi_chinese_keywords(search_aql, aql_condition_part, query_param)

    search_aql, aql_condition_part = \
        generate_aql_by_or_operator(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_by_collection(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_by_list_authors(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_by_title(search_aql, aql_condition_part, query_param)

    bind_param = {
        'query': query_param['query'],
        'lang': query_param['lang']
    }

    return bind_param, search_aql, aql_condition_part


def highlight_keyword(hits, query):
    for hit in hits:
        compute_url(hit)
        is_segmented_text = False
        if ('content' in hit and hit['content'] is not None) or ('segmented_text' in hit and hit['segmented_text'] is not None):
            if hit['segmented_text'] is not None:
                content = hit['segmented_text']
                is_segmented_text = True
            else:
                content = hit['content']

            cut_highlights(content, hit, query, is_segmented_text)
        else:
            cut_highlights_when_content_is_none(hit, query)
        del hit['content']
        del hit['segmented_text']


def sort_hits(hits):
    ebt_prefixes = ["dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an", "ea", "ea-2", "kp", "iti", "ud", "snp",
                    "dhp", "thig", "thag", "pli-tv", "lzh-mg", "lzh-mi", "lzh-dg", "lzh-sarv", "lzh-mu", "lzh-ka",
                    "lzh-upp", "san-mg", "san-lo", "up", "t25", "t24", "t23", "t22", "t21", "t20", "t19", "t18", "t17",
                    "t16", "t15", "t14", "t13", "t12", "t11", "t10", "t9", "t8", "t7", "t6", "t5", "t4", "t3", "t2",
                    "t98", "t97", "t96", "t95", "t94", "t93", "t92", "t91", "t90", "t89", "t88", "t87", "t86", "t85",
                    "t84", "t83", "t82", "t81", "t80", "t79", "t78", "t77", "t76", "t75", "t74", "t73", "t72", "t71",
                    "t70", "t69", "t68", "t67", "t66", "t65", "t64", "t63", "t62", "t61", "t60", "t59", "t58", "t57",
                    "t56", "t55", "t54", "t53", "t52", "t51", "t50", "t49", "t48", "t47", "t46", "t45", "t44", "t43",
                    "t42", "t41", "t40", "t39", "t38", "t37", "t36", "t35", "t34", "t33", "t32", "t31", "t30", "t29",
                    "t28", "t27", "t124", "t123", "t122", "t121", "t120", "t119", "t118", "t117", "t116", "t115",
                    "t114", "t113", "t112", "t111", "t110", "t109", "t108", "t107", "t106", "t105", "t104", "t103",
                    "t102", "t151", "t150b", "t149", "t148", "t147", "t146", "t145", "t144", "t143", "t142b", "t142a",
                    "t141", "t140", "t139", "t138", "t137", "t136", "t135", "t134", "t133", "t132b", "t132a", "t131",
                    "t130", "t129", "t128b", "t128a", "t127", "t126", "xct-mu-kd-eimer", "d974", "d617", "d338",
                    "d337", "d331", "d316", "d313", "d300", "d297", "d296", "d294", "d293", "d292", "d291", "d290",
                    "d211", "d42", "d41", "d38", "d34", "d33", "d31", "d6", "d3", "d1"]

    sorted_lst = sorted(hits, key=lambda x: any(char in x['uid'] for char in ebt_prefixes), reverse=True)
    # Prioritize items that contain both numbers and characters
    sorted_lst = sorted(sorted_lst, key=lambda x: uid_key(x['uid']))

    sorted_lst1 = []
    sorted_lst2 = []
    for item in sorted_lst:
        if re.match("^[^.-]*[a-zA-Z][^.-]*[0-9][^.-]*$", item['uid']) and item['uid'].count('-') < 2:
            sorted_lst1.append(item)
        else:
            sorted_lst2.append(item)

    sorted_lst = sorted(sorted_lst1, key=get_uid)
    sorted_lst.extend(sorted_lst2)

    return sorted_lst


def uid_key(uid):
    if re.match(".*[a-zA-Z].*[0-9].*", uid):
        return 0
    elif re.match(".*[a-zA-Z].*", uid):
        return 1
    else:
        return 2


def get_uid(dic):
    uid = dic['uid']
    letter_part = ''.join([c for c in uid if c.isalpha()])
    number_part = uid[len(letter_part):]

    if '-' in number_part:
        start, end = number_part.split('-')
        num = float(start)
    elif number_part.count('.') > 1:
        num = number_part.split('.')[0]
    else:
        num = float(number_part) if number_part else 0

    return letter_part, num


def generate_aql_by_chinese_keywords(search_aql, aql_condition_part, query_param):
    if is_chinese(query_param['query']) and ' ' not in query_param['query']:
        query_list = [zhconv_convert(query_param['query'], 'zh-hant'), zhconv_convert(query_param['query'], 'zh-hans')]
        search_aql, aql_condition_part = generate_chinese_keyword_query_aql(query_list, query_param['limit'], query_param['offset'])
    return search_aql, aql_condition_part


def generate_aql_by_collection(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_IN):
        query_param['query'] = query_param['query'][3:].lower()
        search_aql, aql_condition_part = generate_collection_query_aql(query_param)
    return query_param, search_aql, aql_condition_part


def generate_aql_by_list_authors(search_aql, aql_condition_part, query_param):
    if query_param['query'] == constant.CMD_LIST_AUTHORS:
        search_aql = LIST_AUTHORS
        query_param['query'] = ''
    return query_param, search_aql, aql_condition_part


def generate_aql_by_multi_chinese_keywords(search_aql, aql_condition_part, query_param):
    if is_chinese(query_param['query']) and ' ' in query_param['query']:
        if ' AND ' not in query_param['query']:
            query_list = query_param['query'].split(' ')
            search_aql, aql_condition_part = generate_multi_keyword_query_aql(query_list, query_param)
        else:
            query_list = query_param['query'].split(' AND ')
            search_aql, aql_condition_part = generate_and_query_aql(query_list, query_param)
    return search_aql, aql_condition_part


def generate_aql_by_or_operator(search_aql, aql_condition_part, query_param):
    if ' OR ' in query_param['query']:
        query_list = query_param['query'].split(' OR ')
        search_aql, aql_condition_part = generate_multi_keyword_query_aql(query_list, query_param)
    return search_aql, aql_condition_part


def generate_aql_by_and_operator(search_aql, aql_condition_part, query_param):
    if ' AND ' in query_param['query']:
        query_list = query_param['query'].split(' AND ')
        search_aql, aql_condition_part = generate_and_query_aql(query_list, query_param)
    return search_aql, aql_condition_part


def generate_aql_by_author(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_AUTHOR):
        search_aql, aql_condition_part = generate_author_query_aql(query_param)
        query_param['query'] = query_param['query'][7:]
    return query_param, search_aql, aql_condition_part


def generate_aql_by_title(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith('title:'):
        search_aql, aql_condition_part = generate_title_query_aql(query_param)
        query_param['query'] = query_param['query'][6:]
    return query_param, search_aql, aql_condition_part


def generate_aql_by_volpage(search_aql, aql_condition_part, query_param):
    vol_page_number = re.search(r'\d+', query_param['query'])
    if query_param['query'].startswith(constant.CMD_VOLPAGE):
        query = query_param['query'][8:].strip()
        query = format_volpage(query)
        pattern = r"^([asmdASMD])\s"
        replacement = r"\1n "
        query = re.sub(pattern, replacement, query)

        possible_volpages = []
        if vol_page_number is not None:
            vol_page_no = re.search(r'\d+', query).group()
            possible_volpages.extend(
                query.split(vol_page_no)[0] + str(i)
                for i in range(int(vol_page_no) - 5, int(vol_page_no) + 4)
                if i > 0
            )
        else:
            possible_volpages.append(query)

        standardized_volpages = standardization_volpage(query)
        possible_volpages.append(standardized_volpages)
        search_aql = generate_volpage_query_aql(possible_volpages)
        query_param['query'] = query
    return query_param, search_aql, aql_condition_part


def cut_highlights_when_content_is_none(hit, query):
    hit['highlight'] = {'content': []}
    highlight = hit['name']
    highlight = re.sub(query, f'<strong class="highlight">{query}</strong>', highlight, flags=re.I)
    hit['highlight']['content'].append(highlight)


def cut_highlights(content, hit, query, is_segmented_text):
    hit['highlight'] = {'content': []}
    query_conditions = extract_query_conditions(query)
    if is_chinese(query):
        keyword_list = query.split(' AND ') if ' AND ' in query else query.split(' ')
        for keyword in keyword_list:
            zhhant_keyword = zhconv_convert(keyword, 'zh-hant')
            zhhans_keyword = zhconv_convert(keyword, 'zh-hans')
            if zhhant_keyword != zhhans_keyword:
                chinese_character_list = [zhhant_keyword, zhhans_keyword]
            else:
                chinese_character_list = [zhhant_keyword]
            for cc in chinese_character_list:
                cut_highlight(content, hit, cc, is_segmented_text)
    elif ('author' in query_conditions or 'collection' in query_conditions) and 'or' in query_conditions:
        keyword_list = query_conditions['or']
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword, is_segmented_text)
    elif ('author' in query_conditions or 'collection' in query_conditions) and 'and' in query_conditions:
        keyword_list = query_conditions['and']
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword, is_segmented_text)
    elif not is_chinese(query) and (' OR ' in query):
        keyword_list = query.split(' OR ')
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword, is_segmented_text)
    elif not is_chinese(query) and (' AND ' in query):
        keyword_list = query.split(' AND ')
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword, is_segmented_text)
    else:
        highlight_by_multiple_possible_keyword(content, hit, query, is_segmented_text)


def highlight_by_multiple_possible_keyword(content, hit, keyword, is_segmented_text):
    possible_word_list = [f'{keyword}', keyword.capitalize()]
    for word in possible_word_list:
        cut_highlight(content, hit, word, is_segmented_text)
        if hit['highlight']['content']:
            break


def cut_highlight(content, hit, query, is_segmented_text):
    if is_segmented_text:
        highlight = content
        highlight = re.sub(query, f'<strong class="highlight">{query}</strong>', highlight, flags=re.I)
        if 'class="highlight"' in highlight:
            hit['highlight']['content'].append(highlight)
    else:
        positions = []
        if is_chinese(query):
            positions = [m.start() for m in re.finditer(query, content, re.I)]
        else:
            positions = [m.start() for m in re.finditer(r"\b" + query + r"\b", content, re.I)]
            if not positions and is_pali(content):
                content = convert_to_standard_roman(content)
                positions = [m.start() for m in re.finditer(r"\b" + query + r"\b", content, re.I)]

        if content is not None and positions:
            for position in positions[:3]:
                if not is_chinese(query):
                    paragraph = find_paragraph(content, position)
                    sentences = find_sentences_with_keyword(paragraph, query)
                    highlight = '...'.join(sentences)
                    if not highlight:
                        highlight = paragraph
                else:
                    start = position - 100 if position > 100 else 0
                    end = min(position + 100, len(content))
                    highlight = content[start:end]
                    highlight = re.sub(r'^.*?[\.\?!…“]', '', highlight)
                    if last_punctuation := re.search(r'[\.\?!…,”]', highlight[::-1]):
                        highlight = highlight[:len(highlight) - last_punctuation.start()]

                highlight = re.sub(query, f'<strong class="highlight">{query}</strong>', highlight, flags=re.I)
                hit['highlight']['content'].append(highlight)
                hit['highlight']['content'] = list(set(hit['highlight']['content']))


def is_pali(content):
    return any(vowel in content for vowel in ['ṁ', 'ā', 'ī', 'ū', 'ṅ', 'ḷ', 'ṭ', 'ň', 'ñ', 'ṣ'])


def convert_to_standard_roman(content):
    converted_content = content
    converted_content = converted_content.replace('ṁ', 'm')
    converted_content = converted_content.replace('ā', 'a')
    converted_content = converted_content.replace('ī', 'i')
    converted_content = converted_content.replace('ū', 'u')
    converted_content = converted_content.replace('ṅ', 'n')
    converted_content = converted_content.replace('ḷ', 'l')
    converted_content = converted_content.replace('ṭ', 't')
    converted_content = converted_content.replace('ň', 'n')
    converted_content = converted_content.replace('ñ', 'n')
    converted_content = converted_content.replace('ṣ', 's')
    return converted_content


def find_paragraph(text, position):
    paragraphs = text.split("\n\n")
    for p in paragraphs:
        start = text.find(p)
        end = start + len(p)
        if start <= position < end:
            return p
    return ""


def find_sentences_with_keyword(input_string, keyword):
    """
         Find natural sentences containing the given keyword from a string.

         parameter:
         input_string: string, the sentence to find
         keyword: string, the keyword to find

         return value:
         A list of strings consisting of natural sentences containing the given keywords.
    """
    result = []
    sentence_list = re.split(r'[.!?...]+', input_string)
    for sentence in sentence_list:
        if keyword in sentence:
            result.append(sentence.strip())

    return result


def compute_url(hit):
    if 'author_uid' in hit and hit['author_uid'] is not None:
        hit['url'] = f'/{hit["uid"]}/{hit["lang"]}/{hit["author_uid"]}'
    else:
        hit['url'] = f'/{hit["uid"]}'


def lookup_dictionary(hits, lang, query, restrict):
    if not restrict or restrict == 'dictionaries':
        if dictionary_result := dictionaries.search(query, lang):
            hits.insert(0, dictionary_result)


def fetch_suttaplex(db, lang, query):
    query_lower = query.lower()
    possible_uids = [
        query_lower,
        query_lower.replace(' ', '.'),
        query_lower.replace('.', '.'),
    ]
    return (
        list(
            db.aql.execute(
                SUTTAPLEX_LIST, bind_vars={'uid': found[0], 'language': lang}
            )
        )[0]
        if (
            found := list(
                db.aql.execute(
                    POSSIBLE_UIDS,
                    bind_vars={'uids': possible_uids},
                )
            )
        )
        else None
    )


def fetch_suttaplexs(db, lang, hits):
    uids = list(set([item['uid'] for item in hits]))
    suttaplexs = []
    for uid in uids:
        suttaplex = list(db.aql.execute(SUTTAPLEX_LIST, bind_vars={'uid': uid, 'language': lang}))[0]
        suttaplexs.append(suttaplex)
    return suttaplexs


def fetch_suttaplex_by_name(db, lang, name):
    possible_uids = list(db.aql.execute(POSSIBLE_SUTTA_BY_NAME, bind_vars={'name': name}))
    possible_uids.extend(list(db.aql.execute(POSSIBLE_SUTTA_BY_NAME, bind_vars={'name': f'{name}sutta'})))
    suttaplexs = []
    for uid in possible_uids:
        suttaplex = list(db.aql.execute(SUTTAPLEX_LIST, bind_vars={'uid': uid, 'language': lang}))[0]
        suttaplexs.append(suttaplex)
    return suttaplexs


def is_chinese(uchar):
    return u'\u4e00' <= uchar <= u'\u9fa5'


def extract_query_conditions(param):
    param = re.sub(r'(\w+): ', r'\1:', param)
    result = {}
    author = re.search("author:(\w+)", param)
    if author:
        result["author"] = author[1].strip()
    collection = re.search("in:(\w+)", param)
    if collection:
        result["collection"] = collection[1].strip()

    if author or collection:
        extract_rest_keywords(result, param)

    if 'or' in result and len(result['or']) == 1 and result['or'][0] == '':
        del result['or']

    if 'and' in result and len(result['and']) == 1 and result['and'][0] == '':
        del result['and']

    return result


def extract_rest_keywords(result, param):
    rest_param = ''
    if 'author' in result and 'collection' not in result:
        author_param = 'author:' + result["author"]
        rest_param = param[param.find(author_param) + len(author_param) :]

    if 'author' not in result and 'collection' in result:
        collection_param = 'in:' + result["collection"]
        rest_param = param[param.find(collection_param) + len(collection_param) :]

    if 'author' in result and 'collection' in result:
        author_param = 'author:' + result["author"]
        collection_param = 'in:' + result["collection"]
        rest_param = (
            param[param.find(author_param) + len(author_param) :]
            if param.find(author_param) > param.find(collection_param)
            else param[param.find(collection_param) + len(collection_param) :]
        )

    if 'OR' in rest_param:
        _extract_params_by_operator(rest_param, ' OR ', result, "or")
    elif 'AND' in rest_param:
        _extract_params_by_operator(rest_param, ' AND ', result, "and")
    else:
        or_param_list = [rest_param.strip()]
        result["or"] = or_param_list


def _extract_params_by_operator(rest_param, operator, result, key):
    param_list = rest_param.split(operator)
    param_list = [x.strip() for x in param_list]
    result[key] = param_list


def format_volpage(volpage):
    return re.sub(r'[^a-zA-Z0-9]', ' ', volpage)


def roman_to_int(roman):
    roman_dict = {"I": 1, "V": 5, "X": 10, "L": 50, "C": 100, "D": 500, "M": 1000}
    result = 0
    for i in range(len(roman)):
        if i == len(roman) - 1 or roman_dict[roman[i].upper()] >= roman_dict[roman[i + 1].upper()]:
            result += roman_dict[roman[i].upper()]
        else:
            result -= roman_dict[roman[i].upper()]
    return result


def standardization_volpage(volpage):
    parts = volpage.split()
    if len(parts) < 3:
        return volpage
    parts[0] = "PTS"
    parts[1] = roman_to_int(parts[1])
    parts[2] = f".{parts[2]}"
    return "{} {}{}".format(*parts)
