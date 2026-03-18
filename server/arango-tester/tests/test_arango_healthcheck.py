import os

from arango import ArangoClient, ArangoClientError


def test_healthcheck():
    host = os.getenv('ARANGO_HOST')
    port = os.getenv('ARANGO_PORT')
    user = os.getenv('ARANGO_USER')
    password = os.getenv('ARANGO_ROOT_PASSWORD')

    host = f'http://{host}:{port}'

    client = ArangoClient(hosts=host)


    try:
        client.db(
            '_system',
            username=user,
            password=password,
            verify=True,
        )
    except ArangoClientError:
        assert False, f"Failed to connect to host: {host}"
