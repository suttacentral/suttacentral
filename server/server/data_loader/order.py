import regex
import logging
import itertools
from collections import defaultdict

from data_loader.util import numericsortkey, sort_and_groupby
from common.queries import UIDS_IN_ORDER_BY_DIVISION




def get_uid_stem(uid):
    """ This suffices for this module """
    return regex.match(r'^[a-z]+', uid)[0]


def further_split_uids(divisions):
    # Split divisions into subdivisions
    # The vast majority of divisions will simply be returned unmodified
    for division_uid, uids_in_division in divisions:
        stems = []
        groups = []
        for stem, group in itertools.groupby(uids_in_division, key=get_uid_stem):
            stems.append(stem)
            groups.append(tuple(group))
        if len(stems) == 1:
            yield division_uid, uids_in_division
        else:
            for stem, group in zip(stems, groups):
                yield stem, group


def get_matching_uids(divisions, text_uids, lang):
    """ yields uids belonging to the same division in proper order """
    text_uids = set(text_uids)
    not_found = set(text_uids)
    
    for division_uid, uids in divisions:
        matches = tuple(uid for uid in uids if uid in text_uids)
        yield matches
        not_found.difference_update(matches)
    
    # By now not_found should be empty!
    if not_found:
        bad_uids = ', '.join(sorted(not_found, key=numericsortkey))
        logging.error(f'Text uids do not match menu uids for ({lang}): {bad_uids}')
    

def get_best_match(text, other_texts):
    author_uid = text['author_uid']
    for other_text in other_texts:
        if other_text['author_uid'] == author_uid:
            return other_text
    for other_text in other_texts:
        if other_text['segmented']:
            return other_text
    return sorted(other_texts, key=lambda t: t['author_uid'])[0] # TODO:Improve

def add_next_prev_using_menu_data(db):
    po_texts = list(db.aql.execute('''
        FOR doc IN po_strings
            RETURN {
                _key: doc._key,
                uid: doc.uid,
                lang: doc.lang,
                author_uid: doc.author_uid,
                name: doc.title,
                segmented: true
            }
    '''))
    
    html_texts = list(db.aql.execute('''
        FOR doc IN html_text
            RETURN {
                _key: doc._key,
                uid: doc.uid,
                lang: doc.lang,
                author_uid: doc.author_uid,
                name: doc.name,
                segmented: false
            }
    '''))
    
    
    texts = po_texts + html_texts
    
    divisions = [(doc['division'], tuple(doc['uids'])) for doc in db.aql.execute(UIDS_IN_ORDER_BY_DIVISION)]
    divisions = list(further_split_uids(divisions))
    
    
    
    # First group texts by language
    for lang, lang_texts in sort_and_groupby(texts, lambda text: text['lang']):
        
        #Build a mapping of uids to translations of that uid in this lang
        mapping = defaultdict(dict)
        for text in lang_texts:
            uid = text['uid']
            author_uid = text['author_uid']
            mapping[uid][author_uid] = text
        
        collection_updates = defaultdict(dict)
        
        for matches in get_matching_uids(divisions=divisions, text_uids=set(mapping), lang=lang):
            # matches contains a list of uids in the same division in proper order
            for i, uid in enumerate(matches):
                for lang, text in mapping[uid].items():
                    if i > 0:
                        prev_uid = matches[i-1]
                        best_match = get_best_match(text, mapping[prev_uid].values())
                        
                        collection_updates[text['_key']].update({
                            'prev': {
                                'author_uid': best_match['author_uid'],
                                'lang': best_match['lang'],
                                'name': best_match['name'],
                                'uid': best_match['uid']
                            }
                        })
                    if i < len(matches) - 1:
                        next_uid = matches[i+1]
                        best_match = get_best_match(text, mapping[next_uid].values())
                        collection_updates[text['_key']].update({
                            'next': {
                                'author_uid': best_match['author_uid'],
                                'lang': best_match['lang'],
                                'name': best_match['name'],
                                'uid': best_match['uid']
                            }
                        })
    
        for collection, texts in [(db['po_strings'], po_texts), (db['html_text'], html_texts)]:
            matching_keys = {text['_key'] for text in texts}
            updates = [{'_key': _key, **update} for _key, update in collection_updates.items() if _key in matching_keys]
            collection.import_bulk(updates, on_duplicate="update")
