import pytest
import json

from app import api, app


class TestHomePageData:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_home_page_data(self, client):
        url = "/homepage_data"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'epigraphs' in data
        assert 'whyweread' in data
        assert 'tipitaka' in data


class TestSuttaFullPath:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_sutta_full_path(self, client):
        url = "/suttafullpath/sn1.1"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert len(data) > 0
        assert data['full_path'] == '/pitaka/sutta/linked/sn/sn-sagathavaggasamyutta/sn1/sn1-nalavagga'


class TestMenu:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_menu(self, client):
        url = "/menu"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'uid' in item
            assert 'root_name' in item
            assert 'translated_name' in item
            assert 'blurb' in item
            assert 'acronym' in item
            assert 'node_type' in item
            assert 'root_lang_iso' in item
            assert 'root_lang_name' in item
            assert 'child_range' in item
            assert 'yellow_brick_road' in item
            assert 'yellow_brick_road_count' in item
            assert 'children' in item

    def test_submenu(self, client):
        url = "/menu/sn"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'uid' in item
            assert 'root_name' in item
            assert 'translated_name' in item
            assert 'blurb' in item
            assert 'acronym' in item
            assert 'node_type' in item
            assert 'root_lang_iso' in item
            assert 'root_lang_name' in item
            assert 'child_range' in item
            assert 'yellow_brick_road' in item
            assert 'yellow_brick_road_count' in item
            assert 'children' in item


class TestTipitakaMenu:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_tipitaka_menu(self, client):
        url = "/tipitaka_menu"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'uid' in item
            assert 'root_name' in item
            assert 'translated_name' in item
            assert 'blurb' in item
            assert 'acronym' in item
            assert 'node_type' in item
            assert 'yellow_brick_road' in item
            assert 'yellow_brick_road_count' in item


class TestDictionaryFull:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_dictionary_full(self, client):
        url = "/dictionary_full/citta"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)

        for item in data:
            assert 'from' in item
            assert 'to' in item
            assert 'entry' in item
            assert 'definition' in item
            assert 'xr' in item
            assert 'dictname' in item
            assert 'text' in item
            assert 'pronunciation' in item


class TestParallels:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_parallels(self, client):
        url = "/parallels/sn1.1"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'sn1.1' in data


class TestParallelsLite:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_parallels(self, client):
        url = "/parallels_lite/sn1.1"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)


class TestRangeSuttaplexList:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_range_suttaplex(self, client):
        url = "/range_suttaplex/an1.1"
        response = client.get(url)

        # print(f"Status Code: {response.status_code}")
        # print(f"Response Contents: {response.data.decode('utf-8')}")

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        # 验证返回的数据结构
        for sutta in data:
            assert 'uid' in sutta
            assert sutta['uid'] is not None
            assert sutta['uid'].startswith('an1.')
            assert 'translations' in sutta

    def test_invalid_uid_format(self, client):
        url = "/range_suttaplex/this-is-invalid-uid"
        response = client.get(url)
        data = json.loads(response.data)
        assert len(data) > 0
        assert data[0]['uid'] is None

    def test_nonexistent_range(self, client):
        url = "/range_suttaplex/an999.1-10"
        response = client.get(url)
        data = json.loads(response.data)
        assert len(data) > 0
        assert data[0]['uid'] is None

    def test_response_includes_required_fields(self, client):
        url = "/range_suttaplex/an1.1-10"
        response = client.get(url)
        assert response.status_code == 200
        data = json.loads(response.data)

        if len(data) > 0:
            sutta = data[0]
            required_fields = [
                'acronym',
                'volpages',
                'alt_volpages',
                'uid',
                'blurb',
                'difficulty',
                'root_lang',
                'root_lang_name',
                'type',
                'translated_title',
                'translations',
                'parallel_count',
                'biblio',
                'priority_author_uid',
                'verseNo',
                'previous',
                'next'
            ]
            for field in required_fields:
                assert field in sutta

            translation_required_fields = [
                'lang',
                'lang_name',
                'is_root',
                'author',
                'author_short',
                'author_uid',
                'publication_date',
                'id',
                'segmented',
                'volpage',
                'has_comment'
            ]

            for translation in sutta['translations']:
                for field in translation_required_fields:
                    assert field in translation


