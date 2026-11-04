from typing import Generator, Tuple

import pytest
from arango import ArangoClient
from arango.database import StandardDatabase
from flask import Flask
from flask_restful import Api

from common.arangodb import ArangoDB, get_client, get_db
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


class TestArangoDB:
    def test_connect(self, flask_app):
        with flask_app.app_context() as app:
            db = ArangoDB(app=app)
            db.connect()


def test_get_db(flask_app):
    with flask_app.app_context():
        db = get_db()
        assert db.name == flask_app.config.get('ARANGO_DB')


def test_get_client(flask_app):
    with flask_app.app_context():
        client = get_client()
        assert isinstance(client, ArangoClient)
