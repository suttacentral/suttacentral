from pathlib import Path
from unittest.mock import Mock

import pytest

from common.arangodb import get_db, delete_db
from common.utils import current_app
from data_loader import arangoload
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


def test_normalize_translated_title_strips_numeric_prefix():
    assert arangoload._normalize_translated_title(
        '3. The Third Round '
    ) == 'The Third Round'


def test_normalize_translated_title_keeps_etc_title():
    assert arangoload._normalize_translated_title(
        'This Is Mine, etc. '
    ) == 'This Is Mine, etc. '


def test_update_translated_title_keeps_etc_titles(monkeypatch):
    translation_doc = {
        'uid': 'sn24.46-69',
        'lang': 'en',
        'file_path': '/tmp/sn24.46-69_translation-en-sujato.json',
    }
    translation_text = {
        'sn24.46-69:0.1': 'Linked Discourses 24.46–69 ',
        'sn24.46-69:0.2': '3. The Third Round ',
        'sn24.46-69:0.3': 'This Is Mine, etc. ',
    }

    execute = Mock(side_effect=[[translation_doc], None])
    fake_db = Mock()
    fake_db.aql.execute = execute

    monkeypatch.setattr(arangoload.arangodb, 'get_db', lambda: fake_db)
    monkeypatch.setattr(arangoload, 'json_load', lambda _: translation_text)
    monkeypatch.setattr(arangoload, 'tqdm', lambda items: items)

    arangoload.update_translated_title()

    assert execute.call_args_list[1].kwargs['bind_vars']['name'] == 'This Is Mine, etc. '


