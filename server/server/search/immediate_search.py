from common.arangodb import get_db


AQL_POSSIBLE_RESULTS = '''
LET possible_uids = (
    FOR doc IN super_nav_details
        FILTER doc.uid like @uid
        LIMIT 10
        RETURN {
            uid:doc.uid,
            title:doc.name
        }
)

LET possible_names = (
    FOR d IN instant_search
        SEARCH PHRASE(d.name, @name, "common_text")
        FILTER d.is_segmented != True AND (d.lang == @lang OR d.lang in (FOR l IN language FILTER l.is_root == true RETURN l.uid))
        LIMIT 10
    RETURN {
        uid:d.uid,
        title:d.name
    }
)

RETURN UNION(possible_uids, possible_names)
'''

AQL_POSSIBLE_RESULTS_BY_LANG = '''
    LET ebs_prefixes = ["dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an", "ea", "ea-2", "kp", "iti", "ud", "snp",
                "dhp", "thig", "thag", "sf"]

    FOR d IN names
        FILTER (d.lang == @lang OR d.is_root == true) AND NOT CONTAINS(d.uid, '-name')
        LET navigation_doc = DOCUMENT('super_nav_details', d.uid)
        LET path_docs = (
            FOR doc IN 1..100 INBOUND DOCUMENT('super_nav_details', d.uid) super_nav_details_edges OPTIONS {order: 'dfs'}
                RETURN doc.uid
        )
        LET root_uid = REVERSE(
            FOR item IN path_docs
            FILTER CONTAINS(d.uid, item)
            RETURN item
        )[0]
        FILTER root_uid in ebs_prefixes
    RETURN {
        uid:d.uid,
        title:d.name,
        isRoot: d.is_root,
        nodeType: navigation_doc.type
    }
'''


def fetch_possible_result(lang):
    db = get_db()
    data = list(db.aql.execute(AQL_POSSIBLE_RESULTS_BY_LANG, bind_vars={'lang': lang}))
    return data, 200
