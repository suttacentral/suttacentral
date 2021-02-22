from pathlib import Path

from arango.database import Database
from bs4 import BeautifulSoup
from bs4.element import Tag, NavigableString
from tqdm import tqdm
from typing import Dict, Union

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
    has_changes = False
    with open(text_file) as fp:
        soup = BeautifulSoup(fp, 'lxml', from_encoding='utf-8')
    html = str(soup)
    for child in soup.html.recursiveChildGenerator():  # type: Union[Tag, NavigableString]
        if not suitable_node(child):
            continue
        original_string = child.string.strip()
        hyphenated_words = (hyphenate(word, _HYPHENATION_MAX_WORD_LEN) for word in original_string.split())
        hyphenated_string = ' '.join(hyphenated_words)
        if original_string != hyphenated_string:
            has_changes = True
            html = html.replace(original_string, hyphenated_string)

    if has_changes:
        with open(text_file, 'w', encoding='utf-8') as fp:
            fp.write(html)


def suitable_node(element: Union[Tag, NavigableString]) -> bool:
    return isinstance(element, NavigableString) and element.string and element.string.strip()


def hyphenate_texts(db: Database) -> None:
    # TODO: uncomment when html texts parsing will be done
    # languages = ('pli', 'san')
    languages = ('san',)
    texts = db.aql.execute(ALL_TEXTS_BY_LANGUAGES, bind_vars={'languages': languages}, ttl=1200)
    for text in tqdm(texts):
        text_file = Path(text['file_path'])
        if text_file.suffix == '.json':
            _hyphenate_modern_text(text_file)
        else:
            _hyphenate_legacy_text(text_file)
