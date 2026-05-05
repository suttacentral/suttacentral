import pytest

from common.collections import Collection, database
import pytest

from common.collections import Collection, database

COLLECTION_NAME = 'roses'

BLUE_MOON = {'_key': 'blue-moon', 'name': 'Blue Moon', 'colour': 'ice lavender'}
BRASS_BAND = {'_key': 'brass-band', 'name': 'Brass Band', 'colour': 'apricot with soft yellow reverse'}
CHINA_DOLL = {'_key': 'china-doll', 'name': 'China Doll', 'colour': 'china pink'}
GOLD_BUNNY = {'_key': 'gold-bunny', 'name': 'Gold Bunny', 'colour': 'soft gold'}


@pytest.fixture(autouse=True)
def create():
    if not database().has_collection(COLLECTION_NAME):
        database().create_collection(COLLECTION_NAME)
    yield
    database().delete_collection(COLLECTION_NAME)


class TestCollection:
    def test_open_collection(self):
        collection = Collection(COLLECTION_NAME)
        assert collection.name == COLLECTION_NAME

    def test_recreate_with_no_documents(self):
        collection = Collection(COLLECTION_NAME)
        collection.recreate([])
        assert len(collection) == 0

    def test_recreate_adds_documents(self):
        collection = Collection(COLLECTION_NAME)
        collection.recreate([BLUE_MOON, BRASS_BAND, CHINA_DOLL])
        expected_keys = {BLUE_MOON['_key'], BRASS_BAND['_key'], CHINA_DOLL['_key']}
        assert expected_keys == set(collection.keys())

    def test_recreate_replaces_documents(self):
        collection = Collection(COLLECTION_NAME)
        collection.recreate([GOLD_BUNNY])
        collection.recreate([BLUE_MOON, BRASS_BAND, CHINA_DOLL])
        expected_keys = {BLUE_MOON['_key'], BRASS_BAND['_key'], CHINA_DOLL['_key']}
        assert expected_keys == set(collection.keys())
