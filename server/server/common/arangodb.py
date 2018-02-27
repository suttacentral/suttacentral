#!/usr/bin/env python3
# coding=utf-8
from typing import Union

from arango import ArangoClient
from arango.database import Database
from arango.collections.base import BaseCollection
from flask import current_app, g

import logging


# python-arango import_bulk function is pretty dangerous to use
# in current version unless you set "halt_on_error=True" it silently
# ignores errors. But if you set "halt_on_error=True" you get an
# exception but lose the response body containing the error details
# so you have no idea what went wrong!
# It's pretty much a no-win.
# I expect this will be improved in the library in time but for now
# I'm patching in a more sensible version which always logs errors
# and can be told to raise an exception.
def import_bulk_safe(self, *args, halt_on_error=False, **kwargs):
    res = self.import_bulk(*args, **kwargs, halt_on_error=False)
    if res['errors'] > 0:
        for error in res['details']:
            logging.error(f'{self.name}:{error}')
        if halt_on_error:
            raise arango.exception.DocumentInsertError()

BaseCollection.import_bulk_safe = import_bulk_safe

class ArangoDB:
    def __init__(self, app=None):
        self.app = app

    def connect(self) -> ArangoClient:
        """Connect to the ArangoDB"""
        return ArangoClient(**current_app.config['ARANGO_CLIENT'])

    @property
    def client(self) -> ArangoClient:
        """
        Puts client object in g object.
        :return: ArangoClient object connected to the databse.
        """
        client = self._get_client_from_g_or_none()
        if client is None:
            client = g._database_client = self.connect()
        return client

    @property
    def db(self) -> Database:
        """
        Puts db object in g object.
        :return: Arango database object.
        """
        db = self._get_db_from_g_or_none()
        if db is None:
            if isinstance(current_app.config['ARANGO_DB'], dict):
                db = g._database = self.client.db(**current_app.config['ARANGO_DB'])
            else:
                db = g._database = self.client.db(name=current_app.config['ARANGO_DB'])
        return db

    @staticmethod
    def _get_db_from_g_or_none() -> Union[Database, None]:
        """
        Returns db object if present in g object otherwise returns None
        """
        return getattr(g, '_database', None)

    @staticmethod
    def _get_client_from_g_or_none() -> Union[ArangoClient, None]:
        """
        Returns db object if present in g object otherwise returns None
        """
        return getattr(g, '_database_client', None)


def get_client() -> ArangoClient:
    """
    Returns client object for current db session and creates one if not present.
    """
    client = ArangoDB._get_client_from_g_or_none()
    if client is None:
        client = ArangoDB(current_app).client
    return client


def get_db() -> Database:
    """
    Returns db obejct for current db session and creats one if not presenet.
    """
    db = ArangoDB._get_db_from_g_or_none()
    if db is None:
        db = ArangoDB(current_app).db
    return db


def delete_db(db: Database):
    get_client().delete_database(db.name)
