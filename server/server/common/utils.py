from app import app as my_app
from common.arangodb import get_client


def remove_test_db():
    """
    Delete test db.
    """
    with my_app.app_context():
        get_client().delete_database(my_app.config.get('ARANGO_DB'), ignore_missing=True)
