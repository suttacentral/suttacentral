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

TEXTS_BY_LANG_FOR_SEARCH = '''
FOR text IN html_text
    FILTER text.lang == @lang
    LET nav_doc = (
        RETURN DOCUMENT(CONCAT('super_nav_details/', text.uid))
    )[0]

    LET full_lang = (
        FOR lang IN language
        FILTER lang.uid == text.lang
        RETURN lang.name
    )[0]

    LET path_docs = (
        FOR doc IN 1..100 INBOUND DOCUMENT('super_nav_details', text.uid) super_nav_details_edges OPTIONS {order: 'dfs'}
            RETURN doc.uid
    )

    LET root_uid = REVERSE(
        FOR item IN path_docs
        FILTER CONTAINS(text.uid, item)
        RETURN item
    )[0]

    RETURN {
        file_path: text.file_path,
        uid: text.uid,
        author: text.author,
        author_uid: text.author_uid,
        author_short: text.author_short,
        root_lang: nav_doc.root_lang,
        lang: text.lang,
        full_lang: full_lang,
        acronym: nav_doc.acronym,
        root_uid: root_uid,
        full_path: path_docs
    }
'''

BILARA_TEXT_BY_LANG = '''
FOR text IN sc_bilara_texts
    FILTER text.lang == @lang AND ('root' IN text.muids OR 'translation' IN text.muids)
    LET nav_doc = (
        RETURN DOCUMENT(CONCAT('super_nav_details/', text.uid))
    )[0]

    LET name_doc = (
        FOR name IN names
            FILTER name.uid == text.uid AND name.lang == text.lang
            LIMIT 1
            RETURN name
    )[0]

    LET root_name_doc = (
        FOR name IN names
            FILTER name.uid == text.uid AND name.is_root == true
            LIMIT 1
            RETURN name
    )[0]

    LET author_doc = (
        FOR author IN bilara_author_edition
            FILTER author.uid IN text.muids
            LIMIT 1
            RETURN author
    )[0]

    LET mtime_doc = (
        RETURN DOCUMENT(CONCAT('mtimes/', REGEX_REPLACE(SUBSTRING(text.file_path, FIND_FIRST(text.file_path, 'sc_bilara_data')), '/', '_')))
    )[0]

    RETURN {
        uid: text.uid,
        title: name_doc.name ? name_doc.name : root_name_doc.name,
        strings_path: text.file_path,
        author: author_doc.long_name,
        author_uid: author_doc.uid,
        author_short: author_doc.short_name,
        root_lang: nav_doc.root_lang,
        acronym: nav_doc.acronym,
        mtime: mtime_doc.mtime  / 1000000000
    }
'''

BILARA_TEXT_BY_LANG_FOR_SEARCH = '''
FOR text IN sc_bilara_texts
    FILTER text.lang == @lang AND ('root' IN text.muids OR 'translation' IN text.muids)
    AND NOT CONTAINS(text.file_path, 'blurb')
    AND NOT CONTAINS(text.file_path, '-name')
    LET nav_doc = (
        RETURN DOCUMENT(CONCAT('super_nav_details/', text.uid))
    )[0]

    LET name_doc = (
        FOR name IN names
            FILTER name.uid == text.uid AND name.lang == text.lang
            LIMIT 1
            RETURN name
    )[0]

    LET root_name_doc = (
        FOR name IN names
            FILTER name.uid == text.uid AND name.is_root == true
            LIMIT 1
            RETURN name
    )[0]

    LET author_doc = (
        FOR author IN bilara_author_edition
            FILTER author.uid IN text.muids
            LIMIT 1
            RETURN author
    )[0]

    LET mtime_doc = (
        RETURN DOCUMENT(CONCAT('mtimes/', REGEX_REPLACE(SUBSTRING(text.file_path, FIND_FIRST(text.file_path, 'sc_bilara_data')), '/', '_')))
    )[0]

    LET full_lang = (
        FOR lang IN language
        FILTER lang.uid == text.lang
        RETURN lang.name
    )[0]

    LET path_docs = (
        FOR doc IN 1..100 INBOUND DOCUMENT('super_nav_details', text.uid) super_nav_details_edges OPTIONS {order: 'dfs'}
            RETURN doc.uid
    )

    LET root_uid = REVERSE(
        FOR item IN path_docs
        FILTER CONTAINS(text.uid, item)
        RETURN item
    )[0]

    RETURN {
        uid: text.uid,
        title: name_doc.name ? name_doc.name : root_name_doc.name,
        strings_path: text.file_path,
        author: author_doc.long_name,
        author_uid: author_doc.uid,
        author_short: author_doc.short_name,
        lang: text.lang,
        full_lang: full_lang,
        root_lang: nav_doc.root_lang,
        acronym: nav_doc.acronym,
        root_uid: root_uid,
        full_path: path_docs,
        muids: text.muids
    }
'''

