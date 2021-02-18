LANGUAGES = '''
FOR l in language
    SORT l.name
    RETURN {
        "uid": l.uid,
        "name": l.name,
        "iso_code": l.iso_code,
        "is_root": l.is_root,
        "localized": !!l.localized,
        "localized_percent": l.localized_percent ? l.localized_percent : 0
    }
'''

TEXTS_BY_LANG = '''
FOR text IN html_text
        FILTER text.lang == @lang
        LET nav_doc = (
            RETURN DOCUMENT(CONCAT('super_nav_details/', text.uid))
        )[0]
        RETURN {
            file_path: text.file_path,
            uid: text.uid,
            mtime: text.mtime,
            author: text.author,
            author_uid: text.author_uid,
            author_short: text.author_short,
            root_lang: nav_doc.root_lang,
            acronym: nav_doc.acronym
        }
'''

# Returns all uids in proper order assuming num is set correctly in data
UIDS_IN_ORDER_BY_DIVISION = '''
FOR division IN super_nav_details
    FILTER division.type == 'branch'
    LET division_uids = (
        FOR doc, edge, path IN 0..10 OUTBOUND division super_nav_details_edges OPTIONS {bfs: False}
            RETURN doc.uid
    )
    RETURN {'division': division.uid, 'uids': division_uids}
'''

CURRENT_MTIMES = '''
WITH @@collection /* With statement forces query optimizer to work */
    FOR text IN @@collection
        FILTER text.lang == @lang
        RETURN {uid: text.uid, author_uid: text.author_uid, mtime: text.mtime}
'''

MENU = '''
FOR navigation_doc IN super_nav_details
    FILTER navigation_doc.type == 'root'
    // Node children
    LET descendants = (
        FOR descendant IN OUTBOUND navigation_doc super_nav_details_edges
            // Search info about doc language from language collection
            LET lang_name = DOCUMENT('language', descendant.root_lang)['name']
            LET child_range = DOCUMENT('child_range', descendant.uid)['range']
            
            LET translated_name = DOCUMENT('names', CONCAT_SEPARATOR('_', descendant.uid, @language))['name']
            
            // Trying to get 2 blurbs with english and  user-defined-language  translations
            LET en_and_language_blurbs = (
                FOR blurb IN blurbs
                    FILTER blurb.uid == descendant.uid AND (blurb.lang == @language OR blurb.lang == 'en')
                        LIMIT 2
                        RETURN blurb
            )
            // Trying to get blurb with user-defined-language translation, take english if not exist
            LET blurb = (
                 RETURN LENGTH(en_and_language_blurbs) == 2 ? 
                     (FOR blurb IN en_and_language_blurbs FILTER blurb.lang == @language RETURN blurb)[0] : 
                     en_and_language_blurbs[0]
            )[0].blurb
            
            LET yellow_brick_road = DOCUMENT('yellow_brick_road', CONCAT_SEPARATOR('_', descendant.uid, @language))
            
            RETURN {
                uid: descendant.uid,
                root_name: descendant.name,
                translated_name: translated_name,
                acronym: descendant.acronym,
                blurb: blurb,
                node_type: descendant.type,
                root_lang_iso: descendant.root_lang,
                root_lang_name: lang_name,
                child_range: child_range,
                yellow_brick_road: !!yellow_brick_road,
                yellow_brick_road_count: yellow_brick_road ? yellow_brick_road.count : 0,
            }
        )
        
    LET lang_name = DOCUMENT('language', navigation_doc.root_lang)['name']
    LET child_range = DOCUMENT('child_range', navigation_doc.uid)['range']
    LET translated_name = DOCUMENT('names', CONCAT_SEPARATOR('_', navigation_doc.uid, @language))['name']

    LET en_and_language_blurbs = (
        FOR blurb IN blurbs
            FILTER blurb.uid == navigation_doc.uid AND (blurb.lang == @language OR blurb.lang == 'en')
                LIMIT 2
                RETURN blurb
    )
    LET blurb = (
         RETURN LENGTH(en_and_language_blurbs) == 2 ? 
             (FOR blurb IN en_and_language_blurbs FILTER blurb.lang == @language RETURN blurb)[0] : 
             en_and_language_blurbs[0]
    )[0].blurb
    
    LET yellow_brick_road = DOCUMENT('yellow_brick_road', CONCAT_SEPARATOR('_', navigation_doc.uid, @language))
    
    RETURN {
        uid: navigation_doc.uid,
        root_name: navigation_doc.name,
        translated_name: translated_name,
        blurb: blurb,
        acronym: navigation_doc.acronym,
        node_type: navigation_doc.type,
        root_lang_iso: navigation_doc.root_lang,
        root_lang_name: lang_name,
        child_range: child_range,
        yellow_brick_road: !!yellow_brick_road,
        yellow_brick_road_count: yellow_brick_road ? yellow_brick_road.count : 0,
        children: descendants,
    }
'''

