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
from data_loader.relationships import load_relationships, Encoding, all_edges, ParallelsEdges, Entry, \
    EntryType, EdgeType, to_edge_type, OtherEdges, Remarks
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


class TestLoadRelationships:
    def test_skip_when_files_unchanged(self, relationship_dir, additional_info_dir, parallels_file, notes_file,
                                       database, super_nav_details, relationship):
        tracker = FakeFileChangeTracker()
        load_relationships(tracker, relationship_dir, additional_info_dir, database)
        assert len(relationship) == 0

    def test_load_when_parallels_have_changed(self, relationship_dir, additional_info_dir, parallels_file, notes_file,
                                              database, super_nav_details, relationship):
        super_nav_details.insert({'uid': 'abc123'})
        super_nav_details.insert({'uid': 'xyz321'})
        create_file(notes_file, [])
        create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])
        tracker = FakeFileChangeTracker()
        tracker.change_file(parallels_file)
        load_relationships(tracker, relationship_dir, additional_info_dir, database)
        assert len(relationship) == 2

    def test_load_when_notes_have_changed(self, relationship_dir, additional_info_dir, parallels_file, notes_file,
                                          database, super_nav_details, relationship):
        super_nav_details.insert({'uid': 'abc123'})
        super_nav_details.insert({'uid': 'xyz321'})
        create_file(notes_file, [])
        create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])
        tracker = FakeFileChangeTracker()
        tracker.change_file(notes_file)
        load_relationships(tracker, relationship_dir, additional_info_dir, database)
        assert len(relationship) == 2

    @pytest.mark.parametrize('entry_type,edge_type', [
        ('parallels', 'full'),
        ('retells', 'retelling'),
        ('mentions', 'mention'),
    ])
    def test_sets_edge_type(self, relationship_dir, additional_info_dir, parallels_file, notes_file,
                            database, super_nav_details, relationship, entry_type, edge_type):
        super_nav_details.insert({'uid': 'abc123'})
        super_nav_details.insert({'uid': 'xyz321'})
        create_file(notes_file, [])
        create_file(parallels_file, [{entry_type: ['abc123', 'xyz321']}])
        tracker = FakeFileChangeTracker()
        tracker.change_file(parallels_file)
        load_relationships(tracker, relationship_dir, additional_info_dir, database)
        assert next(relationship.all())['type'] == edge_type

    @pytest.mark.parametrize('entry_type', ['retells', 'mentions'])
    def test_expands_uid_range(self, file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file, database,
                               super_nav_details, relationship, entry_type):
        super_nav_details.insert({'uid': 'abc123'})
        super_nav_details.insert({'uid': 'xyz321'})
        super_nav_details.insert({'uid': 'an7.75'})
        super_nav_details.insert({'uid': 'an7.76'})
        super_nav_details.insert({'uid': 'pli-tv-pvr7'})
        create_file(notes_file, [])

        create_file(parallels_file, [
            {'parallels': ['abc123', 'xyz321']},
            {entry_type: ['an7.75-76', 'pli-tv-pvr7#97.1-#98.1']},
        ])

        load_relationships(file_changed, relationship_dir, additional_info_dir, database)
        docs = tidy_relationship_docs(relationship)

        assert [doc['_from'] for doc in docs] == [
            'super_nav_details/abc123',
            'super_nav_details/an7.75',
            'super_nav_details/an7.76',
            'super_nav_details/pli-tv-pvr7',
            'super_nav_details/pli-tv-pvr7',
            'super_nav_details/xyz321'
        ]


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


@pytest.fixture
def with_uids():
    Encoding.load_uids({'abc123', 'xyz321', 'pqr777'})
    yield
    Encoding.load_uids({})


