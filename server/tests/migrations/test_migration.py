from common.arangodb import get_system_db

from common.utils import empty_arango


@empty_arango
def test_empty_arango(app):
    assert app.config.get('ARANGO_DB') not in get_system_db().databases()


def test_migration(app):
    assert app.config.get('ARANGO_DB') in get_system_db().databases()
