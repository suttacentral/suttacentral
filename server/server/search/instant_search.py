from common.arangodb import get_db
from zhconv import convert as zhconv_convert
import re
from common.queries import SUTTAPLEX_LIST
from search import dictionaries
import inflect


def generate_general_query_aql():
    return (
        '''
        FOR d IN instant_search
        SEARCH (PHRASE(d.content, @query, "common_text")
        OR PHRASE(d.name, @query, "common_text"))
        OR d.uid == @query
        OR (
          PHRASE(d.volpage, @query, "common_text")
          OR PHRASE(d.volpage, REGEX_REPLACE(@query, 's ', 'SN '), "common_text")
          OR PHRASE(d.volpage, REGEX_REPLACE(@query, 'm ', 'MN '), "common_text")
          OR PHRASE(d.volpage, REGEX_REPLACE(@query, 'a ', 'AN '), "common_text")
          OR PHRASE(d.volpage, REGEX_REPLACE(@query, 'd ', 'DN '), "common_text")
        )
        AND (d.lang == @lang OR d.lang != '')
        ''' + add_excluded_condition_to_query_aql() + '''
        ''' + aql_return_part(True) + '''
    '''
    )


def generate_author_query_aql():
    return (
        '''
        FOR d IN instant_search
        SEARCH (PHRASE(d.author, @query, "common_text") or PHRASE(d.author_uid, @query, "common_text"))
        AND (d.lang == @lang OR d.lang != '')
        '''
        + add_excluded_condition_to_query_aql()
        + '''
        FILTER d.author_uid != null
        SORT d.uid
        '''
        + aql_return_part(False)
        + '''
    '''
    )


def generate_title_query_aql():
    return (
        '''
        FOR d IN instant_search
        SEARCH PHRASE(d.name, @query, "common_text")
        AND (d.lang == @lang OR d.lang != '')
        '''
        + add_excluded_condition_to_query_aql()
        + '''
        SORT d.uid
        '''
        + aql_return_part(False)
        + '''
    '''
    )


def generate_collection_query_aql():
    return (
        '''
        FOR d IN instant_search
        SEARCH STARTS_WITH(d.uid, @query)
        AND (d.lang == @lang OR d.lang != '')
        '''
        + add_excluded_condition_to_query_aql()
        + '''
        FILTER d.author_uid != null
        SORT d.uid
        '''
        + aql_return_part(False)
        + '''
    '''
    )


POSSIBLE_UIDS = '''
FOR r IN super_nav_details
FILTER r.uid IN @uids AND r.type == "leaf"
LIMIT 1
RETURN r.uid
'''


LIST_AUTHORS = '''
FOR a IN author_edition
SORT a.uid
RETURN {
    acronym: '',
    uid: @query,
    lang: @lang,
    full_lang: '',
    name: '',
    volpage: '',
    author: a.long_name,
    author_uid: a.uid,
    author_short: a.short_name,
    is_root: '',
    heading: '',
    content: 'content',    
}
'''


def generate_volpage_query_aql(possible_volpages):
    aql = '''
    FOR d IN instant_search
    SEARCH (
    '''
    for volpage in possible_volpages:
        aql += f'PHRASE(d.volpage, "{volpage}", "common_text") OR '
    aql = aql[:-4]
    aql += '''
    )
    ''' + add_lang_condition_to_query_aql() + '''
    SORT d.uid
    ''' + aql_return_part(False) + '''
    '''
    return aql


def generate_multi_keyword_query_aql(keywords):
    aql = '''
    FOR d IN instant_search
    SEARCH (
    '''
    aql += '''('''
    for keyword in keywords:
        aql += f'PHRASE(d.content, "{keyword}", "common_text") AND '
    aql = aql[:-4]
    aql += ''')'''

    aql += ''' OR ('''
    for keyword in keywords:
        aql += f'PHRASE(d.content, "{keyword}", "common_text") OR '
    aql = aql[:-4]
    aql += ''')'''

    aql += '''
    )
    ''' + add_lang_condition_to_query_aql() + '''
    ''' + add_excluded_condition_to_query_aql() + '''
    SORT d.uid
    ''' + aql_return_part(True) + '''
    '''
    return aql


