from typing import Generator, Tuple

import pytest
from arango import ArangoClient
from arango.database import StandardDatabase
from flask import Flask, g
from flask_restful import Api

from common.arangodb import ArangoDB, get_client, get_db, connect
from sc_flask.app import app_factory


@pytest.fixture
def flask_app() -> Flask:
    api_app: Tuple[Api, Flask] = app_factory()
    return api_app[1]


@pytest.fixture
def client() -> ArangoClient:
    return get_client()


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


class TestConnect:
    def test_connect(self, flask_app):
        with flask_app.app_context():
            connect()


class TestArangoDB:
    def test_hosts(self, flask_app):
        with flask_app.app_context() as app:
            arangodb = ArangoDB()
            assert arangodb.client.hosts == ['http://localhost:8529']

    def test_client_property_adds_client_to_g(self, flask_app):
        with flask_app.app_context():
            assert getattr(g, '_database_client', None) is None
            db = ArangoDB()
            _ = db.client
            client_attr = getattr(g, '_database_client', None)
            assert isinstance(client_attr, ArangoClient)

    def test_db_property_adds_db_to_g(self, flask_app):
        with flask_app.app_context():
            assert getattr(g, '_database', None) is None
            db = ArangoDB()
            _ = db.db
            client_attr = getattr(g, '_database', None)
            assert isinstance(client_attr, StandardDatabase)


class TestGetClient:
    def test_hosts(self, flask_app):
        with flask_app.app_context():
            client = get_client()
            assert client.hosts == ['http://localhost:8529']

    def test_adds_client_to_g_when_missing(self, flask_app):
        with flask_app.app_context():
            assert getattr(g, '_database_client', None) is None
            _ = get_client()
            client_attr = getattr(g, '_database_client', None)
            assert isinstance(client_attr, ArangoClient)


class TestGetDb:
    def test_get_db(self, flask_app):
        with flask_app.app_context():
            db = get_db()
            assert db.name == 'suttacentral_tests'

    def test_adds_db_to_g_when_missing(self, flask_app):
        with flask_app.app_context():
            assert getattr(g, '_database', None) is None
            _ = get_db()
            client_attr = getattr(g, '_database', None)
            assert isinstance(client_attr, StandardDatabase)
