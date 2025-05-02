from pathlib import Path

import pytest

from data_loader.textdata import TextInfoModel


class TextInfoModelSpy(TextInfoModel):
    """
    TextInfoModel uses the template method design pattern giving us a
    handy way to interact with the TextInfoModel class without accessing
    the database.
    """
    def __init__(self):
        super().__init__()
        self.added_documents = []

    def get_author_by_name(self, name, file) -> dict:
        return {
            'Veruca Salt': {
                '_key': '123456',
                '_id': 'author_edition/123456',
                '_rev': 'randomjunk',
                'type': 'edition',
                'uid': 'salt',
                'short_name': 'Salt',
                'long_name': 'Veruca Salt'
            }
        }

    def add_document(self, doc):
        self.added_documents.append(doc)

    def update_code_points(self, lang_uid, unicode_points, force):
        pass


@pytest.fixture
def text_info():
    return TextInfoModelSpy()


@pytest.fixture
def sc_data_dir(tmp_path) -> Path:
    file_location = tmp_path / 'html_text' / 'en' / 'pli' / 'sutta' / 'mn'
    file_location.mkdir(parents=True)
    html_file = file_location / 'mn1.html'
    with html_file.open('w') as f:
        html_file.write_text(
            '<html/>'
        )

    return tmp_path


@pytest.fixture
def html_text_dir(sc_data_dir) -> Path:
    return sc_data_dir / 'html_text'


class TestTextInfoModel:
    def test_lang_dir_empty(self, text_info, tmp_path):
        text_info.process_lang_dir(lang_dir=tmp_path)
        assert not text_info.added_documents

    def test_one_lang_dir(self, text_info, tmp_path):
        en = tmp_path / 'en'
        en.mkdir()
        text_info.process_lang_dir(tmp_path)
        assert not text_info.added_documents

    def test_one_html_file_and_no_data_dir(self, text_info, sc_data_dir, html_text_dir):
        # Blows up when we call relative_to(data_dir)
        with pytest.raises(TypeError):
            text_info.process_lang_dir(lang_dir=html_text_dir)
