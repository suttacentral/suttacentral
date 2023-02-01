from common.arangodb import get_db
from zhconv import convert as zhconv_convert
import re
from common.queries import SUTTAPLEX_LIST
from search import dictionaries

INSTANT_SEARCH_QUERY_OLD = '''
FOR doc IN instant_search
  SEARCH PHRASE(doc.name, @query, "common_text")
  OR PHRASE(doc.content, @query, "common_text")
  OR ANALYZER(STARTS_WITH(doc.name, @query), "normalize")
  OR NGRAM_MATCH(
        doc.name,
        @query,
        0.4,
        'common_ngram'
    )
  FILTER doc.root_lang OR @lang == NULL or doc.lang == @lang
  LET uid = doc.uid
  LET nav_doc = DOCUMENT('super_nav_details', doc.uid)
  LET lang_uid = doc.lang ? doc.lang : doc.root_lang
  FILTER nav_doc.type == 'leaf'

  COLLECT name = doc.name, lang = lang_uid INTO group KEEP uid

  LET score_division_boost_factor = {
    dn: 1.2,
    mn: 1.2,
    sn: 1.2,
    an: 1.15
  }

  LET score_map = (
    FOR uid IN group[*].uid
        LET div_uid = REGEX_REPLACE(uid, '[0-9.-]', '')
        LET subscore = MAX([1, score_division_boost_factor[div_uid]])
        SORT subscore DESC
        RETURN {uid, subscore}
  )

  LET norm_name = FIRST(TOKENS(name, "normalize"))
  LET norm_query = FIRST(TOKENS(@query, "normalize"))
  LET contains_score = CONTAINS(norm_name, norm_query) ? 1 : 0
  LET nps_score = NGRAM_POSITIONAL_SIMILARITY(name, @query, 3)
  LET starts_score = (STARTS_WITH(norm_name, norm_query) ? 2 : 0.5) * (STARTS_WITH(name, @query) ? 1 : 0.5)

  LET score = (starts_score + contains_score + nps_score) * MAX(score_map[*].subscore)

  SORT score DESC
  LIMIT 10
  RETURN {
    name: name,
    lang: lang,
    uid: FIRST(score_map).uid
  }

'''


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
        '''
        + aql_return_part(True)
        + '''
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
    AND STARTS_WITH(d.uid, @collection)
    AND (PHRASE(d.author, @author, "common_text") OR PHRASE(d.author_uid, @author, "common_text"))
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


def add_author_condition_to_query_aql(aql, author):
    aql = aql.replace('SORT d.uid', f'AND (PHRASE(d.author, "{author}", "common_text") OR PHRASE(d.author_uid, "{author}", "common_text")) SORT d.uid ')
    return aql


def add_collection_condition_to_query_aql(aql, collection):
    aql = aql.replace('SORT d.uid', f'AND STARTS_WITH(d.uid, "{collection}") SORT d.uid ')
    return aql


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
    hits = []
    if restrict != 'dictionaries':
        search_aql = generate_general_query_aql()
        bind_param = {
            'query': query,
            'lang': lang,
        }
        condition_combination = extract_param(query)
        if 'author' in condition_combination and 'collection' in condition_combination and 'or' in condition_combination:
            search_aql = generate_condition_combination_query_aql(condition_combination)
            bind_param = {
                'query': query,
                'lang': lang,
                'collection': condition_combination['collection'],
                'author': condition_combination['author']
            }
        else:
            query, search_aql = generate_aql_by_zhhant_and_zhhans_keywords(query, search_aql)
            query, search_aql = generate_aql_by_author(query, search_aql)
            query, search_aql = generate_aql_by_volpage(query, search_aql)
            query, search_aql = generate_aql_by_multi_chinese_keywords(query, search_aql)
            query, search_aql = generate_aql_by_or_operators(query, search_aql)
            query, search_aql = generate_aql_by_collection(query, search_aql)
            bind_param = {
                'query': query,
                'lang': lang,
            }

        cursor = db.aql.execute(search_aql, bind_vars=bind_param)
        hits = list(cursor)
        # if 'author' not in condition_combination and 'collection' not in condition_combination and 'or' not in condition_combination:
        #     hits = sort_hits(hits, query)
        hits = sort_hits(hits, query)
        total = len(hits)

        if (not query.startswith('volpage:')) and (not query.startswith('author:') and (not query.startswith('collection:'))):
            hits = hits[int(offset):int(offset) + int(limit)]

        highlight_keyword(hits, query)

    suttaplex = fetch_suttaplex(db, lang, query)
    lookup_dictionary(hits, lang, query, restrict)

    return {'total': total, 'hits': hits, 'suttaplex': suttaplex}


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
    if query.startswith('collection:') or query.startswith('author:') or query.startswith('volpage:'):
        hits = sorted(hits, key=lambda x: int(re.search(r'\d+', x['uid']).group()))
    return hits


