import json
from bisect import bisect_left
from pathlib import Path

import pytest

from common.collections import database, Collection
from data_loader.biblio import load_biblios


@pytest.fixture
def biblios_data(tmp_path) -> Path:
    data = [
        {
            "uid": "xyz123",
            "name": "Smith 1986",
            "text": "<span class='author'>SMITH, Freddy</span> 1986. A book about nothing."
        },
        {
            "uid": "xyz124",
            "name": "Smith 1986",
            "text": "<span class='author'>SMITH, Freddy</span> 1986. A book about nothing."
        },
        {
            "uid": "xyz125",
            "name": "Smith 1986",
            "text": "<span class='author'>SMITH, Freddy</span> 1986. A book about nothing."
        },
    ]

    path = tmp_path / 'biblio.json'
    with path.open("w") as f:
        json.dump(data, f)

    return tmp_path


def test_load_biblios(biblios_data):
    load_biblios(database(), biblios_data)
    assert len(Collection('biblios')) == 3
