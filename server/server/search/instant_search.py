from common.arangodb import get_db
from zhconv import convert as zhconv_convert
import re
from common.queries import SUTTAPLEX_LIST
from search import dictionaries, constant
from unidecode import unidecode
import unicodedata
import string

INSTANT_SEARCH_VIEW = 'instant_search'
AQL_INSTANT_SEARCH_FIRST_PART = 'FOR d IN instant_search '

POSSIBLE_UIDS = '''
FOR r IN super_nav_details
FILTER r.uid IN @uids AND r.type == "leaf"
LIMIT 1
RETURN r.uid
'''

POSSIBLE_SUTTA_BY_NAME = '''
FOR d IN instant_search
    SEARCH PHRASE(d.name, @name, "common_text")
    OR ANALYZER(LIKE(d.name, @name_like_pattern), "normalize")
    FILTER d.is_segmented != True AND (d.lang IN @selected_languages OR d.lang == @lang)
RETURN d.uid
'''

POSSIBLE_SUTTA_BY_NAME_EXACT_MATCH = '''
FOR d IN instant_search
    SEARCH PHRASE(d.name, @name, "common_text")
    FILTER d.is_segmented != True AND (d.lang IN @selected_languages OR d.lang == @lang)
RETURN d.uid
'''

LIST_AUTHORS = '''
LET scdata_authors = (
  FOR doc IN author_edition
  FILTER doc.type == 'author'
  RETURN {
    uid: doc.uid,
    short_name: LOWER(doc.short_name),
    long_name: doc.long_name
  }
)

LET bilara_authors = (
  FOR doc IN bilara_author_edition
  FILTER doc.type == 'author'
  RETURN {
    uid: doc.uid,
    short_name: LOWER(doc.short_name),
    long_name: doc.long_name
  }
)

FOR a IN UNION_DISTINCT(scdata_authors, bilara_authors)
FILTER a.uid != 'test'

LET translations = (
    FOR d IN instant_search
        SEARCH d.author_uid == a.uid
        FILTER d.is_segmented == False AND d.author_uid != null AND d.lang IN @lang
        LIMIT 1
    RETURN d.uid
)
FILTER length(translations) > 0
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

LIST_TEXT_BY_LANGUAGE = '''
FOR d IN text_contents
    FILTER d.lang == @lang and (d.is_article == false || d.is_article == null)
    SORT d.author_uid, d.uid
