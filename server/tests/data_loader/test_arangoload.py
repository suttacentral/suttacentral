import json
from pathlib import Path
from typing import Generator

import pytest

from common.arangodb import get_db, delete_db
from common.collections import Collection, database
from common.utils import current_app
from data_loader import arangoload
from data_loader.arangoload import load_fallen_leaves_files
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


class TestLoadFallenLeaves:
    @pytest.fixture
    def empty_collection(self) -> Generator[Collection, None, None]:
        coll = Collection('fallen_leaves')
        coll.clear()
        yield coll
        coll.clear()

    @pytest.fixture
    def with_existing_document(self, empty_collection):
        empty_collection.recreate(
            [
                {
                    "uid": "abc123",
                    "fallen_leaves": [
                        {
                            "toplevel": [
                                "sublevel-1",
                                "sublevel-2",
                            ]
                        },
                    ]
                },
            ]
        )
        return empty_collection

    @pytest.fixture
    def fallen_leaves_dir(self, tmp_path) -> Path:
        return tmp_path

    @pytest.fixture
    def with_file_one(self, fallen_leaves_dir):
        data = {
            'pli-tv-bi-vb': [
                {
                    'pli-tv-bi-vb-pj': [
                        'pli-tv-bi-vb-pj1',
                        'pli-tv-bi-vb-pj2',
                    ]
                },
            ]
        }
        file_location = fallen_leaves_dir / 'first-fallen-leaves.json'
        with file_location.open("w") as f:
            json.dump(data, f)

    @pytest.fixture
    def with_file_two(self, fallen_leaves_dir):
        data = {
            'pli-tv-bu-vb': [
                {
                    'pli-tv-bu-vb-as': [
                        'pli-tv-bu-vb-as1',
                        'pli-tv-bu-vb-as2',
                    ]
                },
            ]
        }
        file_location = fallen_leaves_dir / 'second-fallen-leaves.json'
        with file_location.open("w") as f:
            json.dump(data, f)

    def test_populates_empty_collection(self, empty_collection, with_file_one, with_file_two, fallen_leaves_dir):
        load_fallen_leaves_files(database(), fallen_leaves_dir)
        assert sorted([doc['uid'] for doc in Collection('fallen_leaves').documents()]) == ['pli-tv-bi-vb', 'pli-tv-bu-vb']

    def test_recreates_collection(self, with_existing_document, with_file_one, with_file_two, fallen_leaves_dir):
        assert sorted([doc['uid'] for doc in Collection('fallen_leaves').documents()]) == ['abc123']
        load_fallen_leaves_files(database(), fallen_leaves_dir)
        assert sorted([doc['uid'] for doc in Collection('fallen_leaves').documents()]) == ['pli-tv-bi-vb', 'pli-tv-bu-vb']
