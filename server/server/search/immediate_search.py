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
    data = list(db.aql.execute(AQL_POSSIBLE_RESULTS_BY_LANG, bind_vars={'lang': lang}))

    merged_data = {}
    for item in data:
        uid = item["uid"]
        title = item["title"]
        if uid in merged_data:
            is_root = item["isRoot"]

            if is_root:
                merged_data[uid]["title"] = f"{title}-" + merged_data[uid]["title"]
            else:
                merged_data[uid]["title"] += f"-{title}"
        else:
            merged_data[uid] = {"uid": uid, "title": title, "nodeType": item['nodeType']}

    merged_list = list(merged_data.values())

    return merged_list, 200
