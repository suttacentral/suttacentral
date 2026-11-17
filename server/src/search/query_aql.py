import re

from unidecode import unidecode
from zhconv import convert as zhconv_convert

from common.arangodb import get_db
from search import constant
from search.chinese import is_chinese_ex, extend_chinese_keywords, is_chinese

AQL_INSTANT_SEARCH_FIRST_PART = 'FOR d IN instant_search '

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

ALL_LANGUAGES_ISO_CODE = '''
FOR l IN language RETURN l.iso_code
'''


def extract_query_conditions(param):
    param = re.sub(r'(\w+): ', r'\1:', param)
    result = {}
    author = re.search(f"{constant.CMD_BY}([\w-]+)", param)
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
        if term.startswith(constant.CMD_BY) or term.startswith(constant.CMD_IN):
            param_tokens.remove(term)
    rest_param = ' '.join(param_tokens)

    # if (
    #     not rest_param.startswith("'")
    #     and not rest_param.startswith('"')
    #     and 'OR' not in rest_param
    #     and 'AND' not in rest_param
    #     and 'NOT' not in rest_param
    #     and ' ' in rest_param
    # ):
    #     rest_param = rest_param.replace(' ', ' AND ')

    # if (rest_param.startswith("'") or rest_param.startswith('"')):
    #     rest_param = rest_param[1:-1]

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


def format_volpage(volpage):
    return re.sub(r'[^a-zA-Z0-9]', ' ', volpage)


def standardization_volpage(volpage):
    parts = volpage.split()
    if len(parts) < 3:
        return volpage
    parts[0] = "PTS "
    parts[1] = roman_to_int(parts[1])
    parts[2] = f".{parts[2]}"
    return "{}{}{}".format(*parts)


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


def prepare_and_generate_aql_for_reference_filter(search_aql, aql_condition_part, query_param):
    if query_param['query'].startswith(constant.CMD_REFERENCE):
        query = query_param['query'][len(constant.CMD_REFERENCE):].strip()
        search_aql = generate_aql_for_reference_filter(query)
        query_param['query'] = query
    return query_param, search_aql, aql_condition_part


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


def get_filter_part_for_aql(matchpartial):
    return ' FILTER d.is_segmented == True ' if matchpartial == 'true' else ' FILTER d.is_segmented != True  '


def get_limit_part_for_aql(limit, offset):
    return f'LIMIT {offset}, {limit}'


def get_lang_condition_for_aql(selected_languages):
    if isinstance(selected_languages, list) and len(selected_languages) > 0:
        return f' AND (d.lang IN {selected_languages} OR d.is_root==null) '
    else:
        return ''


def get_sort_part_for_aql():
    return '''SORT
        d.lang == @lang ? -1 : 1,
        d.is_ebt == true ? -1 : d.is_ebt == false ? 1 : 0,
        d.is_bilara == true ? -1 : 1,
        d.is_segmented == false ? -1 : 1,
        REGEX_REPLACE(d.uid, "([a-z-]+).*", "$1"),
        // handling e.g. pli-tv-bu-vb-pj1 or pli-tv-pj1 UID with variable number of parts
        REGEX_TEST(d.uid, "^[a-z]+(?:-[a-z-]+)+\\d+$") ?
            TO_NUMBER(REGEX_REPLACE(d.uid, "^[a-z]+(?:-[a-z-]+)+(\\d+)$", "$1")) :

        // Processing the numeric portion of a standard UID
        LENGTH(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '.')) == 0 ? 0 :
            TO_NUMBER(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '.')[0]),
        LENGTH(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '.')) <= 1 ? 0 :
            TO_NUMBER(REGEX_REPLACE(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '.')[1], "([0-9]+).*", "$1")),
        LENGTH(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '.')) <= 2 ? 0 :
            TO_NUMBER(REGEX_REPLACE(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '.')[2], "([0-9]+).*", "$1"))
    '''


def get_not_part_for_aql(keyword):
    return f' AND NOT (PHRASE(d.content, "{keyword}", "common_text") OR ' \
           f'PHRASE(d.name,  "{keyword}", "common_text") OR ' \
           f'd.uid ==  "{keyword}" OR ' \
           f'ANALYZER(LIKE(d.segmented_text, "%{keyword.lower()}%"), "normalize") OR ' \
           f'ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword.lower())}%"), "normalize") OR ' \
           f'LIKE(d.segmented_text, "%{keyword}%")) '


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


def generate_conditions(query_conditions, operator):
    conditions = []
    if operator in query_conditions:
        keyword_list = query_conditions[operator]
        for keyword in keyword_list:
            zh_hant_keyword = zhconv_convert(keyword, 'zh-hant')
            zh_hans_keyword = zhconv_convert(keyword, 'zh-hans')
            conditions.append(f'(CONTAINS(cjk_tokens, "{zh_hant_keyword}") OR CONTAINS(cjk_tokens, "{zh_hans_keyword}"))')
    return conditions


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


def add_in_article_condition_to_aql():
    return 'FILTER (d.is_article == true AND d.uid != "interface") '


def add_in_ebct_condition_to_aql():
    return 'FILTER (d.is_ebct == true) '


def add_in_ebt_condition_to_aql():
    return 'FILTER (d.is_ebt == true) '


