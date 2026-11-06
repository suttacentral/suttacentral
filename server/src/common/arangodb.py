from arango import ArangoClient
from arango.database import StandardDatabase
from flask import current_app, g


def get_db() -> StandardDatabase:
    db = getattr(g, '_database', None)
    if db is None:
        config = current_app.config['ARANGO_CLIENT']
        params = {'username': config['username'], 'password': config['password']}
        if isinstance(current_app.config['ARANGO_DB'], dict):
            params.update(current_app.config['ARANGO_DB'])
        else:
            params['name'] = current_app.config['ARANGO_DB']
        db = _arango_client().db(**params)
        g._database = db
    return db


def get_client() -> ArangoClient:
    client = _get_client_from_g()
    if client is None:
        client = _arango_client()
    return client


def _arango_client() -> ArangoClient:
    client = _get_client_from_g()
    if client is None:
        client = _connect()
        _put_client_in_g(client)
    return client


def _connect() -> ArangoClient:
    config = current_app.config['ARANGO_CLIENT']
    return ArangoClient(hosts=f'http://{config["host"]}:{config["port"]}', request_timeout=1000)


def _put_client_in_g(client: ArangoClient) -> None:
    g._database_client = client


def _get_client_from_g() -> ArangoClient | None:
    return getattr(g, '_database_client', None)


def get_system_db() -> StandardDatabase:
    config = current_app.config['ARANGO_CLIENT']
    db = get_client().db(
        **{'username': config['username'], 'password': config['password']}
    )
    return db


def delete_db(db: StandardDatabase):
    get_system_db().delete_database(db.name)
