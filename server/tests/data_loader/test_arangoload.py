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
    'alt_volpage': 'PTS (2nd ed) SN i 514',
}

SN11_25_REFERENCE_TEXT = {
    'sn11.25:1.1': 'ms12S1_1697, msdiv271',
    'sn11.25:2.1': (
        'csp1ed12.242, csp2ed12.242, ms12S1_1698, pts-vp-pli2ed1.515'
    ),
    'sn11.25:3.1': 'bj13.428, dr15.334, ms12S1_1701, vri23.278',
    'sn11.25:4.1': 'ms12S1_1705, pts-vp-pli2ed1.516, sya15.353',
}

MN31_REFERENCE_DOC = {
    'uid': 'mn31',
    'file_path': '/tmp/mn31_reference.json',
    'volpage': 'PTS MN 1.205',
}

MN31_REFERENCE_TEXT = {
    'mn31:4.1': 'dr12.343, pts-vp-pli1.206, sya12.387',
    'mn31:7.11': 'dr12.344, pts-vp-pli1.207',
    'mn31:22.1': 'pts-vp-pli1.211, sya12.395',
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
        'ref': (
            'PTS (2nd ed) SN i 514, '
            'PTS (2nd ed) 1.515, PTS (2nd ed) 1.516'
        ),
    }


def test_update_text_extra_info_preserves_source_volpage(monkeypatch):
    execute = Mock(side_effect=[[MN31_REFERENCE_DOC], None])
    fake_db = Mock()
    fake_db.aql.execute = execute

    monkeypatch.setattr(arangoload.arangodb, 'get_db', lambda: fake_db)
    monkeypatch.setattr(arangoload, 'json_load', lambda _: MN31_REFERENCE_TEXT)
    monkeypatch.setattr(arangoload, 'tqdm', lambda items: items)

    arangoload.update_text_extra_info()

    assert len(execute.call_args_list) == 2
    assert execute.call_args_list[1].args[0] == (
        arangoload.UPDATE_TEXT_EXTRA_INFO_VOLPAGE
    )
    assert execute.call_args_list[1].kwargs['bind_vars'] == {
        'uid': 'mn31',
        'ref': 'PTS MN 1.205, PTS 1.206, PTS 1.207, PTS 1.211',
    }


def test_merge_pts_references_deduplicates_matching_volume_and_page():
    merged = arangoload._merge_pts_references(
        'PTS SN 1.5',
        ['PTS 1.5'],
    )

    assert merged == 'PTS SN 1.5'


@pytest.mark.parametrize(('source', 'additional', 'expected'), [
    ('PTS S i 5', ['PTS S ii 5'], 'PTS S i 5, PTS S ii 5'),
    (
        'PTS (2nd ed) SN i 514', ['PTS (2nd ed) 1.514'],
        'PTS (2nd ed) SN i 514',
    ),
    ('PTS SN iv 5', ['PTS 4.5'], 'PTS SN iv 5'),
    ('PTS SN IX 5', ['PTS 9.5'], 'PTS SN IX 5'),
    ('PTS SN 1.5', ['PTS 2.5'], 'PTS SN 1.5, PTS 2.5'),
    (
        'PTS (1st ed) 1.5', ['PTS (2nd ed) 1.5'],
        'PTS (1st ed) 1.5, PTS (2nd ed) 1.5',
    ),
    ('PTS SN 5', ['PTS 1.5'], 'PTS SN 5, PTS 1.5'),
    ('Other i 5', ['Other ii 5'], 'Other i 5, Other ii 5'),
    ('PTS SN iiii 5', ['PTS 4.5'], 'PTS SN iiii 5, PTS 4.5'),
    ('PTS SN 1.4-5', ['PTS 1.5'], 'PTS SN 1.4-5, PTS 1.5'),
    ('unknown 5', [' unknown 5 ', 'different 5'], 'unknown 5, different 5'),
    (None, [' PTS 1.5 ', '', 'PTS 1.5'], 'PTS 1.5'),
])
def test_merge_pts_references_handles_reference_formats(source, additional, expected):
    merged = arangoload._merge_pts_references(source, additional)

    assert merged == expected
    assert arangoload._merge_pts_references(merged, additional) == expected


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


def test_alt_volpage_upsert_stores_merged_references():
    query = ' '.join(
        arangoload.UPDATE_TEXT_EXTRA_INFO_ALT_VOLPAGE.split()
    )

    assert 'alt_volpage: @ref' in query
    assert 'OLD.alt_volpage' not in query
