import json

from tqdm import tqdm


def load_dictionaryresults(db, dictionaries_dir):
    load_lookups(db, dictionaries_dir)


def load_lookups(db, dictionaries_dir):
    print('Loading dictionaryresults')
    dictionaryresults = (dictionaries_dir / 'en').glob('*.json')
    dictionaryresults_collection = db['dictionaryresults']
    for dictionaryresult in tqdm(dictionaryresults):
        with dictionaryresult.open('r', encoding='utf-8') as f:
            data = json.load(f)

    dictionaryresults_collection.import_bulk(docs)
