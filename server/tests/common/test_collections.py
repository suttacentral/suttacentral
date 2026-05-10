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
        documents = [BLUE_MOON, BRASS_BAND, CHINA_DOLL]
        collection.recreate(documents)
        assert set(doc['_key'] for doc in documents) == set(collection.keys())

    def test_recreate_replaces_documents(self):
        collection = Collection(COLLECTION_NAME)
        collection.recreate([GOLD_BUNNY])
        documents = [BLUE_MOON, BRASS_BAND, CHINA_DOLL]
        collection.recreate(documents)
        assert set(doc['_key'] for doc in documents) == set(collection.keys())

    def test_documents_are_retrievable(self):
        collection = Collection(COLLECTION_NAME)
        documents = [BLUE_MOON, BRASS_BAND, CHINA_DOLL]
        collection.recreate(documents)
        assert {doc['name'] for doc in collection.documents()} == {doc['name'] for doc in documents}
        assert {doc['colour'] for doc in collection.documents()} == {doc['colour'] for doc in documents}

    def test_clear_empty_collection(self):
        collection = Collection(COLLECTION_NAME)
        collection.clear()
        assert len(collection) == 0

    def test_clear_populated_collection(self):
        collection = Collection(COLLECTION_NAME)
        documents = [BLUE_MOON, BRASS_BAND, CHINA_DOLL]
        collection.recreate(documents)
        collection.clear()
        assert len(collection) == 0