RETURN {
    lang: d.lang,
    full_lang: d.full_lang,
    uid: d.uid,
    name: d.name,
    author_uid: d.author_uid,
    author: d.author,
    is_segmented: d.is_bilara_text ? true : false,
    content: 'content',
    keyword: @query
}
'''

ROOT_NAMES = '''
For n IN names
FILTER n.uid in @uids AND n.is_root == true
RETURN {
    uid: n.uid,
    name: n.name,
}
'''

ALL_LANGUAGES_ISO_CODE = '''
FOR l IN language RETURN l.iso_code
'''


def instant_search_query(
    query,
    lang,
    restrict,
    limit,
    offset,
    matchpartial,
    selected_languages
):
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
        'matchpartial': matchpartial,
        'selected_languages': selected_languages
    }
    if restrict != 'dictionaries':
        aql_condition_part, bind_param, search_aql = construct_search_query_aql(
            limit,
            matchpartial,
            offset,
            query,
            query_param,
            selected_languages
        )

        hits, query, total = execute_search_query(
            aql_condition_part,
            bind_param,
            db,
            hits,
            query,
            search_aql,
            total
        )

        fuzzy_dictionary_entries, hits, suttaplexs, total = process_search_results(
            db,
            hits,
            lang,
            limit,
            matchpartial,
            original_query,
            query,
            restrict,
            total,
            selected_languages
        )

        return {
            'total': total,
            'hits': hits,
            'suttaplex': suttaplexs,
            'fuzzy_dictionary': fuzzy_dictionary_entries
        }


def process_search_results(
    db,
    hits,
    lang,
    limit,
    matchpartial,
    original_query,
    query,
    restrict,
    total,
    selected_languages
):
    if total == 0:
        total = len(hits)
    if matchpartial == 'true':
        hits = sorted(hits, key=lambda item: item.get('segmented_uid') or '')
        hits = crop_hits(hits)
    if original_query != constant.CMD_LIST_AUTHORS and not original_query.startswith(constant.CMD_LIST):
        highlight_keyword(hits, query)
    if matchpartial == 'true':
        hits = merge_duplicate_hits(hits)
    suttaplexs = []
    if original_query != constant.CMD_LIST_AUTHORS and not original_query.startswith(constant.CMD_LIST):
        suttaplexs = try_to_fetch_suttaplex(db, hits, lang, original_query, query, selected_languages, matchpartial)
    current_page_total = len(hits)
    hits = remove_hits_if_uid_in_suttaplexs(hits, suttaplexs)
    total = calculate_total(current_page_total, hits, limit, suttaplexs, total)
    lookup_dictionary(hits, lang, query, restrict)
    fuzzy_dictionary_entries = []
    if matchpartial == 'true':
        fuzzy_dictionary_entries = fuzzy_lookup_dictionary(lang, query, restrict)
    add_root_name_to_hits(db, hits)
    if original_query != constant.CMD_LIST_AUTHORS and not original_query.startswith(constant.CMD_LIST):
        sort_highlight_clips(hits)
    if constant.CMD_AUTHOR in original_query:
        sort_by_sutta_numbering_rules(hits)
    return fuzzy_dictionary_entries, hits, suttaplexs, total


def sort_highlight_clips(hits):
    for hit in hits:
        hit['highlight']['content'] = sorted(hit['highlight']['content'], key=extract_number)


def execute_search_query(
    aql_condition_part,
    bind_param,
    db,
    hits,
    query,
    search_aql,
    total
):
    query = bind_param['query']
    total = fetch_record_count(
        INSTANT_SEARCH_VIEW, aql_condition_part, query)
    cursor = db.aql.execute(search_aql, bind_vars=bind_param)
    hits = list(cursor)
    return hits, query, total


def construct_search_query_aql(
    limit,
    matchpartial,
    offset,
    query,
    query_param,
    selected_languages
):
    search_aql, aql_condition_part = \
        generate_general_query_aql(
            query, limit, offset, matchpartial, selected_languages)
    query_conditions = extract_query_conditions(query)
    if is_complex_query(query_conditions):
        bind_param, search_aql, aql_condition_part = \
            generate_aql_for_complex_query(query_conditions, query_param)
    else:
        bind_param, search_aql, aql_condition_part = \
            generate_aql_based_on_query(search_aql, aql_condition_part, query_param)
    return aql_condition_part, bind_param, search_aql


def calculate_total(current_page_total, hits, limit, suttaplexs, total):
    if total <= int(limit):
        total = current_page_total
    else:
        total = total - (current_page_total - len(hits))
    if total == 0:
        total = len(suttaplexs)
    return total


def add_root_name_to_hits(db, hits):
    root_names = fetch_root_names(db, hits)
    root_names_set = {
        root_name['uid']: root_name['name']
        for root_name in root_names
    }
    for hit in hits:
        uid = hit.get('uid')
        if uid in root_names_set:
            hit['root_name'] = root_names_set[uid]


def fetch_root_names(db, hits):
    uids = [hit['uid'] for hit in hits if 'uid' in hit]
    cursor = db.aql.execute(ROOT_NAMES, bind_vars={'uids': uids})
    return list(cursor)


def remove_hits_if_uid_in_suttaplexs(hits, suttaplexs):
    uids = [suttaplex['uid'] for suttaplex in suttaplexs]
    hits = [hit for hit in hits
            if 'category' not in hit and hit['uid'] not in uids]
    return hits


def generate_general_query_aql(
    query,
    limit,
    offset,
    matchpartial,
    selected_languages
):
    aql_condition_part = '''
    SEARCH (PHRASE(d.content, @query, "common_text")
        OR PHRASE(d.name, @query, "common_text")
        OR d.uid == @query
    '''
    aql_condition_part += f'OR ANALYZER(LIKE(d.name, "%{query.lower()}%"), "normalize") '

    if matchpartial == 'true':
        aql_condition_part += (
            f'OR LIKE(d.volpage, "%{query}%") '
            f'OR LIKE(d.name, "%{query}%") '
            f'OR ANALYZER(LIKE(d.name, "%{query.lower()}%"), "normalize") '
            f'OR ANALYZER(LIKE(d.segmented_text, "%{query.lower()}%"), "normalize") '
            f'OR ANALYZER(LIKE(d.name, "%{unidecode(query.lower())}%"), "normalize") '
            f'OR ANALYZER(LIKE(d.segmented_text, "%{unidecode(query.lower())}%"), "normalize") '
        )
        if possible_pali_words := [query]:
            aql_condition_part += ''' OR ('''
            for pali_word in possible_pali_words:
                aql_condition_part += (
                    f'LIKE(d.segmented_text, "%{pali_word}%") OR '
                    f'LIKE(d.segmented_text, "%{unidecode(pali_word)}%") OR '
                )
            aql_condition_part = aql_condition_part[:-4]
            aql_condition_part += '''))'''
    else:
        aql_condition_part += ''')'''

    aql_condition_part += get_filter_part_for_aql(matchpartial)
    aql_condition_part += get_lang_condition_for_aql(selected_languages)

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_sort_part_for_aql() + '\n' +
            get_limit_part_for_aql(limit, offset) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def fetch_record_count(collection, condition, query):
    aql = f'''
        LET record_count = (FOR d IN {collection}
        {condition}
        COLLECT WITH COUNT INTO length
        RETURN length)[0]

        RETURN record_count
    '''
    return list(get_db().aql.execute(aql, bind_vars={"query": query}))[0]


def generate_aql_for_author_filter(query_param):
    aql_condition_part = '''
        SEARCH d.author_uid == @query
        FILTER d.is_segmented == False AND d.author_uid != null
    '''

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_sort_part_for_aql() + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def generate_aql_for_title_filter(query_param):
    aql_condition_part = '''
        SEARCH PHRASE(d.name, @query, "common_text")
        FILTER d.is_segmented == False
        '''

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def generate_aql_for_collection_filter(query_param):
    aql_condition_part = """
        FILTER (d.root_uid == @query OR @query in d.full_path)
        FILTER d.is_segmented == False
        FILTER d.author_uid != null
    """
    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_lang_condition_for_aql(query_param['selected_languages']) + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def generate_aql_for_lang_filter(lang, keyword_list, operator, query_param):
    aql_condition_part = f'SEARCH (d.lang == "{lang}" OR d.name==@query) AND '
    if operator == 'OR':
        for keyword in keyword_list:
            aql_condition_part += (
                f'(PHRASE(d.content, "{keyword}", "common_text") OR '
                f'LIKE(d.segmented_text, "%{keyword}%") OR '
                f'ANALYZER(LIKE(d.name, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.name, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                f'LIKE(d.name, "%{keyword}%")) OR '
            )
        aql_condition_part = aql_condition_part[:-4]

    if operator == 'AND':
        for keyword in keyword_list:
            aql_condition_part += (
                f'(PHRASE(d.content, "{keyword}", "common_text") OR '
                f'LIKE(d.segmented_text, "%{keyword}%") OR '
                f'ANALYZER(LIKE(d.name, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.name, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                f'LIKE(d.name, "%{keyword}%")) AND '
            )
        aql_condition_part = aql_condition_part[:-5]

    aql_condition_part += get_filter_part_for_aql(query_param['matchpartial'])

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def generate_aql_for_volpage_filter(possible_volpages, first_part_of_volpage):
    aql = '''
    FOR d IN instant_volpage_search
    SEARCH (PHRASE(d.volpage, @query, "common_text")
        OR PHRASE(d.alt_volpage, @query, "common_text") OR
    '''

    for volpage in possible_volpages:
        aql += (
            f'PHRASE(d.volpage, "{volpage}", "common_text") OR '
            f'PHRASE(d.alt_volpage, "{volpage}", "common_text") OR '
        )
    aql = aql[:-4]

    aql += '''
    )
    SORT d.uid
    '''
    if first_part_of_volpage:
        aql += f' FILTER STARTS_WITH(d.uid, "{first_part_of_volpage.lower()}")'
    aql += '''
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


def generate_aql_for_reference_filter(query):
    return '''
        FOR d IN instant_volpage_search
        SEARCH (PHRASE(d.volpage, @query, "common_text")
                OR PHRASE(d.alt_volpage, @query, "common_text"))

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
            all_reference: all_reference,
            content: '',
            segmented_text: '',
        }
        '''


