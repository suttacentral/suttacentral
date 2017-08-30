import os
import sys
myPath = os.path.dirname(os.path.abspath(__file__))
sys.path.append(myPath)

import pytest

from .app import app as my_app
from common.arangodb import get_client
from migrations._runner import run_migrations
from common.utils import remove_test_db


@pytest.fixture
def app():
    return my_app


@pytest.fixture
def arango():
    with my_app.app_context():
        return get_client()


@pytest.fixture(scope='session', autouse=True)
def migration(request):
    remove_test_db()
    with my_app.app_context():
        run_migrations()
    request.addfinalizer(remove_test_db)
