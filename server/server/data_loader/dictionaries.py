from collections import Counter
from pathlib import Path

import regex
from arango.database import Database
from tqdm import tqdm

from common.utils import chunks
from .textfunctions import asciify_roman, pali_sort_key
from .util import json_load


def load_simple_dictionaries(db: Database, dictionaries_dir: Path):
    simple_dictionaries_dir = dictionaries_dir / 'simple'
    docs = []
    for dictionary in tqdm(simple_dictionaries_dir.glob('**/*.json')):
        from_lang, to_lang_and_name = dictionary.stem.split('2')
        if len(to_lang_and_name.split('_') != 2):
            break
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
    words_seen = Counter()
    ids_seen = Counter()
    for dictionary in tqdm(complex_dictionaries_dir.glob('**/*.json')):
        from_lang, to_lang_and_name = dictionary.stem.split('2')
        to_lang, dict_name = to_lang_and_name.split('_')
        content = json_load(dictionary)
        for item in content:
            word = item['word']
            words_seen[word] += 1

            # create a meaningful id
            word_ascii = asciify_roman(word)
            _key = regex.sub(r'[^a-z0-9]+', '_', word_ascii)
            if _key in ids_seen:
                ids_seen[_key] += 1
                _key += str(ids_seen[_key])
            else:
                ids_seen[_key] = 1
            words_seen[word] += 1

            docs.append({
                '_key': _key,
                'from': from_lang,
                'to': to_lang,
                'word': item['word'],
                'text': item['text'],
                'word_ascii': word_ascii,
                'dictname': dict_name,
            })

    seen = set()
    for doc in docs:
        if doc['_key'] in seen:
            print(f'Duplicate: {doc["_key"]}')
            seen.add(doc['_key'])

    words_sorted = sorted(words_seen, key=pali_sort_key)
    word_number = {w: i for i, w in enumerate(words_sorted)}

    for doc in docs:
        doc['num'] = word_number[doc['word']]

    collection = db.collection('dictionaries_complex')
    collection.truncate()
    for chunk in chunks(docs, 1000):
        collection.import_bulk(chunk, on_duplicate='ignore')


def load_glossaries(db: Database, dictionaries_dir: Path):
    glossaries_dir = dictionaries_dir / 'glossaries'
    docs = []
    for glossary_file in tqdm(glossaries_dir.glob('**/*.json')):
        content = json_load(glossary_file)
        docs.extend(content)

    db.collection('dictionaries_glossary').truncate()
    db.collection('dictionaries_glossary').import_bulk(docs)