def generate_aql_for_multi_keyword(keywords, query_param):
    aql_condition_part = '''
    SEARCH (PHRASE(d.content, @query, "common_text") OR
    '''
    aql_condition_part += '''('''
    for keyword in keywords:
        if constant.OPERATOR_NOT not in keyword:
            aql_condition_part += (
                f'PHRASE(d.content, "{keyword}", "common_text") AND '
            )
        else:
            keyword_exclude_not = keyword.split(constant.OPERATOR_NOT)[0]
            aql_condition_part += (
                f'PHRASE(d.content, "{keyword_exclude_not}", "common_text") AND '
            )
    aql_condition_part = aql_condition_part[:-4]
    aql_condition_part += ''')'''

    aql_condition_part += ''' OR ('''
    for keyword in keywords:
        if constant.OPERATOR_NOT not in keyword:
            aql_condition_part += (
                f'PHRASE(d.content, "{keyword}", "common_text") OR '
                f'LIKE(d.segmented_text, "%{keyword}%") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
            )
        else:
            keyword_exclude_not = keyword.split(constant.OPERATOR_NOT)[0]
            aql_condition_part += (
                f'PHRASE(d.content, "{keyword_exclude_not}", "common_text") OR '
                f'LIKE(d.segmented_text, "%{keyword_exclude_not}%") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
            )
    aql_condition_part = aql_condition_part[:-4]
    aql_condition_part += ''')'''

    aql_condition_part += ''')'''

    if not_keywords := extract_not_param(query_param['query']):
        aql_condition_part += get_not_part_for_aql(not_keywords)

    aql_condition_part += get_filter_part_for_aql(query_param['matchpartial'])
    aql_condition_part += get_lang_condition_for_aql(query_param['selected_languages'])

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )
    return full_aql, aql_condition_part


def generate_aql_for_and_operator(keywords, query_param):
    aql_condition_part = '''
    SEARCH PHRASE(d.content, @query, "common_text") OR
    '''

    for keyword in keywords:
        if constant.OPERATOR_NOT not in keyword:
            aql_condition_part += (
                f'(PHRASE(d.content, "{keyword}", "common_text") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                f'LIKE(d.segmented_text, "%{keyword}%")) AND '
            )
        else:
            keyword_exclude_not = keyword.split(constant.OPERATOR_NOT)[0]
            aql_condition_part += (
                f'(PHRASE(d.content, "{keyword_exclude_not}", "common_text") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                f'LIKE(d.segmented_text, "%{keyword_exclude_not}%")) AND '
            )

    aql_condition_part = aql_condition_part[:-5]

    if not_keywords := extract_not_param(query_param['query']):
        aql_condition_part += get_not_part_for_aql(not_keywords)

    aql_condition_part += get_filter_part_for_aql(query_param['matchpartial'])
    aql_condition_part += get_lang_condition_for_aql(query_param['selected_languages'])

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def generate_aql_for_not_operator(keywords, query_param):
    aql_condition_part = '''
    SEARCH 1==@query OR
    '''

    keyword_exclude_not = keywords.split(constant.OPERATOR_NOT)[0]
    aql_condition_part += (
        f'(PHRASE(d.content, "{keyword_exclude_not}", "common_text") OR '
        f'ANALYZER(LIKE(d.segmented_text, "%{keyword_exclude_not.lower()}%"), "normalize") OR '
        f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword_exclude_not.lower())}%"), "normalize") OR '
        f'LIKE(d.segmented_text, "%{keyword_exclude_not}%")) '
    )

    if not_keywords := extract_not_param(query_param['query']):
        aql_condition_part += get_not_part_for_aql(not_keywords)

    aql_condition_part += get_filter_part_for_aql(query_param['matchpartial'])
    aql_condition_part += get_lang_condition_for_aql(query_param['selected_languages'])

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def generate_query_aql_by_conditions(query_conditions, query_param):
    if not is_chinese_ex(query_conditions):
        aql_condition_part = '''
        SEARCH ((PHRASE(d.content, @query, "common_text") OR
        '''

        if 'or' in query_conditions:
            keyword_list = query_conditions['or']
            keyword_list = extend_chinese_keywords(keyword_list, query_conditions)
            for keyword in keyword_list:
                aql_condition_part += (
                    f'(PHRASE(d.content, "{keyword}", "common_text") OR '
                    f'LIKE(d.segmented_text, "%{keyword}%") OR '
                    f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                    f'ANALYZER(LIKE(d.name, "%{keyword.lower()}%"), "normalize") OR '
                    f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                    f'ANALYZER(LIKE(d.name, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                    f'd.uid == "{keyword}" OR '
                    f'PHRASE(d.name,  "{keyword}", "common_text")) OR '
                )

            aql_condition_part = aql_condition_part[:-4]

        if 'and' in query_conditions:
            for keyword in query_conditions['and']:
                aql_condition_part += (
                    f'(PHRASE(d.content, "{keyword}", "common_text") OR '
                    f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR '
                    f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR '
                    f'LIKE(d.segmented_text, "%{keyword}%")) AND '
                )
            aql_condition_part = aql_condition_part[:-5]

        if 'not' in query_conditions:
            aql_condition_part += get_not_part_for_aql(query_conditions['not'])

        aql_condition_part += '''
        )
        ''' + add_author_condition_to_aql(query_conditions) + '''
        )
        '''
    else:
        aql_condition_part = '''
            LET cjk_tokens = TOKENS(d.content, 'cjk_ngram')
            FILTER @query == @query AND
        '''

        or_conditions = generate_conditions(query_conditions, 'or')
        and_conditions = generate_conditions(query_conditions, 'and')

        if or_conditions:
            aql_condition_part += ' OR '.join(or_conditions)

        if and_conditions:
            if or_conditions:
                aql_condition_part += ' AND '
            aql_condition_part += ' AND '.join(and_conditions)

    aql_condition_part += get_filter_part_for_aql(query_param['matchpartial'])
    aql_condition_part += get_lang_condition_for_aql(query_param['selected_languages'])
    aql_condition_part += add_collection_condition_to_aql(
        query_conditions)

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_sort_part_for_aql() + '\n' +
            get_limit_part_for_aql(query_param['limit'], query_param['offset']) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def generate_conditions(query_conditions, operator):
    conditions = []
    if operator in query_conditions:
        keyword_list = query_conditions[operator]
        for keyword in keyword_list:
            zh_hant_keyword = zhconv_convert(keyword, 'zh-hant')
            zh_hans_keyword = zhconv_convert(keyword, 'zh-hans')
            conditions.append(f'(CONTAINS(cjk_tokens, "{zh_hant_keyword}") OR CONTAINS(cjk_tokens, "{zh_hans_keyword}"))')
    return conditions


