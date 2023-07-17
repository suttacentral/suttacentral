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
        FILTER d.is_segmented != True
        LIMIT 10
    RETURN {
        uid:d.uid,
        title:d.name
    }
)

RETURN UNION(possible_uids, possible_names)
'''


def fetch_possible_result(keyword):
    db = get_db()
    uid =f'%{keyword}%'
    data = list(db.aql.execute(AQL_POSSIBLE_RESULTS, bind_vars={'uid': uid, 'name': keyword}))[0]
    return data, 200