import logging
from collections.abc import Mapping, Iterator
from pathlib import Path

import pytest

from common.arangodb import get_db
from common.utils import current_app
from data_loader.change_tracker import ChangeTracker
from data_loader.textdata import Authors, HtmlTextWriter, AuthorDetails, load_language, create_document, Document, \
    FileDetails
from data_loader.textdata import load_html_texts, language_directories, html_files, extract_file_details
from data_loader.unsegmented_texts import TextDetails


class FakeAuthors(Mapping[str, AuthorDetails]):
    def __init__(self):
        self.authors: dict[str, AuthorDetails] = {
            'Bhikkhu Bodhi': AuthorDetails(
                long_name='Bhikkhu Bodhi',
                short_name='Bodhi',
                uid='bodhi',
                missing=False
            ),
            'Taishō Tripiṭaka': AuthorDetails(
                long_name= 'Taishō Tripiṭaka',
                short_name='Taisho',
                uid='taisho',
                missing=False
            )
        }

    def __getitem__(self, long_name: str) -> AuthorDetails:
        return self.authors.get(
            long_name,
            AuthorDetails(
                long_name=long_name,
                short_name=None,
                uid=None,
                missing=True
            )
        )

    def __iter__(self) -> Iterator[str]:
        return iter(self.authors.keys())

    def __len__(self) -> int:
        return len(self.authors)


def add_html_file(path: Path, html: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html)


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


class TestLoadLanguage:
    def test_files_are_loaded(self, base_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"

        paths = [
            base_path / Path('html_text/en/pli/sutta/mn/mn1.html'),
            base_path / Path('html_text/en/pli/sutta/mn/mn2.html'),
            base_path / Path('html_text/en/pli/sutta/mn/mn3.html'),
        ]

        for path in paths:
            add_html_file(path, html)

        added = list(load_language(FakeAuthors(), paths, 'en'))

        assert len(added) == 3

    def test_logs_missing_authors_long_name(self, sutta_path, caplog):
        html = ("<html>"
                "<header><h1>1. The Root of All Things</h1></header>"
                "</html>")

        add_html_file(sutta_path, html)
        next(load_language(FakeAuthors(), [sutta_path], 'en'))
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == f"Could not find author in file: {str(sutta_path)}"

    def test_logs_missing_title_when_there_is_no_header_tag(self, sutta_path, caplog):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        _ = next(load_language(FakeAuthors(), [sutta_path], 'en'))
        assert caplog.records[0].levelno == logging.ERROR
        assert caplog.records[0].message == f"Could not find title in file: {str(sutta_path)}"

    def test_logs_missing_title_when_there_is_no_h1_tag(self, sutta_path, caplog):
            html = (
                "<html>"
                "<head><meta author='Bhikkhu Bodhi'>"
                "</head>"
                "<body><header></header</body>"
                "</html>"
            )
            add_html_file(sutta_path, html)
            _ = next(load_language(FakeAuthors(), [sutta_path], 'en'))
            assert caplog.records[0].levelno == logging.ERROR
            assert caplog.records[0].message == f"Could not find title in file: {str(sutta_path)}"

    def test_does_not_log_missing_title_when_it_is_an_empty_string(self, sutta_path, caplog):
        html = ("<html>"
                "<head><meta author='Bhikkhu Bodhi'><head>"
                "<body><header><h1></h1></header></body>"
                "</html>")

        add_html_file(sutta_path, html)
        _ = next(load_language(FakeAuthors(), [sutta_path], 'en'))
        assert not caplog.records

    def test_logs_missing_author_when_not_in_document_store(self, sutta_path, caplog):
        html = ("<html>"
                "<head><meta author='Bhikkhu Nobody'><head>"
                "<header><h1>1. The Root of All Things</h1></header>"
                "</html>")

        add_html_file(sutta_path, html)
        _ = next(load_language(FakeAuthors(), [sutta_path], 'en'))
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == f'Author data not defined for "Bhikkhu Nobody" ( {str(sutta_path)} )'


class TestCreateDocument:
    def test_sets_author_long_name(self, sutta_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.long_name == 'Bhikkhu Bodhi'

    def test_sets_long_name_to_none_when_html_missing_author(self, sutta_path):
        html = "<html/>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.long_name is None

    def test_sets_author_short_name(self, sutta_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.short_name == 'Bodhi'

    def test_sets_author_uid(self, sutta_path):
        html = f"<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.uid == 'bodhi'

    def test_sets_missing_author_uid_to_none(self, sutta_path):
        html = f"<html><head><meta author='Bhikkhu Nobody'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.uid is None

    def test_generates_path_with_author(self, sutta_path):
        html = f"<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.path == 'en/mn1/bodhi'

    def test_generates_path_with_missing_author(self, sutta_path):
        html = f"<html><head><meta author='Bhikkhu Nobody'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.path == 'en/mn1'

    def test_sets_file_path(self, sutta_path):
        html = "<html/>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.file.path == str(sutta_path)

    def test_sets_last_modified(self, sutta_path):
        html = "<html/>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.file.last_modified == sutta_path.stat().st_mtime

    def test_sets_key_with_author(self, sutta_path):
        html = f"<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.key == 'en_mn1_bodhi'

    def test_sets_key_with_missing_author(self, sutta_path):
        html = f"<html><head><meta author='Bhikkhu Nobody'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.key == 'en_mn1'

class TestLogMissingDetails:
    pass


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


class TestAuthors:
    @pytest.fixture
    def database(self, database):
        database['author_edition'].truncate()
        database['html_text'].truncate()
        return database

    @pytest.fixture
    def author_edition_doc(self):
        return {
            "_key": "9944698",
            "_id": "author_edition/9944698",
            "_rev": "_j2q8z9W--J",
            "type": "author",
            "uid": "bodhi",
            "short_name": "Bodhi",
            "long_name": "Bhikkhu Bodhi"
        }

    def test_get_authors_long_name(self, database, author_edition_doc):
        database['author_edition'].insert(author_edition_doc)
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].long_name == 'Bhikkhu Bodhi'

    def test_get_authors_short_name(self, database, author_edition_doc):
        database['author_edition'].insert(author_edition_doc)
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].short_name == 'Bodhi'

    def test_authors_short_name_is_none_when_missing(self, database):
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].short_name is None

    def test_get_authors_uid(self, database, author_edition_doc):
        database['author_edition'].insert(author_edition_doc)
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].uid == 'bodhi'

    def test_authors_uid_is_none_when_missing(self, database):
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].short_name is None

    def test_author_missing(self,database):
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].missing is True

    def test_author_not_missing(self, database, author_edition_doc):
        database['author_edition'].insert(author_edition_doc)
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].missing is False

    def test_iter(self, database, author_edition_doc):
        database['author_edition'].insert(author_edition_doc)
        model = Authors(database)
        i = iter(model)
        assert next(i) == 'Bhikkhu Bodhi'

    def test_len(self, database, author_edition_doc):
        model = Authors(database)
        assert len(model) == 0

        database['author_edition'].insert(author_edition_doc)
        model = Authors(database)
        assert len(model) == 1


