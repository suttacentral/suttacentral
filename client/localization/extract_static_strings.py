import hashlib
import json
import os
import pathlib
from itertools import chain
from typing import Tuple

import tqdm
from bs4 import BeautifulSoup
from bs4.element import NavigableString

CURRENT_FILE_DIR = pathlib.Path(os.path.dirname(os.path.realpath(__file__)))
TEMPLATE_DIR = str(CURRENT_FILE_DIR / pathlib.Path('../elements/static-templates/'))
STATIC_DIR = str(CURRENT_FILE_DIR / pathlib.Path('../elements/static/'))
LOCALIZATION_JSONS_DIR = str(CURRENT_FILE_DIR / pathlib.Path('../localization/elements/'))

NON_BLOCK_ELEMENTS = ['a', 'span', '\n', 'code', 'br', 'cite', 'strong', 'i', 'em', 'img', 'paper-button']
EXCLUDE_BLOCKS = ['style', 'iframe']
TEXT_ATTRS = ['title', 'alt']


def is_block_children(block):
    if isinstance(block, NavigableString) or block.name in NON_BLOCK_ELEMENTS:
        return False
    return True


def replace_attrs(element):
    for attr in element.attrs:
        if attr in TEXT_ATTRS:
            string_hash = hashlib.md5(element[attr].encode()).hexdigest()
            element[attr] = f"{{{{localize('{string_hash}')}}}}"


def recursive_traversal(element, data):
    if element.name in EXCLUDE_BLOCKS:
        return

    block_children = []
    non_block_with_attr = []
    for child in element.children:
        if is_block_children(child):
            block_children.append(child)
        elif not isinstance(child, NavigableString) and any(child.has_attr(attr) for attr in TEXT_ATTRS):
            non_block_with_attr.append(child)

    if block_children:
        for child in non_block_with_attr:
            replace_attrs(child)
        for child in block_children:
            replace_attrs(child)
            recursive_traversal(child, data)
    else:
        string = ''.join((str(child) for child in element.children))
        string = ' '.join(string.split())

        string_hash = hashlib.md5(string.encode()).hexdigest()

        if isinstance(element, NavigableString) or all(isinstance(child, NavigableString) for child in element.children):
            element.clear()
            element['inner-text'] = f"{{{{localize('{string_hash}')}}}}"
        else:
            element.clear()
            element['inner-h-t-m-l'] = f"{{{{localize('{string_hash}')}}}}"
        data[string_hash] = string


def extract_strings_from_template(file: pathlib.Path) -> Tuple[BeautifulSoup, dict]:
    with file.open() as f:
        soup = BeautifulSoup(f.read(), 'html.parser')

    content = soup.select('template')[0]
    data = {}

    recursive_traversal(content, data)

    return soup, data


def run():
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


if __name__ == '__main__':
    run()
