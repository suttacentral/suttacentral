from collections.abc import Iterator
from pathlib import Path

import pytest

from common.arangodb import get_db, delete_db
from common.utils import current_app
from data_loader import arangoload
from data_loader.observability import StagePrinter
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

# @pytest.mark.skip('Long running test.')
def test_do_entire_run(data_load_app):
    with data_load_app.app_context():
        db = get_db()
        delete_db(db)
        run_migrations()
        printer = StagePrinter()
        arangoload.run(no_pull=False, printer=printer)
        assert len(printer.stages) == 51
        printer.save_as_csv("load-data-run.csv")


class FakePerfCounter:
    def __init__(self, times: list[float]):
        self._times = iter(times)

    def __call__(self) -> float:
        return next(self._times)


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

    def test_tracks_message(self):
        printer = StagePrinter()
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        assert printer.stages[0].description == 'Retrieving Data Repository'
        assert printer.stages[1].description == 'Copying localization files'

    def test_tracks_elapsed_time(self):
        perf_counter = FakePerfCounter([1.1, 2.3, 11.6, 11.9])
        printer = StagePrinter(perf_counter=perf_counter)
        printer.print_stage('Retrieving Data Repository')
        printer.print_stage('Copying localization files')
        printer.print_stage('All done')

        assert printer.stages[0].elapsed_time == pytest.approx(1.2)
        assert printer.stages[1].elapsed_time == pytest.approx(9.3)
        assert printer.stages[2].elapsed_time == 0.0
