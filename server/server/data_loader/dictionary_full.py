import json
from tqdm import tqdm
from collections import Counter
from .textfunctions import asciify_roman, pali_sort_key
from .fuzzymatcher import FuzzyMatcher
from .util import json_load

def load_dictionary_full(db, dictionaries_dir, change_tracker):
    print('Loading dictionary_full')
    
    dictionary_full_files = list((dictionaries_dir / 'en').glob('*.json'))
    if not change_tracker.is_any_file_new_or_changed(dictionary_full_files):
        return
    
    dictionary_full_collection = db['dictionary_full']
    docs = []
    # For now hardcode this, in the future we may have other pairs
    lang_from = 'pli'
    lang_to = 'en'
    words_seen = Counter()    
    ids_seen = Counter()
    for dictionary in tqdm(dictionary_full_files):
        entries = json_load(dictionary)
        for entry in entries:
            word = entry['word'].lower()
            words_seen[word] += 1
            
            # create a meaningful id
            word_ascii = asciify_roman(word)
            _id = word_ascii
            if _id in ids_seen:
                _id += str(ids_seen[_id])
            ids_seen[_id] += 1
            words_seen[word] += 1
            
            doc = {'_id': _id,
                   'dictname': dictionary.stem,
                   'lang_to': lang_to,
                   'lang_from': lang_from,
                   **entry,
                   'word': word,
                   'word_ascii': word_ascii
                   }
            docs.append(doc)
    
    words_sorted = sorted(words_seen, key=pali_sort_key)
    word_number = {w: i for i, w in enumerate(words_sorted)}
    
    fm = FuzzyMatcher(words_seen)
    for doc in tqdm(docs):
        doc['num'] = word_number[doc['word']]
        doc['similar'] = [t[0] for t in fm.search(doc['word'])]
    
    dictionary_full_collection.import_bulk_safe(docs, overwrite=True)
