from app import api
from api.views import Languages
from common.utils import generate_languages


def test_languages(client):
    languages = generate_languages()
    languages.save()
    res = client.get(api.url_for(Languages))
    assert res.status_code == 200