SUBMENU = '''
LET navigation_doc = DOCUMENT('super_nav_details', @submenu_id)

LET descendants = (
    FOR descendant IN OUTBOUND navigation_doc super_nav_details_edges
        LET lang_name = DOCUMENT('language', descendant.root_lang)['name']
        LET child_range = DOCUMENT('child_range', descendant.uid)['range']
        LET translated_name = DOCUMENT('names', CONCAT_SEPARATOR('_', descendant.uid, @language))['name']
        
        LET en_and_language_blurbs = (
            FOR blurb IN blurbs
                FILTER blurb.uid == descendant.uid AND (blurb.lang == @language OR blurb.lang == 'en')
                    LIMIT 2
                    RETURN blurb
        )
        LET blurb = (
             RETURN LENGTH(en_and_language_blurbs) == 2 ? 
                 (FOR blurb IN en_and_language_blurbs FILTER blurb.lang == @language RETURN blurb)[0] : 
                 en_and_language_blurbs[0]
        )[0].blurb
        
        LET yellow_brick_road = DOCUMENT('yellow_brick_road', CONCAT_SEPARATOR('_', descendant.uid, @language))
        
        RETURN {
            uid: descendant.uid,
            root_name: descendant.name,
            translated_name: translated_name,
            acronym: descendant.acronym,
            blurb: blurb,
            node_type: descendant.type,
            root_lang_iso: descendant.root_lang,
            root_lang_name: lang_name,
            child_range: child_range,
            yellow_brick_road: !!yellow_brick_road,
            yellow_brick_road_count: yellow_brick_road ? yellow_brick_road.count : 0,
        }
    )

LET lang_name = DOCUMENT('language', navigation_doc.root_lang)['name']
LET child_range = DOCUMENT('child_range', navigation_doc.uid)['range']
LET translated_name = DOCUMENT('names', CONCAT_SEPARATOR('_', navigation_doc.uid, @language))['name']

LET en_and_language_blurbs = (
    FOR blurb IN blurbs
        FILTER blurb.uid == navigation_doc.uid AND (blurb.lang == @language OR blurb.lang == 'en')
            LIMIT 2
            RETURN blurb
)
LET blurb = (
     RETURN LENGTH(en_and_language_blurbs) == 2 ? 
         (FOR blurb IN en_and_language_blurbs FILTER blurb.lang == @language RETURN blurb)[0] : 
         en_and_language_blurbs[0]
)[0].blurb

LET yellow_brick_road = DOCUMENT('yellow_brick_road', CONCAT_SEPARATOR('_', navigation_doc.uid, @language))

RETURN {
    uid: navigation_doc.uid,
    root_name: navigation_doc.name,
    translated_name: translated_name,
    node_type: navigation_doc.type,
    blurb: blurb,
    acronym: navigation_doc.acronym,
    root_lang_iso: navigation_doc.root_lang,
    root_lang_name: lang_name,
    child_range: child_range,
    yellow_brick_road: !!yellow_brick_road,
    yellow_brick_road_count: yellow_brick_road ? yellow_brick_road.count : 0,
    children: descendants,
}
'''