class TestAllEdges:
    def test_creates_edges_for_each_entry_type(self, with_uids):
        relationships_data = [
            {'parallels': ['abc123', 'xyz321']},
            {'mentions': ['abc123', 'xyz321']},
            {'retells': ['abc123', 'xyz321']},
        ]

        notes_data = [{'relations': ['abc123', 'xyz321'], 'remark': 'Remarkable'}]

        assert len(list(all_edges(relationships_data, notes_data))) == 6


class TestRemarks:
    def test_no_remark_when_both_missing(self):
        remarks = Remarks([])
        assert remarks.lookup(('abc123', 'xyz321')) is None

    def test_get_remark_for_relation(self):
        remarks = Remarks([{'relations': ['abc123', 'xyz321'], 'remark': 'Remarkable'}])
        assert remarks.lookup(('abc123', 'xyz321')) == 'Remarkable'

    def test_reverse_order_of_uid_retrieves_remark(self):
        remarks = Remarks([{'relations': ['abc123', 'xyz321'], 'remark': 'Remarkable'}])
        assert remarks.lookup(('xyz321', 'abc123')) == 'Remarkable'

    @pytest.mark.parametrize('data', [
        [{'relations': ['abc123', 'unrelated'], 'remark': 'Remarkable.'}],
        [{'relations': ['unrelated', 'xyz123'], 'remark': 'Remarkable.'}],
    ])
    def test_unrelated_remarks_not_retrieved(self, data):
        remarks = Remarks(data)
        assert remarks.lookup(('abc123', 'xyz123')) is None


