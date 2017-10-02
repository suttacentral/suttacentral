from app import api
from search.view import Search


def test_search(client):
    data = {
        'query': 'test'
    }
    res = client.get(api.url_for(Search, **data))
    assert res.status_code == 200


def test_no_query(client):
    res = client.get(api.url_for(Search))
    assert res.status_code == 422
