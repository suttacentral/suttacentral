import os
import sys

import pytest
from arango import ArangoClient
from flask import Flask

myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(myPath)

from .app import app as my_app
from common.arangodb import get_client
from migrations.runner import run_migrations
from common.utils import remove_test_db


@pytest.fixture
def app() -> Flask:
    return my_app


@pytest.fixture
def arango() -> ArangoClient:
    """
    :return: Arango client
    """
    with my_app.app_context():
        return get_client()


@pytest.fixture(scope='session', autouse=True)
def migration(request):
    """
    Runs migrations before all tests and delete database at the end.
    """
    remove_test_db()
    with my_app.app_context():
        run_migrations()
    request.addfinalizer(remove_test_db)