SET_SUPER_NAV_DETAILS_ROOT_LANGUAGES = '''
FOR doc IN super_nav_details
    FILTER doc.root_lang
    FOR child IN 1..100 OUTBOUND doc super_nav_details_edges
        UPDATE child WITH { root_lang: doc.root_lang } IN super_nav_details
'''

SET_SUPER_NAV_DETAILS_NODES_TYPES = '''
FOR doc IN super_nav_details
    LET child = (
        FOR child IN OUTBOUND doc super_nav_details_edges 
            LIMIT 1
            RETURN child
    )[0]
    LET parent = (
        FOR parent IN INBOUND doc super_nav_details_edges
            LIMIT 1
            RETURN parent
    )[0]
    LET node_type_using_child = child ? 'branch' : 'leaf'
    LET node_type = parent ? node_type_using_child : 'root'
    UPDATE doc WITH { type: node_type } IN super_nav_details
'''

BUILD_YELLOW_BRICK_ROAD = '''
FOR lang IN language
    LET lang_code = lang.iso_code
    
    LET translated_uids = (
        FOR doc IN v_text
            SEARCH doc.lang == lang_code
            RETURN DISTINCT doc.uid
    )
    
    FOR t_uid IN translated_uids
        LET nav_doc = DOCUMENT('super_nav_details', t_uid)
        FILTER nav_doc
        LET translations_count = COUNT(
            FOR doc IN v_text
                SEARCH doc.lang == lang_code AND doc.uid == t_uid
                RETURN doc
        )
        FOR doc IN 0..100 INBOUND nav_doc super_nav_details_edges
            LET yellow_brick_doc = {
                _key: CONCAT_SEPARATOR('_', doc.uid, lang_code),
                uid: doc.uid,
                lang: lang_code,
                count: translations_count,
            }
            INSERT yellow_brick_doc INTO yellow_brick_road OPTIONS { overwriteMode: 'ignore' }
'''

COUNT_YELLOW_BRICK_ROAD = '''
FOR yb_doc IN yellow_brick_road
    LET translated_leaf_count = SUM(
        FOR child IN 1..100 OUTBOUND DOCUMENT('super_nav_details', yb_doc.uid) super_nav_details_edges
            FILTER child.type == 'leaf'
            LET key = CONCAT_SEPARATOR('_', child.uid, yb_doc.lang)
            LET yb_child = DOCUMENT('yellow_brick_road', key)
            FILTER yb_child
            RETURN yb_child.count
    )
    UPDATE yb_doc WITH { count: translated_leaf_count } IN yellow_brick_road
'''

