from dataclasses import dataclass

from arango import ArangoClient
from arango.database import StandardDatabase
from flask import current_app, g


@dataclass
class ArangoDB:
    host: str
    port: int
    username: str
    password: str
    database_name: str

    def client(self) -> ArangoClient:
        return ArangoClient(hosts=f'http://{self.host}:{self.port}', request_timeout=1000)

    def database(self) -> StandardDatabase:
        return self.client().db(name=self.database_name, password=self.password, username=self.username)

    def system_database(self) -> StandardDatabase:
        return self.client().db(username=self.username, password=self.password)


def from_flask_config() -> ArangoDB:
    return ArangoDB(
        host=current_app.config['ARANGO_CLIENT']['host'],
        port=current_app.config['ARANGO_CLIENT']['port'],
        username=current_app.config['ARANGO_CLIENT']['username'],
        password=current_app.config['ARANGO_CLIENT']['password'],
        database_name=current_app.config['ARANGO_DB']
    )


def get_client() -> ArangoClient:
    if 'client' not in g:
        g.client = from_flask_config().client()
    return g.client


def get_db() -> StandardDatabase:
    if 'database' not in g:
        g.database = from_flask_config().database()
    return g.database


def get_system_db() -> StandardDatabase:
    return from_flask_config().system_database()


def delete_db(db: StandardDatabase):
    get_system_db().delete_database(db.name)
