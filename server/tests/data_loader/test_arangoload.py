import json
from pathlib import Path
from typing import Generator

import pytest

from common.arangodb import get_db, delete_db
from common.collections import Collection, database
from common.utils import current_app
from data_loader import arangoload
from data_loader.arangoload import process_prioritize, load_creator_bio
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


class TestLoadCreatorBio:
    @pytest.fixture
    def empty_collection(self) -> Generator[Collection, None, None]:
        coll = Collection('creator_bio')
        coll.clear()
        yield coll
        coll.clear()

    @pytest.fixture
    def with_existing_document(self, empty_collection):
        empty_collection.recreate(
            [
                {
                    'creator_uid': 'bloggs',
                    'creator_biography': 'A fine Joe.'
                },
            ]
        )
        return empty_collection

    @pytest.fixture
    def additional_info_dir(self, tmp_path) -> Path:
        return tmp_path

    @pytest.fixture
    def file_location(self, additional_info_dir) -> Path:
        return additional_info_dir / Path('creator_bio.json')

    @pytest.fixture
    def data(self) -> list[dict]:
        return [
            {
                'creator_uid': 'sujato',
                'creator_biography': 'Mostly harmless',
            },
            {
                'creator_uid': 'brahmali',
                'creator_biography': 'Inimitable',
            },
        ]

    @pytest.fixture
    def with_data(self, file_location, data):
        with file_location.open("w") as f:
            json.dump(data, f)

    def test_populates_empty_collection(self, empty_collection, with_data, additional_info_dir):
        load_creator_bio(additional_info_dir)
        assert sorted([doc['creator_uid'] for doc in Collection('creator_bio').documents()]) == ['brahmali', 'sujato']

    def test_recreates_collection(self, with_existing_document, with_data, additional_info_dir):
        assert sorted([doc['creator_uid'] for doc in Collection('creator_bio').documents()]) == ['bloggs']
        load_creator_bio(additional_info_dir)
        assert sorted([doc['creator_uid'] for doc in Collection('creator_bio').documents()]) == ['brahmali', 'sujato']
