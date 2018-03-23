import hashlib
import json
import os
import pathlib
from typing import Tuple

import tqdm
import requests
from bs4 import BeautifulSoup
from bs4.element import NavigableString

AVAILABLE_LANGUAGES_URL = 'https://raw.githubusercontent.com/suttacentral/sc-data/master/additional-info/available_languages.json'

CURRENT_FILE_DIR = pathlib.Path(os.path.dirname(os.path.realpath(__file__)))
TEMPLATE_DIR = str(CURRENT_FILE_DIR / pathlib.Path('../elements/static-templates/'))
STATIC_DIR = str(CURRENT_FILE_DIR / pathlib.Path('../elements/static/'))
LOCALIZATION_JSONS_DIR = str(CURRENT_FILE_DIR / pathlib.Path('../localization/elements/'))

NON_BLOCK_ELEMENTS = ['a', 'span', '\n', 'code', 'br', 'cite', 'strong', 'i', 'em', 'img', 'paper-button']
EXCLUDE_BLOCKS = ['style', 'iframe']
TEXT_ATTRS = ['title', 'alt']


def replace_attrs(element, data):
    for attr in element.attrs:
        if attr in TEXT_ATTRS:
            string_hash = hashlib.md5(element[attr].encode()).hexdigest()
            data[string_hash] = element[attr]
            element[attr] = f"{{{{localize('{string_hash}')}}}}"


def hash_element_content(element, data):
    string = ''.join((str(child) for child in element.children))
    string = ' '.join(string.split())
    if string == '':
        return

    string_hash = hashlib.md5(string.encode()).hexdigest()

    if isinstance(element, NavigableString) or all(isinstance(child, NavigableString) for child in element.children):
        element.clear()
        element['inner-text'] = f"{{{{localize('{string_hash}')}}}}"
    else:
        element.clear()
        element['inner-h-t-m-l'] = f"{{{{localize('{string_hash}')}}}}"
    data[string_hash] = string


def recursive_traversal(element, data):
    if element.name in EXCLUDE_BLOCKS:
        return

    block_children = []
    non_block = []
    non_block_with_attr = []
    navigable_strings = []
    for child in element.children:
        if isinstance(child, NavigableString):
            if str(child) != '' and not child.isspace():
                navigable_strings.append(child)
        elif child.name not in NON_BLOCK_ELEMENTS:
            block_children.append(child)
        elif any(child.has_attr(attr) for attr in TEXT_ATTRS):
            non_block_with_attr.append(child)
        else:
            non_block.append(child)

    if block_children:
        for child in non_block_with_attr:
            replace_attrs(child, data)
        for child in block_children:
            replace_attrs(child, data)
            recursive_traversal(child, data)
        for navigable_str in navigable_strings:
            string_hash = hashlib.md5(navigable_str.encode()).hexdigest()
            data[string_hash] = str(navigable_str)
            navigable_str.replace_with(NavigableString(f"{{{{localize('{string_hash}')}}}}"))
        for block in non_block:
            hash_element_content(block, data)

    else:
        hash_element_content(element, data)


def extract_strings_from_template(file: pathlib.Path) -> Tuple[BeautifulSoup, dict]:
    with file.open() as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    content = soup.select('template')[0]
    data = {}

    recursive_traversal(content, data)

    return soup, data


def get_available_languages():
    data = json.loads(requests.get(AVAILABLE_LANGUAGES_URL).content)
    return [x['iso_code'] for x in data if x['iso_code'] != 'en']


def run():
    languages = get_available_languages()
    # Ensure needed dirs exist.
    pathlib.Path(STATIC_DIR).mkdir(parents=True, exist_ok=True)
    pathlib.Path(LOCALIZATION_JSONS_DIR).mkdir(parents=True, exist_ok=True)

    # Process every html file in TEMPLATE_DIR
    files = [p for p in pathlib.Path(TEMPLATE_DIR).glob('*.html')]
    for file in tqdm.tqdm(files):
        soup, data = extract_strings_from_template(file)

        with open(f'{STATIC_DIR}/{file.name}', 'w') as f:
            f.write(soup.prettify())

        element_dir = pathlib.Path(f'{LOCALIZATION_JSONS_DIR}/static_{file.stem}')
        element_dir.mkdir(parents=True, exist_ok=True)

        with (element_dir / 'en.json').open('w') as f:
            formatted_data = {'en': data}
            json.dump(formatted_data, f, indent=4, ensure_ascii=False)

        for lang in languages:
            lang_file = element_dir / f'{lang}.json'
            if not lang_file.exists():
                with lang_file.open('w') as f:
                    json.dump({lang: {}}, f, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    run()
