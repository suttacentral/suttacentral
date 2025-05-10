from dataclasses import dataclass
from pathlib import Path

import pytest

from data_loader.textdata import TextInfoModel


@dataclass
class CodePoints:
    lang_uid: str
    unicode_points: dict
    force: bool


class TextInfoModelSpy(TextInfoModel):
    """
    TextInfoModel uses the template method design pattern giving us a
    handy way to interact with the TextInfoModel class without accessing
    the database.
    """
    def __init__(self):
        super().__init__()
        self.added_documents = []
        self.added_code_points: list[CodePoints] = []

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
        self.added_code_points.append(CodePoints(lang_uid, unicode_points, force))


def add_html_file(path: Path, html: str) -> None:
    with path.open('w') as f:
        path.write_text(html)


@pytest.fixture
def text_info():
    return TextInfoModelSpy()


@pytest.fixture
def sc_data_dir(tmp_path) -> Path:
    file_location = tmp_path / 'html_text/en/pli/sutta/mn'
    file_location.mkdir(parents=True)
    return tmp_path


@pytest.fixture
def en_dir(sc_data_dir) -> Path:
    return sc_data_dir / 'html_text/en/'


@pytest.fixture
def files_to_process() -> dict[str, int]:
    return {'html_text/en/pli/sutta/mn/mn1.html': 0}


@pytest.fixture
def with_mn1(sc_data_dir) -> Path:
    add_html_file(
        sc_data_dir / 'html_text/en/pli/sutta/mn/mn1.html',
        "<html><meta name='author' content='Bhikkhu Bodhi'></html>"
    )
    return sc_data_dir


class TestTextInfoModel:
    def test_empty_lang_dir_does_not_add_text_info(self, text_info, tmp_path):
        text_info.process_lang_dir(lang_dir=tmp_path)
        assert not text_info.added_documents

    def test_lang_dir_with_empty_language_does_not_add_text_info(self, text_info, tmp_path):
        en = tmp_path / 'en'
        en.mkdir()
        text_info.process_lang_dir(tmp_path)
        assert not text_info.added_documents

    def test_file_not_in_files_to_process_does_not_add_text_info(self, text_info, with_mn1, en_dir):
        text_info.process_lang_dir(
            lang_dir=en_dir,
            data_dir=with_mn1,
            files_to_process={}
        )
        assert not text_info.added_documents

    def test_type_error_raised_when_files_to_process_is_none(self, text_info, with_mn1, en_dir):
        with pytest.raises(TypeError):
            text_info.process_lang_dir(
                lang_dir=en_dir,
                data_dir=with_mn1,
                files_to_process=None
            )

    def test_type_error_when_data_dir_is_none(self, text_info, with_mn1, en_dir, files_to_process):
        with pytest.raises(TypeError):
            text_info.process_lang_dir(
                lang_dir=with_mn1,
                data_dir=None,
                files_to_process=files_to_process
            )

    @pytest.mark.parametrize(
        "html,author",
        [
            ("<html><meta name='author' content='Bhikkhu Bodhi'></html>", 'Bhikkhu Bodhi'),
            ("<html><meta author='Bhikkhu Bodhi'></html>", 'Bhikkhu Bodhi'),
            ("<html></html>", None),
        ]
    )
    def test_extracts_author_from_html(
            self, text_info, sc_data_dir, en_dir, files_to_process, html, author):
        add_html_file(sc_data_dir / 'html_text/en/pli/sutta/mn/mn1.html', html)
        text_info.process_lang_dir(en_dir, sc_data_dir, files_to_process)
        assert text_info.added_documents[0]['author'] == author

    def test_update_code_points(self, text_info, sc_data_dir, en_dir, files_to_process):
        html = """
        <html>
        <head><meta author='Bhikkhu Bodhi'></head>
        <body><b>abcd</b><em>wxyz</em></body>
        </html>
        """
        add_html_file(sc_data_dir / 'html_text/en/pli/sutta/mn/mn1.html', html)
        text_info.process_lang_dir(en_dir, sc_data_dir, files_to_process)
        assert text_info.added_code_points[0].lang_uid == "en"
        assert text_info.added_code_points[0].force is False
        assert text_info.added_code_points[0].unicode_points == {
            'normal' : {' ', '\n', 'a', 'b', 'c', 'd', 'w', 'x', 'y', 'z'},
            'bold' : {'a', 'b', 'c', 'd'},
            'italic' : {'w', 'x', 'y', 'z'},
        }
