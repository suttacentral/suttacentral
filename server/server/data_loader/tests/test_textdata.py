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
            "_key" : "10318325",
            "_id" : "author_edition/10318325",
            "_rev" : "_jbu75VK--G",
            "type" : "author",
            "uid" : "bodhi",
            "short_name" : "Bodhi",
            "long_name" : "Bhikkhu Bodhi"
        }

    def add_document(self, doc):
        self.added_documents.append(doc)

    def update_code_points(self, lang_uid, unicode_points, force):
        pass

@pytest.fixture
def valid_html() -> str:
    return """\
<html>
<meta name='author' content='Bhikkhu Bodhi'>
</html>"""

@pytest.fixture
def text_info():
    return TextInfoModelSpy()


@pytest.fixture
def sc_data_dir(tmp_path, valid_html) -> Path:
    file_location = tmp_path / 'html_text/en/pli/sutta/mn'
    file_location.mkdir(parents=True)
    html_file = file_location / 'mn1.html'
    with html_file.open('w') as f:
        html_file.write_text(valid_html)

    return tmp_path


@pytest.fixture
def html_text_dir(sc_data_dir) -> Path:
    return sc_data_dir / 'html_text'


@pytest.fixture
def files_to_process() -> dict[str, int]:
    return {'html_text/en/pli/sutta/mn/mn1.html': 0}


class TestTextInfoModel:
    def test_process_lang_dir_adds_text_info(self, text_info, sc_data_dir, html_text_dir, files_to_process):
        text_info.process_lang_dir(
            lang_dir=html_text_dir,
            data_dir=sc_data_dir,
            files_to_process=files_to_process
        )

        assert len(text_info.added_documents) == 1

    def test_empty_lang_dir_does_not_add_text_info(self, text_info, tmp_path):
        text_info.process_lang_dir(lang_dir=tmp_path)
        assert not text_info.added_documents

    def test_lang_dir_with_empty_language_does_not_add_text_info(self, text_info, tmp_path):
        en = tmp_path / 'en'
        en.mkdir()
        text_info.process_lang_dir(tmp_path)
        assert not text_info.added_documents

    def test_file_not_in_files_to_process_does_not_add_text_info(self, text_info, sc_data_dir, html_text_dir):
        text_info.process_lang_dir(
            lang_dir=html_text_dir,
            data_dir=sc_data_dir,
            files_to_process={}
        )
        assert not text_info.added_documents

    def test_missing_data_dir_causes_type_error(self, text_info, sc_data_dir, html_text_dir):
        with pytest.raises(TypeError):
            text_info.process_lang_dir(lang_dir=html_text_dir)

    def test_missing_files_to_process_causes_type_error(self, text_info, sc_data_dir, html_text_dir):
        with pytest.raises(TypeError):
            text_info.process_lang_dir(lang_dir=html_text_dir, data_dir=sc_data_dir)