# Takes 2 bind_vars: `language` and `uid` of root element
SUTTAPLEX_LIST = '''
FOR v, e, p IN 0..6 OUTBOUND CONCAT('super_nav_details/', @uid) super_nav_details_edges
    LET legacy_translations = (
        FOR text IN html_text
            FILTER text.uid == v.uid
            LET lang_doc = DOCUMENT('language', text.lang)
            LET res = {
                lang: text.lang,
                lang_name: lang_doc.name,
                is_root: lang_doc.is_root,
                author: text.author,
                author_short: text.author_short,
                author_uid: text.author_uid,
                publication_date: text.publication_date,
                id: text._key,
                segmented: false,
                volpage: text.volpage
                }
            // Add title if it is in desired language
            RETURN (text.lang == @language) ? MERGE(res, {title: text.name}) : res 
        )

    LET bilara_translations = (
        FOR text IN sc_bilara_texts
            FILTER text.uid == v.uid AND ('root' IN text.muids OR 'translation' IN text.muids)
            SORT text.lang
            LET lang_doc = DOCUMENT('language', text.lang)
            LET author_doc = (
                FOR author IN author_edition 
                    FILTER author.uid IN text.muids
                    LIMIT 1 
                    RETURN author
            )[0]
            LET name_doc = (
                FOR name IN names
                    FILTER name.uid == v.uid AND name.lang == text.lang
                    LIMIT 1
                    RETURN name
            )[0]
            RETURN {
                lang: text.lang,
                lang_name: lang_doc.name,
                is_root: lang_doc.is_root,
                author: author_doc.long_name,
                author_short: author_doc.short_name,
                author_uid: text.muids[2],
                publication_date: null,
                id: text._key,
                segmented: true,
                title: name_doc.name,
                volpage: null
            }
    )

    LET blurbs_by_uid = (
        FOR blurb IN blurbs
            FILTER blurb.uid == v.uid AND (blurb.lang == @language OR blurb.lang == 'en')
            LIMIT 2
            RETURN blurb
    )
    LET blurb = (
         RETURN LENGTH(blurbs_by_uid) == 2 ? 
             (FOR blurb IN blurbs_by_uid FILTER blurb.lang == @language RETURN blurb.blurb)[0] : 
             blurbs_by_uid[0].blurb
    )[0]
    
    LET difficulty = (
        FOR difficulty IN difficulties
            FILTER difficulty.uid == v.uid
            LIMIT 1
            RETURN difficulty.difficulty
    )[0]
    
    LET translations = FLATTEN([bilara_translations, legacy_translations])

    LET volpages = (
        FOR text IN translations
            FILTER text.volpage != null
            LIMIT 1
            RETURN text.volpage
    )
    
    LET is_segmented_original = (
        FOR translation IN translations
            FILTER translation.lang == v.root_lang AND translation.segmented == true
            LIMIT 1
            RETURN true
    )[0]

    LET filtered_translations = (
        FOR translation IN translations
            FILTER translation.lang != v.root_lang OR translation.segmented == true OR is_segmented_original == null
            RETURN translation
    )
    
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

    LET original_titles = (
        FOR original_name IN names
            FILTER original_name.uid == v.uid
            LIMIT 1
            RETURN original_name.name
    )[0]

    RETURN {
        acronym: v.acronym,
        volpages: v.volpage ? v.volpage : volpages[0],
        uid: v.uid,
        blurb: blurb,
        difficulty: difficulty,
        original_title: original_titles,
        root_lang: v.root_lang,
        root_lang_name: DOCUMENT('language', v.root_lang).name,
        type: v.type,
        from: e._from,
        translated_title: translated_titles,
        translations: filtered_translations,
        parallel_count: parallel_count,
        biblio: biblio,
    }
'''

PARALLELS = '''
FOR v, e, p IN OUTBOUND CONCAT('super_nav_details/', @uid) relationship
    LET target = DOCUMENT(e._to)

    LET legacy_translations = (
        FOR text IN html_text
            FILTER text.uid == target.uid
            LET res = {
                lang: text.lang,
                lang_name: (FOR lang in language FILTER lang.uid == text.lang LIMIT 1 RETURN lang.name)[0],
                author: text.author,
                author_short: text.author_short,
                author_uid: text.author_uid,
                id: text._key,
                segmented: false,
                volpage: text.volpage
                }
            // Add title if it is in desired language
            RETURN (text.lang == @language) ? MERGE(res, {title: text.name}) : res
        )

    LET bilara_translations = (
        FOR text IN sc_bilara_texts
            FILTER text.uid == target.uid AND 'root' IN text.muids

            LET author_doc = (
                FOR author IN author_edition
                    FILTER author.uid IN text.muids
                    LIMIT 1
                    RETURN author
            )[0]

            LET text_title = (
                FOR name IN names
                    FILTER name.uid == @uid AND name.is_root == true
                    RETURN name.name
            )[0]

            LET res = {
                lang: text.lang,
                lang_name: (FOR lang in language FILTER lang.uid == text.lang LIMIT 1 RETURN lang.name)[0],
                author: author_doc.long_name,
                author_short: author_doc.short_name,
                author_uid: author_doc.uid,
                id: text._key,
                segmented: true,
                volpage: (FOR doc IN super_nav_details FILTER doc.uid == target.uid RETURN doc.volpage)[0]
            }
            RETURN (text.lang == @language) ? MERGE(res, {title: text_title}) : res
    )

    SORT e.resembling

    LET biblio = (
        FOR biblio IN biblios
            FILTER biblio.uid == v.biblio_uid
            LIMIT 1
            RETURN biblio.text
    )[0]

    LET translations = FLATTEN([bilara_translations, legacy_translations])

    LET volpages = (
        FOR text IN translations
            FILTER text.volpage != null
            LIMIT 1
            RETURN text.volpage
    )

    LET translated_titles = (
        FOR translation IN translations
            FILTER translation.lang == @language AND HAS(translation, 'title')
            LIMIT 1
            RETURN translation.title
    )[0]

    LET original_titles = (
        FOR original_name IN names
            FILTER original_name.uid == v.uid
            LIMIT 1
            RETURN original_name.name
    )[0]

    SORT e.number, e.to
    RETURN {
        from: e.from,
        enumber: e.number,
        to: {
            to: e.to,
            volpages: v.volpage ? v.volpage : volpages[0],
            acronym: v.acronym,
            uid: v.uid,
            root_lang: v.root_lang,
            original_title: original_titles,
            translated_title: translated_titles,
            type: e.type,
            from: e._from,
            biblio: biblio,
            translations: translations
        },
        type: e.type,
        remark: e.remark,
        resembling: e.resembling
    }
'''

