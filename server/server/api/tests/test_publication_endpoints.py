import pytest
import json
from app import api, app


class TestPublication:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_publication(self, client):
        url = "/publication"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for publication in data:
            assert 'text_uid' in publication
            assert 'publication_number' in publication
            assert 'root_lang_iso' in publication
            assert 'root_lang_name' in publication
            assert 'translation_lang_iso' in publication
            assert 'translation_lang_name' in publication
            assert 'source_url' in publication
            assert 'author_uid' in publication
            assert 'translation_title' in publication
            assert 'translation_subtitle' in publication
            assert 'root_title' in publication
            assert 'translation_process' in publication
            assert 'translation_description' in publication
            assert 'is_published' in publication
            assert 'publication_status' in publication
            assert 'license' in publication
            assert 'edition' in publication


class TestPublicationEditions:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_publication_edition(self, client):
        url = "/publication/editions"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'edition_id' in item
            assert 'publication_number' in item


class TestPublicationEdition:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_all_publication_edition(self, client):
        url = "/publication/editions"
        response = client.get(url)
        data = json.loads(response.data)

        for item in data:
            edition_id = item['edition_id']
            url = f"/publication/edition/{edition_id}"
            response = client.get(url)
            data = json.loads(response.data)
            assert 'edition' in data
            assert 'publication' in data


class TestPublicationEditionFiles:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_publication_edition_files(self, client):
        url = "/publication/edition/an-en-sujato_scpub5-ed3-hardcover_2022-02-10/files"
        response = client.get(url)
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert data['./matter/epigraph.html'] != ''


class TestPublicationEditionMainMatter:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_publication_edition_main_matter(self, client):
        url = "/publication/edition/an-en-sujato_scpub5-ed3-hardcover_2022-02-10/an1.1-10"
        response = client.get(url)
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'uid' in item
            assert 'type' in item
            assert 'name' in item
            assert 'root_name' in item
            assert 'blurb' in item
            assert 'acronym' in item
            assert 'editionDetails' in item
            assert 'mainmatter' in item
            assert 'main_text' in item['mainmatter']
            assert 'markup' in item['mainmatter']
            assert 'reference' in item['mainmatter']


class TestPublicationEditionBlurbs:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_publication_edition_blurbs(self, client):
        url = "/publication/edition/blurbs/en"
        response = client.get(url)
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'uid' in item
            assert 'blurb' in item


class TestPublicationInfo:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_publication_info(self, client):
        url = "/publication_info/sn1.1/en/sujato"
        response = client.get(url)
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
