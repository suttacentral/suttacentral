import hashlib
import json
import pathlib
from typing import Tuple

import tqdm
from bs4 import BeautifulSoup
from bs4.element import NavigableString


TEMPLATE_DIR = '../elements/static-templates/'
STATIC_DIR = '../elements/static/'
LOCALIZATION_JSONS_DIR = '../localization/elements/static/'

NON_BLOCK_ELEMENTS = ['a', 'span', '\n', 'code', 'br', 'cite', 'strong', 'i', 'em', 'img', 'paper-button']
EXCLUDE_BLOCKS = ['style', 'iframe']


def recursive_traversal(element, data):
    if element.name in EXCLUDE_BLOCKS:
        return

    children = [child for child in element.children
                if not (child.name in NON_BLOCK_ELEMENTS or isinstance(child, NavigableString))]

    if children:
        for child in children:
            recursive_traversal(child, data)
    else:

        string = ''.join((str(child) for child in element.children))
        string = ' '.join(string.split())

        string_hash = hashlib.md5(string.encode()).hexdigest()

        if isinstance(element, NavigableString) or all(isinstance(child, NavigableString) for child in element.children):
            element.clear()
            element['inner-text'] = f'{{{{localize(\'{string_hash}\')}}}}'
        else:
            element.clear()
            element['inner-h-t-m-l'] = f'{{{{localize(\'{string_hash}\')}}}}'
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

        with open(f'{STATIC_DIR}{file.name}', 'w') as f:
            f.write(soup.prettify())

        element_dir = pathlib.Path(f'{LOCALIZATION_JSONS_DIR}{file.stem}')
        element_dir.mkdir(parents=True, exist_ok=True)

        with (element_dir / 'en.json').open('w') as f:
            formatted_data = {'en': data}
            json.dump(formatted_data, f, indent=4, ensure_ascii=False)


if __name__ == '__main__':
    run()
