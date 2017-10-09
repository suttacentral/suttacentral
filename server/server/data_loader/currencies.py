import json
from pathlib import Path


def load_currencies(db, additional_info_dir: Path):
    print('Loading currencies')

    currencies_collection = db['currencies']
    with open(f'{additional_info_dir}/currencies.json') as f:
        data = json.load(f)

    currencies_collection.import_bulk(data)