class TestParallelsEdges:
    def test_creates_edges(self, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'xyz321'])
        assert [edge for edge in ParallelsEdges(entry, Remarks([]))] == [
            {
                '_from': 'abc123',
                '_to': 'xyz321',
                'from': 'abc123',
                'number': 123,
                'remark': None,
                'resembling': False,
                'to': 'xyz321',
                'type': 'full'
            },
            {
                '_from': 'xyz321',
                '_to': 'abc123',
                'from': 'xyz321',
                'number': 321,
                'remark': None,
                'resembling': False,
                'to': 'abc123',
                'type': 'full'
            },
        ]

    def test_adds_remarks(self, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'xyz321'])
        remarks = Remarks([{'relations': ['abc123', 'xyz321'], 'remark': 'Remarkable'}])
        assert [edge['remark'] for edge in ParallelsEdges(entry, remarks)] == ['Remarkable', 'Remarkable']

    @pytest.mark.parametrize('entry_data,numbers', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321']), [123, 321]),
        (Entry(EntryType.PARALLELS, ['abc', 'xyz321']), [0, 321]),
    ])
    def test_adds_numbers(self, with_uids, entry_data, numbers):
        Encoding.load_uids({'abc123', 'xyz321', 'abc'})
        edges = ParallelsEdges(entry_data, Remarks([]))
        assert [edge['number'] for edge in edges] == numbers

    @pytest.mark.parametrize('entry,_to', [
        (Entry(EntryType.PARALLELS, ['abc123', 'no_such_uid']), ['orphan']),
        (Entry(EntryType.PARALLELS, ['no_such_uid', 'abc123']), ['orphan']),
    ])
    def test_adds_orphan(self, with_uids, entry, _to):
        edges = ParallelsEdges(entry, Remarks([]))
        assert [edge['_to'] for edge in edges] == _to

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.PARALLELS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.PARALLELS, ['no_such_uid', 'abc123'])),
    ])
    def test_parallels_orphan_is_logged_twice(self, with_uids, entry, caplog):
        caplog.set_level(logging.INFO)
        _ = list(ParallelsEdges(entry, Remarks([])))
        # BUG? It isn't dropped, just show second log message.
        assert sorted(caplog.messages) == sorted([
            'Relationship encoding has no matching uids: no_such_uid (dropped)',
            'Relationship to encoding could not be matched: no_such_uid (appears as orphan)'
        ])

    def test_no_resembling_encodings(self, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'xyz321'])
        edges = ParallelsEdges(entry, Remarks([]))
        resembling = [(edge['_to'], edge['_from'], edge['resembling']) for edge in edges]
        assert resembling == [('xyz321', 'abc123', False), ('abc123', 'xyz321', False)]

    @pytest.mark.parametrize('entry,to_from_resembling', [
        (Entry(EntryType.PARALLELS, ['abc123', '~xyz321']), [('xyz321', 'abc123', True)]),
        (Entry(EntryType.PARALLELS, ['~xyz321', 'abc123']), [('xyz321', 'abc123', True)]),
    ])
    def test_with_resembling_encodings(self, with_uids, entry, to_from_resembling):
        edges = ParallelsEdges(entry, Remarks([]))
        assert [(edge['_to'], edge['_from'], edge['resembling']) for edge in edges] == to_from_resembling

    @pytest.mark.parametrize('entry,to_from', [
        (
                Entry(EntryType.PARALLELS, ['abc123', 'xyz321', 'pqr777']),
                [
                    ('xyz321', 'abc123'), ('pqr777', 'abc123'),
                    ('abc123', 'xyz321'), ('pqr777', 'xyz321'),
                    ('abc123', 'pqr777'), ('xyz321', 'pqr777')
                ]
        ),
        (
                Entry(EntryType.PARALLELS, ['abc123', 'xyz321', '~pqr777']),
                [
                    ('xyz321', 'abc123'), ('pqr777', 'abc123'),
                    ('abc123', 'xyz321'), ('pqr777', 'xyz321'),
                ]
        ),
        (
                Entry(EntryType.PARALLELS, ['abc123', '~xyz321', '~pqr777']),
                [('xyz321', 'abc123'), ('pqr777', 'abc123')]
        ),
    ])
    def test_combinations(self, with_uids, entry, to_from):
        edges = ParallelsEdges(entry, Remarks([]))
        assert [(edge['_to'], edge['_from']) for edge in edges] == to_from

    @pytest.mark.parametrize('entry,_to,_from', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321#654']), 'xyz321#654', 'abc123'),
        (Entry(EntryType.PARALLELS, ['xyz321#654', 'abc123']), 'abc123', 'xyz321#654'),
    ])
    def test_sectional_uids(self, with_uids, entry, _to, _from):
        edges = ParallelsEdges(entry, Remarks([]))
        to_from = [(edge['to'], edge['from']) for edge in edges]
        assert to_from == [(_to, _from), (_from, _to)]

    def test_external_uid(self, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'has space'])
        edges = ParallelsEdges(entry, Remarks([]))
        assert [(edge['to'], edge['from']) for edge in edges] == [('has space', 'abc123')]

    def test_expands_uid_range(self):
        Encoding.load_uids({'an7.75', 'an7.76', 'pli-tv-pvr7'})
        entry = Entry(EntryType.PARALLELS, ['an7.75-76', 'pli-tv-pvr7#97.1-#98.1'])
        edges = ParallelsEdges(entry, Remarks([]))
        assert [edge['_from'] for edge in edges] == ['an7.75', 'an7.76', 'pli-tv-pvr7', 'pli-tv-pvr7']


