import json
from tqdm import tqdm


def load_dictionary_full(db, dictionaries_dir):
    print('Loading dictionary_full')
    dictionary_full = (dictionaries_dir / 'en').glob('*.json')
    dictionary_full_collection = db['dictionary_full']
    docs = []
    for dictionary in tqdm(dictionary_full):
        with dictionary.open('r', encoding='utf-8') as f:

            for entry in json.load(f):
            	file_name = dictionary.parts[-1]
                docs.append({'dict': file_name, **entry})


    dictionary_full_collection.import_bulk(docs)
