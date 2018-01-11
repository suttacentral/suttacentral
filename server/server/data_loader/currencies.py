from pathlib import Path

from .util import json_load

def load_currencies(db, additional_info_dir: Path):
    print('Loading currencies')

    currencies_collection = db['currencies']
    data = json_load(f'{additional_info_dir}/currencies.json')

    currencies_collection.import_bulk(data)
