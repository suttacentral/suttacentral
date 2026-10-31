from typing import Generator

import pytest
from arango import ArangoClient, DocumentInsertError
from arango.collection import StandardCollection
from arango.database import Database, StandardDatabase

from common import arangodb
from common.utils import app_context


@app_context
def test_get_client():
    client = arangodb.get_client()
    assert isinstance(client, ArangoClient)


@app_context
def test_get_db(app):
    db = arangodb.get_db()
    assert db.name == app.config.get('ARANGO_DB')


class TestArangoDB:
    @pytest.fixture
    def arango(self, app):
        return arangodb.ArangoDB(app=app)

    def test_connect(self, arango):
        assert isinstance(arango.client, ArangoClient)

    def test_client(self, arango):
        assert isinstance(arango.client, ArangoClient)

    def test_db(self, arango):
        assert isinstance(arango.db, Database)


@pytest.fixture
@app_context
def client() -> ArangoClient:
    return arangodb.get_client()


@pytest.fixture
def sys_db(client) -> StandardDatabase:
    return client.db('_system', username='root', password='test')


@pytest.fixture
def database(client, sys_db) -> Generator[StandardDatabase, None, None]:
    db_name = 'arangodb_test'
    if sys_db.has_database(db_name):
        sys_db.delete_database(db_name)
    sys_db.create_database(db_name)
    yield client.db(db_name, username='root', password='test')
    sys_db.delete_database(db_name)


@pytest.fixture
def collection(database) -> StandardCollection:
    return database.create_collection('roses')


@pytest.fixture
def one_document() -> dict:
    return {'_key': 'bright-spirit', 'name': 'Bright Spirit', 'colour': 'salmon and gold'}


@pytest.fixture
def two_documents() -> list[dict]:
    return [
        {'_key': 'mr-lincoln', 'name': 'Mr Lincoln', 'colour': 'red'},
        {'_key': 'charles-darwin', 'name': 'Charles Darwin', 'colour': 'yellow'},
    ]
