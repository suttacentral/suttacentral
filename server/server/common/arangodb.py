#!/usr/bin/env python3
# coding=utf-8
from typing import Union

from arango import ArangoClient
from arango.database import Database
from flask import current_app, g

import logging

class ArangoDB:
    def __init__(self, app=None):
        self.app = app
        
    def connect(self) -> ArangoClient:
        """Connect to the ArangoDB"""
        config = current_app.config['ARANGO_CLIENT']
        return ArangoClient(host=config['host'], port=config['port'])

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
            config = current_app.config['ARANGO_CLIENT']
            params = {'username': config['username'], 'password': config['password']}
            if isinstance(current_app.config['ARANGO_DB'], dict):
                params.update(current_app.config['ARANGO_DB'])
            else:
                params['name'] = current_app.config['ARANGO_DB']
            db = g._database = self.client.db(**params)
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

def get_system_db() -> Database:
    config = current_app.config['ARANGO_CLIENT']
    db = get_client().db(**{'username': config['username'], 'password': config['password']})
    return db

def delete_db(db: Database):
    get_system_db().delete_database(db.name)
