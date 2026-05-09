import json
from pathlib import Path

import pytest

from common.collections import Collection
from data_loader.currencies import load_currencies

AUD = {
    "name": "Australian Dollar",
    "symbol": "AUD",
    "american_express": True,
    "use": True,
    "decimal": True
}

BOB = {
    "name": "Bolivian Boliviano",
    "symbol": "BOB",
    "american_express": False,
    "use": True,
    "decimal": True
}

COP = {
    "name": "Colombian Peso",
    "symbol": "COP",
    "american_express": False,
    "use": True,
    "decimal": True
}


@pytest.fixture
def one_currency(tmp_path) -> Path:
    data = [AUD]
    path = tmp_path / 'currencies.json'
    with path.open("w") as f:
        json.dump(data, f)

    return tmp_path


@pytest.fixture
def three_currencies(tmp_path) -> Path:
    data = [AUD, BOB, COP]
    path = tmp_path / 'currencies.json'
    with path.open("w") as f:
        json.dump(data, f)

    return tmp_path


class TestLoadCurrencies:
    def test_currencies_are_loaded(self, three_currencies):
        load_currencies(three_currencies)
        symbols = [doc['symbol'] for doc in Collection('currencies').documents()]
        assert sorted(symbols) == ['AUD', 'BOB', 'COP']

    def test_currency_names_are_loaded(self, three_currencies):
        load_currencies(three_currencies)
        symbols = [doc['symbol'] for doc in Collection('currency_names').documents()]
        assert sorted(symbols) == ['AUD', 'BOB', 'COP']

    def test_transform_currency_to_currency_name(self, one_currency):
        load_currencies(one_currency)
        document = next(Collection('currency_names').documents())
        assert document['_key'] == 'AUD_en'
        assert document['name'] == 'Australian Dollar'
        assert document['lang'] == 'en'
        assert document['symbol'] == 'AUD'
