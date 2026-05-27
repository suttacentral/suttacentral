from common.arangodb import get_system_db
from common.utils import current_app
from migrations.runner import run_migrations

test_db_name = 'suttacentral_data_load_tests'

app = current_app()
app.config['ARANGO_DB'] = test_db_name

with app.app_context():
    system_db = get_system_db()

    if system_db.has_database(test_db_name):
        system_db.delete_database(test_db_name)

    run_migrations()