SUTTA_VIEW = (
        '''
    LET root_text = DOCUMENT('super_nav_details', @uid)
    
    LET legacy_html = (
        FOR html IN html_text
            FILTER html.uid == @uid AND ((html.lang == @language AND LOWER(html.author_uid) == @author_uid) 
                OR html.lang == root_text.root_lang)
            
            RETURN {
                uid: html.uid,
                lang: html.lang,
                is_root: html.lang == root_text.root_lang,
                title: html.name,
                author: html.author,
                author_short: html.author_short,
                author_uid: html.author_uid,
                file_path: html.file_path,
                next: html.next,
                previous: html.prev
            }
    )
    
    LET root_bilara_obj = (
        FOR doc IN sc_bilara_texts 
            FILTER doc.uid == @uid AND 'root' IN doc.muids
            LIMIT 1 
            LET author_doc = (
                FOR author IN author_edition 
                    FILTER author.uid IN doc.muids
                    LIMIT 1 
                    RETURN author
            )[0]
            LET name_doc = (
                FOR name IN names
                    FILTER name.uid == doc.uid AND name.is_root == true
                    LIMIT 1
                    RETURN name
            )[0]
    
            RETURN {
                uid: doc.uid,
                author: author_doc.long_name,
                author_short: author_doc.short_name,
                author_uid: author_doc.uid,
                lang: doc.lang,
                title: name_doc.name,
                previous: {
                  author_uid: author_doc.uid,
                  lang: doc.lang,
                  name: null,
                  uid: null,
                },
                next: {
                  author_uid: author_doc.uid,
                  lang: doc.lang,
                  name: null,
                  uid: null,
                },
            }
    )[0]
    
    LET translated_bilara_obj = (
        FOR doc IN sc_bilara_texts 
            FILTER doc.uid == @uid AND doc.lang == @language AND @author_uid IN doc.muids
            LIMIT 1 
            LET author_doc = (
                FOR author IN author_edition 
                    FILTER author.uid IN doc.muids
                    LIMIT 1 
                    RETURN author
            )[0]
            LET name_doc = (
                FOR name IN names
                    FILTER name.uid == doc.uid AND name.lang == doc.lang
                    LIMIT 1
                    RETURN name
            )[0]
    
            RETURN {
                uid: doc.uid,
                lang: doc.lang,
                author_uid: author_doc.uid,
                author: author_doc.long_name,
                author_short: author_doc.short_name,
                title: name_doc.name,
                previous: {
                    author_uid: author_doc.uid,
                    lang: doc.lang,
                    name: null,
                    uid: null,
                },
                next: {
                  author_uid: author_doc.uid,
                  lang: doc.lang,
                  name: null,
                  uid: null,
                },
            }
    )[0]
    
    LET suttaplex = ('''
        + SUTTAPLEX_LIST
        + ''')[0]
    
RETURN {
    root_text: translated_bilara_obj ? root_bilara_obj : null,
    translation: translated_bilara_obj ? (root_bilara_obj == translated_bilara_obj ? null : translated_bilara_obj) 
        : (FOR html IN legacy_html FILTER html.lang == @language LIMIT 1 RETURN html)[0],
    segmented: translated_bilara_obj ? true : false,
    suttaplex: suttaplex
}
'''
)

