from app import api, HelloWorld


def test_hello(client):
    res = client.get(api.url_for(HelloWorld, name='test'))
    assert res.status_code == 200
