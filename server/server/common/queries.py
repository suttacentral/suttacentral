LANGUAGES = '''FOR l in language
                SORT l.name
                RETURN {
                    "uid": l.uid,
                    "name": l.name,
                    "iso_code": l.iso_code,
                    "is_root": l.is_root,
                    "localized": !!l.localized,
                    "localized_percent": l.localized_percent ? l.localized_percent : 0
                    }'''

TEXTS_BY_LANG = '''
FOR text IN html_text
        FILTER text.lang == @lang
        LET root = (
            RETURN DOCUMENT(CONCAT('root/', text.uid))
        )[0]
        RETURN {
            file_path: text.file_path,
            uid: text.uid,
            mtime: text.mtime,
            author: text.author,
            author_uid: text.author_uid,
            author_short: text.author_short,
            root_lang: root.root_lang,
            acronym: root.acronym
        }
'''

PO_TEXTS_BY_LANG = '''
FOR text IN po_strings
    FILTER text.lang == @lang
    LET root = (
        RETURN DOCUMENT(CONCAT('root/', text.uid))
    )[0]
    RETURN {
        uid: text.uid,
        title: text.title,
        strings_path: text.strings_path,
        author: text.author,
        author_uid: text.author_uid,
        author_short: text.author_short,
        root_lang: root.root_lang,
        acronym: root.acronym,
        mtime: text.mtime
    }
'''        

# Returns all uids in proper order assuming num is set correctly in data
UIDS_IN_ORDER_BY_DIVISION = '''
FOR division IN root
    FILTER division.type == 'division'
    LET division_uids = (
        FOR doc, edge, path IN 0..10 OUTBOUND division root_edges OPTIONS {bfs: False}
            LET path_nums = path.vertices[*].num
            SORT path_nums
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
FOR div IN root
    FILTER div.type == 'division'
    LET parents = MERGE(
        FOR p, p_edge, p_path IN 1..1 INBOUND div `root_edges`
            RETURN {
                [p.type]: {
                    name: p.name,
                    uid: p._id,
                    num: p.num
                }
            }
        )
    LET descendant = (
        FOR d, d_edge, d_path IN 1..1 OUTBOUND div `root_edges`
            FILTER d_edge.type != 'text'
            LIMIT 1
            RETURN d.uid
    )[0]
    LET root_language = div.root_lang ? DOCUMENT(CONCAT('language/', div.root_lang))['name'] : ''
    LET name = DOCUMENT(CONCAT('root_names/', div.uid, '_', @language))['name']
    RETURN {
        uid: div._id, 
        has_children: descendant != null,
        name: name ? name : div.name,
        lang_iso: div.root_lang,
        lang_name: root_language,
        num: div.num, 
        id: div.uid, 
        type: div.type, 
        parents: parents,
        display_num: div.display_num
    }
'''

SUBMENU = '''
LET div = DOCUMENT('root', @submenu_id)

LET descendents = (
    FOR d, d_edge, d_path IN 1..100 OUTBOUND div `root_edges`
        FILTER d_edge.type != 'text' OR LENGTH(d_path.vertices) <= 2
        LET name = DOCUMENT(CONCAT('root_names/', d.uid, '_', @language))['name']
        LET root_language = d.root_lang ? DOCUMENT(CONCAT('language/', d.root_lang))['name'] : ''
        RETURN {
            from: d_edge._from,
            name: name ? name : d.name,
            uid: d._id,
            num: d.num,
            type: d.type,
            id: d.uid,
            lang_iso: (NOT div.root_lang AND LENGTH(d_path.edges) == 1) ? d.root_lang : null,
            lang_name: root_language,
            display_num: d.display_num
    }
)
LET parents = MERGE(
    FOR p, p_edge, p_path IN 1..1 INBOUND div `root_edges`
        RETURN {
            [p.type]: {
                name: p.name,
                uid: p._id,
                num: p.num,
                type: p.type
        }
    }
)

RETURN {
    name: div.name,
    num: div.num,
    id: div.uid,
    uid: div._id,
    descendents: descendents,
    parents: parents
}
'''

