import logging
from collections.abc import Mapping, Iterator
from pathlib import Path

import pytest

from common.arangodb import get_db
from common.utils import current_app
from data_loader import sc_html
from data_loader.change_tracker import ChangeTracker
from data_loader.unsegmented import (
    Authors, HtmlTextWriter, AuthorDetails, documents, create_document, Document,
    FileDetails, log_missing_details, TextDetails, extract_html_details, find_title_tag, load_unsegmented_texts,
    language_directories, html_files, extract_file_details
 )


class FakeAuthors(Mapping[str, AuthorDetails]):
    def __init__(self):
        self.authors: dict[str, AuthorDetails] = {
            'Bhikkhu Bodhi': AuthorDetails(
                in_html=True,
                in_db=True,
                long_name='Bhikkhu Bodhi',
                short_name='Bodhi',
                uid='bodhi',
            ),
            'Taishō Tripiṭaka': AuthorDetails(
                in_html=True,
                in_db=True,
                long_name= 'Taishō Tripiṭaka',
                short_name='Taisho',
                uid='taisho',
            )
        }

    def __getitem__(self, long_name: str) -> AuthorDetails:
        missing = AuthorDetails(
            in_html=True,
            in_db=False,
            long_name=long_name,
            short_name=None,
            uid=None, )
        return self.authors.get(
            long_name,
            missing
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


@pytest.fixture
def database():
    app_ = current_app()
    app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

    with app_.app_context():
        db = get_db()
        db.collection('mtimes').truncate()
        db.collection('author_edition').truncate()
        db.collection('html_text').truncate()
        yield db


class TestAuthors:
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
        assert model['Bhikkhu Bodhi'].in_db is False

    def test_author_present(self, database, author_edition_doc):
        database['author_edition'].insert(author_edition_doc)
        model = Authors(database)
        assert model['Bhikkhu Bodhi'].in_db is True

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
                in_html=True,
                in_db=True,
                long_name='Bhikkhu Bodhi',
                short_name='Bodhi',
                uid='bodhi',
            ),
            text=TextDetails(
                title='The Root of All Things',
                has_title_tags=True,
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


class TestLoadUnsegmentedTexts:
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
        load_unsegmented_texts(change_tracker=tracker, db=database, html_dir=html_dir)

    def test_load_empty_html_dir(self, tracker, database, sc_data_dir, html_dir):
        load_unsegmented_texts(change_tracker=tracker, db=database, html_dir=html_dir)
        assert database.collection('html_text').count() == 0

    def test_load_empty_language_dir(self, tracker, database, sc_data_dir, html_dir):
        language_dir = html_dir / 'en'
        language_dir.mkdir()
        load_unsegmented_texts(change_tracker=tracker, db=database, html_dir=html_dir)
        assert database.collection('html_text').count() == 0

    def test_load_one_text(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        sutta_path = language_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_unsegmented_texts(change_tracker=tracker, db=database, html_dir=html_dir)

        assert database.collection('html_text').count() == 1

    def test_skip_unmodified_text(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        sutta_path = language_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        tracker.update_mtimes()
        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)

        load_unsegmented_texts(change_tracker=tracker, db=database, html_dir=html_dir)

        assert database.collection('html_text').count() == 0

    def test_skip_files_not_in_language_subdirectories(self, database, sc_data_dir, html_dir, html):
        skip_path = html_dir / 'skip_me.html'
        skip_path.write_text(html)

        language_dir = html_dir / 'en'
        language_dir.mkdir()
        ok_path = language_dir / 'mn1.html'
        ok_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_unsegmented_texts(change_tracker=tracker, db=database, html_dir=html_dir)

        assert database.collection('html_text').count() == 1

    def test_load_files_in_subdirectories(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        collection_dir = language_dir / 'mn'
        collection_dir.mkdir()

        sutta_path = collection_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_unsegmented_texts(change_tracker=tracker, db=database, html_dir=html_dir)

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


class TestDocuments:
    def test_files_are_loaded(self, base_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"

        paths = [
            base_path / Path('html_text/en/pli/sutta/mn/mn1.html'),
            base_path / Path('html_text/en/pli/sutta/mn/mn2.html'),
            base_path / Path('html_text/en/pli/sutta/mn/mn3.html'),
        ]

        for path in paths:
            add_html_file(path, html)

        added = list(documents(FakeAuthors(), paths, 'en'))

        assert len(added) == 3

    def test_missing_author_in_html(self, sutta_path, caplog):
        html = ("<html>"
                "<header><h1>1. The Root of All Things</h1></header>"
                "</html>")

        add_html_file(sutta_path, html)
        document = next(documents(FakeAuthors(), [sutta_path], 'en'))
        assert document.author.long_name is None

    def test_missing_header_tag_in_html(self, sutta_path, caplog):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = next(documents(FakeAuthors(), [sutta_path], 'en'))
        assert document.text.title == ''
        assert document.text.has_title_tags is False

    def test_missing_h1_tag_in_html(self, sutta_path, caplog):
            html = (
                "<html>"
                "<head><meta author='Bhikkhu Bodhi'>"
                "</head>"
                "<body><header></header</body>"
                "</html>"
            )
            add_html_file(sutta_path, html)
            document = next(documents(FakeAuthors(), [sutta_path], 'en'))
            assert document.text.title == ''
            assert document.text.has_title_tags is False

    def test_h1_tag_has_no_text(self, sutta_path, caplog):
        html = ("<html>"
                "<head><meta author='Bhikkhu Bodhi'><head>"
                "<body><header><h1></h1></header></body>"
                "</html>")

        add_html_file(sutta_path, html)
        document = next(documents(FakeAuthors(), [sutta_path], 'en'))
        assert document.text.title == ''
        assert document.text.has_title_tags is True

    def test_author_not_in_database(self, sutta_path, caplog):
        html = ("<html>"
                "<head><meta author='Bhikkhu Nobody'><head>"
                "<header><h1>1. The Root of All Things</h1></header>"
                "</html>")

        add_html_file(sutta_path, html)
        document = next(documents(FakeAuthors(), [sutta_path], 'en'))
        assert document.author.long_name == 'Bhikkhu Nobody'
        assert document.author.short_name is None
        assert document.author.uid is None



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

    def test_author_in_html_false_when_missing(self, sutta_path):
        html = "<html/>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.in_html is False

    def test_author_in_html_true_when_present(self, sutta_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.in_html is True

    def test_author_in_database_false_when_missing(self, sutta_path):
        html = "<html><head><meta author='Bhikkhu Nobody'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.in_db is False

    def test_author_in_database_false_when_present(self, sutta_path):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        add_html_file(sutta_path, html)
        document = create_document('en', sutta_path, FakeAuthors())
        assert document.author.in_db is True

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
    @pytest.fixture
    def document(self) -> Document:
        return Document(
            language_code='en',
            author=AuthorDetails(
                in_html=True,
                in_db=True,
                long_name='Bhikkhu Bodhi',
                short_name='Bodhi',
                uid='bodhi',
            ),
            text=TextDetails(
                title='The Root of All Things',
                has_title_tags=True,
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

    def test_no_logs_when_document_complete(self, document, caplog):
        log_missing_details(document)
        assert not caplog.records

    def test_logs_missing_title(self, document, caplog):
        document.text.has_title_tags = False
        log_missing_details(document)
        assert len(caplog.records) == 1
        assert caplog.records[0].levelno == logging.ERROR
        assert caplog.records[0].message == f"Could not find title in file: {document.file.path}"

    def test_logs_author_not_in_html(self, document, caplog):
        document.author.in_html = False
        log_missing_details(document)
        assert len(caplog.records) == 1
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == f"Could not find author in html file: {document.file.path}"

    def test_logs_missing_author(self, document, caplog):
        document.author.in_db = False
        log_missing_details(document)
        assert len(caplog.records) == 1
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == f'Author "Bhikkhu Bodhi" in html file {document.file.path} not found in database'


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


class TestExtractHtmlDetails:
    def test_extracts_authors_long_name_from_content_attribute(self):
        html = "<html><meta name='author' content='Bhikkhu Bodhi'></html>"
        _, authors_long_name = extract_html_details(html)
        assert authors_long_name == 'Bhikkhu Bodhi'

    def test_extracts_authors_long_name_from_author_attribute(self):
        html = "<html><meta author='Bhikkhu Bodhi'></html>"
        _, authors_long_name = extract_html_details(html)
        assert authors_long_name == 'Bhikkhu Bodhi'

    def test_authors_long_name_is_none_when_missing(self):
        html = "<html></html>"
        _, authors_long_name = extract_html_details(html)
        assert authors_long_name is None

    def test_extracts_title(self):
        html = "<html><body><header><h1>1. The Root of All Things</h1></header></body></html>"
        details, _ = extract_html_details(html)
        assert details.title == 'The Root of All Things'

    def test_extracts_chinese_title(self):
        html = ("<html><body><header><h1 class='mirror-row'>"
                "<span class='mirror-left latin'>43. No Need for Thought</span>"
                "<span class='mirror-right'>（四三）不思經</span>"
                "</h1></header></body></html>")

        details, _ = extract_html_details(html, is_chinese_root=True)

        assert details.title == '（四三）不思經 (43. No Need for Thought)'

    def test_chinese_title_only_has_right_hand_side(self):
        html = ("<html><body><header><h1 class='mirror-row'>"
                "<span class='mirror-right'>（四三）不思經</span></h1>"
                "</header></body></html>")

        details, _ = extract_html_details(html, is_chinese_root=True)

        assert details.title == '（四三）不思經'

    def test_chinese_title_only_has_left_hand_side(self):
        html = ("<html><body><header><h1 class='mirror-row'>"
                "<span class='mirror-left latin'>43. No Need for Thought</span>"
                "</h1></header></body></html>")

        details, _ = extract_html_details(html, is_chinese_root=True)

        assert details.title == 'No Need for Thought'

    def test_title_is_empty_due_to_regex(self):
        html = "<html><body><header><h1>11.358–405</h1></header></body></html>"
        details, _ = extract_html_details(html)
        assert details.title == ''

    def test_has_title_tags_true_when_present(self):
        html = '<html><header><h1>1. The Root of All Things</h1></header></html>'
        details, _ = extract_html_details(html)
        assert details.has_title_tags is True

    def test_has_title_tags_false_if_h1_tag_missing(self):
        html = "<html><body><header></header><body></html>"
        details, _ = extract_html_details(html)
        assert details.has_title_tags is False

    def test_has_title_tags_false_if_header_tag_missing(self):
        html = "<html><body><body></html>"
        details, _ = extract_html_details(html)
        assert details.has_title_tags is False

    def test_extracts_publication_date(self):
        html = "<html><body><span class='publication-date'>1962</span></body></html>"
        details, _ = extract_html_details(html)
        assert details.publication_date == '1962'

    def test_publication_date_is_none_when_missing(self):
        html = '<html/>'
        details, _ = extract_html_details(html)
        assert details.publication_date is None

    def test_extracts_volpage_from_chinese_root(self):
        html = ("<html></head><body><header><h1>"
                "<a class='ref t' id='t0485b21' href='#t0485b21'>T 0485b21</a>"
                "</h1></header></body></html>")

        details, _ = extract_html_details(html, is_chinese_root=True)
        assert details.volume_page == 'T 0485b21'

    def test_volpage_is_none_when_not_chinese_root(self):
        html = "<html/>"
        details, _ = extract_html_details(html)
        assert details.volume_page is None


class TestFindTitleTag:
    def test_find_title_tag(self):
        html = '<html><header><h1>1. The Root of All Things</h1></header></html>'
        root = sc_html.fromstring(html)
        tag = find_title_tag(root)
        assert tag.text == '1. The Root of All Things'

    def test_return_none_when_there_is_no_header_tag(self):
        html = '<html/>'
        root = sc_html.fromstring(html)
        tag = find_title_tag(root)
        assert tag is None

    def test_return_none_when_there_is_no_h1_tag(self):
        html = '<html><body><header></header></body></html>'
        root = sc_html.fromstring(html)
        tag = find_title_tag(root)
        assert tag is None
