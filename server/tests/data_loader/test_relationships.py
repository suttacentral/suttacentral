import json
import logging
from pathlib import Path
from typing import Any

import pytest
from arango.collection import StandardCollection
from arango.database import StandardDatabase

from common.arangodb import get_db
from common.utils import current_app
from data_loader.ports import FileChangeTracker
from data_loader.relationships import generate_relationship_edges
from fakes import FakeFileChangeTracker


def create_file(path: Path, data: list[dict]) -> None:
    with path.open("w") as f:
        json.dump(data, f)


def tidy_relationship_docs(relationship: StandardCollection) -> list[Any]:
    docs = sorted([doc for doc in relationship.all()], key=lambda doc: doc['_from'])
    for doc in docs:
        del doc['_key']
        del doc['_id']
        del doc['_rev']

    return docs


@pytest.fixture
def database() -> StandardDatabase:
    app = current_app()
    with app.app_context():
        return get_db()  # type: ignore


@pytest.fixture
def super_nav_details(database) -> StandardCollection:
    if not database.has_collection('super_nav_details'):
        database.create_collection('super_nav_details')
    database['super_nav_details'].truncate()
    return database['super_nav_details']


@pytest.fixture
def relationship(database) -> StandardCollection:
    if not database.has_collection('relationship'):
        database.create_collection('relationship')
    database['relationship'].truncate()
    return database['relationship']


@pytest.fixture
def relationship_dir(tmp_path: Path) -> Path:
    path = tmp_path / 'relationship'
    path.mkdir()
    return path


@pytest.fixture
def additional_info_dir(tmp_path: Path) -> Path:
    path = tmp_path / 'additional_info'
    path.mkdir()
    return path


@pytest.fixture
def parallels_file(relationship_dir) -> Path:
    return relationship_dir / 'parallels.json'


@pytest.fixture
def notes_file(additional_info_dir) -> Path:
    return additional_info_dir / 'notes.json'


@pytest.fixture
def file_changed(parallels_file) -> FileChangeTracker:
    tracker = FakeFileChangeTracker()
    tracker.change_file(parallels_file)
    return tracker


def test_when_file_is_unchanged_no_documents_are_added(relationship_dir, additional_info_dir, parallels_file,
                                                       notes_file, database, super_nav_details, relationship):
    file_unchanged = FakeFileChangeTracker()
    generate_relationship_edges(file_unchanged, relationship_dir, additional_info_dir, database)
    assert len(relationship) == 0


def test_create_parallel_between_two_uids(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                          notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])

    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)

    assert tidy_relationship_docs(relationship) == [
        {
            '_from': 'super_nav_details/abc123',
            '_to': 'super_nav_details/xyz321',
            'from': 'abc123',
            'number': 123,
            'remark': None,
            'resembling': False,
            'to': 'xyz321',
            'type': 'full'
        },
        {
            '_from': 'super_nav_details/xyz321',
            '_to': 'super_nav_details/abc123',
            'from': 'xyz321',
            'number': 321,
            'remark': None,
            'resembling': False,
            'to': 'abc123',
            'type': 'full'
        },
    ]


def test_when_unrelated_remark_exists(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                      notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])
    create_file(notes_file, [{'relations': ['abc123', 'def'], 'remark': 'Remarkable.'}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    assert docs[0]['remark'] is None
    assert docs[1]['remark'] is None


def test_when_related_remark_exists(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                    notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])
    create_file(notes_file, [{"relations": ["abc123", "xyz321"], "remark": "Remarkable"}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    assert docs[0]['remark'] == "Remarkable"
    assert docs[1]['remark'] == "Remarkable"


def test_error_when_retells_first(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                  notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'parallel123'})
    super_nav_details.insert({'uid': 'parallel321'})
    super_nav_details.insert({'uid': 'retell123'})
    super_nav_details.insert({'uid': 'retell321'})
    create_file(notes_file, [])
    create_file(parallels_file, [
        {'retells': ['retell123', 'retell321']},
        {'parallels': ['parallel123', 'parallel321']},
    ])

    create_file(notes_file, [])
    with pytest.raises(UnboundLocalError, match="cannot access local variable 'from_uid'"):
        generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)


@pytest.mark.parametrize('in_type,out_type', [('retells', 'retelling'), ('mentions', 'mention')])
def test_add_other_types(file_changed, relationship_dir, additional_info_dir, parallels_file,
                         notes_file, database, super_nav_details, relationship, in_type, out_type):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [
        {'parallels': ['abc123', 'xyz321']},
        {in_type: ['abc123', 'xyz321']},
    ])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = relationship.find({'type': out_type})
    from_uids = sorted([doc['from'] for doc in docs])
    assert from_uids == ['abc123', 'xyz321']