# Takes 2 bind_vars: `language` and `uid` of root element
SUTTAPLEX_LIST = '''
FOR v, e, p IN 0..6 OUTBOUND CONCAT('root/', @uid) `root_edges`
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
                segmented: false
                }
            // Add title if it is in desired language
            LET res2 = (text.lang == @language) ? MERGE(res, {title: text.name}) : res 
            // Add volpage info if it exists.
            RETURN (text.volpage != null) ? MERGE(res2, {volpage: text.volpage}) : res2
        )

    LET po_translations = (
        FOR text IN po_strings
            FILTER text.uid == v.uid
            SORT text.lang
            LET lang_doc = DOCUMENT('language', text.lang)
            RETURN {
                lang: text.lang,
                lang_name: lang_doc.name,
                is_root: lang_doc.is_root,
                author: text.author,
                author_short: text.author_short,
                author_uid: text.author_uid,
                id: text._key,
                segmented: true,
                title: text.title
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
    
    LET legacy_volpages = (
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
        FOR original_name IN root_names
            FILTER original_name.uid == v.uid
            LIMIT 1
            RETURN original_name.name
    )[0]

    RETURN {
        acronym: v.acronym,
        volpages: v.volpage ? v.volpage : legacy_volpages[0],
        uid: v.uid,
        blurb: blurb,
        difficulty: difficulty,
        original_title: original_titles,
        root_lang: v.root_lang,
        root_lang_name: DOCUMENT('language', v.root_lang).name,
        type: e.type ? e.type : (v.type ? v.type : 'text'),
        from: e._from,
        translated_title: translated_titles,
        translations: filtered_translations,
        parallel_count: parallel_count,
        biblio: biblio,
        num: v.num
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
                lang_name: (FOR lang in language FILTER lang.uid == text.lang LIMIT 1 RETURN lang.name)[0],
                author: text.author,
                author_short: text.author_short,
                author_uid: text.author_uid,
                id: text._key,
                segmented: false
                }
            // Add title if it is in desired language
            LET res2 = (text.lang == @language) ? MERGE(res, {title: text.name}) : res 
            // Add volpage info if it exists.
            RETURN (text.volpage != null) ? MERGE(res2, {volpage: text.volpage}) : res2
        )

    LET po_translations = (
        FOR text IN po_strings
            FILTER text.uid == target.uid
            LET res = {
                lang: text.lang,
                lang_name: (FOR lang in language FILTER lang.uid == text.lang LIMIT 1 RETURN lang.name)[0],
                author: text.author,
                author_short: text.author_short,
                author_uid: text.author_uid,
                id: text._key,
                segmented: true
            }
            //Text.strings[1][1] is a temporary hack, we have to wait for Blake to finish data manipulation.
            RETURN (text.lang == @language) ? MERGE(res, {title: text.strings[1][1]}) : res
    )
    
    LET legacy_volpages = (
        FOR text IN legacy_translations
            FILTER HAS(text, "volpage")
            RETURN text.volpage
    )[0]
    
    SORT e.resembling
    
    LET biblio = (
        FOR biblio IN biblios
            FILTER biblio.uid == v.biblio_uid
            LIMIT 1
            RETURN biblio.text
    )[0]

    LET translations = FLATTEN([po_translations, legacy_translations])

    LET translated_titles = (
        FOR translation IN translations
            FILTER translation.lang == @language AND HAS(translation, 'title')
            LIMIT 1
            RETURN translation.title
    )[0]

    LET original_titles = (
        FOR original_name IN root_names
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
            volpages: v.volpage ? v.volpage : legacy_volpages,
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

# Takes 2 bind_vars: `from` and `to`.
DICTIONARIES = '''
FOR dict IN dictionaries
    FILTER dict.from == @from AND dict.to == @to AND dict.lookup == true AND dict.main == @main
    LIMIT 1
    RETURN {
        from: dict.from,
        to: dict.to,
        dictionary: dict.dictionary
    }
'''

SUTTA_VIEW = '''
LET root_text = DOCUMENT(CONCAT('root/', @uid))

