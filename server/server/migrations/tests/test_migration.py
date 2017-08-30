import decorator
from arango import ArangoClient

from common.utils import remove_test_db
from migrations._runner import run_migrations


def empty_arango(func):
    """
    Decorator that removes arango test database before running the test and re-run migration after.
    """
    def remove_existing_database(func, *args, **kwargs):

        remove_test_db()

        try:
            output = func(*args, **kwargs)
        except Exception as e:
            raise e
        finally:
            run_migrations()

        return output

    return decorator.decorator(remove_existing_database, func)


@empty_arango
def test_empty_arango(app, arango: ArangoClient):
    assert app.config.get('ARANGO_DB') not in arango.databases()


def test_migration(app, arango: ArangoClient):
    assert app.config.get('ARANGO_DB') in arango.databases()


class TestBaseMigrationClass:
    pass
