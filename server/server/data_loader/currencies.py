from pathlib import Path

from .util import json_load


def load_currencies(db, additional_info_dir: Path):
    print('Loading currencies')

    currencies_collection = db['currencies']
    currency_names_collection = db['currency_names']
    data = json_load(additional_info_dir / 'currencies.json')
    name_data = []
    for entry in data:
        name_data.append({
            'name': entry.pop('name'),
            'symbol': entry['symbol'],
            'lang': 'en',
            '_key': f'{entry["symbol"]}_en'
        })
    currencies_collection.import_bulk(data, overwrite=True)
    currency_names_collection.import_bulk(name_data, overwrite=True)
