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
from data_loader.relationships import load_relationships, Remarks, Encoding
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
    load_relationships(file_unchanged, relationship_dir, additional_info_dir, database)
    assert len(relationship) == 0


def test_add_parallels_edges(file_changed, relationship_dir, additional_info_dir, parallels_file,
                             notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])

    load_relationships(file_changed, relationship_dir, additional_info_dir, database)

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


def test_add_retells_edges(file_changed, relationship_dir, additional_info_dir, parallels_file,
                           notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'retells': ['abc123', 'xyz321']}])

    load_relationships(file_changed, relationship_dir, additional_info_dir, database)

    assert tidy_relationship_docs(relationship) == [
        {
            '_from': 'super_nav_details/abc123',
            '_to': 'super_nav_details/xyz321',
            'from': 'abc123',
            'number': 123,
            'remark': None,
            'resembling': False,
            'to': 'xyz321',
            'type': 'retelling'
        },
        {
            '_from': 'super_nav_details/xyz321',
            '_to': 'super_nav_details/abc123',
            'from': 'xyz321',
            'number': 321,
            'remark': None,
            'resembling': False,
            'to': 'abc123',
            'type': 'retelling'
        }
    ]


def test_add_mentions_edges(file_changed, relationship_dir, additional_info_dir, parallels_file,
                            notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'mentions': ['abc123', 'xyz321']}])

    load_relationships(file_changed, relationship_dir, additional_info_dir, database)

    assert tidy_relationship_docs(relationship) == [
        {
            '_from': 'super_nav_details/abc123',
            '_to': 'super_nav_details/xyz321',
            'from': 'abc123',
            'number': 123,
            'remark': None,
            'resembling': False,
            'to': 'xyz321',
            'type': 'mention'
        },
        {
            '_from': 'super_nav_details/xyz321',
            '_to': 'super_nav_details/abc123',
            'from': 'xyz321',
            'number': 321,
            'remark': None,
            'resembling': False,
            'to': 'abc123',
            'type': 'mention'
        }
    ]


