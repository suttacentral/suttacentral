from api.views import (
    Languages,
    LookupDictionaries,
    Menu,
    Parallels,
    Sutta,
    SuttaplexList,
    MapData,
    FallenLeaves,
    AbbreviationSchools,
    AbbreviationEditions,
    AbbreviationTexts,
    CreatorBio,
    Shortcuts,
    Guides,
    RootEdition,
    AvailableVoices,
    RangeSuttaplexList
)

from api.views.publication_v2 import Edition, Editions, EditionMainmatter, EditionFiles, EditionBlurbs

from app import api
from common import utils
import json

from app import app
test_client = app.test_client()


def test_menu(client):
    nav_docs = utils.generate_navigation_docs(amount=10)
    nav_docs.save()
    edges = utils.generate_navigation_edges(nav_docs)
    edges.save()

    res = client.get(api.url_for(Menu))

    data = res.json

    assert res.status_code == 200
    assert isinstance(data, list)
    assert all(isinstance(x, dict) for x in data)


def test_suttaplex_list(client):
    utils.generate_html_text().save()
    utils.generate_blurb().save()
    utils.generate_difficulty().save()
    nav_docs = utils.generate_navigation_docs()
    nav_docs.save()
    utils.generate_navigation_edges(nav_docs).save()

    res = client.get(api.url_for(SuttaplexList, uid=nav_docs[0].uid))

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


def test_mapdata(client):
    res = client.get(api.url_for(MapData))
    assert res.status_code == 200


def test_fallen_Leaves(client):
    res = client.get(api.url_for(FallenLeaves))
    assert res.status_code == 200


def test_abbreviation_schools(client):
    res = client.get(api.url_for(AbbreviationSchools))
    assert res.status_code == 200


def test_abbreviation_editions(client):
    res = client.get(api.url_for(AbbreviationEditions))
    assert res.status_code == 200


def test_abbreviation_texts(client):
    res = client.get(api.url_for(AbbreviationTexts))
    assert res.status_code == 200


def test_creator_bio(client):
    res = client.get(api.url_for(CreatorBio))
    assert res.status_code == 200


def test_shortcuts(client):
    res = client.get(api.url_for(Shortcuts))
    assert res.status_code == 200


def test_editions(client):
    res = client.get(api.url_for(Editions))
    assert res.status_code == 200


def test_edition(client):
    res = client.get(api.url_for(Edition, edition_id='dn-en-sujato_scpub2-ed6-html_2022-02-10'))
    assert res.status_code == 200


def test_guides(client):
    res = client.get(api.url_for(Guides))
    assert res.status_code == 200


def test_root_edition(client):
    res = client.get(api.url_for(RootEdition))
    assert res.status_code == 200


def test_available_voices(client):
    res = client.get(api.url_for(AvailableVoices, uid='dn1'))
    assert res.status_code == 200
