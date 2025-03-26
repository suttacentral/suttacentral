import pytest

from config import TestingConfig
from data_loader.arangoload import run
from common.arangodb import get_db
from common.utils import app_context, current_app


def test_normal_testing_db_name():
    config = TestingConfig()
    assert config.ARANGO_DB == 'suttacentral_tests'

def test_data_load_tests_db_name():
    config = TestingConfig()
    assert config.ARANGO_DB_DATA_LOAD_TEST == 'suttacentral_data_load_tests'

def test_get_application_context():
    context = current_app().app_context()
    assert context

def test_set_db_name():
    app = current_app()
    app.config['ARANGO_DB'] = 'suttacentral_data_load_tests'
    with app.app_context() as context:
        assert get_db().name == 'suttacentral_data_load_tests'