def test_number_parallel_zero_when_missing(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                           notes_file, database, super_nav_details, relationship):
    create_file(notes_file, [])
    super_nav_details.insert({'uid': 'no_number_from'})
    super_nav_details.insert({'uid': 'no_number_to'})
    create_file(parallels_file, [{'parallels': ['no_number_from', 'no_number_to']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    numbers = [doc['number'] for doc in docs]
    assert numbers == [0, 0]


@pytest.mark.parametrize('in_type,out_type', [('retells', 'retelling'), ('mentions', 'mention')])
def test_number_other_zero_when_missing(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                        notes_file, database, super_nav_details, relationship, in_type, out_type):
    create_file(notes_file, [])
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'no_number_from'})
    super_nav_details.insert({'uid': 'no_number_to'})
    create_file(parallels_file, [
        {'parallels': ['abc123', 'xyz321']},
        {in_type: ['no_number_from', 'no_number_to']},
    ])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    numbers = [doc['number'] for doc in docs]
    assert sorted(numbers) == [0, 0, 123, 321]


def test_create_orphan_when_from_missing(file_changed, relationship_dir, additional_info_dir,
                                         parallels_file,
                                         notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['no_such', 'xyz321']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to = [doc['_to'] for doc in docs]
    assert to == ['super_nav_details/orphan']


def test_create_orphan_when_to_missing(file_changed, relationship_dir, additional_info_dir,
                                       parallels_file,
                                       notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'no_such']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to = [doc['_to'] for doc in docs]
    assert to == ['super_nav_details/orphan']


def test_logs_orphan(file_changed, relationship_dir, additional_info_dir, parallels_file,
                     notes_file, database, super_nav_details, relationship, caplog):
    caplog.set_level(logging.INFO)
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['no_such', 'xyz321']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    assert caplog.messages == [
        'Relationship from uid could not be matched: no_such (dropped)',
        'Relationship to uid could not be matched: no_such (appears as orphan)'
    ]


def test_create_resembling_from(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['~abc123', 'xyz321']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    assert docs == [
        {
            '_from': 'super_nav_details/xyz321',
            '_to': 'super_nav_details/abc123',
            'from': 'xyz321',
            'number': 321,
            'remark': None,
            'resembling': True,
            'to': 'abc123',
            'type': 'full'
        }
    ]


def test_create_resembling_to(file_changed, relationship_dir, additional_info_dir, parallels_file,
                              notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', '~xyz321']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    assert docs == [
        {
            '_from': 'super_nav_details/abc123',
            '_to': 'super_nav_details/xyz321',
            'from': 'abc123',
            'number': 123,
            'remark': None,
            'resembling': True,
            'to': 'xyz321',
            'type': 'full'
        }
    ]


@pytest.mark.parametrize('in_type,out_type', [('retells', 'retelling'), ('mentions', 'mention')])
def test_create_resembling_other_from(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                      notes_file, database, super_nav_details, relationship, in_type, out_type):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [
        {'parallels': ['abc123', 'xyz321']},
        {in_type: ['~abc123', 'xyz321']},
    ])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    resembling = [doc for doc in docs if doc['resembling']]
    assert resembling == [
        {
            '_from': 'super_nav_details/abc123',
            '_to': 'super_nav_details/xyz321',
            'from': 'abc123',
            'number': 123,
            'remark': None,
            'resembling': True,
            'to': 'xyz321',
            'type': out_type
        },
        {'_from': 'super_nav_details/xyz321',
         '_to': 'super_nav_details/abc123',
         'from': 'xyz321',
         'number': 321,
         'remark': None,
         'resembling': True,
         'to': 'abc123',
         'type': out_type
         }
    ]


def test_value_error_when_unknown_type(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                       notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [
        {'extrudes': ['abc123', 'xyz321']},
    ])

    create_file(notes_file, [])
    with pytest.raises(ValueError, match='Invalid relationship type "extrudes"'):
        generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)


def test_first_retell_uid_is_resembling(file_changed, relationship_dir, additional_info_dir,
                                        parallels_file, notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'pqrs'})
    super_nav_details.insert({'uid': 'lmno'})

    create_file(notes_file, [])
    create_file(parallels_file, [
        {'parallels': ['abc123', 'xyz321']},
        {'retells': ['~pqrs', 'lmno']},
    ])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    resembling = sorted([(doc['to'], doc['from']) for doc in docs if doc['resembling']])

    assert resembling == [('lmno', 'pqrs'), ('pqrs', 'lmno')]


