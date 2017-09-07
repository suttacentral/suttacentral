from api.views import Languages
from app import api
from common.utils import generate_languages


def test_languages(client):
    languages = generate_languages()
    languages.save()
    res = client.get(api.url_for(Languages))
    assert res.status_code == 200
