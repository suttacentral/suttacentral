import json
import os
from pathlib import Path

import tqdm

CURRENT_FILE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
PRE_POOTLE_FILES_DIR = CURRENT_FILE_DIR / Path('pootle/prePootleFiles/')


def process_file(file: Path):
    path_parts = file.parent.parts[1:]
    element_path = Path(path_parts[-1])

    with file.open() as f:
        output_data = json.load(f)['en']

    with open(f'{PRE_POOTLE_FILES_DIR / element_path}.json', 'w') as f:
        json.dump(output_data, f, indent=4, ensure_ascii=False)


def run():
    PRE_POOTLE_FILES_DIR.mkdir(parents=True, exist_ok=True)
    for file in tqdm.tqdm((CURRENT_FILE_DIR / Path('elements')).rglob('en.json')):
        process_file(file)


if __name__ == '__main__':
    run()
