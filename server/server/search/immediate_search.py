from common.arangodb import get_db


AQL_POSSIBLE_RESULTS_BY_LANG = '''
    FOR d IN ebs_names
        FILTER (d.lang == @lang OR d.is_root == true)
    RETURN {
        uid: d.uid,
        title: d.name,
        isRoot: d.is_root,
        nodeType: d.node_type
    }
'''


def fetch_possible_result(lang):
    """
    Fetches possible results based on the specified language.

    Args:
        lang (str): The language to fetch results for.

    Returns:
        list: A list of merged results.
        int: The HTTP status code.
    """
    db = get_db()
    query = db.aql.execute(
        AQL_POSSIBLE_RESULTS_BY_LANG,
        bind_vars={'lang': lang}
    )
    data = list(query)

    merged_data = {}
    for item in data:
        uid = item["uid"]
        title = item["title"]
        if uid in merged_data:
            is_root = item["isRoot"]

            if is_root:
                merged_data[uid]["title"] = (
                    f"{title}-" + merged_data[uid]["title"]
                )
            else:
                merged_data[uid]["title"] += f"-{title}"
        else:
            merged_data[uid] = {
                "uid": uid,
                "title": title,
                "nodeType": item['nodeType']
            }

    merged_list = list(merged_data.values())

    return merged_list, 200


def fulltext_search(query):
    db = get_db()
    aql_fulltext_search = '''
        FOR d IN segmented_text_instant_search
    '''
    aql_fulltext_search += (
        f'SEARCH PHRASE(d.segmented_Text, "{query}", "common_text") OR '
        f'LIKE(d.segmented_text, "%{query}%")'
    )
    aql_fulltext_search += '''
    FILTER d.is_ebs == true
    LIMIT 60
    return {
        uid: d.uid,
        acronym: d.acronym,
        name: d.name,
        lang: d.lang,
        author: d.author,
        author_uid: d.author_uid,
        is_root: d.is_root,
        segmented_uid: d.segmented_uid,
        segmented_text: d.segmented_text,
        root_uid: d.root_uid
    }
    '''
    data = list(db.aql.execute(aql_fulltext_search))
    seen = set()
    result = []
    for item in data:
        key = (item['uid'], item['author_uid'])
        if key not in seen:
            seen.add(key)
            result.append(item)

    if len(result) > 15:
        result = result[:15]

    return result