SUTTA_NEIGHBORS = '''
LET parent = (
    FOR parent_doc IN @level INBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges
        RETURN parent_doc
)[0]
LET neighbors = (
    FOR docs IN @level OUTBOUND parent super_nav_details_edges
        RETURN docs.uid
)
RETURN neighbors
'''

SUTTA_NAME = '''
FOR name IN names
    FILTER name.uid == @uid AND name.is_root == @is_root
    LIMIT 1
    RETURN name.name
'''

SEGMENTED_SUTTA_VIEW = '''

LET result = MERGE(
    FOR doc IN sc_bilara_texts
        FILTER doc.uid == @uid
        FILTER 'translation' NOT IN doc.muids OR @author_uid IN doc.muids
        FILTER 'comment' NOT IN doc.muids OR @author_uid IN doc.muids
        
        LET type = doc.muids[0]
        RETURN {
            [CONCAT(type, '_text')]: doc.file_path
        }
)

RETURN result
'''

CURRENCIES = '''
FOR currency IN currencies
    FILTER currency.use == true
    LET expected_name = DOCUMENT(CONCAT('currency_names/', currency.symbol, '_', @language)).name
    LET name = expected_name ? expected_name : DOCUMENT(CONCAT('currency_names/', currency.symbol, '_', 'en')).name
    SORT name
    RETURN {
        name: name,
        symbol: currency.symbol,
        american_express: currency.american_express,
        decimal: currency.decimal
    }
'''

PARAGRAPHS = '''
FOR paragraph IN paragraphs
    RETURN {
        uid: paragraph.uid,
        description: paragraph.description
    }
'''

IMAGES = '''
FOR image IN images
    FILTER image.division == @division AND image.vol == @vol
    FILTER image.page_number < @page+3
    FILTER image.page_number > @page-3
    SORT image.page_number
    RETURN {name: image.name,
            pageNumber: image.page_number}
'''

EPIGRAPHS = '''
FOR epigraph IN epigraphs
    SORT RAND()
    LIMIT @number
    RETURN KEEP(epigraph, ['uid', 'epigraph'])
'''

WHY_WE_READ = '''
FOR text IN why_we_read
    SORT RAND()
    LIMIT @number
    RETURN text.text
'''

DICTIONARY_ADJACENT = '''
LET word_number = (
    FOR dictionary IN dictionaries_complex
        FILTER dictionary.word == @word
        LIMIT 1
        RETURN dictionary.num
    )

LET adjacent_words = (
    FOR selected IN dictionaries_complex
        FILTER selected.num < word_number+6
        FILTER selected.num > word_number-6
        SORT selected.num
        RETURN selected.word
    )

RETURN UNIQUE(adjacent_words)
'''

DICTIONARY_FULL = '''
LET dict_simple = (
    FOR dict IN dictionaries_simple
        FILTER dict.entry == @word
        RETURN {
            from: dict.from,
            to: dict.to,
            entry: dict.entry,
            grammar: dict.grammar,
            definition: dict.definition,
            xr: dict.xr,
            dictname: dict.dictname,
            text: null
        }
)

LET dict_complex = (
    FOR dict IN dictionaries_complex
        FILTER dict.word == @word
        RETURN {
            from: dict.from,
            to: dict.to,
            entry: dict.word,
            grammar: null,
            definition: null,
            xr: null,
            dictname: dict.dictname,
            text: dict.text,
        }
)

RETURN APPEND(dict_simple, dict_complex)
'''

