import os
import time

from arango import ArangoClient
from arango.exceptions import ServerConnectionError


def connect():
    client = ArangoClient(
        host=os.getenv('ARANGO_HOST'),
        port=os.getenv('ARANGO_PORT')
    )

    # arango client >= 4 thows only when verify is set to True
    client.db(
        '_system',
        username=os.getenv('ARANGO_USER'),
        password=os.getenv('ARANGO_ROOT_PASSWORD'),
        verify=True
    )


while True:
    try:
        connect()
        break
    except ServerConnectionError:
        time.sleep(1)
