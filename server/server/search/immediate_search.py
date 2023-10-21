from common.arangodb import get_db


AQL_POSSIBLE_RESULTS_BY_LANG = '''
    LET ebs_prefixes = ["dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an", "ea", "ea-2", "kp", "iti", "ud", "snp",
                "dhp", "thig", "thag", "sf"]

    FOR d IN names
        FILTER (d.lang == @lang OR d.is_root == true)
        LET navigation_doc = DOCUMENT('super_nav_details', d.uid)
        LET path_docs = (
            FOR doc IN 1..10 INBOUND DOCUMENT('super_nav_details', d.uid) super_nav_details_edges OPTIONS {order: 'dfs'}
                RETURN doc.uid
        )
        LET root_uid = REVERSE(
            FOR item IN path_docs
            FILTER CONTAINS(d.uid, item)
            RETURN item
        )[0]
        FILTER root_uid IN ebs_prefixes OR d.uid IN ebs_prefixes
    RETURN {
        uid: d.uid,
        title: d.name,
        isRoot: d.is_root,
        nodeType: navigation_doc.type
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
