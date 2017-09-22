from app import api
from search.view import Search

from common.utils import app_context


def test_search(client):
    data = {
        'query': 'test'
    }
    res = client.get(api.url_for(Search, **data))
    assert res.status_code == 200


@app_context
def test_no_query(client):
    res = client.get(api.url_for(Search))
    assert res.status_code == 422
