import logging
from dataclasses import dataclass
from pathlib import Path

import pytest

from data_loader.textdata import TextInfoModel, should_process_file


class TextInfoModelSpy(TextInfoModel):
    """
    TextInfoModel uses the template method design pattern giving us a
    handy way to interact with the TextInfoModel class without accessing
    the database.
    """
    def __init__(self):
        super().__init__()
        self.added_documents = []

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

    def test_logs_missing_authors_long_name(
            self, text_info, sutta_path, language_path, base_path, files_to_process, caplog
    ):
        html = "<html><body><header><h1></h1></header></body></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == f"Could not find author in file: {str(sutta_path)}"

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

    def test_logs_missing_title_when_there_is_no_header_tag(
            self, text_info, sutta_path, language_path, base_path, files_to_process, caplog
    ):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert caplog.records[0].levelno == logging.ERROR
        assert caplog.records[0].message == f"Could not find title in file: {str(sutta_path)}"

    def test_logs_missing_title_when_there_is_no_h1_tag(
                self, text_info, sutta_path, language_path, base_path, files_to_process, caplog
        ):
            html = (
                "<html>"
                "<head><meta author='Bhikkhu Bodhi'>"
                "</head>"
                "<body><header></header</body>"
                "</html>"
            )
            add_html_file(sutta_path, html)
            text_info.process_lang_dir(language_path, base_path, files_to_process)
            assert caplog.records[0].levelno == logging.ERROR
            assert caplog.records[0].message == f"Could not find title in file: {str(sutta_path)}"

    def test_does_not_log_missing_title_when_it_is_an_empty_string(
            self, text_info, sutta_path, language_path, base_path, files_to_process, caplog
    ):
        html = ("<html>"
                "<head><meta author='Bhikkhu Bodhi'><head>"
                "<body><header><h1></h1></header></body>"
                "</html>")

        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)
        assert not caplog.records

    def test_sets_file_path(
            self, text_info, base_path, language_path, sutta_path, files_to_process
    ):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        assert text_info.added_documents[0]['file_path'] == str(sutta_path)

    def test_sets_last_modified(
            self, text_info, base_path, language_path, sutta_path, files_to_process
    ):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        assert text_info.added_documents[0]['mtime'] == sutta_path.stat().st_mtime


    def test_multiple_files_added(self, text_info, base_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"

        paths = [
            Path('html_text/en/pli/sutta/mn/mn1.html'),
            Path('html_text/en/pli/sutta/mn/mn2.html'),
            Path('html_text/en/pli/sutta/mn/mn3.html'),
        ]

        files_to_process = dict()
        for path in paths:
            files_to_process[str(path)] = 0
            add_html_file(base_path / path, html)

        language_path = base_path / 'html_text/en'
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        assert len(text_info.added_documents) == 3

    def test_files_not_in_files_to_process_are_skipped(self, text_info, base_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"

        paths = [
            Path('html_text/en/pli/sutta/mn/mn1.html'),
            Path('html_text/en/pli/sutta/mn/mn2.html'),
            Path('html_text/en/pli/sutta/mn/mn3.html'),
        ]

        for path in paths:
            add_html_file(base_path / path, html)

        files_to_process = {
            'html_text/en/pli/sutta/mn/mn1.html' : 0,
            'html_text/en/pli/sutta/mn/mn3.html' : 0,
        }

        language_path = base_path / 'html_text/en'
        text_info.process_lang_dir(language_path, base_path, files_to_process)

        file_names = [Path(document['file_path']).name
                 for document in text_info.added_documents]

        assert file_names == ['mn1.html', 'mn3.html']

    def test_force_flag_causes_all_files_to_be_added(self, text_info, base_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"

        paths = [
            Path('html_text/en/pli/sutta/mn/mn1.html'),
            Path('html_text/en/pli/sutta/mn/mn2.html'),
        ]

        for path in paths:
            add_html_file(base_path / path, html)

        files_to_process = {
            'html_text/en/pli/sutta/mn/mn1.html': 0,
        }

        language_path = base_path / 'html_text/en'
        text_info.process_lang_dir(language_path, base_path, files_to_process, force=True)

        file_names = [Path(document['file_path']).name
                      for document in text_info.added_documents]

        assert file_names == ['mn1.html', 'mn2.html']


class TestShouldProcessFile:
    def test_file_should_be_processed_when_in_files_to_process(self, base_path):
        relative_path = Path('abc.html')
        absolute_path = base_path / relative_path
        absolute_path.touch()
        files_to_process = {'abc.html' : 0}
        assert should_process_file(base_path, files_to_process, False, absolute_path)

    def test_file_should_not_be_processed_when_not_in_files_to_process(self, base_path):
        relative_path = Path('abc.html')
        absolute_path = base_path / relative_path
        absolute_path.touch()
        files_to_process = {'xyz.html' : 0,}
        assert not should_process_file(base_path, files_to_process, False, absolute_path)

    def test_file_should_be_processed_when_forced(self, base_path):
        relative_path = Path('abc.html')
        absolute_path = base_path / relative_path
        absolute_path.touch()
        files_to_process = {'xyz.html' : 0,}
        assert should_process_file(base_path, files_to_process, True, absolute_path)

