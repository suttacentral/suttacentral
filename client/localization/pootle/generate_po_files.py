import json
import datetime
import os
from pathlib import Path

import polib
import tqdm

CURRENT_FILE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
PRE_POOTLE_FILES_DIR = CURRENT_FILE_DIR / Path('prePootleFiles')
GENERATED_PO_FILES_DIR = CURRENT_FILE_DIR / 'generatedPoFiles'
PROJECT_NAME = 'site-localization'


def generate_po_file(file_path: Path):
    with file_path.open() as f:
        file_data = json.load(f)
    
    pot = polib.POFile()
    pot.metadata = {
        'POT-Creation-Date': str(datetime.datetime.now()),
        'Content-Type': 'text/plain; charset=utf-8'
    }
    for k, v in file_data.items():
        pot.append(polib.POEntry(
            msgctxt=k,
            msgid=v,
        ))
    
    element_name = file_path.stem
    element_path = GENERATED_PO_FILES_DIR / PROJECT_NAME / 'templates' / f'{element_name}.pot'
    element_path.parent.mkdir(parents=True, exist_ok=True)
    pot.save(str(element_path))

def run():
    for file_path in tqdm.tqdm(PRE_POOTLE_FILES_DIR.rglob('*.json')):
        generate_po_file(file_path)


if __name__ == '__main__':
    run()