def generate_condition_combination_query_aql(condition_combination):
    aql = '''
    FOR d IN instant_search
    SEARCH (
    '''
    aql += '''('''
    for keyword in condition_combination['or']:
        aql += f'PHRASE(d.content, "{keyword}", "common_text") AND '
    aql = aql[:-4]
    aql += ''')'''

    aql += ''' OR ('''
    for keyword in condition_combination['or']:
        aql += f'PHRASE(d.content, "{keyword}", "common_text") OR '
    aql = aql[:-4]
    aql += ''')'''

    aql += '''
    )
    ''' + add_collection_condition_to_query_aql(condition_combination) + '''
    ''' + add_author_condition_to_query_aql(condition_combination) + '''
    ''' + add_lang_condition_to_query_aql() + '''
    ''' + add_excluded_condition_to_query_aql() + '''
    SORT d.uid

    ''' + aql_return_part(True) + '''
    '''
    return aql


def general_query_aql_template():
    return (
        '''
        FOR d IN instant_search
        SEARCH (PHRASE(d.content, @query, "common_text") OR PHRASE(d.name, @query, "common_text") OR d.uid == @query)
        SORT d.uid
        ''' + aql_return_part(True) + '''
    '''
    )


def add_lang_condition_to_query_aql():
    return '''
    AND (d.lang == @lang OR d.lang != "" OR d.lang == "pli" OR d.lang == @query)
    '''


def add_excluded_condition_to_query_aql():
    return '''
    AND d.uid NOT LIKE '%-name%'
    AND d.uid NOT LIKE '%-blurbs%'
    AND d.uid NOT LIKE '%-guide%'
    '''


def add_author_condition_to_query_aql(condition_combination):
    if 'author' not in condition_combination:
        return ''
    author = condition_combination['author']
    return f'AND (PHRASE(d.author, "{author}", "common_text") OR PHRASE(d.author_uid, "{author}", "common_text")) '


def add_volpage_condition_to_query_aql(volpage):
    return f'AND (PHRASE(d.volpage, "{volpage}", "common_text"))'


def add_collection_condition_to_query_aql(condition_combination):
    if 'collection' in condition_combination:
        collection = condition_combination['collection']
        if collection != 'ebt':
            return f'AND STARTS_WITH(d.uid, "{collection}")'
        ebt_collections = ["dn", "da", "mn", "ma", "sn", "sa", "an", "ea", "ea-2", "kp", "iti", "ud", "snp", "dhp",
                           "thig", "thag", "pli-tv", "lzh-mg", "lzh-mi", "lzh-dg", "lzh-sarv", "lzh-mu", "lzh-ka",
                           "lzh-upp", "san-mg", "san-lo"]
        return f'AND (STARTS_WITH(d.uid, {ebt_collections})) '
    return ''

def aql_return_part(include_content=True):
    aql = '''

    LET full_lang = (
        FOR lang IN language
        FILTER lang.uid == d.lang
        RETURN lang.name
    )[0]

    return {
        acronym: d.acronym,
        uid: d.uid,
        lang: d.lang,
        full_lang: full_lang,
        name: d.name,
        volpage: d.volpage,
        author: d.author,
        author_uid: d.author_uid,
        author_short: d.author_short,
        is_root: d.is_root,
        heading: d.heading,
        content: 'content',
    }
    '''
    if include_content:
        aql = aql.replace('\'content\'', 'd.content')
    return aql


def generate_chinese_keyword_query_aql(keywords):
    aql = '''
    FOR d IN instant_search
    SEARCH
    '''
    for keyword in keywords:
        aql += f'PHRASE(d.content, "{keyword}", "common_text") OR '
    aql = aql[:-4]
    aql += '''
    ''' + add_lang_condition_to_query_aql() + '''
    SORT d.uid
    ''' + aql_return_part(True) + '''
    '''
    return aql


def instant_search_query(query, lang, restrict, limit, offset):
    db = get_db()
    query = query.strip()
    hits = []
    original_query = query
    if restrict != 'dictionaries':
        search_aql = generate_general_query_aql()
        bind_param = {
            'query': query,
            'lang': lang,
        }
        condition_combination = extract_param(query)
        if is_complex_query(condition_combination):
            bind_param, search_aql = compute_complex_query_aql(bind_param, condition_combination, lang, query, search_aql)
        else:
            bind_param, query, search_aql = compute_query_aql(bind_param, lang, query, search_aql)

        cursor = db.aql.execute(search_aql, bind_vars=bind_param)
        hits = list(cursor)
        hits = sort_hits(hits, query)
        total = len(hits)

        if (not query.startswith('volpage:')) and (not query.startswith('author:') and (not query.startswith('in:'))):
            hits = hits[int(offset):int(offset) + int(limit)]

        highlight_keyword(hits, query)

    suttaplex = fetch_suttaplex(db, lang, query)
    suttaplexs = [suttaplex]
    if original_query.startswith('title:'):
        suttaplexs.extend(fetch_suttaplexs(db, lang, hits))

    lookup_dictionary(hits, lang, query, restrict)

    return {'total': total, 'hits': hits, 'suttaplex': suttaplexs}