def add_author_condition_to_aql(condition_combination):
    if 'author' not in condition_combination:
        return ''
    author = condition_combination['author']
    return f'AND (d.author_uid == "{author}") '


def add_collection_condition_to_aql(condition_combination):
    if 'collection' not in condition_combination:
        return ''

    collection = condition_combination['collection'].lower()
    if collection == 'ebs':
        return add_in_ebs_condition_to_aql()

    if collection == 'ebt':
        return add_in_ebt_condition_to_aql()

    if collection == 'ebct':
        return add_in_ebct_condition_to_aql()

    if collection == 'article':
        return add_in_article_condition_to_aql()

    return (
        f'FILTER (d.root_uid == "{collection}" OR '
        f'"{collection}" IN d.full_path) '
    )


def add_in_ebs_condition_to_aql():
    return 'FILTER (d.is_ebs == true) '


def add_in_ebt_condition_to_aql():
    return 'FILTER (d.is_ebt == true) '


def add_in_ebct_condition_to_aql():
    return 'FILTER (d.is_ebct == true) '


def add_in_article_condition_to_aql():
    return 'FILTER (d.is_article == true AND d.uid != "interface") '


def fetch_children_by_uid(uid):
    db = get_db()
    query = (
        "FOR doc IN 1..1 OUTBOUND DOCUMENT('super_nav_details', @uid) "
        "super_nav_details_edges RETURN doc.uid"
    )
    bind_vars = {'uid': uid}

    return list(db.aql.execute(query, bind_vars))


def get_return_part_for_aql(include_content=True):
    aql = '''
    return {
        acronym: d.acronym,
        uid: d.uid,
        lang: d.lang,
        full_lang: d.full_lang,
        root_lang: d.root_lang,
        name: d.name,
        volpage: d.volpage,
        author: d.author,
        author_uid: d.author_uid,
        author_short: d.author_short,
        is_root: d.is_root,
        heading: d.heading,
        content: 'content',
        segmented_uid: d.segmented_uid,
        segmented_text: d.segmented_text,
        is_segmented: d.is_segmented,
        is_bilara_text: d.is_bilara_text,
        param_lang: @lang,
        root_uid: d.root_uid,
        is_article: d.is_article,
        param_query: @query
    }
    '''
    if include_content:
        aql = aql.replace('\'content\'', 'd.content')
    return aql


def get_limit_part_for_aql(limit, offset):
    return f'LIMIT {offset}, {limit}'


def get_filter_part_for_aql(matchpartial):
    return ' FILTER d.is_segmented == True ' if matchpartial == 'true' else ' FILTER d.is_segmented != True  '


def get_lang_condition_for_aql(selected_languages):
    if isinstance(selected_languages, list) and len(selected_languages) > 0:
        return f' AND (d.lang IN {selected_languages} OR d.is_root==null) '
    else:
        return ''


def get_sort_part_for_aql():
    return 'SORT d.lang == @lang ? -1 : 1,' \
           'd.is_ebt == true ? -1: d.is_ebt == false ? 1: 0, ' \
           'd.is_bilara == true ? -1 : 1,' \
           'd.is_segmented == false ? -1 : 1,' \
           'd.uid'


def get_not_part_for_aql(keyword):
    return f' AND NOT (PHRASE(d.content, "{keyword}", "common_text") OR ' \
           f'PHRASE(d.name,  "{keyword}", "common_text") OR ' \
           f'd.uid ==  "{keyword}" OR ' \
           f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR ' \
           f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR ' \
           f'LIKE(d.segmented_text, "%{keyword}%")) '


def generate_aql_for_chinese_keyword(
    keywords,
    limit,
    offset,
    matchpartial,
    selected_languages
):
    aql_condition_part = '''
    SEARCH PHRASE(d.content, @query, "common_text") OR
    '''

    for keyword in keywords:
        aql_condition_part += (
            f'PHRASE(d.content, "{keyword}", "common_text") OR '
        )
    aql_condition_part = aql_condition_part[:-4]
    aql_condition_part += '\n'
    aql_condition_part += get_filter_part_for_aql(matchpartial)
    aql_condition_part += get_lang_condition_for_aql(selected_languages)

    full_aql = (
            AQL_INSTANT_SEARCH_FIRST_PART +
            aql_condition_part + '\n' +
            get_limit_part_for_aql(limit, offset) + '\n' +
            get_return_part_for_aql(True) + '\n'
    )

    return full_aql, aql_condition_part


def try_to_fetch_suttaplex(db, hits, lang, original_query, query, selected_languages, matchpartial):
    suttaplexs = []
    if original_query.startswith(constant.CMD_TITLE):
        suttaplexs.extend(fetch_suttaplexs(db, lang, hits))
    elif suttaplex := fetch_suttaplex(db, lang, query):
        suttaplexs = [suttaplex]
    else:
        suttaplexs.extend(fetch_suttaplexs_by_name(db, lang, query, selected_languages, matchpartial))

    for suttaplex in suttaplexs:
        suttaplex['verseNo'] = compute_verse_no(
            suttaplex['uid'], suttaplex['verseNo'])

    return suttaplexs


def compute_verse_no(uid, verses):
    if verses is not None and verses != '' and 'dhp' not in uid:
        all_verse = verses.split(',')
        all_verse = list(filter(lambda x: 'vns' in x, all_verse))
        return (
            f'Verse {all_verse[0].replace("vns", "")}–{all_verse[-1].replace("vns", "").strip()}'
            if len(all_verse) > 1
            else ' '.join(all_verse).replace('vns', 'Verse ')
        )


def merge_duplicate_hits(hits):
    merged = {}
    other_type_hits = []
    for item in hits:
        if (
            'uid' in item and
            'author_uid' in item and
            'highlight' in item and
            'content' in item['highlight']
        ):
            key = (item['uid'], item['author_uid'])
            if key in merged and len(merged[key]['highlight']['content']) < 5:
                merged[key]['highlight']['content'].extend(
                    item['highlight']['content'])
            else:
                merged[key] = item
        else:
            other_type_hits.append(item)

    return other_type_hits + list(merged.values())