class TestOtherEdges:
    @pytest.mark.parametrize('entry_type,edge_type', [
        (EntryType.MENTIONS, EdgeType.MENTION),
        (EntryType.RETELLS, EdgeType.RETELLING),
    ])
    def test_creates_edges_for_mentions(self, with_uids, entry_type, edge_type):
        entry = Entry(entry_type, ['abc123', 'xyz321'])
        edges = OtherEdges(entry, Remarks([]))
        assert [edge for edge in edges] == [
            {
                '_from': 'abc123',
                '_to': 'xyz321',
                'from': 'abc123',
                'number': 123,
                'remark': None,
                'resembling': False,
                'to': 'xyz321',
                'type': str(edge_type)
            },
            {'_from': 'xyz321',
             '_to': 'abc123',
             'from': 'xyz321',
             'number': 321,
             'remark': None,
             'resembling': False,
             'to': 'abc123',
             'type': str(edge_type)
             }
        ]

    @pytest.mark.parametrize('entry_type', [EntryType.MENTIONS, EntryType.RETELLS])
    def test_adds_remarks(self, with_uids, entry_type):
        entry = Entry(entry_type, ['abc123', 'xyz321'])
        remarks = Remarks([{'relations': ['abc123', 'xyz321'], 'remark': 'Remarkable'}])
        assert [edge['remark'] for edge in OtherEdges(entry, remarks)] == ['Remarkable', 'Remarkable']

    @pytest.mark.parametrize('entry_data,numbers', [
        (Entry(EntryType.MENTIONS, ['abc123', 'xyz321']), [123, 321]),
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321']), [123, 321]),
        (Entry(EntryType.MENTIONS, ['abc', 'xyz321']), [0, 321]),
        (Entry(EntryType.RETELLS, ['abc', 'xyz321']), [0, 321]),
    ])
    def test_adds_numbers(self, with_uids, entry_data, numbers):
        Encoding.load_uids({'abc123', 'xyz321', 'abc'})
        edges = OtherEdges(entry_data, Remarks([]))
        assert [edge['number'] for edge in edges] == numbers

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.RETELLS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.MENTIONS, ['no_such_uid', 'abc123'])),
        (Entry(EntryType.RETELLS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.MENTIONS, ['no_such_uid', 'abc123'])),
    ])
    def test_does_not_add_orphans(self, with_uids, entry):
        edges = OtherEdges(entry, Remarks([]))
        assert [edge['_to'] for edge in edges] == []

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.RETELLS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.MENTIONS, ['abc123', 'no_such_uid'])),
    ])
    def test_others_with_orphans_are_logged_once(self, with_uids, entry, caplog):
        _ = list(OtherEdges(entry, Remarks([])))
        assert caplog.messages == ['Relationship encoding has no matching uids: no_such_uid (dropped)']

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.RETELLS, ['no_such_uid', 'abc123'])),
        (Entry(EntryType.MENTIONS, ['no_such_uid', 'abc123'])),
    ])
    def test_others_with_orphans_not_logged_when_missing_is_first(self, with_uids, entry, caplog):
        _ = list(OtherEdges(entry, Remarks([])))
        # Bug? No message at all.
        assert caplog.messages == []

    @pytest.mark.parametrize('entry,to_from_resembling', [
        (Entry(EntryType.RETELLS, ['abc123', '~xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
        (Entry(EntryType.MENTIONS, ['abc123', '~xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
        (Entry(EntryType.RETELLS, ['~abc123', 'xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
        (Entry(EntryType.MENTIONS, ['~abc123', 'xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
    ])
    def test_adds_resembling(self, with_uids, entry, to_from_resembling):
        edges = OtherEdges(entry, Remarks([]))
        assert [(edge['_to'], edge['_from'], edge['resembling']) for edge in edges] == to_from_resembling

    @pytest.mark.parametrize('entry,to_from', [
        (
            (Entry(EntryType.RETELLS, ['abc123', 'xyz321', 'pqr777'])),
            [
                ('xyz321', 'abc123'), ('abc123', 'xyz321'),
                ('pqr777', 'abc123'), ('abc123', 'pqr777')
            ]
        ),
        (
            (Entry(EntryType.RETELLS, ['abc123', 'xyz321', '~pqr777'])),
            [
                ('xyz321', 'abc123'), ('abc123', 'xyz321'),
                ('pqr777', 'abc123'), ('abc123', 'pqr777')
            ]
        ),
        (
            (Entry(EntryType.RETELLS, ['abc123', '~xyz321', '~pqr777'])),
            [
                ('xyz321', 'abc123'), ('abc123', 'xyz321'),
                ('pqr777', 'abc123'), ('abc123', 'pqr777'),
            ]
        ),
        (
                (Entry(EntryType.MENTIONS, ['abc123', 'xyz321', 'pqr777'])),
                [
                    ('xyz321', 'abc123'), ('abc123', 'xyz321'),
                    ('pqr777', 'abc123'), ('abc123', 'pqr777')
                ]
        ),
        (
                (Entry(EntryType.MENTIONS, ['abc123', 'xyz321', '~pqr777'])),
                [
                    ('xyz321', 'abc123'), ('abc123', 'xyz321'),
                    ('pqr777', 'abc123'), ('abc123', 'pqr777')
                ]
        ),
        (
                (Entry(EntryType.MENTIONS, ['abc123', '~xyz321', '~pqr777'])),
                [
                    ('xyz321', 'abc123'), ('abc123', 'xyz321'),
                    ('pqr777', 'abc123'), ('abc123', 'pqr777'),
                ]
        ),
    ])
    def test_resembling_combinations(self, with_uids, entry, to_from):
        edges = OtherEdges(entry, Remarks([]))
        assert [(edge['_to'], edge['_from']) for edge in edges] == to_from

    @pytest.mark.parametrize('entry,_to,_from', [
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321#654']), 'xyz321#654', 'abc123'),
        (Entry(EntryType.MENTIONS, ['abc123', 'xyz321#654']), 'xyz321#654', 'abc123'),
        (Entry(EntryType.RETELLS, ['xyz321#654', 'abc123']), 'abc123', 'xyz321#654'),
        (Entry(EntryType.MENTIONS, ['xyz321#654', 'abc123']), 'abc123', 'xyz321#654'),
    ])
    def test_sectional_uids(self, with_uids, entry, _to, _from):
        edges = OtherEdges(entry, Remarks([]))
        to_from = [(edge['to'], edge['from']) for edge in edges]
        assert to_from == [(_to, _from), (_from, _to)]

    @pytest.mark.parametrize(
        'entry,to_from',
        [
            (Entry(EntryType.RETELLS, ['abc123', 'has space']), []),
            (Entry(EntryType.MENTIONS, ['abc123', 'has space']), []),
        ]
    )
    def test_external_uid(self, with_uids, entry, to_from):
        edges = OtherEdges(entry, Remarks([]))
        assert [(edge['to'], edge['from']) for edge in edges] == to_from

    @pytest.mark.parametrize('entry_type', [EntryType.MENTIONS, EntryType.RETELLS])
    def test_expands_uid_range(self, entry_type):
        Encoding.load_uids({'an7.75', 'an7.76', 'pli-tv-pvr7'})
        entry = Entry(entry_type, ['an7.75-76', 'pli-tv-pvr7#97.1-#98.1'])
        edges = OtherEdges(entry, Remarks([]))
        assert [edge['_from'] for edge in edges] == ['an7.75', 'pli-tv-pvr7', 'an7.76', 'pli-tv-pvr7']


class TestRelationshipType:
    @pytest.mark.parametrize('entry,relationship', [
        (EntryType.PARALLELS, EdgeType.FULL),
        (EntryType.MENTIONS, EdgeType.MENTION),
        (EntryType.RETELLS, EdgeType.RETELLING),
    ])
    def test_converts_types(self, entry, relationship):
        assert to_edge_type(entry) == relationship


class TestEntry:
    def test_entry_type(self):
        assert Entry('parallels', ['abc123', 'xyz321']).entry_type == 'parallels'

    def test_edge_type(self):
        assert Entry('parallels', ['abc123', 'xyz321']).edge_type == 'full'

    def test_encodings(self):
        assert Entry('parallels', ['abc123', 'xyz321']).encodings == [Encoding('abc123'), Encoding('xyz321')]

    def test_invalid_entry_type(self):
        with pytest.raises(ValueError, match='extrudes'):
            _ = Entry('extrudes', ['abc123', 'xyz321'])


class TestEncoding:
    @pytest.fixture
    def with_uids(self):
        Encoding.load_uids({'abc123'})

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
