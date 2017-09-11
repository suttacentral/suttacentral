from api.views import Languages, Menu
from app import api
from common.utils import generate_languages, generate_root_edges, generate_roots


def test_languages(client):
    languages = generate_languages()
    languages.save()
    res = client.get(api.url_for(Languages))
    assert res.status_code == 200


def test_menu(client):
    roots = generate_roots(amount=10)
    roots.save()
    edges = generate_root_edges(roots)
    edges.save()

    res = client.get(api.url_for(Menu))

    data = res.json

    assert res.status_code == 200
    assert isinstance(data, dict)
