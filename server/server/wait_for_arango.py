import os
import time

from arango import ArangoClient
from arango.exceptions import DatabaseListError
from requests.exceptions import ConnectionError


def connect():
    client = ArangoClient(
        host=os.getenv('ARANGO_HOST'),
        port=os.getenv('ARANGO_PORT'),
        username=os.getenv('ARANGO_USER'),
        password=os.getenv('ARANGO_ROOT_PASSWORD'),
    )
    client.databases()

while True:
    try:
        print('CONNECTING')
        connect()
        break
    except (ConnectionError, DatabaseListError):
        time.sleep(1)
