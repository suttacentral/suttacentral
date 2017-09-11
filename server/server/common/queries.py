LANGUAGES = '''FOR l in language
                RETURN {"_rev": l._rev, "uid": l.uid, "name": l.name, "iso_code": l.iso_code}'''

TEXTS_BY_LANG = '''
FOR text IN html_text
        FILTER text.lang == @lang
        LET root_lang = (
            RETURN DOCUMENT(CONCAT('root/', text.uid)).root_lang
        )[0]
        RETURN {text: text.text, uid: text.uid, mtime: text.mtime, root_lang: root_lang}
'''

CURRENT_MTIMES = '''
FOR text IN html_text
    FILTER text.lang == @lang
    RETURN {uid: text.uid, mtime: text.mtime}
'''


MENU = '''
FOR pit IN pitaka
    SORT pit.num
    FOR vv, ee, pp IN OUTBOUND pit `root_edges`
        FILTER ee._to LIKE 'grouping/%'
        FOR v, e, p IN 0..5 OUTBOUND vv `root_edges`
            FILTER e.type != 'text'
            RETURN {
                from: IS_NULL(e._from) ? {uid: ee._from, name: pit.name} : e._from,
                name: v.name,
                id: v._id
            }
'''
