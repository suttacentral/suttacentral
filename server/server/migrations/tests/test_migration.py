from arango import ArangoClient

from common.utils import empty_arango


@empty_arango
def test_empty_arango(app, arango: ArangoClient):
    assert app.config.get('ARANGO_DB') not in arango.databases()


def test_migration(app, arango: ArangoClient):
    assert app.config.get('ARANGO_DB') in arango.databases()
