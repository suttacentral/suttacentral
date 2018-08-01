import json
import os
import logging
from pathlib import Path

import polib
import tqdm


CURRENT_FILE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
PO_FILES_DIR = Path('/srv/pootle/po/')
LOCALIZATION_FILES_DIR = CURRENT_FILE_DIR / Path('../elements/')
PROJECT_NAME = 'site-localization'

def get_language(file):
    parts = file.relative_to(POOTLE_FILES_DIR).parts
    # parts is of form: [project, language, file]
    return parts[1]


def generate_json_file(file):
    language = get_language(file)
    if language == 'templates':
        language = 'en'
    
    po_data = polib.pofile(str(file))
    data = {}
    try:
        if language == 'en':
            for entry in po_data:
                data[entry.msgctxt] = entry.msgid
        else:
            for entry in po_data:
                data[entry.msgctxt] = entry.msgstr
    except AttributeError as e:
        logging.error(f'An exception occured when processing {str(file)}\n{str(entry)}')
        raise
        

    element_path = file.stem
    full_element_path = LOCALIZATION_FILES_DIR / element_path

    full_element_path.mkdir(parents=True, exist_ok=True)
    
    with (full_element_path / f'{language}.json').open('w') as f:
        json.dump({language: data}, f, indent=4, ensure_ascii=False)


def run():
    project_dir = PO_FILES_DIR / PROJECT_NAME
    for file in tqdm.tqdm([f for f in project_dir.rglob('*.po*') if not f.parts[-2].startswith('server')]):
        generate_json_file(file)


if __name__ == '__main__':
    run()
