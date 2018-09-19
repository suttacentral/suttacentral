from tqdm import tqdm

from .util import json_load

def load_dictionaries(db, dictionaries_dir):
    load_lookups(db, dictionaries_dir)


def load_lookups(db, dictionaries_dir):
    print('Loading lookup dictionaries')
    dictionaries = (dictionaries_dir / 'lookup').glob('*.json')
    dictionaries_collection = db['dictionaries']
    docs = []
    for dictionary in tqdm(dictionaries):
        try:
            from_lang, to_lang = dictionary.stem.split('2')
            dict_type = 'maindata'
            try:
                to_lang, dict_type = to_lang.split('-')
            except ValueError:
                pass
            main = True if dict_type == 'maindata' else False
            docs.append({
                'from': from_lang,
                'to': to_lang,
                'dictionary': json_load(dictionary),
                'lookup': True,
                'main': main,
                'type': 'maindata' if main else dict_type
            })
        except ValueError:
            print(f'unknown dictionary name format {dictionary.stem}')
    dictionaries_collection.import_bulk(docs)
