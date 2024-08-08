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
    for file in (localized_elements_dir / 'build').glob('*.json'):
        element, lang = file.stem.split('_')
        count = len(json_load(file))
        num_strings_by_lang[lang] += count

    num_en = num_strings_by_lang['en']

    updates = [
        {
            '_key': iso_code,
            'localized': True,
            'localized_percent': int(100 * count / num_en),
        }
        for iso_code, count in num_strings_by_lang.items()
    ]
    db['language'].import_bulk(updates, on_duplicate='update')


def process_languages(language_file: Path, is_root: bool = False) -> Dict[str, str]:
    languages: List[dict] = json_load(language_file)
    languages_data = {}
    iso_code_field = 'root_lang_iso' if is_root else 'iso_code'

    for language in languages:
        lang_iso = language[iso_code_field]
        languages_data.update({uid: lang_iso for uid in language.get('contains', [])})

    return languages_data
