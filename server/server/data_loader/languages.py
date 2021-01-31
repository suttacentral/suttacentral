import logging
from collections import Counter
from pathlib import Path
from typing import Dict, List

from arango.database import Database
from tqdm import tqdm

from .util import json_load


def load_languages(db: Database, language_file: Path, localized_elements_dir: Path):
    _load_language_file(db, language_file)
    _update_languages(db, localized_elements_dir)


def _load_language_file(db: Database, language_file: Path):
    languages_docs = []
    languages_content = json_load(language_file)
    for language in tqdm(languages_content):
        language.pop('contains', None)
        languages_docs.append({
            '_key': language['uid'],
            **language
        })

    db.collection('language').truncate()
    db.collection('language').import_bulk(languages_docs)


def _update_languages(db: Database, localized_elements_dir: Path):
    num_strings_by_lang = Counter()
    for element_dir in tqdm(localized_elements_dir.glob('*')):
        if not element_dir.is_dir():
            continue

        en_file = element_dir / 'en.json'
        if not en_file.exists():
            logging.warning(f'{element_dir} does not contain en.json')
            continue

        en_keys = set(json_load(en_file)['en'].keys())
        num_strings_by_lang['en'] += len(en_keys)
        for file in element_dir.glob('*.json'):
            if file.stem == 'en':
                continue

            lang_keys = set(json_load(file)[file.stem].keys())
            num_strings_by_lang[file.stem] += len(lang_keys.intersection(en_keys))

    updates = []
    num_en = num_strings_by_lang['en']

    for iso_code, count in num_strings_by_lang.items():
        updates.append(
            {
                '_key': iso_code,
                'localized': True,
                'localized_percent': int(100 * count / num_en),
            }
        )

    db['language'].import_bulk(updates, on_duplicate='update')


def process_languages(language_file: Path, is_root: bool = False) -> Dict[str, str]:
    languages: List[dict] = json_load(language_file)
    languages_data = {}
    iso_code_field = 'root_lang_iso' if is_root else 'iso_code'

    for language in languages:
        lang_iso = language[iso_code_field]
        languages_data.update({uid: lang_iso for uid in language.get('contains', [])})

    return languages_data
