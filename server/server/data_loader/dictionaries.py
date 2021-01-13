from pathlib import Path

from arango.database import Database
from tqdm import tqdm

from .textfunctions import asciify_roman
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
            docs.append(
                {
                    'from': from_lang,
                    'to': to_lang,
                    'dictionary': json_load(dictionary),
                    'lookup': True,
                    'main': main,
                    'type': 'maindata' if main else dict_type,
                }
            )
        except ValueError:
            print(f'unknown dictionary name format {dictionary.stem}')
    dictionaries_collection.import_bulk_logged(docs)


def load_simple_dictionaries(db: Database, dictionaries_dir: Path):
    simple_dictionaries_dir = dictionaries_dir / 'simple'
    docs = []
    for dictionary in tqdm(simple_dictionaries_dir.glob('**/*.json')):
        from_lang, to_lang_and_name = dictionary.stem.split('2')
        to_lang, dict_name = to_lang_and_name.split('_')
        content = json_load(dictionary)
        for item in content:
            docs.append({
                'from': from_lang,
                'to': to_lang,
                'dictname': dict_name,
                **item,
            })

    db.collection('dictionaries_simple').truncate()
    db.collection('dictionaries_simple').import_bulk(docs)


def load_complex_dictionaries(db: Database, dictionaries_dir: Path):
    complex_dictionaries_dir = dictionaries_dir / 'complex'
    docs = []
    for dictionary in tqdm(complex_dictionaries_dir.glob('**/*.json')):
        from_lang, to_lang_and_name = dictionary.stem.split('2')
        to_lang, dict_name = to_lang_and_name.split('_')
        content = json_load(dictionary)
        for item in content:
            docs.append({
                'from': from_lang,
                'to': to_lang,
                'word': item['word'],
                'text': item['text'],
                'word_ascii': asciify_roman(item['word']),
                'dictname': dict_name,
            })

    db.collection('dictionaries_complex').truncate()
    db.collection('dictionaries_complex').import_bulk(docs)