def test_when_unrelated_remark_exists(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                      notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])
    create_file(notes_file, [{'relations': ['abc123', 'def'], 'remark': 'Remarkable.'}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    remarks = [doc['remark'] for doc in docs]
    assert remarks == [None, None]


def test_when_related_remark_exists(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                    notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])
    create_file(notes_file, [{"relations": ["abc123", "xyz321"], "remark": "Remarkable"}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    remarks = [doc['remark'] for doc in docs]
    assert remarks == ['Remarkable', 'Remarkable']


@pytest.mark.parametrize('in_type', ['parallels', 'retells', 'mentions'])
def test_number_zero_when_missing(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                  notes_file, database, super_nav_details, relationship, in_type):
    create_file(notes_file, [])
    super_nav_details.insert({'uid': 'no_number_from'})
    super_nav_details.insert({'uid': 'no_number_to'})
    create_file(parallels_file, [{in_type: ['no_number_from', 'no_number_to']}, ])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    numbers = [doc['number'] for doc in docs]
    assert sorted(numbers) == [0, 0]


def test_create_orphan_when_from_missing(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                         notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['no_such', 'xyz321']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to = [doc['_to'] for doc in docs]
    assert to == ['super_nav_details/orphan']


def test_create_orphan_when_to_missing(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                       notes_file, database, super_nav_details, relationship, caplog):
    super_nav_details.insert({'uid': 'abc123'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'no_such']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to = [doc['_to'] for doc in docs]
    assert to == ['super_nav_details/orphan']
    assert caplog.messages == ['Relationship encoding has no matching uids: no_such (dropped)']


def test_logs_appears_as_orphan_when_from_missing(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                                  notes_file, database, super_nav_details, relationship, caplog):
    caplog.set_level(logging.INFO)
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['no_such', 'xyz321']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    assert caplog.messages == [
        'Relationship encoding has no matching uids: no_such (dropped)',
        'Relationship to encoding could not be matched: no_such (appears as orphan)'
    ]


@pytest.mark.parametrize('entry_type', ['retells', 'mentions'])
def test_no_orphans_for_others(file_changed, relationship_dir, additional_info_dir, parallels_file,
                               notes_file, database, super_nav_details, relationship, entry_type, caplog):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{entry_type: ['abc123', 'no_such']}, ])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    assert len(relationship) == 0
    assert caplog.messages == ['Relationship encoding has no matching uids: no_such (dropped)']


@pytest.mark.parametrize('entry_type', ['parallels', 'retells', 'mentions'])
def test_neither_encoding_is_resembling(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                        notes_file, database, super_nav_details, relationship, entry_type):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{entry_type: ['abc123', 'xyz321']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    resembling = [doc['resembling'] for doc in docs]
    assert not any(resembling)


@pytest.mark.parametrize('entry_type', ['parallels', 'retells', 'mentions'])
def test_from_encoding_is_resembling(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                     notes_file, database, super_nav_details, relationship, entry_type):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{entry_type: ['~abc123', 'xyz321']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    resembling = [doc['resembling'] for doc in docs]
    assert all(resembling)


@pytest.mark.parametrize('entry_type', ['parallels', 'retells', 'mentions'])
def test_to_encoding_is_resembling(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                   notes_file, database, super_nav_details, relationship, entry_type):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{entry_type: ['abc123', '~xyz321']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    resembling = [doc['resembling'] for doc in docs]
    assert all(resembling)


def test_key_error_when_unknown_type(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                     notes_file, database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'extrudes': ['abc123', 'xyz321']}, ])
    with pytest.raises(KeyError, match='extrudes'):
        load_relationships(file_changed, relationship_dir, additional_info_dir, database)


def test_three_parallels(file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file, database,
                         super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'hij678'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321', 'hij678']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
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


def test_two_full_one_resembling_last(file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file,
                                      database, super_nav_details, relationship):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'xyz321'})
    super_nav_details.insert({'uid': 'hij678'})
    create_file(notes_file, [])
    create_file(parallels_file, [{'parallels': ['abc123', 'xyz321', '~hij678']}])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
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
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
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
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    to_from = sorted([(doc['to'], doc['from']) for doc in docs])
    assert to_from == [('ja539#127', 'thag1.97'), ('thag1.97', 'ja539#127')]


@pytest.mark.parametrize(
    'entry,to_from',
    [
        ({'parallels': ['abc123', 'has space']}, [('has space', 'abc123')]),
        ({'retells': ['abc123', 'has space']}, []),
        ({'mentions': ['abc123', 'has space']}, []),
    ]
)
def test_external_uid(file_changed, relationship_dir, additional_info_dir, parallels_file,
                      notes_file, database, super_nav_details, relationship, entry, to_from):
    super_nav_details.insert({'uid': 'abc123'})
    create_file(notes_file, [])
    create_file(parallels_file, [entry])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    assert sorted([(doc['to'], doc['from']) for doc in docs]) == to_from


@pytest.mark.parametrize(
    'entry,to_from',
    [
        ({'parallels': ['abc123', 'sa-2']}, [('abc123', 'sa-2'), ('sa', 'abc123')]),
        ({'retells': ['abc123', 'sa-2']}, [('abc123', 'sa-2'), ('sa-2', 'abc123')]),
        ({'mentions': ['abc123', 'sa-2']}, [('abc123', 'sa-2'), ('sa-2', 'abc123')]),
    ]
)
def test_encoding_contains_dash(file_changed, relationship_dir, additional_info_dir, parallels_file,
                                notes_file, database, super_nav_details, relationship, entry, to_from):
    super_nav_details.insert({'uid': 'abc123'})
    super_nav_details.insert({'uid': 'sa-2'})
    create_file(notes_file, [])
    create_file(parallels_file, [entry])
    load_relationships(file_changed, relationship_dir, additional_info_dir, database)
    docs = tidy_relationship_docs(relationship)
    assert sorted([(doc['to'], doc['from']) for doc in docs]) == to_from


class TestRemarks:
    def test_get_remark_for_relation(self, notes_file):
        data = [
            {
                'relations': ['abc123', 'xyz321'],
                'remark': 'Remarkable'
            }
        ]
        create_file(notes_file, data)
        Remarks.load(notes_file)
        remarks = Remarks()
        assert remarks.lookup('abc123', 'xyz321') == 'Remarkable'

    def test_reverse_order_of_uid_retrieves_remark(self, notes_file):
        data = [
            {
                'relations': ['abc123', 'xyz321'],
                'remark': 'Remarkable'
            }
        ]
        create_file(notes_file, data)
        assert Remarks.lookup('xyz321', 'abc123') == 'Remarkable'

    def test_no_remark_for_uids(self, notes_file):
        create_file(notes_file, [])
        Remarks.load(notes_file)
        assert Remarks.lookup('abc123', 'xyz321') is None


class TestEncoding:
    @pytest.fixture
    def with_uids(self):
        Encoding.all_uids = {'abc123'}

    def test_to_string(self, with_uids):
        assert str(Encoding('~abc123')) == '~abc123'

    def test_has_matching_uids(self, with_uids):
        encoding = Encoding('abc123')
        assert encoding.matching_uids() == ['abc123']

    @pytest.mark.parametrize('encoding,is_resembling', [('abc123', False), ('~abc123', True)])
    def test_not_resembling(self, with_uids, encoding, is_resembling):
        assert Encoding(encoding).is_resembling() == is_resembling

    @pytest.mark.parametrize('encoding,is_external', [('abc123', False), ('Has space', True)])
    def test_not_resembling(self, with_uids, encoding, is_external):
        assert Encoding(encoding).is_external() == is_external

    @pytest.mark.parametrize('encoding,number', [('abc123', 123), ('abc', 0)])
    def test_number(self, encoding, number):
        assert Encoding(encoding).number() == number

    @pytest.mark.parametrize('encoding,stripped', [('abc123', 'abc123'), ('~abc123', 'abc123')])
    def test_strip_resembling(self, encoding, stripped):
        assert Encoding(encoding).strip_resembling() == stripped

    @pytest.mark.parametrize(
        'encoding,first_part',
        [
            ('abc123', 'abc123'),
            ('~abc123', 'abc123'),
            ('abc-123', 'abc'),
            ('~abc-123', 'abc'),
        ])
    def test_first_part(self, encoding, first_part):
        assert Encoding(encoding).first_part() == first_part

    @pytest.mark.parametrize(
        'encoding,has_matching_uid',
        [
            ('abc123', True),
            ('xyz321', False),
            ('contains space', True),
        ]
    )
    def test_has_matching_uid(self, encoding, has_matching_uid):
        assert Encoding(encoding).has_matching_uid() is has_matching_uid