def is_complex_query(condition_combination):
    return ('author' in condition_combination or 'collection' in condition_combination) and 'or' in condition_combination


def general_aql_based_on_query(condition_combination):
    aql = general_query_aql_template()
    if 'author' in condition_combination:
        aql = add_author_condition_to_query_aql(aql, condition_combination['author'])
    if 'volpage' in condition_combination:
        aql = add_volpage_condition_to_query_aql(aql, condition_combination['volpage'])
    if 'collection' in condition_combination:
        aql = add_collection_condition_to_query_aql(aql, condition_combination['collection'])

    return aql


def compute_complex_query_aql(bind_param, condition_combination, lang, query, search_aql):
    search_aql = generate_condition_combination_query_aql(condition_combination)
    bind_param = {
        'query': query,
        'lang': lang,
    }
    return bind_param, search_aql


def compute_query_aql(bind_param, lang, query, search_aql):
    query, search_aql = generate_aql_by_zhhant_and_zhhans_keywords(query, search_aql)
    query, search_aql = generate_aql_by_author(query, search_aql)
    query, search_aql = generate_aql_by_volpage(query, search_aql)
    query, search_aql = generate_aql_by_multi_chinese_keywords(query, search_aql)
    query, search_aql = generate_aql_by_or_operators(query, search_aql)
    query, search_aql = generate_aql_by_collection(query, search_aql)
    query, search_aql = generate_aql_by_list_authors(query, search_aql)
    query, search_aql = generate_aql_by_title(query, search_aql)
    bind_param = {
        'query': query,
        'lang': lang,
    }
    return bind_param, query, search_aql


def highlight_keyword(hits, query):
    for hit in hits:
        compute_url(hit)
        if 'content' in hit and hit['content'] is not None:
            content = hit['content']
            cut_highlights(content, hit, query)
        else:
            cut_highlights_when_content_is_none(hit, query)
        del hit['content']


def sort_hits(hits, query):
    if query.startswith('in:') or query.startswith('author:') or query.startswith('volpage:'):
        hits = sorted(hits, key=lambda x: x['uid'])
    return hits


def generate_aql_by_zhhant_and_zhhans_keywords(query, search_aql):
    if is_chinese(query) and ' ' not in query:
        query_list = [zhconv_convert(query, 'zh-hant'), zhconv_convert(query, 'zh-hans')]
        search_aql = generate_chinese_keyword_query_aql(query_list)
    return query, search_aql


def generate_aql_by_collection(query, search_aql):
    if query.startswith('in:'):
        # search_aql = INSTANT_SEARCH_QUERY_BY_COLLECTION
        search_aql = generate_collection_query_aql()
        query = query[3:]
    return query, search_aql


def generate_aql_by_list_authors(query, search_aql):
    if query == 'list authors':
        search_aql = LIST_AUTHORS
        query = ''
    return query, search_aql


def generate_aql_by_multi_chinese_keywords(query, search_aql):
    if is_chinese(query) and ' ' in query:
        query_list = query.split(' ')
        search_aql = generate_multi_keyword_query_aql(query_list)
    return query, search_aql


def generate_aql_by_or_operators(query, search_aql):
    if ' OR ' in query:
        query_list = query.split(' OR ')
        search_aql = generate_multi_keyword_query_aql(query_list)
    return query, search_aql


def generate_aql_by_author(query, search_aql):
    if query.startswith('author:'):
        search_aql = generate_author_query_aql()
        query = query[7:]
    return query, search_aql


def generate_aql_by_title(query, search_aql):
    if query.startswith('title:'):
        search_aql = generate_title_query_aql()
        query = query[6:]
    return query, search_aql


def generate_aql_by_volpage(query, search_aql):
    vol_page_number = re.search(r'\d+', query)
    if query.startswith('volpage:'):
        query = query[8:]
        if re.search(r'[asmd] \w+ \d+', query):
            query = re.sub(r'[asmd] \w+ \d+',
                           lambda x: x.group().replace('a', 'AN').replace('s', 'SN').replace('m', 'MN').replace(
                               'd', 'DN'), query)
        elif re.search(r'[ASMD] \w+ \d+', query):
            query = re.sub(r'[ASMD] \w+ \d+',
                           lambda x: x.group().replace('A', 'AN').replace('S', 'SN').replace('M', 'MN').replace(
                               'D', 'DN'), query)
        possible_volpages = []
        if vol_page_number is not None:
            vol_page_no = re.search(r'\d+', query).group()
            possible_volpages.extend(
                query.split(vol_page_no)[0] + str(i)
                for i in range(int(vol_page_no) - 5, int(vol_page_no) + 4)
                if i > 0
            )
            search_aql = generate_volpage_query_aql(possible_volpages)
        possible_volpages.append(query)
    return query, search_aql


