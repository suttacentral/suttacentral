import pytest
from arango import ArangoClient
from arango.database import Database

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
