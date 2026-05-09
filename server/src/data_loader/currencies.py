from pathlib import Path
from typing import Any

from common.collections import Collection
from data_loader.util import json_load


def load_currencies(additional_info_dir: Path):
    currencies = json_load(additional_info_dir / 'currencies.json')
    Collection('currencies').recreate(currencies)

    # currency_names appears to be the result of an aborted
    # attempt at internationalization. It only contains english.
    currency_names = [to_currency_name(currency) for currency in currencies]
    Collection('currency_names').recreate(currency_names)


def to_currency_name(currency: Any) -> Any:
    return {
        '_key': f'{currency["symbol"]}_en',
        'name': currency['name'],
        'symbol': currency['symbol'],
        'lang': 'en',
    }
