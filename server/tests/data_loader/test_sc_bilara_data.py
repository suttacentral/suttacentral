import json
from pathlib import Path

import pytest

from common.collections import database, Collection
from data_loader.sc_bilara_data import load_bilara_author, load_bilara_edition, load_bilara_author_edition

ONE_AUTHOR = {
    'sujato': {'type': 'translator', 'name': 'Bhikkhu Sujato'},
}

THREE_AUTHORS = {
    'brahmali': {'type': 'translator', 'name': 'Bhikkhu Brahmali'},
    'karunika': {'type': 'translator', 'name': 'Ayyā Kāruṇikā, Ayyā Therikā'},
    'sabbamitta': {'type': 'translator', 'name': 'Sabbamitta'},
}

ONE_EDITION = {
    "ms": {
        "type": "edition",
        "is_root": True,
        "language": "pli"
    },
}

THREE_EDITIONS = {
    "bj": {
        "type": "edition",
        "is_root": True,
        "language": "pli"
      },
    "cbeta": {
        "type": "edition",
        "is_root": True,
        "language": "lzh"
      },
    "pts": {
        "type": "edition",
        "is_root": True,
        "language": "pra"
      },
}


@pytest.fixture
def one_author(tmp_path) -> Path:
    path = tmp_path / '_author.json'
    with path.open("w") as f:
        json.dump(ONE_AUTHOR, f)
    return tmp_path


@pytest.fixture
def one_edition(tmp_path) -> Path:
    path = tmp_path / '_edition.json'
    with path.open("w") as f:
        json.dump(ONE_EDITION, f)
    return tmp_path


@pytest.fixture
def one_author_three_editions(tmp_path) -> Path:
    path = tmp_path / '_author.json'
    with path.open("w") as f:
        json.dump(ONE_AUTHOR, f)

    path = tmp_path / '_edition.json'
    with path.open("w") as f:
        json.dump(THREE_EDITIONS, f)

    return tmp_path


@pytest.fixture
def three_authors_one_edition(tmp_path) -> Path:
    path = tmp_path / '_author.json'
    with path.open("w") as f:
        json.dump(THREE_AUTHORS, f)

    path = tmp_path / '_edition.json'
    with path.open("w") as f:
        json.dump(ONE_EDITION, f)

    return tmp_path


class TestLoadBilaraAuthorEdition:
    def test_adds_authors_and_editions(self, one_author_three_editions):
        db = database()
        load_bilara_author_edition(one_author_three_editions)
        uids = [doc['uid'] for doc in Collection('bilara_author_edition').documents()]
        assert sorted(uids) == ['bj', 'cbeta', 'pts', 'sujato']

    def test_clears_collection_before_repopulating(self, one_author_three_editions, three_authors_one_edition):
        db = database()
        load_bilara_author_edition(one_author_three_editions)
        load_bilara_author_edition(three_authors_one_edition)
        uids = [doc['uid'] for doc in Collection('bilara_author_edition').documents()]
        assert sorted(uids) == ['brahmali', 'karunika', 'ms', 'sabbamitta']


class TestLoadBilaraAuthor:
    def test_author_transform(self, one_author):
        author = load_bilara_author(one_author)[0]
        assert author == {
            'long_name': 'Bhikkhu Sujato',
            'short_name': 'sujato',
            'type': 'author',
            'uid': 'sujato'
        }


class TestLoadBilaraEdition:
    def test_edition_transform(self, one_edition):
        edition = load_bilara_edition(one_edition)[0]
        assert edition == {
            'type': 'edition',
            'uid': 'ms',
            'language': 'pli',
            'is_root': True,
        }
