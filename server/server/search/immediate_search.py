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
    LET ebt_prefixes = ["dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an", "ea", "ea-2", "kp", "iti", "ud", "snp",
                "dhp", "thig", "thag", "pli-tv", "lzh-mg", "lzh-mi", "lzh-dg", "lzh-sarv", "lzh-mu", "lzh-ka",
                "lzh-upp", "san-mg", "san-lo", "up", "t25", "t24", "t23", "t22", "t21", "t20", "t19", "t18", "t17",
                "t16", "t15", "t14", "t13", "t12", "t11", "t10", "t9", "t8", "t7", "t6", "t5", "t4", "t3", "t2",
                "t98", "t97", "t96", "t95", "t94", "t93", "t92", "t91", "t90", "t89", "t88", "t87", "t86", "t85",
                "t84", "t83", "t82", "t81", "t80", "t79", "t78", "t77", "t76", "t75", "t74", "t73", "t72", "t71",
                "t70", "t69", "t68", "t67", "t66", "t65", "t64", "t63", "t62", "t61", "t60", "t59", "t58", "t57",
                "t56", "t55", "t54", "t53", "t52", "t51", "t50", "t49", "t48", "t47", "t46", "t45", "t44", "t43",
                "t42", "t41", "t40", "t39", "t38", "t37", "t36", "t35", "t34", "t33", "t32", "t31", "t30", "t29",
                "t28", "t27", "t124", "t123", "t122", "t121", "t120", "t119", "t118", "t117", "t116", "t115",
                "t114", "t113", "t112", "t111", "t110", "t109", "t108", "t107", "t106", "t105", "t104", "t103",
                "t102", "t151", "t150b", "t149", "t148", "t147", "t146", "t145", "t144", "t143", "t142b", "t142a",
                "t141", "t140", "t139", "t138", "t137", "t136", "t135", "t134", "t133", "t132b", "t132a", "t131",
                "t130", "t129", "t128b", "t128a", "t127", "t126", "xct-mu-kd-eimer", "d974", "d617", "d338",
                "d337", "d331", "d316", "d313", "d300", "d297", "d296", "d294", "d293", "d292", "d291", "d290",
                "d211", "d42", "d41", "d38", "d34", "d33", "d31", "d6", "d3", "d1"]

    FOR d IN names
        FILTER (d.lang == @lang OR d.is_root == true) AND starts_with(d.uid, ebt_prefixes) AND NOT CONTAINS(d.name, '-name')
    RETURN {
        uid:d.uid,
        title:d.name
    }
'''


def fetch_possible_result(keyword, lang):
    db = get_db()
    uid =f'%{keyword}%'
    # data = list(db.aql.execute(AQL_POSSIBLE_RESULTS, bind_vars={'uid': uid, 'name': keyword, 'lang': lang}))[0]
    data = list(db.aql.execute(AQL_POSSIBLE_RESULTS_BY_LANG, bind_vars={'lang': lang}))
    return data, 200