DICTIONARY_SEARCH_RESULT_FULL = '''
LET dic_complex = (
    FOR doc IN dictionaries_complex
        FILTER doc.to == @language AND (doc.word == LOWER(@word) OR doc.word_ascii == LOWER(@word))
        RETURN {
            dictname: doc.dictname,
            lang_to: doc.to,
            lang_from: doc.from,
            word: doc.word,
            word_ascii: doc.word_ascii,
            text: doc.text,
            grammar: null,
            definition: null,
            xr: null
        }
)

LET dic_simple = (
    FOR doc IN dictionaries_simple
        FILTER doc.to == @language AND doc.entry == LOWER(@word)
        RETURN {
            dictname: doc.dictname,
            lang_to: doc.to,
            lang_from: doc.from,
            word: doc.entry,
            word_ascii: null,
            text: '',
            grammar: doc.grammar,
            definition: doc.definition,
            xr: doc.xr
        }
)

RETURN APPEND(dic_complex, dic_simple)
'''

DICTIONARY_SIMILAR = '''
LET words = FLATTEN(
    FOR doc IN v_dict SEARCH STARTS_WITH(doc.word_ascii, LEFT(@word_ascii, 1))
        FILTER doc.word != @word
        LET ed1 = LEVENSHTEIN_DISTANCE(@word_ascii, doc.word_ascii) * 2
        LET ed2 = LEVENSHTEIN_DISTANCE(@word, doc.word)
        FILTER ed2 < MAX([1, LENGTH(@word) / 2])
        SORT ed1 + ed2
        RETURN DISTINCT doc.word
    )
RETURN SLICE(words, 0, 10)
'''

DICTIONARY_SIMPLE = '''
FOR dict IN dictionaries_simple
    FILTER dict.from == @from AND dict.to == @to
    RETURN {
        entry: dict.entry,
        grammar: dict.grammar,
        definition: dict.definition,
        xr: dict.xr
    }
'''

EXPANSION = '''
LET expansion_item = (
    FOR entry IN uid_expansion
        RETURN { [ entry.uid ]: [ entry.acro, entry.name ] }
    )

RETURN MERGE(expansion_item)
'''


class PWA:
    MENU = '''
LET langs = UNION(@languages ? @languages : [], @include_root ? (
        FOR lang IN language FILTER lang.is_root RETURN lang.uid
    ) : [])

LET menu = (
    FOR div IN 1..1 OUTBOUND DOCUMENT('super_nav_details', 'sutta') super_nav_details_edges
        LET has_subdivisions = LENGTH(
            FOR d, d_edge, d_path IN 1..1 OUTBOUND div super_nav_details_edges
                FILTER d_edge.type != 'leaf'
                LIMIT 1
                RETURN 1
            )
        FILTER has_subdivisions
        RETURN div.uid
    )

LET grouped_children = MERGE(
    FOR d, d_edge, d_path IN 1..20 OUTBOUND DOCUMENT('super_nav_details', 'sutta') super_nav_details_edges
        COLLECT is_div = d.type != 'leaf' INTO uids = d.uid
        RETURN {[is_div ? 'branch' : 'leaf']: uids}
)

LET suttaplex = grouped_children['branch']

LET texts = (
        FOR text IN v_text SEARCH text.lang IN langs AND text.uid IN grouped_children['leaf']
            COLLECT uid = text.uid INTO groups = {lang: text.lang, author_uid: text.author_uid}
            RETURN {uid, translations:(
                FOR text IN groups
                    COLLECT lang = text.lang INTO authors = text.author_uid
                    RETURN {lang, authors}
                )}
)

RETURN {
    menu,
    suttaplex,
    texts
}
    '''

    SIZES = '''
LET languages = (FOR s IN pwa_sizes 
    RETURN { [s.lang]: KEEP(s, ['parallels', 'base', 'lookup'])})

RETURN MERGE(languages)
    '''


