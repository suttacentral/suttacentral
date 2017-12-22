import json
from tqdm import tqdm
from collections import Counter

def load_dictionary_full(db, dictionaries_dir, change_tracker):
    print('Loading dictionary_full')
    
    dictionary_full_files = list((dictionaries_dir / 'en').glob('*.json'))
    if change_tracker.is_any_file_new_or_changed(dictionary_full_files)
    dictionary_full_collection = db['dictionary_full']
    docs = []
    for dictionary in tqdm(dictionary_full_files):
        with dictionary.open('r', encoding='utf-8') as f:
            
            for entry in json.load(f): 
                docs.append({'dictname': dictionary.stem, **entry})
    
    dictionary_full_collection.truncate()
    dictionary_full_collection.import_bulk(docs)