def add_in_ebs_condition_to_aql():
    return 'FILTER (d.is_ebs == true) '


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


def add_author_condition_to_aql(condition_combination):
    if 'author' not in condition_combination:
        return ''
    author = condition_combination['author']
    return f'AND (d.author_uid == "{author}") '


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


def extract_not_param(query_string):
    if not_match := re.search(r'NOT\s(\w+)', query_string):
        return not_match[1]
    else:
        return None


def extract_lang_param(query_string):
    chunks = re.split(f"({constant.CMD_LANG}[a-z]+)\\s+", query_string)
    chunks = [c for c in chunks if c]
    return [c[len(constant.CMD_LANG):] if c.startswith(constant.CMD_LANG) else c for c in chunks]


def generate_aql_for_and_operator(keywords, query_param):
    contains_special_command = any(cmd in query_param['query'] for cmd in [
        constant.CMD_LIST_AUTHORS, constant.CMD_VOLPAGE, constant.CMD_IN,
        constant.CMD_AUTHOR, constant.CMD_BY, constant.CMD_TITLE,
        constant.CMD_LANG, constant.CMD_REFERENCE, constant.CMD_LIST
    ])

    contains_special_operator = any(op in query_param['query'] for op in [
        constant.OPERATOR_NOT, constant.OPERATOR_AND, constant.OPERATOR_OR
    ])

    if contains_special_command or contains_special_operator:
        aql_condition_part = '''
        SEARCH @query == 1 OR
        '''
    else:
        aql_condition_part = '''
        SEARCH PHRASE(d.content, @query, "common_text") OR
        '''

    keyword_conditions = []
    for keyword in keywords:
        keyword_clean = keyword.split(constant.OPERATOR_NOT)[0].strip() if constant.OPERATOR_NOT in keyword else keyword

        condition = (
            f'(PHRASE(d.content, "{keyword_clean}", "common_text") OR '
            f'ANALYZER(LIKE(d.segmented_text, "%{keyword_clean.lower()}%"), "normalize")'
        )

        if unidecode(keyword_clean.lower()) != keyword_clean.lower() and not is_chinese(keyword_clean):
            condition += f' OR ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword_clean.lower())}%"), "normalize")'

        condition += ')'
        keyword_conditions.append(condition)

    if keyword_conditions:
        aql_condition_part += ' AND '.join(keyword_conditions)

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


def generate_aql_for_multi_keyword(keywords, query_param):
    """
    Generate AQL query conditions based on multiple keywords

    parameters:
        keywords (list): Keyword list
        query_param (dict): Query parameter dictionary

    returns:
        tuple: (Complete AQL query, AQL condition part)
    """

    contains_special_command = any(cmd in query_param['query'] for cmd in [
        constant.CMD_LIST_AUTHORS, constant.CMD_VOLPAGE, constant.CMD_IN,
        constant.CMD_BY, constant.CMD_TITLE,
        constant.CMD_LANG, constant.CMD_REFERENCE, constant.CMD_LIST
    ])

    contains_special_operator = any(op in query_param['query'] for op in [
        constant.OPERATOR_NOT, constant.OPERATOR_AND, constant.OPERATOR_OR
    ])

    if contains_special_command or contains_special_operator:
        aql_condition_part = 'SEARCH @query == 1 OR '
    else:
        aql_condition_part = 'SEARCH PHRASE(d.content, @query, "common_text") OR\n'

    keyword_conditions = []
    for keyword in keywords:
        keyword_clean = keyword.split(constant.OPERATOR_NOT)[0].strip() if constant.OPERATOR_NOT in keyword else keyword

        condition = (
            f'(PHRASE(d.content, "{keyword_clean}", "common_text") OR '
            f'ANALYZER(LIKE(d.segmented_text, "%{keyword_clean.lower()}%"), "normalize")'
        )

        if unidecode(keyword_clean.lower()) != keyword_clean.lower() and not is_chinese(keyword_clean):
            condition += f' OR ANALYZER(LIKE(d.segmented_text, "%{unidecode(keyword_clean.lower())}%"), "normalize")'

        condition += ')'
        keyword_conditions.append(condition)

    if keyword_conditions:
        aql_condition_part += ' OR '.join(keyword_conditions)

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


def fetch_supported_languages_iso_code():
    db = get_db()
    return list(db.aql.execute(ALL_LANGUAGES_ISO_CODE))


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


def construct_search_query_aql(
    limit,
    matchpartial,
    offset,
    query,
    query_param,
    selected_languages
):
    '''
    if ':' not in query_param['query'] and not query_param['query'].startswith(constant.CMD_LIST):
        if (
            not query_param['query'].startswith("'")
            and not query_param['query'].startswith('"')
            and 'OR' not in query_param['query']
            and 'AND' not in query_param['query']
            and 'NOT' not in query_param['query']
            and ' ' in query_param['query']
        ):
            keyword_count = query_param['query'].count(' ')
            # Limit the AND keyword to prevent high CPU usage
            if keyword_count < 4:
                query_param['query'] = query_param['query'].replace(' ', ' AND ')
                query = query.replace(' ', ' AND ')

        if (query_param['query'].startswith("'") or query_param['query'].startswith('"')):
            query_param['query'] = query_param['query'][1:-1]
            query = query[1:-1]
    '''

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
