import pytest
import json
import os.path

from app import api, app
from flask import current_app

from tqdm import tqdm

from common.utils import app_context
from common.arangodb import get_db


AQL_EBS_SEGMENTED_TEXTS = """
LET ebs_uids = (
FOR text IN ebs_names
    FILTER text.node_type != 'branch' AND text.is_root == true
RETURN text.uid
)
FOR text IN sc_bilara_texts
    FILTER ('root' IN text.muids OR 'translation' IN text.muids)
    AND 'site' NOT IN text.muids
    AND NOT CONTAINS(text.file_path, 'blurb')
    AND NOT CONTAINS(text.file_path, '-name')
    AND NOT CONTAINS(text.file_path, 'interface')
    AND text.uid in ebs_uids
RETURN {
    uid: text.uid,
    author: text.muids[2],
    lang: text.lang,
    file_path: text.file_path
}
"""

AQL_EBS_LEGACY_TEXTS = """
LET ebs_uids = (
FOR text IN ebs_names
    FILTER text.node_type != 'branch' AND text.is_root == true
RETURN text.uid
)

FOR text IN html_text
    FILTER text.uid in ebs_uids
RETURN {
    uid: text.uid,
    author_uid: text.author_uid,
    lang: text.lang,
    file_path: text.file_path
}
"""


class TestSegmentedText():
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_segmented_text(self, client):
        original_db = app.config.get('ARANGO_DB')
        original_url = app.config.get('ARANGO_URL')

        try:
            app.config['ARANGO_DB'] = 'suttacentral'
            app.config['ARANGO_URL'] = 'http://sc-arangodb:8529'

            with app.app_context():
                db = get_db()
                ebs_texts = list(db.aql.execute(AQL_EBS_SEGMENTED_TEXTS))
                print(f"Found {len(ebs_texts)} EBS Segmented Texts")
                assert ebs_texts

            for text in tqdm(ebs_texts):
                assert isinstance(text, dict)
                assert 'uid' in text
                assert 'author' in text
                assert 'lang' in text
                assert 'file_path' in text
                url = f"/bilarasuttas/{text['uid']}/{text['author']}"
                response = client.get(url)
                assert response.status_code == 200
                data = json.loads(response.data)
                assert isinstance(data, dict)
                assert 'html_text' in data
                assert 'root_text' in data
                assert 'keys_order' in data
                file_path = text['file_path']
                assert os.path.exists(file_path), f"File does not exist: {file_path}"
                assert os.path.isfile(file_path), f"The path exists but is not a file: {file_path}"
                assert os.path.getsize(file_path) > 0, f"The file exists but is empty: {file_path}"
                assert os.access(file_path, os.R_OK), f"The file exists but is not readable: {file_path}"
        finally:
            app.config['ARANGO_DB'] = original_db
            app.config['ARANGO_URL'] = original_url


class TestLegacyText:
    @pytest.fixture
    def client(self):
        app.config['TESTING'] = True
        with app.test_client() as client:
            with app.app_context():
                yield client

    def test_legacy_text(self, client):
        original_db = app.config.get('ARANGO_DB')
        original_url = app.config.get('ARANGO_URL')

        try:
            app.config['ARANGO_DB'] = 'suttacentral'
            app.config['ARANGO_URL'] = 'http://sc-arangodb:8529'

            with app.app_context():
                db = get_db()
                ebs_texts = list(db.aql.execute(AQL_EBS_LEGACY_TEXTS))
                print(f"Found {len(ebs_texts)} EBS Legacy Texts")
                assert ebs_texts

            for text in tqdm(ebs_texts):
                assert isinstance(text, dict)
                assert 'uid' in text
                file_path = text['file_path']
                assert os.path.exists(file_path), f"File does not exist: {file_path}"
                assert os.path.isfile(file_path), f"The path exists but is not a file: {file_path}"
                assert os.path.getsize(file_path) > 0, f"The file exists but is empty: {file_path}"
                assert os.access(file_path, os.R_OK), f"The file exists but is not readable: {file_path}"

                url = f"/suttas/{text['uid']}/{text['author_uid']}?lang={text['lang']}"
                response = client.get(url)
                assert response.status_code == 200
                data = json.loads(response.data)
                assert isinstance(data, dict)
                assert 'segmented' in data
                assert 'suttaplex' in data
                assert 'root_text' in data
                assert isinstance(data['root_text'], dict)
                root_text = data['root_text']
                assert 'uid' in root_text
                assert 'lang' in root_text
                assert 'title' in root_text
                assert 'author' in root_text
                assert 'author_short' in root_text
                assert 'author_uid' in root_text
                assert 'next' in root_text
                assert 'previous' in root_text
        finally:
            app.config['ARANGO_DB'] = original_db
            app.config['ARANGO_URL'] = original_url
