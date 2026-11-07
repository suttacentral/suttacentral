from typing import Generator, Tuple

import pytest
from arango import ArangoClient
from arango.database import StandardDatabase
from flask import Flask, g, current_app
from flask_restful import Api

from common.arangodb import get_client, get_db, get_system_db
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


class TestGetClient:
    def test_configures_host(self, flask_app):
        with flask_app.app_context():
            expected_host = current_app.config['ARANGO_CLIENT']['host']
            expected_port = str(current_app.config['ARANGO_CLIENT']['port'])
            client = get_client()
            assert client.hosts == [f'http://{expected_host}:{expected_port}']

    def test_adds_client_to_g_when_missing(self, flask_app):
        with flask_app.app_context():
            assert getattr(g, '_database_client', None) is None
            _ = get_client()
            client_attr = getattr(g, '_database_client', None)
            assert isinstance(client_attr, ArangoClient)


class TestGetDb:
    def test_configures_database_name(self, flask_app):
        with flask_app.app_context():
            db = get_db()
            assert db.name == 'suttacentral_tests'

    def test_stores_database_in_flask_global(self, flask_app):
        with flask_app.app_context():
            assert getattr(g, '_database', None) is None
            _ = get_db()
            client_attr = getattr(g, '_database', None)
            assert isinstance(client_attr, StandardDatabase)

    def test_database_is_writable(self, flask_app):
        with flask_app.app_context():
            db = get_db()
            db.create_collection('example')
            db.delete_collection('example')

    def test_sets_database_name_when_string(self, flask_app):
        with flask_app.app_context():
            current_app.config['ARANGO_DB'] = 'db_from_string'
            db = get_db()
            assert db.name == 'db_from_string'

    def test_sets_database_name_when_dict(self, flask_app):
        with flask_app.app_context():
            current_app.config['ARANGO_DB'] = {'name': 'db_from_dict'}
            db = get_db()
            assert db.name == 'db_from_dict'


class TestGetSystemDb:
    def test_gets_system_database(self, flask_app):
        with flask_app.app_context():
            db = get_system_db()
            assert db.name == '_system'
