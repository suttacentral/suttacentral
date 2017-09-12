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

_MAX_NESTING_LEVEL = 5

MENU = f'''
FOR pit IN pitaka
    SORT pit.num
    FOR group, group_edge, group_path IN OUTBOUND pit `root_edges`
        FILTER group_edge._to LIKE 'grouping/%'
        FOR v, e, p IN 0..{_MAX_NESTING_LEVEL} OUTBOUND group `root_edges`
            FILTER e.type != 'text'
            RETURN {{
                from: IS_NULL(e._from) ? {{uid: group_edge._from, name: pit.name}} : e._from,
                name: v.name,
                id: v._id
            }}
'''


# Takes 2 bind_vars: `language` and `uid` of root element
SUTTAPLEX_LIST = '''
FOR v, e, p IN 1..6 OUTBOUND @uid `root_edges` OPTIONS {bfs: true}
    LET legacy_translations = (
        FILTER e.type == 'text'
        LET path = CONCAT(@language, '/', v.uid)
        FOR text IN html_text
            FILTER text.path == path
            RETURN {
                title: text.name,
                author: text.author,
                id: text._key
            }
        )
    LET po_translations = (
        FOR text IN po_strings
            FILTER text.uid == v.uid AND text.lang == @language
            RETURN {
                author: text.author,
                title: text.strings[1][1],  // Temporary hack, we have to wait for Blake to finnish data manipulation.
                id: text._key
            }
    )
        
    RETURN {
        uid: v.uid,
        original_title: v.name,
        type: e.type,
        from: e._from,
        translations: FLATTEN([po_translations, legacy_translations])
    }
'''
