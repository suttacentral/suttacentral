from arango import ArangoClient
from arango.database import StandardDatabase
from flask import current_app, g


class ArangoDB:
    def arango_db(self) -> StandardDatabase:
        db = get_db_from_g()
        if db is None:
            db = create_db()
            put_db_in_g(db)
        return db


def create_db() -> StandardDatabase:
    config = current_app.config['ARANGO_CLIENT']
    params = {'username': config['username'], 'password': config['password']}
    if isinstance(current_app.config['ARANGO_DB'], dict):
        params.update(current_app.config['ARANGO_DB'])
    else:
        params['name'] = current_app.config['ARANGO_DB']
    db = arango_client().db(**params)
    return db


def arango_client() -> ArangoClient:
    client = get_client_from_g()
    if client is None:
        client = connect()
        put_client_in_g(client)
    return client


def get_client() -> ArangoClient:
    client = get_client_from_g()
    if client is None:
        client = arango_client()
    return client


def connect() -> ArangoClient:
    config = current_app.config['ARANGO_CLIENT']
    return ArangoClient(hosts=f'http://{config["host"]}:{config["port"]}', request_timeout=1000)


def get_db_from_g() -> StandardDatabase | None:
    return getattr(g, '_database', None)


def put_db_in_g(db: StandardDatabase) -> None:
    g._database = db


def get_client_from_g() -> ArangoClient | None:
    return getattr(g, '_database_client', None)


def put_client_in_g(client: ArangoClient) -> None:
    g._database_client = client


def get_db() -> StandardDatabase:
    db = get_db_from_g()
    if db is None:
        db = ArangoDB().arango_db()
    return db


def get_system_db() -> StandardDatabase:
    config = current_app.config['ARANGO_CLIENT']
    db = get_client().db(
        **{'username': config['username'], 'password': config['password']}
    )
    return db


def delete_db(db: StandardDatabase):
    get_system_db().delete_database(db.name)
