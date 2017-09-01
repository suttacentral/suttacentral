import decorator
from typing import Callable

from app import app as my_app
from common.arangodb import get_client
from migrations.runner import run_migrations


def remove_test_db():
    """
    Delete the test db.
    """
    with my_app.app_context():
        get_client().delete_database(my_app.config.get('ARANGO_DB'), ignore_missing=True)


def app_context(func: Callable):
    """
    Run function in flask's app context.

    """
    def wrapper(func: Callable, *args, **kwargs):
        with my_app.app_context():
            return func(*args, **kwargs)
    return decorator.decorator(wrapper, func)


def empty_arango(func: Callable):
    """
    Decorator that removes arango test database before running the test and re-create it after.
    """
    def remove_existing_database(func: Callable, *args, **kwargs):

        remove_test_db()

        try:
            output = func(*args, **kwargs)
        except Exception as e:
            raise e
        finally:
            run_migrations()

        return output

    return decorator.decorator(remove_existing_database, func)
