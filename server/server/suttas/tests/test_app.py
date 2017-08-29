from app import api, HelloWorld


def test_hello(client):
    """
    It is just a sample test so that i can set up test env.
    """
    res = client.get(api.url_for(HelloWorld, name='test'))
    assert res.status_code == 200
