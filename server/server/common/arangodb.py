#!/usr/bin/env python3
# coding=utf-8
import logging
import re
from typing import Union

from arango import ArangoClient
from arango.collection import StandardCollection
from arango.database import Database
from arango.exceptions import DocumentInsertError
from flask import current_app, g


def explain_error(coll, e, docs, kwargs):
    # illegal document key, unique constraint violated
    explained = False
    if e.error_code in (1221, 1210):
        existing_keys = set(coll.keys())

        seen = {}
        for i, doc in enumerate(docs, 0):
            key = doc['_key']
            illegal_chars = ''.join(re.findall(r'''[^a-zA-Z0-9_:.@()+,=;$!*'%-]''', key))
            if illegal_chars:
                logging.error(f'{coll.name}: document key "{key}" contains illegal characters "{illegal_chars}"')
                explained = True
            if e.error_code == 1210:
                if key in seen:
                    logging.error(f'{coll.name}: unique constraint violated "{key}"\n\t{doc}\n\t{seen[key][1]}')

                    explained = True
                elif key in existing_keys and not kwargs.get('overwrite'):
                    logging.error(f'{coll.name}: document {i}, "{key}" has a duplicate key, already in the collection')
                    explained = True
            seen[key] = (i, doc)
    return explained


def import_bulk_logged(self, docs, wipe=False, *args, **kwargs):
    if 'overwrite' in args:
        raise ValueError('Overwrite not allowed as it is ambiguous, use "wipe=True" to clear collection')
    try:
        results = self.import_bulk(docs, overwrite=wipe, *args, **kwargs)
    except DocumentInsertError as e:
        logging.error(kwargs)

        explained = explain_error(self, e, docs, kwargs)
        if not explained:
            logging.error(
                f'{self.name}: Document Insertion Error, [ERR: {e.error_code}]: {e.error_message}, '
                f'explanation not available, you may proceed to panic and/or despair')
        raise
    except Exception as e:
        logging.error(f'{self.name}: error inserting documents: {e}: {docs}')
        raise

    for outcome, doc in zip(results, docs):
        if isinstance(outcome, Exception):
            if '_key' in doc:
                if doc["_key"] in outcome.error_message:
                    logging.error(f'Error inserting document: {outcome.error_message}')
                else:
                    logging.error(f'Error inserting document: {outcome.error_message}; key: {doc["_key"]}')
            else:
                logging.error(f'Error inserting document: {outcome.error_message}, {doc}')


StandardCollection.import_bulk_logged = import_bulk_logged
del import_bulk_logged


class ArangoDB:
    def __init__(self, app=None):
        self.app = app

    def connect(self) -> ArangoClient:
        """Connect to the ArangoDB"""
        config = current_app.config['ARANGO_CLIENT']
        return ArangoClient(hosts=f'http://{config["host"]}:{config["port"]}', request_timeout=1000)

    @property
    def client(self) -> ArangoClient:
        """
        Puts client object in g object.
        :return: ArangoClient object connected to the database.
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
            config = current_app.config['ARANGO_CLIENT']
            params = {'username': config['username'], 'password': config['password']}
            if isinstance(current_app.config['ARANGO_DB'], dict):
                params.update(current_app.config['ARANGO_DB'])
            else:
                params['name'] = current_app.config['ARANGO_DB']
            db = g._database = self.client.db(**params)
            # update_views_hack(db)
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
    Returns db object for current db session and creates one if not present.
    """
    db = ArangoDB._get_db_from_g_or_none()
    if db is None:
        db = ArangoDB(current_app).db
    return db


def get_system_db() -> Database:
    config = current_app.config['ARANGO_CLIENT']
    db = get_client().db(
        **{'username': config['username'], 'password': config['password']}
    )
    return db


def delete_db(db: Database):
    get_system_db().delete_database(db.name)
