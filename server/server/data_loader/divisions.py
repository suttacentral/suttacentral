from pathlib import Path

from tqdm import tqdm

from .util import json_load

def load_divisions(db, structure_dir: Path):
    print('Loading divisions')
    division_dir = structure_dir / 'division'
    division_files = division_dir.glob('*.json')
    division_objects = []
    divisions_collection = db['divisions']
    text_divisions_collection = db['text_divisions']
    text_division_data_objects = []
    for division_file in tqdm(division_files):
        division_name = '.'.join(division_file.name.split('.')[:-1])
        division_objects.append({'uid': division_name})
        division_data = json_load(division_file)
        division_data = [{'uid': get_uid(entry), **entry, 'division': division_name, 'num': i}
                         for i, entry in enumerate(division_data)]
        text_division_data_objects += division_data

    divisions_collection.import_bulk(division_objects)
    text_divisions_collection.import_bulk(text_division_data_objects)


def get_uid(entry):
    if 'type' in entry:
        return entry.pop('_path')
    else:
        return entry.pop('_path').split('/')[-1]
