import json
from pathlib import Path
from typing import Generator

import pytest

from common.arangodb import get_db, delete_db
from common.collections import Collection, database
from common.utils import current_app
from data_loader import arangoload
from data_loader.arangoload import load_uid_expansion
from fakes import FakeFileChangeTracker
from data_loader.observability import save_as_csv
from data_loader.ports import FileChangeTracker
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


class TestLoadJsonFile:
    @pytest.fixture
    def with_collection(self):
        db = database()
        if not db.has_collection('hobbits'):
            db.create_collection('hobbits')

    @pytest.fixture
    def empty_collection(self, with_collection) -> Generator[Collection, None, None]:
        coll = Collection('hobbits')
        coll.clear()
        yield coll
        coll.clear()

    @pytest.fixture
    def with_existing_document(self, empty_collection):
        empty_collection.recreate(
            [
                {'_key': 'pippin', 'uid': 'pippin'},
            ]
        )
        return empty_collection

    @pytest.fixture
    def file_location(self, tmp_path) -> Path:
        return tmp_path / Path('hobbits.json')

    @pytest.fixture
    def with_data(self, file_location):
        data = [
            {'uid': 'frodo'},
            {'uid': 'bilbo'}
        ]

        with file_location.open("w") as f:
            json.dump(data, f)

    @pytest.fixture
    def file_is_changed(self, file_location) -> FileChangeTracker:
        tracker = FakeFileChangeTracker()
        tracker.change_file(file_location)
        return tracker

    @pytest.fixture
    def file_is_not_changed(self, file_location) -> FileChangeTracker:
        tracker = FakeFileChangeTracker()
        return tracker

    def test_collection_named_with_file_stem(self, empty_collection, with_data, file_is_changed, file_location):
        load_uid_expansion(file_is_changed, file_location)
        assert len(Collection(file_location.stem)) == 2

    def test_uids_are_assigned_to_keys(self, empty_collection, with_data, file_is_changed, file_location):
        load_uid_expansion(file_is_changed, file_location)
        assert sorted(list(Collection('hobbits').keys())) == ['bilbo', 'frodo']

    def test_recreates_collection(self, with_existing_document, with_data, file_is_changed, file_location):
        load_uid_expansion(file_is_changed, file_location)
        assert sorted(list(Collection('hobbits').keys())) == ['bilbo', 'frodo']

    def test_collection_unchanged_if_file_unchanged(self, with_existing_document, with_data, file_is_not_changed, file_location):
        load_uid_expansion(file_is_not_changed, file_location)
        assert sorted(list(Collection('hobbits').keys())) == ['pippin']

    @pytest.fixture
    def with_first_uid_missing(self, file_location):
        data = [
            {'name': 'frodo'},
            {'uid': 'bilbo'}
        ]

        with file_location.open("w") as f:
            json.dump(data, f)

    def test_collection_unchanged_when_first_record_missing_uid(self, with_existing_document, with_first_uid_missing, file_is_changed, file_location):
        load_uid_expansion(file_is_changed, file_location)
        assert sorted(list(Collection('hobbits').keys())) == ['pippin']

    @pytest.fixture
    def with_second_uid_missing(self, file_location):
        data = [
            {'uid': 'frodo'},
            {'name': 'bilbo'}
        ]

        with file_location.open("w") as f:
            json.dump(data, f)

    def test_key_error_when_second_record_missing_uid(self, empty_collection, with_second_uid_missing, file_is_changed, file_location):
        with pytest.raises(KeyError):
            load_uid_expansion(file_is_changed, file_location)