TEXT_REFERENCES = '''
FOR text IN sc_bilara_texts
    FILTER text.lang == @lang AND ('reference' IN text.muids)

    LET nav_doc = (
        RETURN DOCUMENT(CONCAT('super_nav_details/', text.uid))
    )[0]

    LET name_doc = (
        FOR name IN names
            FILTER name.uid == text.uid AND name.lang == text.lang
            LIMIT 1
            RETURN name
    )[0]

    LET root_name_doc = (
        FOR name IN names
            FILTER name.uid == text.uid AND name.is_root == true
            LIMIT 1
            RETURN name
    )[0]

    LET mtime_doc = (
        RETURN DOCUMENT(CONCAT('mtimes/', REGEX_REPLACE(SUBSTRING(text.file_path, FIND_FIRST(text.file_path, 'sc_bilara_data')), '/', '_')))
    )[0]

    LET full_lang = (
        FOR lang IN language
        FILTER lang.uid == text.lang
        RETURN lang.name
    )[0]

    RETURN {
        uid: text.uid,
        title: name_doc.name ? name_doc.name : root_name_doc.name,
        strings_path: text.file_path,
        lang: text.lang,
        full_lang: full_lang,
        root_lang: nav_doc.root_lang,
        acronym: nav_doc.acronym
    }
'''

# Returns all uids in proper order assuming num is set correctly in data
UIDS_IN_ORDER_BY_DIVISION = '''
FOR division IN super_nav_details
    FILTER division.type == 'branch'
    LET division_uids = (
        FOR doc, edge, path IN 0..10 OUTBOUND division super_nav_details_edges OPTIONS {order: 'dfs'}
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

CURRENT_BILARA_MTIMES = '''
WITH @@collection /* With statement forces query optimizer to work */
    FOR text IN @@collection
        FILTER text.lang == @lang AND ('root' IN text.muids OR 'translation' IN text.muids)

        LET mtime_doc = (
            RETURN DOCUMENT(CONCAT('mtimes/', REGEX_REPLACE(SUBSTRING(text.file_path, FIND_FIRST(text.file_path, "sc_bilara_data")), "/", "_")))
        )[0]

        RETURN {
            uid: text.uid,
            author_uid: text.muids[2],
            mtime: mtime_doc.mtime
        }
