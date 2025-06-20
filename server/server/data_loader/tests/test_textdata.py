import logging
from pathlib import Path

import pytest

from common.arangodb import get_db
from common.utils import current_app
from data_loader.change_tracker import ChangeTracker
from data_loader.textdata import TextInfoModel, load_html_texts, language_directories, html_files, extract_file_details


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


class TestTextInfoModel:
    def test_logs_missing_authors_long_name(self, text_info, sutta_path, caplog):
        html = "<html><body><header><h1></h1></header></body></html>"
        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == f"Could not find author in file: {str(sutta_path)}"

    def test_retrieves_author_short_name(self, text_info, sutta_path):
        html = """<html><head><meta author='Bhikkhu Bodhi'></head></html>"""
        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')

    @pytest.mark.parametrize(
        "author,author_uid",
        [
            ('Bhikkhu Bodhi', 'bodhi'),
            ('No such author', None),
         ]
    )
    def test_retrieves_author_uid(self, text_info, sutta_path, author, author_uid):
        html = f"<html><head><meta author='{author}'></head></html>"
        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')
        assert text_info.added_documents[0]['author_uid'] == author_uid

    @pytest.mark.parametrize(
        "author,path",
        [
            ('Bhikkhu Bodhi', 'en/mn1/bodhi'),
            ('No such author', 'en/mn1'),
        ]
    )
    def test_generates_path(self, text_info, sutta_path, author, path):
        html = f"<html><head><meta author='{author}'></head></html>"
        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')
        assert text_info.added_documents[0]['path'] == path

    def test_logs_missing_title_when_there_is_no_header_tag(self, text_info, sutta_path, caplog):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')
        assert caplog.records[0].levelno == logging.ERROR
        assert caplog.records[0].message == f"Could not find title in file: {str(sutta_path)}"

    def test_logs_missing_title_when_there_is_no_h1_tag(self, text_info, sutta_path, caplog):
            html = (
                "<html>"
                "<head><meta author='Bhikkhu Bodhi'>"
                "</head>"
                "<body><header></header</body>"
                "</html>"
            )
            add_html_file(sutta_path, html)
            text_info.load_language([sutta_path], 'en')
            assert caplog.records[0].levelno == logging.ERROR
            assert caplog.records[0].message == f"Could not find title in file: {str(sutta_path)}"

    def test_does_not_log_missing_title_when_it_is_an_empty_string(
            self, text_info, sutta_path, caplog
    ):
        html = ("<html>"
                "<head><meta author='Bhikkhu Bodhi'><head>"
                "<body><header><h1></h1></header></body>"
                "</html>")

        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')
        assert not caplog.records

    def test_sets_file_path(self, text_info, sutta_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')

        assert text_info.added_documents[0]['file_path'] == str(sutta_path)

    def test_sets_last_modified(self, text_info, sutta_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        text_info.load_language([sutta_path], 'en')

        assert text_info.added_documents[0]['mtime'] == sutta_path.stat().st_mtime


    def test_multiple_files_added(self, text_info, base_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"

        paths = [
            base_path / Path('html_text/en/pli/sutta/mn/mn1.html'),
            base_path / Path('html_text/en/pli/sutta/mn/mn2.html'),
            base_path / Path('html_text/en/pli/sutta/mn/mn3.html'),
        ]

        for path in paths:
            add_html_file(path, html)

        text_info.load_language(paths, 'en')

        assert len(text_info.added_documents) == 3


@pytest.fixture
def database():
    app_ = current_app()
    app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

    with app_.app_context():
        db = get_db()
        db.collection('mtimes').truncate()
        db.collection('html_text').truncate()
        yield db


class TestLoadHtmlTexts:
    @pytest.fixture
    def sc_data_dir(self, tmp_path) -> Path:
        return tmp_path

    @pytest.fixture
    def html_dir(self, sc_data_dir) -> Path:
        path = sc_data_dir / 'html_text'
        path.mkdir()
        return path

    @pytest.fixture
    def html(self) -> str:
        return (
        "<html>"
        "<head>"
        "<meta author='Bhikkhu Bodhi'>"
        "</head>"
        "<body>"
        "<header><h1>1. The Root of All Things</h1></header>"
        "<span class='publication-date'>2009</span>"
        "</body>"
        "</html>"
    )

    @pytest.fixture
    def tracker(self, sc_data_dir, database):
        return ChangeTracker(base_dir=sc_data_dir, db=database)

    @pytest.mark.skip('Long running test.')
    def test_load_from_repository(self, database):
        sc_data_dir = Path('/opt/sc/sc-flask/sc-data/')
        html_dir = Path('/opt/sc/sc-flask/sc-data/html_text')
        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_html_texts(change_tracker=tracker, db=database, html_dir=html_dir)

    def test_load_empty_html_dir(self, tracker, database, sc_data_dir, html_dir):
        load_html_texts(change_tracker=tracker, db=database, html_dir=html_dir)
        assert database.collection('html_text').count() == 0

    def test_load_empty_language_dir(self, tracker, database, sc_data_dir, html_dir):
        language_dir = html_dir / 'en'
        language_dir.mkdir()
        load_html_texts(change_tracker=tracker, db=database, html_dir=html_dir)
        assert database.collection('html_text').count() == 0

    def test_load_one_text(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        sutta_path = language_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_html_texts(change_tracker=tracker, db=database, html_dir=html_dir)

        assert database.collection('html_text').count() == 1

    def test_skip_unmodified_text(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        sutta_path = language_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        tracker.update_mtimes()
        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)

        load_html_texts(change_tracker=tracker, db=database, html_dir=html_dir)

        assert database.collection('html_text').count() == 0

    def test_skip_files_not_in_language_subdirectories(self, database, sc_data_dir, html_dir, html):
        skip_path = html_dir / 'skip_me.html'
        skip_path.write_text(html)

        language_dir = html_dir / 'en'
        language_dir.mkdir()
        ok_path = language_dir / 'mn1.html'
        ok_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_html_texts(change_tracker=tracker, db=database, html_dir=html_dir)

        assert database.collection('html_text').count() == 1

    def test_load_files_in_subdirectories(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        collection_dir = language_dir / 'mn'
        collection_dir.mkdir()

        sutta_path = collection_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_html_texts(change_tracker=tracker, db=database, html_dir=html_dir)

        assert database.collection('html_text').count() == 1


class TestLanguageDirectories:
    def test_empty_html_directory(self, tmp_path):
        assert not language_directories(html_dir=tmp_path)

    def test_with_language_directory(self, tmp_path):
        directories = [
            tmp_path / 'en',
            tmp_path / 'lzh',
        ]

        for directory in directories:
            directory.mkdir()

        assert language_directories(html_dir=tmp_path) == directories

    def test_only_return_directories(self, tmp_path):
        directory = tmp_path / 'en'
        directory.mkdir()
        file = tmp_path / 'abc.txt'
        file.touch()
        assert language_directories(html_dir=tmp_path) == [directory]


class TestHtmlFiles:
    @pytest.fixture
    def language_directory(self, tmp_path):
        return tmp_path

    def test_all_files_changed(self, language_directory, database):
        files = [
            language_directory / 'abc.html',
            language_directory / 'def.html',
            language_directory / 'hij.html',
        ]

        for file in files:
            file.touch()

        tracker = ChangeTracker(language_directory, database)

        assert sorted(html_files(language_directory, tracker)) == files

    def test_one_new_file(self, language_directory, database):
        files = [
            language_directory / 'abc.html',
            language_directory / 'def.html',
        ]

        for file in files:
            file.touch()

        tracker = ChangeTracker(language_directory, database)
        tracker.update_mtimes()

        new_file = language_directory / 'hij.html'
        new_file.touch()

        tracker = ChangeTracker(language_directory, database)

        files.append(new_file)

        assert sorted(html_files(language_directory, tracker)) == [new_file]


class TestExtractFileDetails:
    @pytest.fixture
    def sutta_file(self, tmp_path) -> Path:
        file = tmp_path / 'mn1.html'
        file.write_text('<html/>')
        return file

    def test_get_sutta_uid(self, sutta_file):
        assert extract_file_details(sutta_file).sutta_uid == 'mn1'

    def test_get_html(self, sutta_file):
        assert extract_file_details(sutta_file).html == '<html/>'

    def test_get_path_as_string(self, sutta_file):
        assert extract_file_details(sutta_file).path == str(sutta_file)

    def test_get_last_modified(self, sutta_file):
        assert extract_file_details(sutta_file).last_modified == sutta_file.stat().st_mtime
