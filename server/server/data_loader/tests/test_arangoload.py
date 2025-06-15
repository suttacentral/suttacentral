from pathlib import Path

import pytest
from arango.database import Database

from common.arangodb import get_db, delete_db
from common.utils import current_app
from data_loader import arangoload
from data_loader.arangoload import load_html_texts
from data_loader.change_tracker import ChangeTracker
from data_loader.observability import save_as_csv
from migrations.runner import run_migrations


@pytest.fixture
def data_load_app(app):
    app = current_app()
    app.config['ARANGO_DB'] = 'suttacentral_data_load_tests'
    app.config['BASE_DIR'] = Path('/opt/sc/sc-flask/')
    return app

def test_set_db_name(data_load_app):
    with data_load_app.app_context():
        assert get_db().name == 'suttacentral_data_load_tests'

def test_base_dir_is_correct(data_load_app):
    with data_load_app.app_context():
        base_dir = data_load_app.config.get('BASE_DIR')
        assert base_dir == Path('/opt/sc/sc-flask/')

@pytest.mark.skip('Disabled as it may interfere with other tests.')
def test_do_collect_data_stage(data_load_app):
    with data_load_app.app_context():
        data_dir = Path('/opt/sc/sc-flask/sc-data')
        git_repository = data_load_app.config.get('DATA_REPO')
        arangoload.collect_data(data_dir, git_repository)

@pytest.mark.skip('Long running test.')
def test_do_entire_run(data_load_app):
    with data_load_app.app_context():
        db = get_db()
        delete_db(db)
        run_migrations()
        printer = arangoload.run(no_pull=False)
        assert len(printer.stages) == 51
        save_as_csv(printer.stages, "load-data-run.csv")


class TestLoadHtmlTexts:
    @pytest.fixture
    def database(self):
        app_ = current_app()
        app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

        with app_.app_context():
            db = get_db()
            db.collection('mtimes').truncate()
            db.collection('html_text').truncate()
            yield db

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
        load_html_texts(change_tracker=tracker, db=database, data_dir=sc_data_dir, html_dir=html_dir)

    def test_load_empty_html_dir(self, tracker, database, sc_data_dir, html_dir):
        load_html_texts(change_tracker=tracker, db=database, data_dir=sc_data_dir, html_dir=html_dir)
        assert database.collection('html_text').count() == 0

    def test_load_empty_language_dir(self, tracker, database, sc_data_dir, html_dir):
        language_dir = html_dir / 'en'
        language_dir.mkdir()
        load_html_texts(change_tracker=tracker, db=database, data_dir=sc_data_dir, html_dir=html_dir)
        assert database.collection('html_text').count() == 0

    def test_load_one_text(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        sutta_path = language_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_html_texts(change_tracker=tracker, db=database, data_dir=sc_data_dir, html_dir=html_dir)

        assert database.collection('html_text').count() == 1

    def test_skip_unmodified_text(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        sutta_path = language_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        tracker.update_mtimes()
        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)

        load_html_texts(change_tracker=tracker, db=database, data_dir=sc_data_dir, html_dir=html_dir)

        assert database.collection('html_text').count() == 0

    def test_skip_files_not_in_language_subdirectories(self, database, sc_data_dir, html_dir, html):
        skip_path = html_dir / 'skip_me.html'
        skip_path.write_text(html)

        language_dir = html_dir / 'en'
        language_dir.mkdir()
        ok_path = language_dir / 'mn1.html'
        ok_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_html_texts(change_tracker=tracker, db=database, data_dir=sc_data_dir, html_dir=html_dir)

        assert database.collection('html_text').count() == 1

    def test_load_files_in_subdirectories(self, database, sc_data_dir, html_dir, html):
        language_dir = html_dir / 'en'
        language_dir.mkdir()

        collection_dir = language_dir / 'mn'
        collection_dir.mkdir()

        sutta_path = collection_dir / 'mn1.html'
        sutta_path.write_text(html)

        tracker = ChangeTracker(base_dir=sc_data_dir, db=database)
        load_html_texts(change_tracker=tracker, db=database, data_dir=sc_data_dir, html_dir=html_dir)

        assert database.collection('html_text').count() == 1