'''

MENU = '''
FOR navigation_doc IN super_nav_details
    FILTER navigation_doc.type == 'root'
    // Node children
    LET descendants = (
        FOR descendant IN OUTBOUND navigation_doc super_nav_details_edges OPTIONS {order: 'dfs'}
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
    FOR descendant IN OUTBOUND navigation_doc super_nav_details_edges OPTIONS {order: 'dfs'}
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

TIPITAKA_MENU = '''
FOR navigation_doc IN super_nav_details
    FILTER navigation_doc.type == 'root' AND navigation_doc.uid in ['sutta', 'vinaya', 'abhidhamma']

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
        yellow_brick_road: !!yellow_brick_road,
        yellow_brick_road_count: yellow_brick_road ? yellow_brick_road.count : 0,
    }
'''

SET_SUPER_NAV_DETAILS_ROOT_LANGUAGES = '''
FOR doc IN super_nav_details
    FILTER doc.root_lang
    FOR child IN 1..100 OUTBOUND doc super_nav_details_edges OPTIONS {order: 'dfs'}
        FILTER child
        UPDATE child WITH { root_lang: doc.root_lang } IN super_nav_details
'''

SET_SUPER_NAV_DETAILS_NODES_TYPES = '''
FOR doc IN super_nav_details
    LET child = (
        FOR child IN OUTBOUND doc super_nav_details_edges OPTIONS {order: 'dfs'}
            LIMIT 1
            RETURN child
    )[0]
    LET parent = (
        FOR parent IN INBOUND doc super_nav_details_edges OPTIONS {order: 'dfs'}
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
        FOR doc IN 0..100 INBOUND nav_doc super_nav_details_edges OPTIONS {order: 'dfs'}
            LET yellow_brick_doc = {
                _key: CONCAT_SEPARATOR('_', doc.uid, lang_code),
                uid: doc.uid,
                lang: lang_code,
                type: doc.type,
                count: translations_count,
            }
            INSERT yellow_brick_doc INTO yellow_brick_road OPTIONS { overwriteMode: 'ignore' }
'''

COUNT_YELLOW_BRICK_ROAD = '''
FOR yb_doc IN yellow_brick_road
    FILTER yb_doc.type == 'branch' OR yb_doc.type == 'root'
    LET translated_leaf_count = SUM(
        FOR child IN 1..100 OUTBOUND DOCUMENT('super_nav_details', yb_doc.uid) super_nav_details_edges OPTIONS {order: 'dfs'}
            FILTER child.type == 'leaf'
            LET key = CONCAT_SEPARATOR('_', child.uid, yb_doc.lang)
            LET yb_child = DOCUMENT('yellow_brick_road', key)
            FILTER yb_child
            RETURN yb_child.count
    )
    FILTER translated_leaf_count != 0
    UPDATE yb_doc WITH { count: translated_leaf_count } IN yellow_brick_road
'''

# Takes 2 bind_vars: `language` and `uid` of root element
SUTTAPLEX_LIST = '''
FOR v, e, p IN 0..6 OUTBOUND CONCAT('super_nav_details/', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
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
                volpage: text.volpage,
                has_comment: false
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
                FOR author IN bilara_author_edition
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
            LET text_comment = (
                FOR doc IN sc_bilara_texts
                FILTER doc.uid == v.uid AND 'comment' IN doc.muids AND author_doc.uid in doc.muids
                RETURN doc.muids
            )
            LET publication = (
                FOR publication IN publications_v2
                FILTER publication.creator_uid == text.muids[2]
                AND STARTS_WITH(text.uid, SUBSTITUTE(publication.text_uid, "pli-tv-vi", "pli-tv-"))
                RETURN publication
            )[0]
            RETURN {
                lang: text.lang,
                lang_name: lang_doc.name,
                is_root: lang_doc.is_root,
                author: author_doc.long_name,
                author_short: author_doc.short_name,
                author_uid: author_doc.uid,
                publication_date: publication.first_published,
                id: text._key,
                segmented: true,
                title: name_doc.name,
                volpage: null,
                has_comment: LENGTH(text_comment) > 0
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
        FOR volpages IN text_extra_info
            FILTER volpages.uid == v.uid
            LIMIT 1
            RETURN volpages.volpage
    )[0]

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
            FILTER translation.lang == @language AND HAS(translation, 'title') AND translation.title != null
            LIMIT 1
            RETURN translation.title
    )[0]

    LET name_title = (
        FOR name IN names
            FILTER name.uid == v.uid AND name.lang == @language
            LIMIT 1
            RETURN name.name
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
        FOR nav_item IN super_nav_details
            FILTER nav_item.uid == v.uid
            LIMIT 1
            RETURN nav_item.name
    )[0]

    LET alt_volpages = (
        FOR altVolpages IN text_extra_info
            FILTER altVolpages.uid == v.uid
            LIMIT 1
            RETURN altVolpages.alt_volpage
    )[0]

    LET path_docs = (
        FOR doc IN 1..100 INBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
            RETURN doc.uid
    )

    LET priority_author = (
        FOR priority IN prioritize
            FILTER priority.tree == path_docs[LAST(path_docs)-1]
                AND priority.translation_lang == @language
                AND priority.root_lang == v.root_lang
        return priority.creator
    )[0]

    LET references = (
        FOR volpage IN text_references
            FILTER volpage.uid == v.uid
        RETURN volpage.volpage
    )[0]

    RETURN {
        acronym: v.acronym,
        volpages: volpages,
        alt_volpages: alt_volpages,
        uid: v.uid,
        blurb: blurb,
        difficulty: difficulty,
        original_title: original_titles,
        root_lang: v.root_lang,
        root_lang_name: DOCUMENT('language', v.root_lang).name,
        type: v.type,
        from: e._from,
        translated_title: translated_titles ? translated_titles : name_title,
        translations: filtered_translations,
        parallel_count: parallel_count,
        biblio: biblio,
        priority_author_uid: priority_author,
        verseNo: references,
    }
'''

FALLEN_LEAVES_SUTTAPLEX_LIST = '''
FOR doc IN fallen_leaves
    FOR leaves IN doc.fallen_leaves
        FILTER HAS(leaves, @uid)
            FOR leaf_uid in leaves[@uid]
                LET nav_detail = DOCUMENT('super_nav_details', leaf_uid)
                LET legacy_translations = (
                        FOR text IN html_text
                            FILTER text.uid == leaf_uid
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
                            RETURN (text.lang == @language) ? MERGE(res, {title: text.name}) : res
                        )

                    LET bilara_translations = (
                        FOR text IN sc_bilara_texts
                            FILTER text.uid == leaf_uid AND ('root' IN text.muids OR 'translation' IN text.muids)
                            SORT text.lang
                            LET lang_doc = DOCUMENT('language', text.lang)
                            LET author_doc = (
                                FOR author IN bilara_author_edition
                                    FILTER author.uid IN text.muids
                                    LIMIT 1
                                    RETURN author
                            )[0]
                            LET name_doc = (
                                FOR name IN names
                                    FILTER name.uid == leaf_uid AND name.lang == text.lang
                                    LIMIT 1
                                    RETURN name
                            )[0]
                            RETURN {
                                lang: text.lang,
                                lang_name: lang_doc.name,
                                is_root: lang_doc.is_root,
                                author: author_doc.long_name,
                                author_short: author_doc.short_name,
                                author_uid: author_doc.uid,
                                publication_date: null,
                                id: text._key,
                                segmented: true,
                                title: name_doc.name,
                                volpage: null
                            }
                    )

                LET translations = FLATTEN([bilara_translations, legacy_translations])

                LET is_segmented_original = (
                    FOR translation IN translations
                        FILTER translation.lang == nav_detail.root_lang AND translation.segmented == true
                        LIMIT 1
                        RETURN true
                )[0]

                LET filtered_translations = (
                    FOR translation IN translations
                        FILTER translation.lang != nav_detail.root_lang OR translation.segmented == true OR is_segmented_original == null
                        RETURN translation
                )

                LET name_title = (
                    FOR name IN names
                        FILTER name.uid == leaf_uid AND name.lang == @language
                        LIMIT 1
                        RETURN name.name
                )[0]

                LET original_titles = (
                    FOR nav_item IN super_nav_details
                        FILTER nav_item.uid == leaf_uid
                        LIMIT 1
                        RETURN nav_item.name
                )[0]

                LET parallel_count = LENGTH(
                        FOR rel IN relationship
                            FILTER rel._from == nav_detail._id
                            RETURN rel
                )

                RETURN {
                    acronym: null,
                    volpages: null,
                    alt_volpages: null,
                    uid: leaf_uid,
                    blurb: null,
                    difficulty: null,
                    original_title: original_titles,
                    root_lang: nav_detail.root_lang,
                    root_lang_name: DOCUMENT('language', nav_detail.root_lang.root_lang).name,
                    type: nav_detail.type,
                    from: null,
                    translated_title: name_title,
                    translations: filtered_translations,
                    parallel_count: parallel_count,
                    biblio: null,
                    priority_author_uid: null,
                    isFallenLeaf: true,
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
                FOR author IN bilara_author_edition
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
        FOR volpages IN text_extra_info
            FILTER volpages.uid == v.uid
            LIMIT 1
            RETURN volpages.volpage
    )[0]

    LET alt_volpages = (
        FOR altVolpages IN text_extra_info
            FILTER altVolpages.uid == v.uid
            LIMIT 1
            RETURN altVolpages.alt_volpage
    )[0]

    LET translated_titles = (
        FOR translation IN translations
            FILTER translation.lang == @language AND HAS(translation, 'title')
            LIMIT 1
            RETURN translation.title
    )[0]

    LET original_titles = (
        FOR original_name IN names
            FILTER original_name.uid == v.uid AND original_name.is_root == true
            LIMIT 1
            RETURN original_name.name
    )[0]

    SORT e.number, e.to
    RETURN {
        from: e.from,
        enumber: e.number,
        to: {
            to: e.to,
            volpages: volpages,
            alt_volpages: alt_volpages,
            acronym: v.acronym,
            uid: v.uid ? v.uid : 'orphan',
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
                FOR author IN bilara_author_edition
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
                FOR author IN bilara_author_edition
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
        root_text: translated_bilara_obj ? root_bilara_obj : legacy_html[0],
        translation: translated_bilara_obj ? (root_bilara_obj == translated_bilara_obj ? null : translated_bilara_obj)
            : (FOR html IN legacy_html FILTER html.lang == @language LIMIT 1 RETURN html)[0],
        segmented: translated_bilara_obj ? true : false,
        suttaplex: suttaplex,
        bilara_root_text: root_bilara_obj,
        bilara_translated_text: translated_bilara_obj
    }
'''
)

