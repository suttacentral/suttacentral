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

    def get_author_by_name(self, name, file) -> dict | None:
        if name == "Bhikkhu Bodhi":
            return {
                "_key" : "10318325",
                "_id" : "author_edition/10318325",
                "_rev" : "_jbu75VK--G",
                "type" : "author",
                "uid" : "bodhi",
                "short_name" : "Bodhi",
                "long_name" : "Bhikkhu Bodhi"
            }

        if name == 'Taishō Tripiṭaka':
            return {
                "_key": "32799410",
                "_id": "author_edition/32799410",
                "_rev": "_jpgpp2u--k",
                "type": "edition",
                "uid": "taisho",
                "short_name": "Taishō",
                "long_name": "Taishō Tripiṭaka"
            }

        return None

    def add_document(self, doc):
        self.added_documents.append(doc)

    def update_code_points(self, lang_uid: str, unicode_points: dict[str, set[str]], force: bool) -> None:
        self.added_code_points.append(CodePoints(lang_uid, unicode_points, force))


def add_html_file(path: Path, html: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open('w') as f:
        path.write_text(html)


@pytest.fixture
def text_info():
    return TextInfoModelSpy()


@pytest.fixture
def language_relative() -> Path:
    return Path('html_text/en/')


@pytest.fixture
def collection_relative(language_relative) -> Path:
    return language_relative / 'pli/sutta/mn'


@pytest.fixture
def sutta_relative(collection_relative) -> Path:
    return collection_relative / Path('mn1.html')


@pytest.fixture
def base_path(tmp_path) -> Path:
    return tmp_path


@pytest.fixture
def language_path(base_path, language_relative) -> Path:
    path = base_path / language_relative
    return path


@pytest.fixture
def collection_path(base_path, collection_relative) -> Path:
    return base_path / collection_relative


@pytest.fixture
def sutta_path(base_path, sutta_relative) -> Path:
    return base_path / sutta_relative


@pytest.fixture
def files_to_process(sutta_relative) -> dict[str, int]:
    return {str(sutta_relative): 0}


class TestTextInfoModel:
    def test_empty_lang_dir_does_not_add_text_info(self, text_info, tmp_path):
        text_info.process_lang_dir(lang_dir=tmp_path)
        assert not text_info.added_documents

    def test_lang_dir_with_empty_language_does_not_add_text_info(self, text_info, collection_path):
        collection_path.mkdir(parents=True)
        text_info.process_lang_dir(collection_path)
        assert not text_info.added_documents

    def test_file_not_in_files_to_process_does_not_add_text_info(self, text_info, base_path, language_path, sutta_path):
        add_html_file(sutta_path, "<html><meta name='author' content='Bhikkhu Bodhi'></html>")
        text_info.process_lang_dir(
            lang_dir=language_path,
            data_dir=base_path,
            files_to_process={}
        )
        assert not text_info.added_documents

    def test_type_error_raised_when_files_to_process_is_none(self, text_info, base_path, language_path, sutta_path):
        add_html_file(sutta_path, "<html><meta name='author' content='Bhikkhu Bodhi'></html>")
        with pytest.raises(TypeError):
            text_info.process_lang_dir(
                lang_dir=language_path,
                data_dir=base_path,
                files_to_process=None
            )

    def test_type_error_when_data_dir_is_none(self, text_info, language_path, sutta_path, files_to_process):
        add_html_file(sutta_path, "<html><meta name='author' content='Bhikkhu Bodhi'></html>")
        with pytest.raises(TypeError):
            text_info.process_lang_dir(
                lang_dir=language_path,
                data_dir=None,
                files_to_process=files_to_process
            )

    @pytest.mark.parametrize(
        "html,author_long_name",
        [
            ("<html><meta name='author' content='Bhikkhu Bodhi'></html>", 'Bhikkhu Bodhi'),
            ("<html><meta author='Bhikkhu Bodhi'></html>", 'Bhikkhu Bodhi'),
            ("<html></html>", None),
        ]
    )
    def test_extracts_author_long_name_from_html(
            self, text_info, base_path, language_path, sutta_path,
            files_to_process, html, author_long_name
    ):
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_documents[0]['author'] == author_long_name

    def test_retrieves_author_short_name(self, text_info, base_path, language_path, sutta_path, files_to_process):
        html = """<html><head><meta author='Bhikkhu Bodhi'></head></html>"""
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)

    @pytest.mark.parametrize(
        "author,author_uid",
        [
            ('Bhikkhu Bodhi', 'bodhi'),
            ('No such author', None),
         ]
    )
    def test_retrieves_author_uid(
            self, text_info, base_path, language_path, sutta_path, files_to_process, author, author_uid
    ):
        html = f"<html><head><meta author='{author}'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_documents[0]['author_uid'] == author_uid

    @pytest.mark.parametrize(
        "author,path",
        [
            ('Bhikkhu Bodhi', 'en/mn1/bodhi'),
            ('No such author', 'en/mn1'),
        ]
    )
    def test_generates_path(self, text_info, base_path, language_path, sutta_path, files_to_process, author, path):
        html = f"<html><head><meta author='{author}'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_documents[0]['path'] == path

    def test_extracts_publication_date(self, text_info, base_path, language_path, sutta_path, files_to_process):
        html = """
        <html>
        <head><meta author='Bhikkhu Bodhi'></head>
        <body><span class='publication-date'>1962</span></body>
        </html>
        """
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_documents[0]['publication_date'] == '1962'

    def test_missing_publication_date_is_none(self, text_info, base_path, language_path, sutta_path, files_to_process):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_documents[0]['publication_date'] is None

    def test_extracts_english_text_name(self, text_info, base_path, language_path, sutta_path, files_to_process):
        html = """
        <html>
        <head><meta author='Bhikkhu Bodhi'></head>
        <body><header><h1>1. The Root of All Things</h1></header></body>
        </html>
        """
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_documents[0]['name'] == 'The Root of All Things'

    def test_extracts_chinese_text_name(self, text_info, base_path, language_path, sutta_path, files_to_process):
        html = """
        <html>
        <head><meta name='author' content='Taishō Tripiṭaka'></head>
        <body><header><h1><span class='t-headname'>解脫戒經</span></h1></header></body>
        </html>
        """
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_documents[0]['name'] == '解脫戒經'

    def test_extracts_chinese_mirrored_text_name(self, text_info, base_path):
        sutta_relative = 'html_text/lzh/sutta/ma/ma43.html'
        sutta_path = base_path / sutta_relative
        language_path = base_path / 'html_text/lzh/'
        files_to_process = {str(sutta_relative): 0}

        html = ("<html><head><meta name='author' content='Taishō Tripiṭaka'></head><body><header>"
                "<h1 class='mirror-row'>"
                "<span class='mirror-left latin'>43. No Need for Thought</span>"
                "<span class='mirror-right'>（四三）不思經</span>"
                "</h1></header></body></html>")

        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        assert text_info.added_documents[0]['name'] == '（四三）不思經 (43. No Need for Thought)'

    def test_extracts_chinese_volpage(self, text_info, base_path):
        sutta_relative = 'html_text/lzh/sutta/ma/ma43.html'
        sutta_path = base_path / sutta_relative
        language_path = base_path / 'html_text/lzh/'
        files_to_process = {str(sutta_relative): 0}

        html = ("<html><head><meta name='author' content='Taishō Tripiṭaka'></head><body><header>"
                "<a class='ref t' id='t0485b21' href='#t0485b21'>T 0485b21</a>"
                "</h1></header></body></html>")

        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        assert text_info.added_documents[0]['volpage'] == 'T 0485b21'

    def test_volpage_none_when_legacy_translation(
            self, text_info, base_path, language_path, sutta_path, files_to_process
    ):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        assert text_info.added_documents[0]['volpage'] is None

    def test_sets_file_path(
            self, text_info, base_path, language_path, sutta_path, files_to_process
    ):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        assert text_info.added_documents[0]['file_path'] == str(sutta_path)

    def test_update_code_points(self, text_info, base_path, language_path, sutta_path, files_to_process):
        html = """
        <html>
        <head><meta author='Bhikkhu Bodhi'></head>
        <body><b>abcd</b><em>wxyz</em></body>
        </html>
        """
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert text_info.added_code_points[0].lang_uid == "en"
        assert text_info.added_code_points[0].force is False
        assert text_info.added_code_points[0].unicode_points == {
            'normal' : {' ', '\n', 'a', 'b', 'c', 'd', 'w', 'x', 'y', 'z'},
            'bold' : {'a', 'b', 'c', 'd'},
            'italic' : {'w', 'x', 'y', 'z'},
        }
