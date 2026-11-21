from common.arangodb import get_db
from zhconv import convert as zhconv_convert
import re
from common.queries import SUTTAPLEX_LIST
from search import dictionaries, constant
from unidecode import unidecode
import unicodedata
import string

from search.chinese import is_chinese, extend_chinese_keywords, find_chinese_sentences_with_keyword
from search.query_aql import extract_query_conditions, extract_lang_param, \
    construct_search_query_aql
from search.validate_filter import validate_filter_commands

INSTANT_SEARCH_VIEW = 'instant_search'

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

ROOT_NAMES = '''
For n IN names
FILTER n.uid in @uids AND n.is_root == true
RETURN {
    uid: n.uid,
    name: n.name,
}
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
    query = sanitize_quoted_query(query)

    validation_result = validate_filter_commands(query)
    if not validation_result['is_valid']:
        return {
            'total': 0,
            'hits': [],
            'suttaplex': [],
            'fuzzy_dictionary': [],
            'error': {
                'type': validation_result['error_type'],
                'message': validation_result['error_message'],
                'suggestions': validation_result['suggestions']
            }
        }

    query = normalize_filter_commands(query)
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
        hits = simplify_results(hits)
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
    return fuzzy_dictionary_entries, hits, suttaplexs, total


def normalize_filter_commands(query):
    """
    Convert filter commands in queries to lowercase to make them case insensitive

    Args:
        query (str): Raw query string

    Returns:
        str: Normalized query string
    """
    # Defines all supported filter commands
    filter_commands = [
        'VOLPAGE:', 'BY:', 'TITLE:', 'LANG:',
        'REF:', 'IN:'
    ]

    normalized_query = query

    for cmd in filter_commands:
        # Use regular expressions to perform case-insensitive replacement
        pattern = re.compile(re.escape(cmd), re.IGNORECASE)
        normalized_query = pattern.sub(cmd.lower(), normalized_query)

    return normalized_query


def simplify_results(hits):
    """
    Remove duplicate search results, and give priority to keeping the bilara_text version
    Args:
        hits: A list of search results, each element contains the uid and is_bilara_text fields
    Returns:
        Search results list after deduplication
    """
    seen_uids = {}
    simplified_hits = []

    for hit in hits:
        uid = hit['uid']
        if uid not in seen_uids:
            seen_uids[uid] = len(simplified_hits)
            simplified_hits.append(hit)
        else:
            existing_index = seen_uids[uid]
            existing_hit = simplified_hits[existing_index]

            hit_is_bilara = hit.get('is_bilara_text', False)
            existing_is_bilara = existing_hit.get('is_bilara_text', False)

            if hit_is_bilara and not existing_is_bilara:
                simplified_hits[existing_index] = hit

    return simplified_hits


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


def fetch_record_count(collection, condition, query):
    aql = f'''
        LET record_count = (FOR d IN {collection}
        {condition}
        COLLECT WITH COUNT INTO length
        RETURN length)[0]

        RETURN record_count
    '''
    return list(get_db().aql.execute(aql, bind_vars={"query": query}))[0]


def fetch_children_by_uid(uid):
    db = get_db()
    query = (
        "FOR doc IN 1..1 OUTBOUND DOCUMENT('super_nav_details', @uid) "
        "super_nav_details_edges RETURN doc.uid"
    )
    bind_vars = {'uid': uid}

    return list(db.aql.execute(query, bind_vars))


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


def sanitize_quoted_query(query):
    """
    Safely handle quotes in query strings, removing them only if the string
    both starts and ends with matching quotes.

    Args:
        query (str): The query string entered by the user

    Returns:
        str: Processed query string
    """

    if len(query) < 2:
        return query

    quote_pairs = {
        "'": "'",
        "‘": "’",
        '"': '"',
        '“': '“',
        '「': '」',
        '『': '』',
        '«': '»',
        '„': '"',
        '〈': '〉',
        '《': '》',
        '﴾': '﴿'
    }

    first_char = query[0]
    if first_char in quote_pairs:
        # If it starts with a quote, check if it ends with a matching quote
        matching_end_quote = quote_pairs[first_char]
        if query[-1] == matching_end_quote:
            return query[1:-1]  # Remove the opening and closing quotes

    # If the condition is not met, return to the original query
    return query
