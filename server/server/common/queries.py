LANGUAGES = '''FOR l in language
                SORT l.name
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
        SORT group.num
        FILTER group_edge._to LIKE 'grouping/%'
        FOR v, e, p IN 0..{_MAX_NESTING_LEVEL} OUTBOUND group `root_edges`
            FILTER e.type != 'text'
            LET lang_num = (
                FOR lang IN language
                    FILTER lang.iso_code == v.root_lang
                    LIMIT 1
                    RETURN lang.num
            )[0]
            RETURN {{
                from: IS_NULL(e._from) ? {{uid: group_edge._from, name: pit.name}} : e._from,
                name: v.name,
                id: v._id,
                num: v.num
            }}
'''


# Takes 2 bind_vars: `language` and `uid` of root element
SUTTAPLEX_LIST = '''
FOR v, e, p IN 0..6 OUTBOUND @uid `root_edges`
    LET legacy_translations = (
        FOR text IN html_text
            FILTER text.uid == v.uid
            LET res = {
                lang: text.lang,
                author: text.author,
                id: text._key,
                segmented: false
                }
            // Add title if it is in desired language
            LET res2 = (text.lang == @language) ? MERGE(res, {title: text.name}) : res 
            // Add volpage info if it exists.
            RETURN (text.volpage != null) ? MERGE(res2, {volpage: text.volpage}) : res
        )

    LET po_translations = (
        FOR text IN po_strings
            FILTER text.uid == v.uid
            SORT text.lang
            LET res = {
                lang: text.lang,
                author: text.author,
                id: text._key,
                segmented: true
            }
            //Text.strings[1][1] is a temporary hack, we have to wait for Blake to finish data manipulation.
            RETURN (text.lang == @language) ? MERGE(res, {title: text.strings[1][1]}) : res
    )
    
    LET blurb = (
        FOR blurb IN blurbs
            FILTER blurb.uid == v.uid
            LIMIT 1
            RETURN blurb.blurb
            
    )[0]
    
    LET volpages = (
        FOR text IN legacy_translations
            FILTER HAS(text, "volpage")
            RETURN text.volpage
    )
    
    LET difficulty = (
        FOR difficulty IN difficulties
            FILTER difficulty.uid == v.uid
            LIMIT 1
            RETURN difficulty.difficulty
    )[0]
    
    LET translations = FLATTEN([po_translations, legacy_translations])
    
    LET translated_titles = (
        FOR translation IN translations
            FILTER translation.lang == @language AND HAS(translation, 'title')
            LIMIT 1
            RETURN translation.title
    )[0]
    
    LET parallel_count = LENGTH(
        FOR rel IN relationship
            FILTER rel._from == v._id
            RETURN rel
    )
    
    LET biblio = (
        FOR biblio IN biblios
            FILTER biblio.uid == v.biblio_uid
            LIMIT 1
            RETURN biblio.text
    )[0]
        
    RETURN {
        acronym: v.acronym,
        volpages: volpages,
        uid: v.uid,
        blurb: blurb,
        difficulty: difficulty,
        original_title: v.name,
        root_lang: v.root_lang,
        type: e.type ? e.type : v.type ? 'grouping' : 'text',
        from: e._from,
        translated_title: translated_titles,
        translations: translations,
        parallel_count: parallel_count,
        biblio: biblio
    }
'''

PARALLELS = '''
FOR v, e, p IN OUTBOUND DOCUMENT(CONCAT('root/', @uid)) `relationship`
    LET target = DOCUMENT(e._to)
    
    LET legacy_translations = (
        FOR text IN html_text
            FILTER text.uid == target.uid
            LET res = {
                lang: text.lang,
                author: text.author,
                id: text._key,
                segmented: false
                }
            // Add title if it is in desired language
            LET res2 = (text.lang == @language) ? MERGE(res, {title: text.name}) : res 
            // Add volpage info if it exists.
            RETURN (text.volpage != null) ? MERGE(res2, {volpage: text.volpage}) : res
        )

    LET po_translations = (
        FOR text IN po_strings
            FILTER text.uid == target.uid
            LET res = {
                lang: text.lang,
                author: text.author,
                id: text._key,
                segmented: true
            }
            //Text.strings[1][1] is a temporary hack, we have to wait for Blake to finish data manipulation.
            RETURN (text.lang == @language) ? MERGE(res, {title: text.strings[1][1]}) : res
    )
    
    LET volpages = (
        FOR text IN legacy_translations
            FILTER HAS(text, "volpage")
            RETURN text.volpage
    )
    SORT e.resembling
    
    LET biblio = (
        FOR biblio IN biblios
            FILTER biblio.uid == v.biblio_uid
            LIMIT 1
            RETURN biblio.text
    )[0]
        
    RETURN {
        from: e.from,
        to: {
            to: e.to,
            volpages: volpages,
            acronym: v.acronym,
            uid: v.uid,
            root_lang: v.root_lang,
            original_title: v.name,
            type: e.type,
            from: e._from,
            biblio: biblio,
            translations: FLATTEN([po_translations, legacy_translations])
        },
        type: e.type,
        remark: e.remark,
        resembling: e.resembling
    }
'''

