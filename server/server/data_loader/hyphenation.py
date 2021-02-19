from pathlib import Path

from arango.database import Database
from tqdm import tqdm
from typing import Dict

from common.hyphenator import hyphenate
from common.queries import ALL_TEXTS_BY_LANGUAGES
from data_loader.util import json_load, json_save

_HYPHENATION_MAX_WORD_LEN = 20


def _hyphenate_modern_text(text_file: Path) -> None:
    has_changes = False
    file_content: Dict[str, str] = json_load(text_file)
    for key, string in file_content.items():
        if not string:
            continue
        hyphenated_words = (hyphenate(word, _HYPHENATION_MAX_WORD_LEN) for word in string.split())
        hyphenated_string = ' '.join(hyphenated_words)
        if string[-1] == ' ':
            hyphenated_string = hyphenated_string + ' '
        if string != hyphenated_string:
            has_changes = True
            file_content[key] = hyphenated_string

    if has_changes:
        json_save(file_content, text_file)


def _hyphenate_legacy_text(text_file: Path) -> None:
    pass


def hyphenate_texts(db: Database) -> None:
    languages = ('pli', 'san')
    texts = db.aql.execute(ALL_TEXTS_BY_LANGUAGES, bind_vars={'languages': languages}, ttl=600)
    for text in tqdm(texts):
        text_file = Path(text['file_path'])
        if text_file.suffix == '.json':
            _hyphenate_modern_text(text_file)
        else:
            _hyphenate_legacy_text(text_file)