LET legacy_html = (
    FOR html IN html_text
        FILTER html.uid == @uid AND ((html.lang == @language AND LOWER(html.author_uid) == @author_uid) OR html.lang == root_text.root_lang)
        
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

LET markup_path = (
    FOR markup IN po_markup
        FILTER markup.uid == @uid
        LIMIT 1
        RETURN markup.markup_path
)[0]

LET root_po_obj = (
    FOR object IN po_strings
        FILTER object.uid == @uid AND object.lang == root_text.root_lang
        LIMIT 1 
        RETURN {
            uid: object.uid,
            author: object.author,
            author_short: object.author_short,
            author_uid: object.author_uid,
            author_blurb: object.author_blurb,
            lang: object.lang,
            strings_path: object.strings_path,
            title: object.title,
            next: object.next,
            previous: object.prev
        }
)[0]

LET translated_po_obj = (
    FOR object IN po_strings 
        FILTER object.uid == @uid AND object.lang == @language AND object.author_uid == @author_uid
        LIMIT 1 
        RETURN {
            uid: object.uid,
            author: object.author,
            author_short: object.author_short,
            author_uid: object.author_uid,
            author_blurb: object.author_blurb,
            lang: object.lang,
            strings_path: object.strings_path,
            title: object.title,
            next: object.next,
            previous: object.prev
        }
)[0]

LET suttaplex = (''' + SUTTAPLEX_LIST + ''')[0]
    
RETURN {
    root_text: translated_po_obj ? root_po_obj : null,
    translation: translated_po_obj ? (root_po_obj == translated_po_obj ? null : translated_po_obj) 
        : (FOR html IN legacy_html FILTER html.lang == @language LIMIT 1 RETURN html)[0],
    segmented: translated_po_obj ? true : false,
    markup_path: translated_po_obj ? markup_path : null,
    suttaplex: suttaplex
}
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

DICTIONARYFULL = '''
FOR dictionary IN dictionary_full
    FILTER dictionary.word == @word
    RETURN {
        dictname: dictionary.dictname,
        text: dictionary.text
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

GLOSSARY = '''
LET glossary_item = (
    FOR dictionary IN dictionary_full
        FILTER dictionary.dictname == "gloss"
        RETURN { [ dictionary.word ]: dictionary.text }
    )
    
RETURN MERGE(glossary_item)
'''

DICTIONARY_ADJACENT = '''
LET word_number = (
    FOR dictionary IN dictionary_full
        FILTER dictionary.word == @word
        LIMIT 1
        RETURN dictionary.num
    )

LET adjacent_words = (
    FOR selected IN dictionary_full
        FILTER selected.num < word_number+6
        FILTER selected.num > word_number-6
        SORT selected.num
        RETURN selected.word
    )
    
RETURN UNIQUE(adjacent_words)
'''

DICTIONARY_SIMILAR = '''
RETURN FLATTEN(
    FOR doc IN FULLTEXT(dictionary_full, 'word_ascii', CONCAT('prefix:', LEFT(@word_ascii, 1)))
        FILTER doc.word != @word
        LET ed = LEVENSHTEIN_DISTANCE(@word_ascii, doc.word_ascii) + LEVENSHTEIN_DISTANCE(@word, doc.word)
        FILTER ed < 4
        SORT ed
        LIMIT 10
        RETURN doc.word        
    )
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
FOR div IN root
    FILTER div.type == 'division'
    LET parents = MERGE(
        FOR p, p_edge, p_path IN 1..1 INBOUND div `root_edges`
            RETURN {
                [p.type]: {
                    uid: p._id
                }
            }
        )

    LET texts = (
        FOR d, d_edge, d_path IN 1..20 OUTBOUND div `root_edges`
            FILTER d.type == 'text' OR d_edge.type == 'text'
            LET po = (
                FOR text IN po_strings
                    FILTER text.uid == d.uid AND (POSITION(@languages, text.lang) OR 
                                                  (text.lang == d.root_lang AND @root_lang))  
                    RETURN {author_uid: text.author_uid, lang: text.lang}
            )
            LET legacy = (
                FOR text IN html_text
                    FILTER text.uid == d.uid AND (POSITION(@languages, text.lang) OR 
                                                  (text.lang == d.root_lang AND @root_lang))
                    RETURN {author_uid: text.author_uid, lang: text.lang}
            )
            FILTER LENGTH(po) > 0 OR LENGTH(legacy) > 0
            LET all_texts = UNION(po, legacy)
            LET languages = (
                FOR text IN all_texts
                    RETURN DISTINCT text.lang
            )
            
            LET m = (
                FOR l IN languages
                    LET in_lang = (
                        FOR text IN all_texts
                            FILTER text.lang == l
                            RETURN text.author_uid
                    )
                    RETURN {lang: l, authors: in_lang}
            )
            
            RETURN {uid: d.uid, translations: m}
    )
    LET suttaplex = (
        FOR d, d_edge, d_path IN 1..20 OUTBOUND div `root_edges`
            FILTER d_edge.type != 'text'
            RETURN d.uid
    )
    RETURN {
        uid: div._id, 
        has_children: LENGTH(suttaplex) != 0,
        texts: texts,
        suttaplex: suttaplex,
        id: div.uid, 
        parents: parents
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
LET legacy_counts = MERGE(
    FOR doc IN html_text
        COLLECT lang = doc.lang WITH COUNT INTO lang_count
        RETURN {[lang]: lang_count}
    )

LET segmented_counts = MERGE(
    FOR doc IN po_strings
        COLLECT lang = doc.lang WITH COUNT INTO lang_count
        RETURN {[lang]: lang_count}
    )

LET langs = (
    FOR lang IN language
        SORT lang.iso_code
        RETURN {
            num: lang.num,
            iso_code: lang.iso_code,
            is_root: lang.is_root,
            name: lang.name,
            total: legacy_counts[lang.iso_code] + segmented_counts[lang.iso_code]
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
    ancient: sorted_langs["true"][* RETURN UNSET(CURRENT, 'is_root', 'num')],
    modern: sorted_langs["false"][* RETURN UNSET(CURRENT, 'is_root', 'num')]
}
'''

TRANSLATION_COUNT_BY_DIVISION = '''
/* First we count the number of texts by (sub)division uid based on pattern matching */

LET legacy_counts = MERGE(
    FOR doc IN html_text
        FILTER doc.lang == @lang
        COLLECT division_uid = REGEX_REPLACE(doc.uid, '([a-z]+(?:-[a-z]+|-[0-9]+)*).*', '$1') WITH COUNT INTO div_count
        SORT null
        RETURN {
            [division_uid]: div_count
        }
    )
    
LET segmented_counts = MERGE(
    FOR doc IN po_strings
        FILTER doc.lang == @lang
        COLLECT division_uid = REGEX_REPLACE(doc.uid, '([a-z]+(?:-[a-z]+|-[0-9]+)*).*', '$1') WITH COUNT INTO div_count
        SORT null
        RETURN {
            [division_uid]: div_count
        }
    )


/* Merge keys */

LET keys = APPEND(ATTRIBUTES(legacy_counts), ATTRIBUTES(segmented_counts))

FOR key IN keys
    LET doc = DOCUMENT('root', key)
    FILTER doc
    /* Determine the highest division level */
    LET highest_div = LAST(
        FOR v, e, p IN 0..10 INBOUND doc `root_edges`
        FILTER v.type == 'division'
        RETURN {
            uid: v.uid,
            name: v.name,
            root_lang: v.root_lang,
            num: v.num
        }
    )
    COLLECT div = highest_div /* Filter out the subdivisions */
    /* But accumulate their counts */
    AGGREGATE total = SUM(legacy_counts[key] + segmented_counts[key])
    SORT div.num
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
    FOR doc IN po_strings
        FILTER doc.lang == @lang
        COLLECT author = doc.author WITH COUNT INTO total
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

AVAILABLE_TRANSLATIONS_LIST = '''
LET legacy_texts = (
    FOR doc IN html_text
        FILTER doc.lang == @lang
        COLLECT uid = doc.uid
        SORT null
        RETURN uid
    )
    
LET modern_texts = (
    FOR doc IN po_strings
        FILTER doc.lang == @lang
        COLLECT uid = doc.uid
        SORT null
        RETURN uid
    )
    
LET text_uids = UNION_DISTINCT(legacy_texts, modern_texts)

LET division_uids = UNIQUE(
    FOR uid IN text_uids
        RETURN REGEX_REPLACE(uid, '([a-z]+(?:-[a-z]+|-[0-9]+)*).*', '$1')
    )

/* Perform a graph traversal on estimated division_uids, we could do this with the 
text uids but it takes about 200ms */
LET parents = UNIQUE(FLATTEN(
    FOR uid in division_uids
        LET parents = (
            LET doc = DOCUMENT('root', uid)
            FILTER doc
            FOR v, e, p IN 1..5 INBOUND doc `root_edges`
                FILTER v.type != 'language'
                RETURN v.uid
            )
        return parents
))

RETURN UNION_DISTINCT(parents, division_uids, text_uids)
'''



GET_ANCESTORS = '''
    /* Return uids that are ancestors to any uid in @uid_list */
    RETURN UNIQUE(FLATTEN(
        FOR uid in ['pli-tv-bi-vb-ss', 'pli-tv-bi-vb-sk', 'pli-tv-bu-vb-pd', 'pli-tv-bi-pm', 'sf', 'vv', 'pli-tv-bu-vb-np', 'pli-tv-bi-vb-pc', 'ds', 'xct-mu-bu-pm', 'thag', 'patthana', 'pdhp', 'iti', 'pli-tv-bu-vb-ay', 'sn', 'pp', 'ud', 'sa-2', 'pli-tv-pvr', 'da', 'pv', 'pli-tv-bu-vb-as', 'dn', 'arv', 'ma', 'kp', 'thi-ap', 'lal', 'pli-tv-bi-vb-pd', 'snp', 'pli-tv-bi-vb-np', 'pli-tv-bu-vb-pj', 'pli-tv-bi-vb-as', 'ja', 'thig', 'vb', 'pli-tv-bi-vb-pj', 'ea', 'pli-tv-bu-vb-ss', 'lzh-dg-kd', 'mn', 'tha-ap', 'an', 'kv', 'up', 'pli-tv-bu-vb-pc', 't', 'sa', 'mil', 'uv-kg', 'lzh-dg-bu-pm', 'dhp', 'pli-tv-kd']
            LET parents = (
                LET doc = DOCUMENT('root', uid)
                FILTER doc
                FOR v, e, p IN 1..5 INBOUND doc `root_edges`
                    FILTER v.type != 'language'
                    RETURN v.uid
                )
            return parents
    ))
'''