# The translation count queries use COLLECT/AGGREGATE
# these are very fast queries
TRANSLATION_COUNT_BY_LANGUAGE = '''
LET root_langs = (FOR lang IN language FILTER lang.is_root RETURN lang.uid)

LET root_lang_total = COUNT(FOR text IN v_text SEARCH text.lang IN root_langs
    RETURN 1)

LET langs = (
    FOR text IN v_text
        COLLECT lang_code = text.lang WITH COUNT INTO total
        LET lang = DOCUMENT('language', lang_code)
        LET translated = total / root_lang_total
        RETURN {
            num: lang.num,
            iso_code: lang.iso_code,
            is_root: lang.is_root,
            name: lang.name,
            total: total,
            percent: translated > 0.01 ? CEIL(100 * translated) : CEIL(1000 * translated) / 10
        }
)

LET sorted_langs = MERGE(
    FOR lang IN langs
        COLLECT is_root = lang.is_root INTO groupings
        RETURN {
            [is_root]: groupings[*].lang
        }
)

RETURN {
    ancient: (
        FOR doc IN sorted_langs["true"]
            SORT doc.total DESC
            RETURN UNSET(doc, 'is_root', 'num', 'percent')
        ),
    modern: (
        FOR doc IN sorted_langs["false"]
            SORT doc.total DESC
            RETURN UNSET(doc, 'is_root', 'num')
        )
}
'''

TRANSLATION_COUNT_BY_DIVISION = '''
/* First we count the number of texts by (sub)division uid based on pattern matching */
LET counts = MERGE(
    FOR doc IN v_text
        SEARCH doc.lang == @lang
        COLLECT division_uid = REGEX_REPLACE(doc.uid, '([a-z]+(?:-[a-z]+|-[0-9]+)*).*', '$1') WITH COUNT INTO div_count
        SORT null
        RETURN {
            [division_uid]: div_count
        }
)
    
LET keys = ATTRIBUTES(counts)

FOR key IN keys
    LET doc = DOCUMENT('super_nav_details', key)
    FILTER doc
    /* Determine the highest division level */
    LET highest_div = LAST(
        FOR v, e, p IN 0..10 INBOUND doc super_nav_details_edges
        FILTER v.type == 'branch'
        RETURN {
            uid: v.uid,
            name: v.name,
            root_lang: v.root_lang
        }
    )
    COLLECT div = highest_div /* Filter out the subdivisions */
    /* But accumulate their counts */
    AGGREGATE total = SUM(counts[key])
    RETURN {
        uid: div.uid,
        name: div.name,
        root_lang: div.root_lang,
        total: total
    }
'''

TRANSLATION_COUNT_BY_AUTHOR = '''

LET legacy_counts = (
    FOR doc IN html_text
        FILTER doc.lang == @lang
        COLLECT author = doc.author WITH COUNT INTO total
        SORT null
        RETURN {
            author,
            total
        }
    )

LET segmented_counts = (
    FOR doc IN sc_bilara_texts
        FILTER doc.lang == @lang AND ('root' IN doc.muids OR 'translation' IN doc.muids)
        COLLECT author = doc.muids[2] WITH COUNT INTO total
        SORT null
        RETURN {
            author,
            total
        }
    )

FOR subcount IN APPEND(legacy_counts, segmented_counts)
    /* If there are multiple authors split them and count seperately */
    FOR author_name IN SPLIT(subcount.author, ', ')
        COLLECT name = author_name
        AGGREGATE total = SUM(subcount.total)
        SORT total DESC
        RETURN {name, total}
'''

SUTTA_SINGLE_PALI_TEXT = '''
FOR doc IN sc_bilara_texts
    FILTER doc.uid == @uid AND doc.lang == 'pli' AND 'root' IN doc.muids
    LIMIT 1
    RETURN {@uid: doc.file_path}
'''

SUTTA_PATH = '''
LET path_docs = (
    FOR doc IN 1..100 INBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges 
        RETURN doc.uid
)
RETURN {
    'full_path': CONCAT_SEPARATOR('/', REVERSE(APPEND(path_docs, '/pitaka')))
}
'''
SUTTA_PALI_REFERENCE = '''
FOR pali IN pali_reference_edition
    COLLECT edition_set = pali.edition_set, name = pali.name, short_name = pali.short_name
    RETURN {
        edition_set: edition_set,
        name: NOT_NULL(name, short_name)
    } 
'''
