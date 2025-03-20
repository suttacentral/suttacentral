import itertools
from typing import Callable, Dict, List

import re

import decorator

from common import models
from common.arangodb import get_system_db, get_db
from migrations.runner import run_migrations


def current_app():
    from app import app_factory

    api, app = app_factory()
    return app


def remove_test_db():
    """
    Delete the test db.
    """
    get_system_db().delete_database(
        current_app().config.get('ARANGO_DB'), ignore_missing=True
    )


def app_context(func: Callable):
    """
    Run function in flask's app context.
    """

    def wrapper(func: Callable, *args, **kwargs):
        with current_app().app_context():
            return func(*args, **kwargs)

    return decorator.decorator(wrapper, func)


def empty_arango(func: Callable):
    """
    Decorator that removes arango test database before running the test and re-create it after.
    """

    def remove_existing_database(func: Callable, *args, **kwargs):

        with current_app().app_context():
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


def generate_navigation_docs(amount=5) -> models.ModelList:
    return _generate_models(amount, models.NavigationDetailDoc)


def generate_navigation_edges(nav_docs: List[models.NavigationDetailDoc]) -> models.ModelList:
    return models.SuperNavigationEdge.generate(nav_docs)


def generate_html_text(amount=5) -> models.ModelList:
    return _generate_models(amount, models.HtmlText)


def generate_blurb(amount=5) -> models.ModelList:
    return _generate_models(amount, models.Blurb)


def generate_difficulty(amount=5) -> models.ModelList:
    return _generate_models(amount, models.Difficulty)


def generate_relationships(nav_docs: List[models.NavigationDetailDoc]) -> models.ModelList:
    return models.Relationship.generate(nav_docs)


def generate_lookup_dict(_from, to):
    db = get_db()
    db['dictionaries_simple'].insert(
        {
            'from': _from,
            'to': to,
            'dictname': 'test',
            'entry': 'test',
            'grammar': 'test',
            'definition': 'test',
        }
    )


def flat_tree(data: List[Dict], children='children') -> List[Dict]:
    """ Flattens the data. Nesting level is practically unlimited.

    Args:
        data: Tree data structure as Lists of dicts.
        children: Key in dicts where children are.

    Returns:
        Flatten representation of the tree.
    Examples:
        >>> data = [{
        >>>     'uid': 12,
        >>>     'children': [{
        >>>             'uid': 11
        >>>             'children': [...]
        >>>             },
        >>>             {'uid': 5}]
        >>>
        >>> }]
        >>> flat_tree(data)
        >>> [{'uid': 12}, {'uid': 5}, {'uid': 11}, ...]
    """
    results = []

    def f_tree(data: List[Dict]):
        for entry in data:
            children_list = entry.pop(children, [])
            results.append(entry)
            f_tree(children_list)

    f_tree(data)
    return results


def language_sort(original_lang):
    def l_sort(lang):
        if lang['lang'] == original_lang:
            result = '11111'  # So that root language is always first.
        else:
            result = lang['lang']
        if lang['segmented']:
            result += '_0'
        else:
            result += '_1'
        return result

    return l_sort


def sort_parallels_key(x):
    if '#' not in x:
        return x, -1
    prefix, number, *_ = x.split('#')
    number = number.strip('-')
    try:
        number = int(number)
    except ValueError:
        number = 0
    return prefix, number


def sort_parallels_type_key(x):
    if x['type'] == 'full' and x['resembling']:
        p_type = 'resembling'
    else:
        p_type = x['type']
    values = {'full': 1, 'resembling': 2, 'mention': 3, 'retelling': 4}
    return values[p_type], x['to']['to']


def chunks(iterable, chunk_size):
    if isinstance(iterable, list):
        yield from (
            iterable[i: i + chunk_size] for i in range(0, len(iterable), chunk_size)
        )
    else:
        iterator = iter(iterable)
        while True:
            r = list(itertools.islice(iterator, 0, chunk_size))
            if r:
                yield r
            else:
                break


def get_possible_parent_uid(uid):
    if uid is None:
        return ''
    else:
        return re.sub(r'([a-z]+(?:-[a-z]+)*)(?:-\d|\d).*', r'\1', uid)
