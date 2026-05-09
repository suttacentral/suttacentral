from pathlib import Path

from common.collections import Collection
from .util import json_load


def load_currencies(additional_info_dir: Path):
    currency_data = json_load(additional_info_dir / 'currencies.json')
    Collection('currencies').recreate(currency_data)

    name_data = []
    for entry in currency_data:
        name_data.append(
            {
                'name': entry.pop('name'),
                'symbol': entry['symbol'],
                'lang': 'en',
                '_key': f'{entry["symbol"]}_en',
            }
        )

    Collection('currency_names').recreate(name_data)
