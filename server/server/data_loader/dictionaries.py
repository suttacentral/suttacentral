import json

from tqdm import tqdm


def load_dictionaries(db, dictionaries_dir):
    print('Loading dictionaries')
    dictionaries = dictionaries_dir.glob('*.json')

    dictionaries_collection = db['dictionaries']
    docs = []

    for dictionary in tqdm(dictionaries):
        with dictionary.open('r', encoding='utf-8') as f:
            try:
                from_lang, to_lang = dictionary.stem.split('2')
                docs.append({
                    'from': from_lang,
                    'to': to_lang,
                    'dictionary': json.load(f)
                })
            except ValueError:
                pass
    dictionaries_collection.import_bulk(docs)
