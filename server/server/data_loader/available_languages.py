from pathlib import Path

from .util import json_load


def load_available_languages(db, additional_info_dir: Path):
    print('Loading available languages')

    languages_collection = db['available_languages']
    data = json_load(additional_info_dir / 'available_languages.json')
    languages_data = []
    for iso_code in data:
        languages_data.append({
            'iso_code': iso_code['iso_code']
        })
    languages_collection.import_bulk(data, overwrite=True)