class TestSuttaplexList:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_range_suttaplex(self, client):
        url = "/suttaplex/an1.1-10"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        # 验证返回的数据结构
        for sutta in data:
            assert 'uid' in sutta
            assert sutta['uid'] is not None
            assert sutta['uid'].startswith('an1.')
            assert 'translations' in sutta

    def test_invalid_uid_format(self, client):
        url = "/suttaplex/this-is-invalid-uid"
        response = client.get(url)
        data = json.loads(response.data)
        assert len(data) > 0
        assert data[0]['uid'] is None

    def test_nonexistent_range(self, client):
        url = "/suttaplex/an999.1-10"
        response = client.get(url)
        data = json.loads(response.data)
        assert len(data) > 0
        assert data[0]['uid'] is None

    def test_response_includes_required_fields(self, client):
        url = "/suttaplex/an1.1-10"
        response = client.get(url)
        assert response.status_code == 200
        data = json.loads(response.data)

        if len(data) > 0:
            sutta = data[0]
            required_fields = [
                'acronym',
                'volpages',
                'alt_volpages',
                'uid',
                'blurb',
                'difficulty',
                'root_lang',
                'root_lang_name',
                'type',
                'translated_title',
                'translations',
                'parallel_count',
                'biblio',
                'priority_author_uid',
                'verseNo',
                'previous',
                'next'
            ]
            for field in required_fields:
                assert field in sutta

            translation_required_fields = [
                'lang',
                'lang_name',
                'is_root',
                'author',
                'author_short',
                'author_uid',
                'publication_date',
                'id',
                'segmented',
                'volpage',
                'has_comment'
            ]

            for translation in sutta['translations']:
                for field in translation_required_fields:
                    assert field in translation


class TestSegmentedSutta:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_segmented_sutta(self, client):
        url = "/bilarasuttas/sn1.1"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'html_text' in data
        assert 'root_text' in data
        assert 'variant_text' in data
        assert 'reference_text' in data
        assert 'keys_order' in data

    def test_basic_segmented_sutta_with_author(self, client):
        url = "/bilarasuttas/sn1.1/sujato"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'html_text' in data
        assert 'root_text' in data
        assert 'translation_text' in data
        assert 'variant_text' in data
        assert 'reference_text' in data
        assert 'keys_order' in data

    def test_invalid_uid_format(self, client):
        url = "/bilarasuttas/this-is-invalid-uid"
        response = client.get(url)
        data = json.loads(response.data)
        assert data['msg'] == 'Not Found'


class TestNavigationData:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_navigation_data(self, client):
        url = "/navigation_data/sn1.1"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'uid' in item
            assert 'title' in item
            assert 'url' in item
            assert 'type' in item
            assert 'index' in item


class TestLanguage:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_language(self, client):
        url = "/languages"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'uid' in item
            assert 'name' in item
            assert 'iso_code' in item
            assert 'is_root' in item
            assert 'localized' in item
            assert 'localized_percent' in item


class TestTranslationCount:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_translation_count(self, client):
        url = "/translation_count/en"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'division' in data
        assert 'author' in data

        assert isinstance(data['division'], list)
        for item in data['division']:
            assert 'uid' in item
            assert 'name' in item
            assert 'root_lang' in item
            assert 'total' in item

        assert isinstance(data['author'], list)
        for item in data['author']:
            assert 'author_uid' in item
            assert 'name' in item
            assert 'total' in item

    def test_basic_translation_count_by_languages(self, client):
        url = "/translation_count"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'ancient' in data
        assert 'modern' in data

        assert isinstance(data['ancient'], list)
        for item in data['ancient']:
            assert 'iso_code' in item
            assert 'name' in item
            assert 'total' in item

        assert isinstance(data['modern'], list)
        for item in data['modern']:
            assert 'iso_code' in item
            assert 'name' in item
            assert 'percent' in item
            assert 'total' in item


class TestCurrencies:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_currencies(self, client):
        url = "/currencies"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'default_currency_index' in data
        assert 'currencies' in data

        assert isinstance(data['currencies'], list)
        assert len(data['currencies']) > 0
        for item in data['currencies']:
            assert 'name' in item
            assert 'symbol' in item
            assert 'american_express' in item
            assert 'decimal' in item


class TestParagraphs:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_paragraphs(self, client):
        url = "/paragraphs"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'uid' in item
            assert 'description' in item


class TestParagraphs:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_paragraphs(self, client):
        url = "/epigraphs"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'uid' in item
            assert 'epigraph' in item


class TestWhyweread:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_paragraphs(self, client):
        url = "/whyweread"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0


class TestGlossary:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_paragraphs(self, client):
        url = "/glossary"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'entry' in item
            assert 'gloss' in item


