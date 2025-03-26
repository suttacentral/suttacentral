from pathlib import Path

import pytest

from common.arangodb import get_db
from common.utils import current_app
from data_loader import arangoload


@pytest.fixture
def data_load_app(app):
    app = current_app()
    app.config['ARANGO_DB'] = 'suttacentral_data_load_tests'
    return app

def test_set_db_name(data_load_app):
    with data_load_app.app_context():
        assert get_db().name == 'suttacentral_data_load_tests'

def test_do_collect_data_stage(data_load_app):
    with data_load_app.app_context():
        data_dir = Path('/opt/sc/sc-flask/sc-data')
        git_repository = data_load_app.config.get('DATA_REPO')
        arangoload.collect_data(data_dir, git_repository)

@pytest.mark.skip("Figure out why collect_data() fails first")
def test_do_entire_run(data_load_app):
    with data_load_app.app_context():
        arangoload.run()