def cut_highlights_when_content_is_none(hit, query):
    hit['highlight'] = {'content': []}
    highlight = hit['name']
    highlight = re.sub(query, f'<strong class="highlight">{query}</strong>', highlight, flags=re.I)
    hit['highlight']['content'].append(highlight)


def cut_highlights(content, hit, query):
    hit['highlight'] = {'content': []}
    condition_combination = extract_param(query)
    if is_chinese(query):
        keyword_list = query.split(' ')
        for keyword in keyword_list:
            zhhant_keyword = zhconv_convert(keyword, 'zh-hant')
            zhhans_keyword = zhconv_convert(keyword, 'zh-hans')
            if zhhant_keyword != zhhans_keyword:
                chinese_character_list = [zhhant_keyword, zhhans_keyword]
            else:
                chinese_character_list = [zhhant_keyword]
            for cc in chinese_character_list:
                cut_highlight(content, hit, cc)
    elif ('author' in condition_combination or 'collection' in condition_combination) and 'or' in condition_combination:
        keyword_list = condition_combination['or']
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword)
    elif not is_chinese(query) and (' OR ' in query):
        keyword_list = query.split(' OR ')
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword)
    else:
        highlight_by_multiple_possible_keyword(content, hit, query)


def highlight_by_multiple_possible_keyword(content, hit, keyword):
    possible_word_list = [f'{keyword}']
    plural = inflect.engine().plural(keyword)
    if plural != keyword:
        possible_word_list.append(plural)

    for word in possible_word_list:
        cut_highlight(content, hit, word)


def cut_highlight(content, hit, query):
    positions = []
    if is_chinese(query):
        positions = [m.start() for m in re.finditer(query, content, re.IGNORECASE)]
    else:
        positions = [m.start() for m in re.finditer(r"\b" + query + r"\b", content, re.IGNORECASE)]
    # if content is not None and query in content:
    if content is not None and positions:
        # positions = [m.start() for m in re.finditer(query, content, re.IGNORECASE)]
        for position in positions[:3]:
            if not is_chinese(query):
                paragraph = find_paragraph(content, position)
                sentences = find_sentences_with_keyword(paragraph, query)
                highlight = '...'.join(sentences)
            else:
                start = position - 100 if position > 100 else 0
                end = min(position + 100, len(content))
                highlight = content[start:end]
                highlight = re.sub(r'^.*?[\.\?!…“]', '', highlight)
                if last_punctuation := re.search(r'[\.\?!…,”]', highlight[::-1]):
                    highlight = highlight[:len(highlight) - last_punctuation.start()]

            highlight = re.sub(query, f' <strong class="highlight">{query}</strong> ', highlight, flags=re.I)
            hit['highlight']['content'].append(highlight)


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
    sentence_list = re.split(r'[.!?]+', input_string)
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


def is_chinese(uchar):
    return u'\u4e00' <= uchar <= u'\u9fa5'


def extract_param(param):
    result = {}
    author = re.search("author:(\w+)", param)
    if author:
        result["author"] = author[1]
    collection = re.search("in:(\w+)", param)
    if collection:
        result["collection"] = collection[1]

    if author or collection:
        extract_or_keywords(result, param)

    if 'or' in result and len(result['or']) == 1 and result['or'][0] == '':
        del result['or']

    return result


def extract_or_keywords(result, param):
    if 'author' in result and 'collection' not in result:
        author_param = 'author:' + result["author"]
        or_param = param[param.find(author_param) + len(author_param) :]

    if 'author' not in result and 'collection' in result:
        collection_param = 'in:' + result["collection"]
        or_param = param[param.find(collection_param) + len(collection_param) :]

    if 'author' in result and 'collection' in result:
        author_param = 'author:' + result["author"]
        collection_param = 'in:' + result["collection"]
        or_param = (
            param[param.find(author_param) + len(author_param) :]
            if param.find(author_param) > param.find(collection_param)
            else param[param.find(collection_param) + len(collection_param) :]
        )

    if 'OR' in or_param:
        or_param_list = or_param.split(' OR ')
        or_param_list = [x.strip() for x in or_param_list]
    else:
        or_param_list = [or_param.strip()]
    result["or"] = or_param_list