class TestDictionaryFullAdjacent:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_paragraphs(self, client):
        url = "/dictionary_full/adjacent/evam"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0


class TestDictionaryFullSimilar:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_paragraphs(self, client):
        url = "/dictionary_full/similar/evam"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

    def test_noexistent_word(self, client):
        url = "/dictionary_full/similar/this-is-nonexistent-word"
        response = client.get(url)
        data = json.loads(response.data)
        assert len(data) == 1 and data[0] != ''


class TestExpansion:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_paragraphs(self, client):
        url = "/expansion"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert isinstance(item, dict)


class TestCollectionUrlList:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_basic_collection_url_list(self, client):
        url = "/pwa/collection/dn?languages=en&root_lang=false"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'menu' in data
        assert 'suttaplex' in data
        assert 'texts' in data

        assert isinstance(data['menu'], list)
        assert isinstance(data['suttaplex'], list)
        assert isinstance(data['texts'], list)


class PWASizes:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_pwa_sizes(self, client):
        url = "/pwa/sizes"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)


class TestExtractSuttaFromRangeSutta:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_extract_sutta_from_range_sutta(self, client):
        url = "/extractsutta/an1.1"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'html_text' in data
        assert 'root_text' in data
        assert 'variant_text' in data
        assert 'reference_text' in data
        assert 'keys_order' in data

    def test_extract_sutta_from_range_sutta_for_author(self, client):
        url = "/extractsutta/an1.1/sujato"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'html_text' in data
        assert 'root_text' in data
        assert 'variant_text' in data
        assert 'reference_text' in data
        assert 'keys_order' in data


class TestTransliterate:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_transliterate(self, client):
        url = "/transliterate/ahom/The truth is beautiful"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, str)
        assert data  == "𑜌𑜦𑜧 𑜄𑜞𑜤𑜌𑜫 𑜒𑜢𑜏𑜫 𑜈𑜦𑜧𑜒𑜧𑜨𑜄𑜣𑜇𑜤𑜎𑜫"


class TestTransliteratedSutta:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_transliterated_sutta(self, client):
        url = "/transliterated_sutta/sn1.1/ahom/null"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'sn1.1:0.1' in data
        assert 'sn1.1:0.2' in data

    def test_transliterated_sutta_with_postoptions(self, client):
        url = "/transliterated_sutta/sn1.1/Sinhala/SinhalaPali"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, dict)
        assert 'sn1.1:0.1' in data
        assert 'sn1.1:0.2' in data


class TestPaliReferenceEdition:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_pali_reference_edition(self, client):
        url = "/pali_reference_edition"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0


class TestAvailableVoices:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_available_voices(self, client):
        url = "/available_voices/sn1.1"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'uid' in item
            assert 'voices' in item


class TestRootEdition:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_root_edition(self, client):
        url = "/root_edition"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0


class TestGuides:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_guides(self, client):
        url = "/guides"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'guide_uid' in item
            assert 'text_uid' in item
            assert 'lang' in item


class TestShortcuts:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_shortcuts(self, client):
        url = "/shortcuts"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'shortcuts' in item
            assert 'uid' in item


class TestCreatorBio:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_creator_bio(self, client):
        url = "/creator_bio"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0

        for item in data:
            assert 'creator_uid' in item
            assert 'creator_biography' in item


class TestAbbreviationTexts:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_abbreviation_texts(self, client):
        url = "/abbreviation_texts"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'name' in item
            assert 'acronym' in item


class TestAbbreviationEditions:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_abbreviation_editions(self, client):
        url = "/abbreviation_editions"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'name' in item
            assert 'acronym' in item
            assert 'uid' in item


class TestAbbreviationSchools:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_abbreviation_schools(self, client):
        url = "/abbreviation_schools"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'name' in item
            assert 'acronym' in item
            assert 'uid' in item


class TestFallenLeaves:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_fallen_leaves(self, client):
        url = "/fallen_leaves"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'fallen_leaves' in item


class TestMapData:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_map_data(self, client):
        url = "/map_data"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
        for item in data:
            assert 'type' in item
            assert 'features' in item
            assert len(item['features']) > 0
            for feature in item['features']:
                assert 'type' in feature
                assert 'geometry' in feature
                assert 'properties' in feature



class TestFetchPossibleNames:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_fetch_possible_names(self, client):
        url = "/possible_names/en"
        response = client.get(url)

        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert len(data) > 0
