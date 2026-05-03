from typing import Generator

import pytest
from arango import ArangoClient, DocumentInsertError, Response
from arango.collection import StandardCollection
from arango.database import Database, StandardDatabase
from arango.request import Request

from common import arangodb
from common.arangodb import explain_error
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
def client() -> ArangoClient:
    return ArangoClient()


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


class TestImportBulkLogged:
    def test_can_import_no_documents(self, collection):
        collection.import_bulk_logged([])

    def test_can_import_valid_documents(self, collection, two_documents):
        collection.import_bulk_logged(two_documents)
        assert collection.count() == 2

    def test_passing_overwrite_results_in_type_error(self, collection, two_documents):
        with pytest.raises(ValueError, match='Overwrite not allowed'):
            collection.import_bulk_logged(two_documents, overwrite=True)

    def test_does_not_delete_existing_documents_by_default(self, collection, two_documents, one_document):
        collection.insert(one_document)
        collection.import_bulk_logged(two_documents)
        assert collection.count() == 3

    def test_deletes_existing_documents_when_wipe_is_true(self, collection, two_documents, one_document):
        collection.insert(one_document)
        collection.import_bulk_logged(two_documents, wipe=True)
        assert collection.count() == 2

    def test_explains_key_contains_illegal_characters(self, collection, caplog):
        bad_key = [{'_key': 'gallipoli?century', 'name': 'Gallipoli Century', 'colour': 'deep red'}]

        with pytest.raises(DocumentInsertError):
            collection.import_bulk_logged(bad_key)

        assert "contains illegal characters" in caplog.messages[0]

    def test_explains_unique_constraint_violated(self, collection, caplog):
        duplicates = [
            {'_key': 'mr-lincoln', 'name': 'Mr Lincoln', 'colour': 'red'},
            {'_key': 'mr-lincoln', 'name': 'Mr Lincoln', 'colour': 'red'},
        ]

        with pytest.raises(DocumentInsertError):
            collection.import_bulk_logged(duplicates)

        assert "unique constraint violated" in caplog.messages[0]

    def test_explains_already_in_collection(self, collection, two_documents, caplog):
        collection.import_bulk_logged(two_documents)

        with pytest.raises(DocumentInsertError):
            collection.import_bulk_logged(two_documents)

        assert "already in the collection" in caplog.messages[0]

    def test_cant_explain_bad_attribute_name(self, collection, caplog):
        bad_attribute_name = {'_key': 'jude-the-obscure', 'name': 'Jude the Obscure', 'colour': 'apricot'}
        with pytest.raises(DocumentInsertError):
            collection.import_bulk_logged(bad_attribute_name)

        assert "you may proceed to panic and/or despair" in caplog.messages[0]
