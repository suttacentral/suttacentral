from pathlib import Path
from unittest.mock import Mock

import pytest

from common.arangodb import get_db, delete_db
from common.utils import current_app
from data_loader import arangoload
from data_loader.observability import save_as_csv
from migrations.runner import run_migrations


SN11_25_REFERENCE_DOC = {
    'uid': 'sn11.25',
    'file_path': '/tmp/sn11.25_reference.json',
}

SN11_25_REFERENCE_TEXT = {
    'sn11.25:1.1': 'ms12S1_1697, msdiv271',
    'sn11.25:2.1': (
        'csp1ed12.242, csp2ed12.242, ms12S1_1698, pts-vp-pli2ed1.515'
    ),
    'sn11.25:3.1': 'bj13.428, dr15.334, ms12S1_1701, vri23.278',
    'sn11.25:4.1': 'ms12S1_1705, pts-vp-pli2ed1.516, sya15.353',
}


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

    assert (
        execute.call_args_list[1].kwargs['bind_vars']['name']
        == 'This Is Mine, etc. '
    )


def test_update_text_extra_info_formats_pts_references(monkeypatch):
    execute = Mock(side_effect=[[SN11_25_REFERENCE_DOC], None])
    fake_db = Mock()
    fake_db.aql.execute = execute

    monkeypatch.setattr(arangoload.arangodb, 'get_db', lambda: fake_db)
    monkeypatch.setattr(arangoload, 'json_load', lambda _: SN11_25_REFERENCE_TEXT)
    monkeypatch.setattr(arangoload, 'tqdm', lambda items: items)

    arangoload.update_text_extra_info()

    assert len(execute.call_args_list) == 2
    assert execute.call_args_list[1].args[0] == (
        arangoload.UPDATE_TEXT_EXTRA_INFO_ALT_VOLPAGE
    )
    assert execute.call_args_list[1].kwargs['bind_vars'] == {
        'uid': 'sn11.25',
        'ref': ' PTS (2nd ed) 1.515, PTS (2nd ed) 1.516',
    }


def test_update_text_extra_info_appends_alt_volpage(
    data_load_app, monkeypatch
):
    with data_load_app.app_context():
        run_migrations()
        db = get_db()
        collection = db.collection('text_extra_info')
        collection.truncate()

        try:
            collection.insert({
                'uid': 'sn11.25',
                'acronym': None,
                'alt_acronym': None,
                'volpage': None,
                'alt_volpage': 'PTS (2nd ed) SN i 514',
                'alt_name': None,
                'biblio_uid': None,
            })

            real_execute = db.aql.execute
            fake_db = Mock()

            def execute(query, *args, **kwargs):
                if query == arangoload.BILARA_REFERENCES:
                    return [SN11_25_REFERENCE_DOC]
                return real_execute(query, *args, **kwargs)

            fake_db.aql.execute = Mock(side_effect=execute)

            monkeypatch.setattr(arangoload.arangodb, 'get_db', lambda: fake_db)
            monkeypatch.setattr(
                arangoload,
                'json_load',
                lambda _: SN11_25_REFERENCE_TEXT,
            )
            monkeypatch.setattr(arangoload, 'tqdm', lambda items: items)

            arangoload.update_text_extra_info()

            result = list(db.aql.execute(
                'FOR doc IN text_extra_info '
                'FILTER doc.uid == @uid '
                'RETURN doc.alt_volpage',
                bind_vars={'uid': 'sn11.25'}
            ))

            assert result == [
                'PTS (2nd ed) SN i 514, PTS (2nd ed) 1.515, PTS (2nd ed) 1.516'
            ]
        finally:
            collection.truncate()


def test_alt_volpage_upsert_appends_refs_without_duplicates():
    query = ' '.join(
        arangoload.UPDATE_TEXT_EXTRA_INFO_ALT_VOLPAGE.split()
    )

    assert 'OLD.alt_volpage' in query
    assert (
        "APPEND(SPLIT(OLD.alt_volpage, ','), SPLIT(@ref, ','), true)"
        in query
    )
    assert "CONCAT_SEPARATOR( ',', OLD.alt_volpage" in query

