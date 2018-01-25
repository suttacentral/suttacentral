import json
import os
from pathlib import Path

import polib
import tqdm

CURRENT_FILE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
POOTLE_FILES_DIR = CURRENT_FILE_DIR / Path('generatedPoFiles')
LOCALIZATION_FILES_DIR = CURRENT_FILE_DIR / Path('../elements/')


def get_language(file):
    return file.stem


def generate_json_file(file):
    language = get_language(file)
    po_data = polib.pofile(str(file))
    data = {}
    for entry in po_data:
        data[entry.msgid] = entry.msgstr

    path_parts = list(file.parts[1:])
    path_parts[-2] = path_parts[-2]
    path_parts.pop(-1)
    element_path = Path(*path_parts)
    full_element_path = LOCALIZATION_FILES_DIR / element_path

    full_element_path.mkdir(parents=True, exist_ok=True)

    with (full_element_path / f'{language}.json').open('w') as f:
        json.dump({language: data}, f, indent=4, ensure_ascii=False)


def run():
    for file in tqdm.tqdm(POOTLE_FILES_DIR.rglob('*.po')):
        generate_json_file(file)


if __name__ == '__main__':
    run()
