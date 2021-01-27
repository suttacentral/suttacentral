from api.views import (
    Languages,
    LookupDictionaries,
    Menu,
    Parallels,
    Sutta,
    SuttaplexList,
)
from app import api
from common import utils


def test_languages(client):
    languages = utils.generate_languages()
    languages.save()
    res = client.get(api.url_for(Languages))
    assert res.status_code == 200


def test_menu(client):
    nav_docs = utils.generate_navigation_docs(amount=10)
    nav_docs.save()
    edges = utils.generate_navigation_edges(nav_docs)
    edges.save()

    res = client.get(api.url_for(Menu))

    data = res.json

    assert res.status_code == 200
    assert isinstance(data, list)
    assert all([isinstance(x, dict) for x in data])


def test_suttaplex_list(client):
    utils.generate_html_text().save()
    utils.generate_blurb().save()
    utils.generate_difficulty().save()
    roots = utils.generate_navigation_docs()
    roots.save()
    utils.generate_navigation_edges(roots).save()

    res = client.get(api.url_for(SuttaplexList, uid=roots[0].uid))

    assert res.status_code == 200


def test_parallels_view(client):
    utils.generate_html_text().save()
    nav_docs = utils.generate_navigation_docs()
    nav_docs.save()

    uid = nav_docs[0].uid

    utils.generate_relationships(nav_docs).save()

    res = client.get(api.url_for(Parallels, uid=uid))

    assert res.status_code == 200


def test_sutta_view(client):
    utils.generate_html_text().save()
    utils.generate_blurb().save()
    utils.generate_difficulty().save()
    nav_docs = utils.generate_navigation_docs()
    nav_docs.save()
    utils.generate_navigation_edges(nav_docs).save()

    res = client.get(api.url_for(Sutta, uid=nav_docs[0].uid, author='sujato', lang='en'))

    assert res.status_code == 200


def test_lookup_dictionaries_no_query(client):
    res = client.get(api.url_for(LookupDictionaries))

    assert res.status_code == 422


def test_lookup_dictionaries(client):

    utils.generate_lookup_dict(_from='pli', to='en')

    data = {'from': 'pli', 'to': 'en'}
    res = client.get(api.url_for(LookupDictionaries, **data))

    assert res.status_code == 200
