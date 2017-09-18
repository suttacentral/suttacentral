from typing import Callable, List

import decorator

from app import app as my_app
from common.arangodb import get_client
from common import models
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


def _generate_models(amount, model) -> models.ModelList:
    model_list = models.ModelList()

    for _ in range(amount):
        generated_model = model.generate()
        model_list.append(generated_model)

    return model_list


def generate_languages(amount=5) -> models.ModelList:
    return _generate_models(amount, models.Language)


def generate_roots(amount=5) -> models.ModelList:
    return _generate_models(amount, models.Root)


def generate_root_edges(roots: List[models.Root]) -> models.ModelList:
    return models.RootEdges.generate(roots)


def generate_html_text(amount=5) -> models.ModelList:
    return _generate_models(amount, models.HtmlText)


def generate_blurb(amount=5) -> models.ModelList:
    return _generate_models(amount, models.Blurb)


def generate_po_markup(amount=5) -> models.ModelList:
    return _generate_models(amount, models.PoMarkup)


def generate_po_string(amount=5) -> models.ModelList:
    return _generate_models(amount, models.PoString)


def generate_difficulty(amount=5) -> models.ModelList:
    return _generate_models(amount, models.Difficulty)


def generate_relationships(roots: List[models.Root]) -> models.ModelList:
    return models.Relationship.generate(roots)
