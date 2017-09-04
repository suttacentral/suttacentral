from app import api
from api.views import HelloWorld, Languages
from common.utils import generate_languages


def test_hello(client):
    """
    It is just a sample test so that i can set up test env.
    """
    res = client.get(api.url_for(HelloWorld, name='test'))
    assert res.status_code == 200


def test_languages(client):
    languages = generate_languages()
    languages.save()
    res = client.get(api.url_for(Languages))
    assert res.status_code == 200
