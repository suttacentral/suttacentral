from app import api
from search.view import InstantSearch

def test_search(client):
    data = {'query': 'test'}
    res = client.get(api.url_for(InstantSearch, **data))
    assert res.status_code == 200

def test_volpage_search(client):
    data = {'query': 'volpage:s ii 1', 'lang': 'en'}
    res = client.get(api.url_for(InstantSearch, **data))
    assert res.status_code == 200

    data = {'query': 'volpage:d i 1', 'lang': 'zh'}
    res = client.get(api.url_for(InstantSearch, **data))
    assert res.status_code == 200

    data = {'query': 'volpage:Vin IV 1', 'lang': 'de'}
    res = client.get(api.url_for(InstantSearch, **data))
    assert res.status_code == 200

    data = {'query': 'volpage:S.II,236 '}
    res = client.get(api.url_for(InstantSearch, **data))
    assert res.status_code == 200

def test_no_query(client):
    res = client.get(api.url_for(InstantSearch))
    assert res.status_code == 422
