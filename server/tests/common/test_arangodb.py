from typing import Tuple

import pytest
from arango import ArangoClient
from arango.database import StandardDatabase
from flask import Flask, g
from flask_restful import Api

from common.arangodb import get_client, get_db, get_system_db, ArangoDB, from_flask_config, delete_db
from sc_flask.app import app_factory


@pytest.fixture
def flask_app() -> Flask:
    api_app: Tuple[Api, Flask] = app_factory()
    return api_app[1]


class TestArangoDB:
    @pytest.fixture
    def arango(self) -> ArangoDB:
        return ArangoDB(
            host='localhost',
            port=8529,
            username='root',
            password='test',
            database_name='suttacentral'
        )

    def test_host(self, arango):
        assert arango.client().hosts == ['http://localhost:8529']

    def test_request_timeout(self, arango):
        assert arango.client().request_timeout == 1000

    def test_database_name(self, arango):
        assert arango.database().name == 'suttacentral'

    def test_system_database(self, arango):
        assert arango.system_database().name == '_system'


class TestGetClient:
    def test_stores_client_in_flask_global(self, flask_app):
        with flask_app.app_context():
            assert 'client' not in g
            _ = get_client()
            assert isinstance(g.client, ArangoClient)

    def test_retrieves_db_from_global(self, flask_app):
        with flask_app.app_context():
            first_client = get_client()
            second_client = get_client()
            assert id(first_client) == id(second_client)


class TestGetDb:
    def test_stores_database_in_flask_global(self, flask_app):
        with flask_app.app_context():
            assert 'database' not in g
            _ = get_db()
            assert isinstance(g.database, StandardDatabase)

    def test_retrieves_db_from_global(self, flask_app):
        with flask_app.app_context():
            first_db = get_db()
            second_db = get_db()
            assert id(first_db) == id(second_db)

    def test_database_is_writable(self, flask_app):
        with flask_app.app_context():
            db = get_db()
            db.create_collection('example')
            db.delete_collection('example')


class TestGetSystemDb:
    def test_gets_system_database(self, flask_app):
        with flask_app.app_context():
            db = get_system_db()
            assert db.name == '_system'


class TestDeleteDb:
    def test_deletes_database(self, flask_app):
        with flask_app.app_context():
            arango = from_flask_config()
            arango.system_database().create_database('xyz')
            new_db = arango.client().db('xyz')
            delete_db(new_db)
            assert not arango.system_database().has_database('xyz')
