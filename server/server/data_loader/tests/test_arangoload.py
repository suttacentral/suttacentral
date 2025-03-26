from common.arangodb import get_db
from common.utils import current_app


def test_set_db_name():
    app = current_app()
    app.config['ARANGO_DB'] = 'suttacentral_data_load_tests'
    with app.app_context():
        assert get_db().name == 'suttacentral_data_load_tests'