class TestHtmlTextWriter:
    @pytest.fixture
    def html_text_doc(self):
        return {
            "uid": "mn1",
            "lang": "en",
            "path": "en/mn1/bodhi",
            "name": "The Root of All Things",
            "author": "Bhikkhu Bodhi",
            "author_short": "Bodhi",
            "author_uid": "bodhi",
            "publication_date": "2009",
            "volpage": None,
            "mtime": 1749975302.2834718,
            "file_path": "/opt/sc/sc-flask/sc-data/html_text/en/pli/sutta/mn/mn1.html",
        }

    def test_add_document_is_queued_before_exiting_context_manager(self, database, html_text_doc):
        with HtmlTextWriter(database) as model:
            model.add_document(html_text_doc)
            assert database['html_text'].count() == 0
            assert len(model.queue) == 1

    def test_queue_is_flushed_after_exiting_context_manager(self, database, html_text_doc):
        with HtmlTextWriter(database) as model:
            model.add_document(html_text_doc)

        assert database['html_text'].count() == 1
        assert len(model.queue) == 0

    def test_queue_is_not_flushed_up_to_maximum_size(self, database, html_text_doc):
        max_size = 100
        with HtmlTextWriter(database) as model:
            for i in range(max_size):
                next_doc = html_text_doc.copy()
                next_doc['path'] = f'en/mn{i}/bodhi'
                model.add_document(next_doc)

            assert len(model.queue) == max_size
            assert database['html_text'].count() == 0

    def test_queue_is_flushed_after_maximum_size(self, database, html_text_doc):
        max_size = 100
        with HtmlTextWriter(database) as model:
            for i in range(max_size + 1):
                next_doc = html_text_doc.copy()
                next_doc['path'] = f'en/mn{i}/bodhi'
                model.add_document(next_doc)

            assert len(model.queue) == 0
            assert database['html_text'].count() == max_size + 1

    def test_document_is_stored_with_correct_key(self, database):
        document = Document(
            language_code='en',
            author=AuthorDetails(
                long_name='Bhikkhu Bodhi',
                short_name='Bodhi',
                uid='bodhi',
                missing=False,
            ),
            text=TextDetails(
                title='The Root of All Things',
                has_title_tags=True,
                authors_long_name='Bhikkhu Bodhi',
                publication_date='2009',
                volume_page=None,
            ),
            file=FileDetails(
                sutta_uid='mn1',
                last_modified=0.0,
                path='/opt/sc/sc-flask/sc-data/html_text/en/pli/sutta/mn/mn1.html',
                html='<html/>'
            ),
        )

        with HtmlTextWriter(database) as model:
            model.add_document(document.as_dict())

        doc = database['html_text'].get('html_text/en_mn1_bodhi')
        assert doc['name'] == 'The Root of All Things'