def test_second_retell_uid_is_resembling(file_changed, relationship_dir, additional_info_dir,
                                         parallels_file, notes_file, database, super_nav_details,
                                         relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'pqrs'})
    super_nav_details.insert({'uid': 'lmno'})

    create_file(notes_file, [])
    create_file(parallels_file, [
        {'parallels': ['abc123', 'xyz321']},
        {'retells': ['pqrs', '~lmno']},
    ])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    resembling = sorted([(doc['to'], doc['from']) for doc in docs if doc['resembling']])

    assert resembling == [('lmno', 'pqrs'), ('pqrs', 'lmno')]


def test_three_parallels(file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file, database,
                         super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'hij678'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321', 'hij678']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to_from = sorted([(doc['to'], doc['from']) for doc in docs])
    assert to_from == [
        ('abc123', 'hij678'),
        ('abc123', 'xyz321'),
        ('hij678', 'abc123'),
        ('hij678', 'xyz321'),
        ('xyz321', 'abc123'),
        ('xyz321', 'hij678'),
    ]


def test_two_full_one_resembling(file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file,
                                 database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'hij678'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321', '~hij678']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to_from = sorted([(doc['to'], doc['from']) for doc in docs])
    assert to_from == [
        ('abc123', 'xyz321'),
        ('hij678', 'abc123'),
        ('hij678', 'xyz321'),
        ('xyz321', 'abc123')
    ]


def test_two_full_one_resembling_first(file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file,
                                       database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'hij678'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['~hij678', 'abc123', 'xyz321']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to_from = sorted([(doc['to'], doc['from']) for doc in docs])
    assert to_from == [
        ('abc123', 'xyz321'),
        ('hij678', 'abc123'),
        ('hij678', 'xyz321'),
        ('xyz321', 'abc123')
    ]


def test_partials(file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file,
                  database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'ja539'})
    super_nav_details.insert({'uid': 'thag1.97'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['ja539#127', 'thag1.97']}])
    generate_relationship_edges(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    assert docs == [
        {'_from': 'super_nav_details/ja539',
         '_to': 'super_nav_details/thag1.97',
         'from': 'ja539#127',
         'number': 127,
         'remark': None,
         'resembling': False,
         'to': 'thag1.97',
         'type': 'full'
         },
        {
            '_from': 'super_nav_details/thag1.97',
            '_to': 'super_nav_details/ja539',
            'from': 'thag1.97',
            'number': 97,
            'remark': None,
            'resembling': False,
            'to': 'ja539#127',
            'type': 'full'
        }
    ]
