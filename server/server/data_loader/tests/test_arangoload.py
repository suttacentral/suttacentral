from pathlib import Path

import pytest

from common.arangodb import get_db, delete_db
from common.utils import current_app
from data_loader import arangoload
from data_loader.arangoload import StagePrinter
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
        printer = StagePrinter()
        arangoload.run(no_pull=False, printer=printer)
        assert len(printer.messages) == 51


class TestStagePrinter:
    def test_prints_one_stage(self, capsys):
        printer = StagePrinter()
        printer.print_stage('Retrieving Data Repository')
        captured = capsys.readouterr()
        assert captured.out == '\n   1: Retrieving Data Repository\n'

    def test_prints_two_stages(self, capsys):
        printer = StagePrinter()
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        captured = capsys.readouterr()
        expected =  '\n   1: Retrieving Data Repository\n'
        expected += '\n   2: Copying localization files\n'
        assert captured.out == expected

    def test_saves_messages(self):
        printer = StagePrinter()
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        assert printer.messages == [
            '1: Retrieving Data Repository',
            '2: Copying localization files',
        ]