def generate_aql_by_zhhant_and_zhhans_keywords(query, search_aql):
    if is_chinese(query) and ' ' not in query:
        query_list = [zhconv_convert(query, 'zh-hant'), zhconv_convert(query, 'zh-hans')]
        search_aql = generate_chinese_keyword_query_aql(query_list)
    return query, search_aql


def generate_aql_by_collection(query, search_aql):
    if query.startswith('collection:'):
        # search_aql = INSTANT_SEARCH_QUERY_BY_COLLECTION
        search_aql = generate_collection_query_aql()
        query = query[11:]
    return query, search_aql


def generate_aql_by_multi_chinese_keywords(query, search_aql):
    if is_chinese(query) and ' ' in query:
        query_list = query.split(' ')
        # chinese_keywords = []
        # for q in query_list:
        #     chinese_keywords.append(zhconv_convert(q, 'zh-hant'))
        #     chinese_keywords.append(zhconv_convert(q, 'zh-hans'))
        # query_list = query_list + chinese_keywords
        search_aql = generate_multi_keyword_query_aql(query_list)
    return query, search_aql


def generate_aql_by_or_operators(query, search_aql):
    if ' or ' in query:
        query_list = query.split(' or ')
        search_aql = generate_multi_keyword_query_aql(query_list)
    return query, search_aql


def generate_aql_by_author(query, search_aql):
    if query.startswith('author:'):
        search_aql = generate_author_query_aql()
        query = query[7:]
    return query, search_aql


def generate_aql_by_volpage(query, search_aql):
    vol_page_number = re.search(r'\d+', query)
    if query.startswith('volpage:'):
        query = query[8:]
        if re.search(r'[asmd] \w+ \d+', query):
            query = re.sub(r'[asmd] \w+ \d+',
                           lambda x: x.group().replace('a', 'AN').replace('s', 'SN').replace('m', 'MN').replace(
                               'd', 'DN'), query)
        possible_volpages = []
        if vol_page_number is not None:
            vol_page_no = re.search(r'\d+', query).group()
            for i in range(int(vol_page_no) - 5, int(vol_page_no) + 4):
                if i > 0:
                    possible_volpages.append(query.split(vol_page_no)[0] + str(i))
            search_aql = generate_volpage_query_aql(possible_volpages)
        possible_volpages.append(query)
        # search_aql = generate_volpage_query_aql(possible_volpages)
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
            chinese_character_list = [zhconv_convert(keyword, 'zh-hant'), zhconv_convert(keyword, 'zh-hans')]
            for cc in chinese_character_list:
                cut_highlight(content, hit, cc)
            # cut_highlight(content, hit, keyword)
    elif 'author' in condition_combination and 'collection' in condition_combination and 'or' in condition_combination:
        keyword_list = condition_combination['or']
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword)
    elif not is_chinese(query) and (' or ' in query):
        keyword_list = query.split(' or ')
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(content, hit, keyword)
    else:
        highlight_by_multiple_possible_keyword(content, hit, query)


def highlight_by_multiple_possible_keyword(content, hit, keyword):
    possible_word_list = [f'{keyword} ', f' {keyword} ', f' {keyword}.', f' {keyword},', f' {keyword}?', f' {keyword}!',
                 f' {keyword}：', ]
    for word in possible_word_list:
        cut_highlight(content, hit, word)


def cut_highlight(content, hit, query):
    if content is not None and query in content:
        positions = [m.start() for m in re.finditer(query, content)]
        for position in positions[:3]:
            start = position - 50 if position > 50 else 0
            end = min(position + 50, len(content))
            highlight = content[start:end]
            highlight = re.sub(query, f'<strong class="highlight">{query}</strong>', highlight, flags=re.I)
            hit['highlight']['content'].append(highlight)


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
    suttaplex = None
    if found := list(db.aql.execute(POSSIBLE_UIDS, bind_vars={'uids': possible_uids}, )):
        suttaplex = list(db.aql.execute(SUTTAPLEX_LIST, bind_vars={'uid': found[0], 'language': lang}))[0]
    return suttaplex


def is_chinese(uchar):
    return u'\u4e00' <= uchar <= u'\u9fa5'


def extract_param(param):
    result = {}
    author = re.search("author:(\w+)", param)
    if author:
        result["author"] = author.group(1)
    collection = re.search("collection:(\w+)", param)
    if collection:
        result["collection"] = collection.group(1)

    if author and collection:
        extract_or_keywords(result, param)
    return result


def extract_or_keywords(result, param):
    author_param = 'author:' + result["author"]
    collection_param = 'collection:' + result["collection"]
    or_param = ''
    #超找author_param和collection_param的位置, 返回位置大的那个
    or_param = (
        param[param.find(author_param) + len(author_param) :]
        if param.find(author_param) > param.find(collection_param)
        else param[param.find(collection_param) + len(collection_param) :]
    )
    or_param_list = or_param.split(' or ')
    or_param_list = [x.strip() for x in or_param_list]
    result["or"] = or_param_list