# Takes 2 bind_vars: `from` and `to`.
DICTIONARIES = '''
FOR dict IN dictionaries
    FILTER dict.from == @from AND dict.to == @to AND dict.lookup == true
    LIMIT 1
    RETURN {
        from: dict.from,
        to: dict.to,
        dictionary: dict.dictionary
    }
'''

# Takes 3 bind_vars: `language`, `uid` and `author`
SUTTA_VIEW = '''
LET root_text = DOCUMENT(CONCAT('root/', @uid))

LET legacy_translations = (
    FOR text IN html_text
        FILTER text.uid == @uid
        LET res = {
            lang: text.lang,
            author: text.author,
            id: text._key,
            segmented: false
            }
        // Add title if it is in desired language
        LET res2 = (text.lang == @language) ? MERGE(res, {title: text.name}) : res 
        // Add volpage info if it exists.
        RETURN (text.volpage != null) ? MERGE(res2, {volpage: text.volpage}) : res
    )

LET po_translations = (
    FOR text IN po_strings
        FILTER text.uid == @uid
        SORT text.lang
        LET res = {
            lang: text.lang,
            author: text.author,
            id: text._key,
            segmented: true
        }
        //Text.strings[1][1] is a temporary hack, we have to wait for Blake to finish data manipulation.
        RETURN (text.lang == @language) ? MERGE(res, {title: text.strings[1][1]}) : res
)

LET blurb = (
    FOR blurb IN blurbs
        FILTER blurb.uid == @uid
        LIMIT 1
        RETURN blurb.blurb
        
)[0]

LET volpages = (
    FOR text IN legacy_translations
        FILTER HAS(text, "volpage")
        RETURN text.volpage
)

LET difficulty = (
    FOR difficulty IN difficulties
        FILTER difficulty.uid == @uid
        LIMIT 1
        RETURN difficulty.difficulty
)[0]

LET legacy_html = (
    FOR html IN html_text
        FILTER html.uid == @uid AND ((html.lang == @language AND LOWER(html.author) == @author) OR html.lang == root_text.root_lang)
        
        RETURN {
            uid: html.uid,
            lang: html.lang,
            is_root: html.lang == root_text.root_lang,
            title: html.name,
            author: html.author,
            author_uid: html.author_uid,
            text: html.text
            
        }
)

LET parallel_count = LENGTH(
    FOR rel IN relationship
        FILTER rel._from == root_text._id
        RETURN rel
)

LET biblio = (
    FOR biblio IN biblios
        FILTER biblio.uid == root_text.biblio_uid
        LIMIT 1
        RETURN biblio.text
)[0]

LET markup = (
    FOR markup IN po_markup
        FILTER markup.uid == @uid
        LIMIT 1
        RETURN markup.markup
)[0]

LET root_po_obj = (
    FOR object IN po_strings
        FILTER object.uid == @uid AND object.lang == root_text.root_lang
        LIMIT 1 
        RETURN object
)[0]

LET translated_po_obj = (
    FOR object IN po_strings 
        FILTER object.uid == @uid AND object.lang == @language AND LOWER(object.author) == @author
        LIMIT 1 
        RETURN object
)[0]

RETURN {
    root_text: translated_po_obj ? root_po_obj : null,
    translation: translated_po_obj ? translated_po_obj : (FOR html IN legacy_html FILTER html.lang == @language LIMIT 1 RETURN html)[0],
    suttaplex: {
        acronym: root_text.acronym,
        volpages: volpages,
        uid: @uid,
        blurb: blurb,
        difficulty: difficulty,
        original_title: root_text.name,
        root_lang: root_text.root_lang,
        translations: FLATTEN([po_translations, legacy_translations]),
        parallel_count: parallel_count,
        biblio: biblio
    },
    segmented: translated_po_obj ? true : false,
    markup: translated_po_obj ? markup : null
}
'''

CURRENCIES = '''
FOR currency IN currencies
    FILTER currency.use == true
    SORT currency.name
    RETURN KEEP(currency, ['name', 'symbol', 'american_express', 'decimal'])
'''

PARAGRAPHS = '''
FOR paragraph IN paragraphs
    RETURN {
        uid: paragraph.uid,
        description: paragraph.description
    }
'''