SUTTA_NAME = '''
LET translated_name = (
    FOR name IN names
        FILTER name.uid == @uid AND name.is_root == false AND name.lang == @lang
        LIMIT 1
        RETURN name.name
)[0]

LET root_name = (
    FOR name IN names
        FILTER name.uid == @uid AND name.is_root == true
        LIMIT 1
        RETURN name.name
)[0]

RETURN translated_name ? translated_name : root_name
'''

VAGGA_CHILDREN = '''
    FOR doc IN 1..100 OUTBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges
      FILTER doc.type == 'leaf'
          RETURN doc.uid
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

SEGMENTED_TRANSLATION_TEXT = '''
LET result = MERGE(
    FOR doc IN sc_bilara_texts
        FILTER doc.uid == @uid
        FILTER 'translation_text' IN doc.muids OR @language IN doc.muids

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
    FILTER epigraph.lang == @lang
    SORT RAND()
    LIMIT @number
    RETURN KEEP(epigraph, ['uid', 'epigraph'])
'''

WHY_WE_READ = '''
FOR text IN why_we_read
    FILTER text.lang == @lang
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
        FILTER dict.entry == @word AND dict.to == @language
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
        FILTER dict.word == @word AND dict.to == @language
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

DICTIONARY_FUZZY_SEARCH_RESULT_FULL = '''
LET dic_complex = (
    FOR doc IN dictionaries_complex
        FILTER doc.to == @language AND (doc.word LIKE @fuzzy_word OR doc.word_ascii LIKE @fuzzy_word)
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
        FILTER doc.to == @language AND doc.entry LIKE @fuzzy_word
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
        xr: dict.xr,
        pronunciation: dict.pronunciation
    }
'''

EXPANSION = '''
LET expansion_item = (
    FOR entry IN uid_expansion
        RETURN { [ entry.uid ]: [ entry.acronym, entry.name ] }
    )

RETURN MERGE(expansion_item)
'''


class PWA:
    MENU = '''
LET langs = UNION(@languages ? @languages : [], @include_root ? (
        FOR lang IN language FILTER lang.is_root RETURN lang.uid
    ) : [])

LET menu = (
    FOR div IN 1..6 OUTBOUND DOCUMENT('super_nav_details', 'sutta') super_nav_details_edges OPTIONS {order: 'dfs'}
        LET has_subdivisions = LENGTH(
            FOR d, d_edge, d_path IN 1..1 OUTBOUND div super_nav_details_edges OPTIONS {order: 'dfs'}
                FILTER d_edge.type != 'leaf'
                LIMIT 1
                RETURN 1
            )
        FILTER has_subdivisions
        RETURN div.uid
    )

LET grouped_children = MERGE(
    FOR d, d_edge, d_path IN 1..20 OUTBOUND DOCUMENT('super_nav_details', 'sutta') super_nav_details_edges OPTIONS {order: 'dfs'}
        COLLECT is_div = d.type != 'leaf' INTO uids = d.uid
        RETURN {[is_div ? 'branch' : 'leaf']: uids}
)

LET suttaplex =  REMOVE_VALUES(grouped_children['branch'], ['long', 'middle', 'linked', 'numbered', 'minor', 'other-group',
                                                            'dn', 'da', 'mn', 'ma', 'sn', 'sa', 'an', 'ea', 'kn', 'thig', 'thag',
                                                            'kn', 'dhp', 'iti', 'snp', 'vv', 'pv', 'tha-ap', 'thi-ap', 'bv', 'cp',
                                                            'ja', 'mnd', 'cnd', 'ps', 'ne', 'pe', 'mil', 'uv', 'uvs', 'pdhp', 'gdhp',
                                                            'minor-lzh', 'avs', 'other-xct'])

LET texts = (
    FOR text IN v_text FILTER text.lang IN langs AND text.uid IN grouped_children['leaf']
        FILTER HAS(text, "author_uid") or LENGTH(text.muids) >= 3
        COLLECT uid = text.uid INTO groups = {lang: text.lang, author_uid: HAS(text, 'author_uid') ? text.author_uid : text.muids[2]}
        RETURN {uid, translations:(
            FOR text IN groups
                COLLECT lang = text.lang INTO authorsOfLang = text.author_uid
                LET authors = UNIQUE(authorsOfLang)
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
        FOR v, e, p IN 0..10 INBOUND doc super_nav_details_edges OPTIONS {order: 'dfs'}
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
    FILTER div.uid
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
        LET author_fullname = (FOR author_doc IN bilara_author_edition
            FILTER author_doc.type == 'author' AND author_doc.uid == author
        RETURN author_doc.long_name)[0]
        SORT null
        RETURN {
            author: author_fullname,
            total
        }
    )

FOR subcount IN APPEND(legacy_counts, segmented_counts)
    /* If there are multiple authors split them and count separately */
    FOR author_name IN SPLIT(subcount.author, ', ')
        FILTER author_name != '' AND author_name != 'site'
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
    FOR doc IN 1..100 INBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
        RETURN doc.uid
)
RETURN {
    'full_path': CONCAT_SEPARATOR('/', REVERSE(APPEND(path_docs, '/pitaka')))
}
'''

ALL_DOC_UID_BY_ROOT_UID = '''
LET root_uid = REVERSE(POP(
FOR doc IN 1..10 INBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
    FILTER doc.type == 'branch'
    RETURN doc.uid
))[0]

FOR docs IN 1..10 OUTBOUND DOCUMENT('super_nav_details', root_uid) super_nav_details_edges OPTIONS {order: 'dfs'}
    FILTER docs.type == 'leaf'
    RETURN docs.uid
'''

CANDIDATE_AUTHORS = '''
LET bilara_translations = (
    FOR doc IN sc_bilara_texts
        FILTER doc.uid == @uid AND doc.lang == @lang AND 'translation' IN doc.muids AND doc.muids[2] != @author_uid
        SORT RAND()
        return doc.muids[2]
)

LET legacy_translations = (
    FOR html IN html_text
        FILTER html.uid == @uid AND html.lang == @lang AND html.author_uid != @author_uid
        SORT RAND()
        RETURN html.author_uid
)

RETURN UNION(bilara_translations, legacy_translations)
'''

SUTTA_PALI_REFERENCE = '''
FOR pali IN pali_reference_edition
    COLLECT edition_set = pali.edition_set, name = pali.name, short_name = pali.short_name
    RETURN {
        edition_set: edition_set,
        name: NOT_NULL(name, short_name)
    }
'''

ALL_TEXTS_BY_LANGUAGES = '''
FOR doc IN v_text
    SEARCH doc.lang IN @languages
    LET langs = REMOVE_VALUE(@languages, 'pli')
    FILTER doc.lang IN langs OR (doc.lang == 'pli' AND 'root' IN doc.muids)
    RETURN doc
'''

SUTTA_PUBLICATION_INFO = '''
LET path_docs = (
    FOR doc IN 1..100 INBOUND DOCUMENT('super_nav_details', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
        RETURN doc.uid
)
FOR pub_doc IN publications
    FILTER (pub_doc.text_uid IN path_docs OR pub_doc.text_uid == @uid) AND pub_doc.translation_lang_iso == @lang
    AND (pub_doc.author_uid == @authorUid OR @authorUid IN pub_doc.collaborator[*].collaborator_uid)
    RETURN pub_doc
'''

PLI_SUTTA_PUBLICATION_INFO = '''
FOR pliPublication IN publications
    FILTER pliPublication.publication_number == 'scpub64'
    RETURN pliPublication
'''

AVAILABLE_VOICES = '''
FOR v IN available_voices
    FILTER v.uid == @uid
    RETURN {
        uid: v.uid,
        voices: v.voices
    }
'''

BILARA_REFERENCES = '''
FOR references IN sc_bilara_texts
    FILTER 'reference' IN references.muids
RETURN {
    'uid': references.uid,
    'file_path': references.file_path
}
'''

UPDATE_TEXT_EXTRA_INFO_VOLPAGE = '''
UPSERT { uid: @uid }
INSERT { uid: @uid, acronym: null, alt_acronym: null, volpage: @ref, alt_volpage: null, alt_name: null, biblio_uid: null }
UPDATE {
    volpage: @ref
} IN text_extra_info
'''

UPDATE_TEXT_EXTRA_INFO_ALT_VOLPAGE = '''
UPSERT { uid: @uid }
INSERT { uid: @uid, acronym: null, alt_acronym: null, volpage: null, alt_volpage: @ref, alt_name: null, biblio_uid: null }
UPDATE {
    alt_volpage: @ref
} IN text_extra_info
'''

UPSERT_TEXT_EXTRA_ACRONYM_INFO = '''
UPSERT { uid: @uid }
INSERT { uid: @uid, acronym: @acronym, alt_acronym: null, volpage: null, alt_volpage: null, alt_name: null, biblio_uid: null }
UPDATE {
    acronym: @acronym
} IN text_extra_info
'''

UPDATE_SUPER_NAV_DETAILS_ACRONYM_INFO = '''
FOR u IN super_nav_details
    FILTER u.uid == @uid
    UPDATE u WITH { acronym: @acronym } IN super_nav_details
'''

UPSERT_NAMES = '''
UPSERT { uid: @uid, lang: @lang }
INSERT { name: @name, is_root: false, lang: @lang, uid: @uid }
UPDATE {
} IN names
'''

UPSERT_ROOT_NAMES = '''
UPSERT { uid: @uid, is_root: true }
INSERT { name: @name, is_root: true, lang: null, uid: @uid }
UPDATE {
  name: @name
} IN names
'''

INSERT_EBS_NAMES = '''
    LET ebs_prefixes = ["dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an", "ea", "ea-2", "kp", "iti", "ud", "snp",
                "dhp", "thig", "thag", "sf"]

    FOR d IN names
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

        INSERT { uid: d.uid, lang: d.lang, is_root: d.is_root, name: d.name, node_type: navigation_doc.type  } INTO ebs_names
'''

RANGE_UIDS = '''
FOR n IN names
    FILTER n.is_root == true AND REGEX_TEST(n.uid, "\\\\d+-\\\\d+")
        AND n.uid NOT LIKE '%sa%'
        AND n.uid NOT LIKE '%pdhp%'
        AND n.uid NOT LIKE '%gdhp%'
        AND n.uid NOT LIKE '%g3dhp%'
    RETURN n.uid
'''


PARALLELS_LITE = '''
FOR v IN 0..6 OUTBOUND CONCAT('super_nav_details/', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
    FILTER v.type == 'leaf'
    LET parallels = (
        FOR k, e IN OUTBOUND CONCAT('super_nav_details/', v.uid) relationship
            LET parallel_legacy_root = (
                FOR text IN html_text
                    FILTER text.uid == k.uid AND text.lang == 'lzh'
                    LIMIT 1
                    LET res = {
                        uid: text.uid,
                        lang: text.lang,
                        author_uid: text.author_uid,
                        }
                    RETURN res
                )

            LET parallel_bilara_root = (
                FOR text IN sc_bilara_texts
                    FILTER text.uid == k.uid AND 'root' IN text.muids
                    LET res = {
                        uid: text.uid,
                        lang: text.lang,
                        author_uid: text.muids[2],
                    }
                    RETURN res
            )

            LET parallel_root = FLATTEN([parallel_bilara_root, parallel_legacy_root])

            RETURN {
                from: e.from,
                to: {
                    to: e.to,
                    uid: k.uid,
                    acronym: k.acronym,
                    parallel_root: parallel_root
                }
            }
    )

    LET original_legacy_root = (
        FOR text IN html_text
            FILTER text.uid == v.uid AND text.lang == 'lzh'
            LIMIT 1
            LET res = {
                uid: text.uid,
                lang: text.lang,
                author_uid: text.author_uid,
                }
            RETURN res
        )

    LET original_bilara_root = (
        FOR text IN sc_bilara_texts
            FILTER text.uid == v.uid AND 'root' IN text.muids
            LET res = {
                uid: text.uid,
                lang: text.lang,
                author_uid: text.muids[2],
            }
            RETURN res
    )

    LET original_root = FLATTEN([original_bilara_root, original_legacy_root])

    RETURN {
        uid: v.uid,
        name: v.name,
        acronym: v.acronym,
        parallels: parallels,
        original_root: original_root
    }
'''


EBOOK_DATA_QUERY = '''
LET translation_filter = SPLIT(@translation_muids, '-')

FOR doc, edge, path IN 0..10 OUTBOUND CONCAT('super_nav_details/', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
    LET uid = doc.uid
    LET name = FIRST(FOR name_doc IN names FILTER name_doc.uid == doc.uid AND name_doc.lang == @lang RETURN name_doc.name)

    LET blurb = FIRST(
        FOR blurb_doc in blurbs
        FILTER blurb_doc.uid == uid
        FILTER blurb_doc.lang == @lang
        RETURN blurb_doc
    )

    LET files = MERGE(
        FOR file_doc IN sc_bilara_texts
            FILTER file_doc.uid == uid
            FOR key IN ATTRIBUTES(@file_data)
                LET value = SPLIT(@file_data[key], '-')
                FILTER file_doc.muids ALL IN value
                RETURN {[key]: file_doc.file_path}
    )

    RETURN {
        uid,
        type: doc.type,
        name: name,
        blurb: blurb.blurb,
        files
    }
'''

ACRONYM_IS_NULL_UIDS = '''
FOR doc IN super_nav_details
    FILTER doc.type == 'leaf' AND doc.acronym == null
    RETURN doc.uid
'''

SINGLE_ROOT_TEXT = '''
FOR root IN sc_bilara_texts
    FILTER 'root' IN root.muids
    AND root.lang == 'pli'
    AND root.uid == @uid
    RETURN root
'''

ABBREVIATION_SUPER_NAME_ACRONYM = '''
FOR name_doc IN super_name
    LET acronym = (
        FOR doc IN super_nav_details
            FILTER doc.uid == name_doc.uid
            RETURN doc.acronym
    )[0]
    RETURN {
        name: name_doc.name,
        acronym: acronym
    }
'''

NAVIGATION_QUERY = '''
FOR uid IN @uids
    LET navigation_doc = DOCUMENT('super_nav_details', uid)

    LET descendants = (
        FOR descendant IN OUTBOUND navigation_doc super_nav_details_edges OPTIONS {order: 'dfs'}
            LET translated_name = DOCUMENT('names', CONCAT_SEPARATOR('_', descendant.uid, @language))['name']
            RETURN {
                uid: descendant.uid,
                root_name: descendant.name,
                translated_name: translated_name,
                acronym: descendant.acronym,
                node_type: descendant.type,
            }
        )

    LET translated_name = DOCUMENT('names', CONCAT_SEPARATOR('_', navigation_doc.uid, @language))['name']

    RETURN {
        uid: navigation_doc.uid,
        root_name: navigation_doc.name,
        translated_name: translated_name,
        node_type: navigation_doc.type,
        acronym: navigation_doc.acronym,
        children: descendants,
    }
'''