def crop_hits(hits):
    merged = {}
    other_type_hits = []
    for item in hits:
        if (
            'uid' in item and
            'author_uid' in item and
            'highlight' in item and
            'content' in item['highlight']
        ):
            key = (item['uid'], item['author_uid'])
            if key in merged:
                if len(merged[key]) < 5:
                    merged[key].append(item)
            else:
                merged[key] = [item]
        else:
            other_type_hits.append(item)

    # Flatten the list of lists to a single list
    merged_hits = [hit for sublist in merged.values() for hit in sublist]
    return other_type_hits + merged_hits


def is_complex_query(query_conditions):
    return ('author' in query_conditions or 'collection' in query_conditions) \
        and ('or' in query_conditions or 'and' in query_conditions)


def generate_aql_for_complex_query(query_conditions, query_param):
    search_aql, aql_condition_part = generate_query_aql_by_conditions(
        query_conditions, query_param)
    bind_param = {
        'query': query_param['query'],
        'lang': query_param['lang']
    }
    return bind_param, search_aql, aql_condition_part


def generate_aql_based_on_query(search_aql, aql_condition_part, query_param):
    search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_not_operator(
            search_aql, aql_condition_part, query_param)

    search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_and_operator(
            search_aql, aql_condition_part, query_param)

    search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_chinese_keywords(
            search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_author_filter(search_aql, aql_condition_part, query_param)
        
    query_param, search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_by_filter(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_volpage_filter(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_reference_filter(search_aql, aql_condition_part, query_param)

    search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_multi_chinese_keywords(
            search_aql, aql_condition_part, query_param)

    search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_or_operator(
            search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_by_collection(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_for_list_authors_command(
            search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        generate_aql_for_list_language_command(
            search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_title_filter(search_aql, aql_condition_part, query_param)

    query_param, search_aql, aql_condition_part = \
        prepare_and_generate_aql_for_lang_filter(search_aql, aql_condition_part, query_param)

    bind_param = {
        'query': query_param['query'],
        'lang': query_param['lang']
    }

    return bind_param, search_aql, aql_condition_part


def highlight_keyword(hits, query):
    for hit in hits:
        compute_url(hit)
        is_segmented_text = False
        if (
            'content' in hit and hit['content'] is not None or
            'segmented_text' in hit and hit['segmented_text'] is not None
        ):
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

# Sort according to sutta numbering rules, e.g. sn1.1, sn1.2, sn1.12, dn1, dn4
def sort_by_sutta_numbering_rules(input_list):
    def get_key(item):
        if 'uid' not in item or 'category' in item:
            return ('', (0, 0.0))
        uid = item['uid']

        if uid.count('-') > 1:
            letter_part = ''.join([char for char in uid if char.isalpha()])
            number_part = uid[len(letter_part):]
        else:
            letter_part = ''.join([char for char in uid if char.isalpha()])
            number_part = ''.join([char for char in uid if char.isdigit() or char == '.'])

        if '.' in number_part:
            integer_part, decimal_part = number_part.split('.')
            number_part = (int(integer_part), float(decimal_part))
        else:
            if number_part == '' or not number_part.isdigit():
                number_part = '0'
            number_part = (int(number_part), 0.0)

        return (letter_part, number_part)

    input_list.sort(key=get_key)


def prepare_and_generate_aql_for_chinese_keywords(
    search_aql,
    aql_condition_part,
    query_param
):
    if is_chinese(query_param['query']) and ' ' not in query_param['query']:
        query_list = [
            zhconv_convert(query_param['query'], 'zh-hant'),
            zhconv_convert(query_param['query'], 'zh-hans')
        ]
        search_aql, aql_condition_part = generate_aql_for_chinese_keyword(
            query_list, query_param['limit'], query_param['offset'],
            query_param['matchpartial'], query_param['selected_languages']
        )
    return search_aql, aql_condition_part


def generate_aql_by_collection(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_IN):
        query_param['query'] = query_param['query'][len(constant.CMD_IN):].lower()
        search_aql, aql_condition_part = generate_aql_for_collection_filter(
            query_param)
    return query_param, search_aql, aql_condition_part


def prepare_and_generate_aql_for_lang_filter(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_LANG):
        lang_param = extract_lang_param(query_param['query'])
        if len(lang_param) < 2:
            return query_param, search_aql, aql_condition_part
        lang = lang_param[0]
        keyword = lang_param[1]
        operator = 'OR'
        keyword_list = []
        if constant.OPERATOR_OR in keyword:
            keyword_list = keyword.split(constant.OPERATOR_OR)
        elif constant.OPERATOR_AND in keyword:
            keyword_list = keyword.split(constant.OPERATOR_AND)
            operator = 'AND'
        else:
            keyword_list.append(keyword)

        search_aql, aql_condition_part = generate_aql_for_lang_filter(
            lang, keyword_list, operator, query_param)
    return query_param, search_aql, aql_condition_part


def generate_aql_for_list_authors_command(search_aql, aql_condition_part, query_param):
    if query_param['query'] == constant.CMD_LIST_AUTHORS:
        search_aql = LIST_AUTHORS
        query_param['query'] = ''
        query_param['lang'] = query_param['selected_languages']
    return query_param, search_aql, aql_condition_part


def generate_aql_for_list_language_command(search_aql, aql_condition_part, query_param):
    if len(query_param['query'].split(' ')) > 1:
        cmd_prefix = query_param['query'].split(' ')[0]
        iso_code = query_param['query'].split(' ')[1]
        supported_languages_iso_code = fetch_supported_languages_iso_code()
        if (cmd_prefix == constant.CMD_LIST and iso_code in supported_languages_iso_code):
            search_aql = LIST_TEXT_BY_LANGUAGE
            query_param['query'] = ''
            query_param['lang'] = iso_code
    return query_param, search_aql, aql_condition_part


def prepare_and_generate_aql_for_multi_chinese_keywords(
    search_aql,
    aql_condition_part,
    query_param
):
    if is_chinese(query_param['query']) and ' ' in query_param['query']:
        if constant.OPERATOR_AND not in query_param['query']:
            query_list = query_param['query'].split(' ')
            search_aql, aql_condition_part = generate_aql_for_multi_keyword(
                query_list, query_param)
        else:
            query_list = query_param['query'].split(constant.OPERATOR_AND)
            search_aql, aql_condition_part = generate_aql_for_and_operator(
                query_list, query_param)
    return search_aql, aql_condition_part


def prepare_and_generate_aql_for_or_operator(search_aql, aql_condition_part, query_param):
    if constant.OPERATOR_OR in query_param['query']:
        query_list = query_param['query'].split(constant.OPERATOR_OR)
        search_aql, aql_condition_part = generate_aql_for_multi_keyword(
            query_list, query_param)
    return search_aql, aql_condition_part


def prepare_and_generate_aql_for_and_operator(search_aql, aql_condition_part, query_param):
    if constant.OPERATOR_AND in query_param['query']:
        query_list = query_param['query'].split(constant.OPERATOR_AND)
        search_aql, aql_condition_part = generate_aql_for_and_operator(
            query_list, query_param)
    return search_aql, aql_condition_part


def prepare_and_generate_aql_for_not_operator(search_aql, aql_condition_part, query_param):
    if (
        constant.OPERATOR_NOT in query_param['query']
        and 'AND' not in query_param['query']
        and 'OR' not in query_param['query']
    ):
        search_aql, aql_condition_part = generate_aql_for_not_operator(
            query_param['query'], query_param)
    return search_aql, aql_condition_part


def prepare_and_generate_aql_for_author_filter(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_AUTHOR):
        search_aql, aql_condition_part = generate_aql_for_author_filter(query_param)
        query_param['query'] = query_param['query'][len(constant.CMD_AUTHOR):]
    return query_param, search_aql, aql_condition_part


def prepare_and_generate_aql_for_by_filter(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_BY):
        search_aql, aql_condition_part = generate_aql_for_author_filter(query_param)
        query_param['query'] = query_param['query'][len(constant.CMD_BY):]
    return query_param, search_aql, aql_condition_part


def prepare_and_generate_aql_for_title_filter(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_TITLE):
        search_aql, aql_condition_part = generate_aql_for_title_filter(query_param)
        query_param['query'] = query_param['query'][len(constant.CMD_TITLE):]
    return query_param, search_aql, aql_condition_part


def prepare_and_generate_aql_for_volpage_filter(search_aql, aql_condition_part, query_param):
    vol_page_number = re.search(r'\d+', query_param['query'])
    if query_param['query'].startswith(constant.CMD_VOLPAGE):
        query = query_param['query'][len(constant.CMD_VOLPAGE):].strip()
        query = format_volpage(query)
        pattern = r"^([asmdASMD])\s"
        replacement = r"\1n "
        query = re.sub(pattern, replacement, query)
        first_part_of_volpage = query.split(' ')[0] if ' ' in query else ''
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
        if not re.search(r'\d+', standardized_volpages):
            first_part_of_volpage = ''
        possible_volpages.append(standardized_volpages)
        possible_volpages = list(set(possible_volpages))
        search_aql = generate_aql_for_volpage_filter(possible_volpages, first_part_of_volpage)
        query_param['query'] = query
    return query_param, search_aql, aql_condition_part


def prepare_and_generate_aql_for_reference_filter(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_REFERENCE):
        query = query_param['query'][len(constant.CMD_REFERENCE):].strip()
        search_aql = generate_aql_for_reference_filter(query)
        query_param['query'] = query
    return query_param, search_aql, aql_condition_part


def cut_highlights_when_content_is_none(hit, query):
    hit['highlight'] = {'content': []}
    highlight = hit['name']
    highlight = re.sub(
        query,
        f'<strong class="highlight">{query}</strong>',
        highlight,
        flags=re.I
    )
    hit['highlight']['content'].append(highlight)


def cut_highlights(content, hit, query, is_segmented_text):
    hit['highlight'] = {'content': []}
    if constant.OPERATOR_NOT in query:
        query = query.split(constant.OPERATOR_NOT)[0]
    query_conditions = extract_query_conditions(query)
    if is_chinese(query):
        keyword_list = (
            query.split(constant.OPERATOR_AND)
            if constant.OPERATOR_AND in query
            else query.split(' ')
        )
        for keyword in keyword_list:
            zhhant_keyword = zhconv_convert(keyword, 'zh-hant')
            zhhans_keyword = zhconv_convert(keyword, 'zh-hans')
            if zhhant_keyword != zhhans_keyword:
                chinese_character_list = [zhhant_keyword, zhhans_keyword]
            else:
                chinese_character_list = [zhhant_keyword]
            for cc in chinese_character_list:
                cut_highlight(content, hit, cc, is_segmented_text)
    elif (
        'author' in query_conditions or
        'collection' in query_conditions
    ) and 'or' in query_conditions:
        keyword_list = query_conditions['or']
        keyword_list = extend_chinese_keywords(keyword_list, query_conditions)
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(
                content, hit, keyword, is_segmented_text)
    elif (
        'author' in query_conditions or
        'collection' in query_conditions
    ) and 'and' in query_conditions:
        keyword_list = query_conditions['and']
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(
                content, hit, keyword, is_segmented_text)
    elif (
        not is_chinese(query) and
        constant.OPERATOR_OR in query and
        constant.CMD_LANG not in query
    ):
        keyword_list = query.split(constant.OPERATOR_OR)
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(
                content, hit, keyword, is_segmented_text)
    elif (
        not is_chinese(query) and
        constant.OPERATOR_AND in query and
        constant.CMD_LANG not in query
    ):
        keyword_list = query.split(constant.OPERATOR_AND)
        for keyword in keyword_list:
            highlight_by_multiple_possible_keyword(
                content, hit, keyword, is_segmented_text)
    elif constant.CMD_LANG in query:
        lang_param = extract_lang_param(query)
        if len(lang_param) == 2:
            keyword_list = []
            keyword = lang_param[1]
            if constant.OPERATOR_OR in keyword:
                keyword_list = keyword.split(constant.OPERATOR_OR)
            elif constant.OPERATOR_AND in keyword:
                keyword_list = keyword.split(constant.OPERATOR_AND)
            else:
                keyword_list.append(keyword)
            for keyword in keyword_list:
                highlight_by_multiple_possible_keyword(
                    content, hit, keyword, is_segmented_text)
    else:
        highlight_by_multiple_possible_keyword(
            content, hit, query, is_segmented_text)


def extend_chinese_keywords(keyword_list, query_conditions):
    keywords = []
    for keyword in query_conditions['or']:
        if is_chinese(keyword):
            keywords.extend([
                zhconv_convert(keyword, 'zh-hant'),
                zhconv_convert(keyword, 'zh-hans')
            ])
    keyword_list.extend(keywords)
    keyword_list = list(set(keyword_list))
    return keyword_list


def highlight_by_multiple_possible_keyword(
    content,
    hit,
    keyword,
    is_segmented_text
):
    possible_word_list = [f'{keyword}']
    for word in possible_word_list:
        cut_highlight(content, hit, word, is_segmented_text)
        if hit['highlight']['content']:
            break


def remove_punctuation(text):
    punctuation = string.punctuation.replace(":", "").replace(".", "")
    translator = str.maketrans("", "", punctuation)
    return text.translate(translator)


def cut_highlight(content, hit, query, is_segmented_text):
    content = remove_punctuation(content)
    query = remove_punctuation(query)
    if is_segmented_text:
        highlight_segmented_text(content, query, hit)
    else:
        positions = []
        if is_chinese(query):
            positions = [m.start() for m in re.finditer(query, content, re.I)]
        else:
            positions = [m.start() for m in re.finditer(
                r"\b" + query + r"\b", content, re.I)]
            if not positions and (is_pali(content.lower()) or is_pali(query.lower())):
                positions = search_string(query, content)

        if content is not None and positions:
            highlight = ''
            for position in positions[:3]:
                if is_chinese(query):
                    paragraph = find_paragraph(content, position)
                    if len(paragraph) > 300:
                        sentences = find_chinese_sentences_with_keyword(paragraph, query)
                        highlight = ' '.join(sentences) or paragraph
                    else:
                        highlight = paragraph
                elif hit['is_bilara_text']:
                    paragraph = find_paragraph(content, position)
                    parts = paragraph.split(":")
                    if len(parts) > 1:
                        segmented_id = parts[0]
                        segmented_id_anchor_tag = generate_segmented_id_anchor_tag(hit, segmented_id)
                        highlight = segmented_id_anchor_tag + parts[1] + '<br/>'
                else:
                    paragraph = find_paragraph(content, position)
                    sentences = find_sentences_with_keyword(paragraph, query)
                    highlight = ' '.join(sentences) or paragraph
                    highlight = f'{highlight}'

                matching_string = content[position:position + len(query)]
                highlight = re.sub(
                    matching_string,
                    f'<strong class="highlight">{matching_string}</strong>',
                    highlight,
                    flags=re.I
                )
                hit['highlight']['content'].append(highlight)
                hit['highlight']['content'] = list(set(hit['highlight']['content']))


def normalize_string(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s)
                   if unicodedata.category(c) != 'Mn')


def search_string(query, content):
    normalized_query = normalize_string(query)
    normalized_content = normalize_string(content)
    matches = re.finditer(r'\b' + normalized_query + r'\b', normalized_content, re.I)
    return [match.start() for match in matches]


def extract_number(html):
    match = re.search(r'<span class="reference">(\d+\.\d+)</span>', html)
    if match:
        number = match[1]
        before_dot, after_dot = str(number).split('.')
        try:
            return int(before_dot), int(after_dot)
        except ValueError:
            return 0, 0
    else:
        return 0, 0


def generate_segmented_id_anchor_tag(hit, segmented_id):
    link = ''
    if hit["author_uid"]:
        link = f'/{hit["uid"]}/{hit["lang"]}/{hit["author_uid"]}#{segmented_id}'
    else:
        link = f'/{hit["uid"]}'
    return (
        '<a target="_blank" '
        f'href="{link}" '
        f'id="{segmented_id}">'
        f'<span class="reference">{segmented_id}</span>'
        '</a>'
    )


def highlight_segmented_text(content, query, hit):
    highlight = content
    highlight_ascii = unidecode(content)
    query_ascii = unidecode(query)
    start, end = get_matched_string_position(query_ascii, highlight_ascii)
    if start != -1 and end != 0:
        matching_string = highlight_ascii[start:end]
        highlight = re.sub(
            matching_string,
            f'<strong class="highlight">{matching_string}</strong>',
            highlight,
            flags=re.I
        )

        if 'class="highlight"' not in highlight and (is_pali(content.lower()) or is_pali(query.lower())):
            matching_string = highlight[start:end]
            highlight = re.sub(
                matching_string,
                f'<strong class="highlight">{matching_string}</strong>',
                highlight,
                flags=re.I
            )

    if 'class="highlight"' in highlight:
        segmented_id_anchor_tag = ""
        if (
            "segmented_uid" in hit and
            "uid" in hit and
            "lang" in hit and
            "author_uid" in hit
        ):
            parts = hit["segmented_uid"].split(":") if hit["segmented_uid"] else []
            if len(parts) > 1:
                segmented_id = parts[1]
                segmented_id_anchor_tag = generate_segmented_id_anchor_tag(hit, segmented_id)
        hit['highlight']['content'].append(segmented_id_anchor_tag + highlight + '<br/>')
    else:
        hit['highlight']['content'].append(highlight)


def get_matched_string(query, highlight):
    pattern = re.escape(query)
    matching_string = re.search(pattern, highlight, re.IGNORECASE)
    matching_string = matching_string.group() if matching_string else query
    return matching_string


def get_matched_string_position(query, highlight):
    pattern = re.escape(query)
    matching_string = re.search(pattern, highlight, re.IGNORECASE)
    if matching_string is None:
        return -1, 0
    return matching_string.start(), matching_string.end()


def is_pali(content):
    vowels = ['ṁ', 'ā', 'ī', 'ū', 'ṅ', 'ḷ', 'ṭ', 'ň', 'ñ', 'ṣ']
    return any(vowel.lower() in content for vowel in vowels)


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
        A list of strings consisting of natural sentences
        containing the given keywords.
    """
    sentence_list = re.split(r'[.!?]+', input_string)
    return [
        f'{sentence.strip()}<br/>'
        for sentence in sentence_list
        if keyword in sentence
    ]


def find_chinese_sentences_with_keyword(input_string, keyword):
    """
        Find natural chinese sentences containing the given keyword
        from a string.

        parameter:
        input_string: string, the sentence to find
        keyword: string, the keyword to find

        return value:
        A list of strings consisting of natural sentences
        containing the given keywords.
    """
    sentence_list = re.split(r'[。！？]+', input_string)
    return [
        f'{sentence.strip()}<br/>'
        for sentence in sentence_list
        if keyword in sentence
    ]


def compute_url(hit):
    if 'author_uid' in hit and hit['author_uid'] is not None:
        hit['url'] = f'/{hit["uid"]}/{hit["lang"]}/{hit["author_uid"]}'
    else:
        hit['url'] = f'/{hit["uid"]}'


def lookup_dictionary(hits, lang, query, restrict):
    if not restrict or restrict == 'dictionaries':
        if dictionary_result := dictionaries.search(query, lang):
            hits.insert(0, dictionary_result)


def fuzzy_lookup_dictionary(lang, query, restrict):
    if not restrict or restrict == 'dictionaries':
        if fuzzy_dictionary_result := dictionaries.fuzzy_search(query, lang):
            return fuzzy_dictionary_result
        else:
            return []


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
    uids = list({item['uid'] for item in hits})
    suttaplexs = []
    for uid in uids:
        bind_vars = {
            'uid': uid,
            'language': lang
        }
        suttaplex = list(db.aql.execute(SUTTAPLEX_LIST, bind_vars=bind_vars))[0]
        suttaplexs.append(suttaplex)
    return suttaplexs


def fetch_suttaplexs_by_name(db, lang, name, selected_languages, matchpartial):
    name_exclude_sutta = name
    if 'sutta' in name:
        name_exclude_sutta = name.replace('sutta', '').strip()

    if matchpartial == 'true':
        AQL = POSSIBLE_SUTTA_BY_NAME
        bind_vars={
            'name': name_exclude_sutta,
            'lang': lang,
            'name_like_pattern': f"%{name.lower()}%",
            'selected_languages': selected_languages
        }
    else:
        AQL = POSSIBLE_SUTTA_BY_NAME_EXACT_MATCH
        bind_vars={
            'name': name_exclude_sutta,
            'lang': lang,
            'selected_languages': selected_languages
        }

    possible_uids = list(
        list(
            db.aql.execute(
                AQL,
                bind_vars=bind_vars
            )
        )
    )

    possible_uids.extend(
        list(db.aql.execute(
            POSSIBLE_SUTTA_BY_NAME_EXACT_MATCH,
            bind_vars={
                'name': f'{name_exclude_sutta}sutta',
                'lang': lang,
                'selected_languages': selected_languages
            }
        ))
    )
    possible_uids = list(set(possible_uids))

    name_ascii = unidecode(name_exclude_sutta.lower())
    suttaplexs = []
    for uid in possible_uids:
        suttaplex = list(db.aql.execute(
            SUTTAPLEX_LIST,
            bind_vars={'uid': uid, 'language': lang}
        ))[0]
        if (
            suttaplex and
            'translated_title' in suttaplex and
            'original_title' in suttaplex and
            name_exclude_sutta and
            suttaplex['translated_title'] and
            suttaplex['original_title'] and
            (
                name_exclude_sutta.lower() in suttaplex['translated_title'].lower() or
                name_exclude_sutta.lower() in suttaplex['original_title'].lower() or
                name_ascii in unidecode(suttaplex['translated_title'].lower()) or
                name_ascii in unidecode(suttaplex['original_title'].lower())
            ) and suttaplex['translations']
        ):
            suttaplexs.append(suttaplex)

    return sorted(suttaplexs, key=custom_sort)


def custom_sort(obj):
    uid = obj["uid"]
    return (0, uid) if uid.startswith(("dn", "mn", "sn", "an")) else (1, uid)


def is_chinese(uchar):
    return u'\u4e00' <= uchar <= u'\u9fa5'


def is_chinese_ex(query_conditions):
    keyword_list = []
    if 'or' in query_conditions:
        keyword_list = query_conditions['or']
    if 'and' in query_conditions:
        keyword_list = query_conditions['and']
    return any(is_chinese(keyword) for keyword in keyword_list)


def extract_query_conditions(param):
    param = re.sub(r'(\w+): ', r'\1:', param)
    result = {}
    author = re.search(f"{constant.CMD_AUTHOR}([\w-]+)", param) or re.search(f"{constant.CMD_BY}([\w-]+)", param)
    if author:
        result["author"] = author[1].strip()
    collection = re.search(f"{constant.CMD_IN}([\w-]+)", param)
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
    """
    Note:
        This assumes only a single author filter is specified.  This function
        will silently clobber any additional author filters.  Ditto for
        collection.  Update extract_query_conditions if/when we want to handle
        multiple authors or collections, or raise an error when #2978 exists.
    """
    rest_param = ''
    param_tokens = param.split()
    for term in param.split():
        if (term.startswith(constant.CMD_AUTHOR) or term.startswith(constant.CMD_BY)) or term.startswith(constant.CMD_IN):
            param_tokens.remove(term)
    rest_param = ' '.join(param_tokens)

    if 'OR' in rest_param:
        operator = constant.OPERATOR_OR
        _extract_params_by_operator(rest_param, operator, result, "or")
    elif 'AND' in rest_param:
        operator = constant.OPERATOR_AND
        _extract_params_by_operator(rest_param, operator, result, "and")
    elif 'NOT' in rest_param:
        or_param_list = [rest_param.split('NOT')[0].strip()]
        not_param_list = [rest_param.split('NOT')[1].strip()]
        result["or"] = or_param_list
        result["not"] = not_param_list
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
    roman_dict = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    result = 0
    for i in range(len(roman)):
        if (
            i == len(roman) - 1 or
            roman_dict[roman[i].upper()] >= roman_dict[roman[i + 1].upper()]
        ):
            if roman[i].upper() in roman_dict:
                result += roman_dict[roman[i].upper()]
        elif roman[i].upper() in roman_dict:
            result -= roman_dict[roman[i].upper()]
    return result


def standardization_volpage(volpage):
    parts = volpage.split()
    if len(parts) < 3:
        return volpage
    parts[0] = "PTS "
    parts[1] = roman_to_int(parts[1])
    parts[2] = f".{parts[2]}"
    return "{}{}{}".format(*parts)


def extract_lang_param(query_string):
    chunks = re.split(f"({constant.CMD_LANG}[a-z]+)\\s+", query_string)
    chunks = [c for c in chunks if c]
    return [c[len(constant.CMD_LANG):] if c.startswith(constant.CMD_LANG) else c for c in chunks]


def extract_not_param(query_string):
    if not_match := re.search(r'NOT\s(\w+)', query_string):
        return not_match[1]
    else:
        return None


def fetch_supported_languages_iso_code():
    db = get_db()
    return list(db.aql.execute(ALL_LANGUAGES_ISO_CODE))
