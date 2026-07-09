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
from data_loader.relationships import load_relationships, Encoding, Edge, Entry, \
    EntryType, EdgeType, to_edge_type, OtherEdges, Remarks, EdgeUids, EdgeEncodings, Unmatched, ParallelsEdges
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


@pytest.fixture
def with_uids():
    Encoding.load_uids({'abc123', 'xyz321', 'pqr777', 'mn1', 'mn2', 'dn1', 'dn2'})
    yield
    Encoding.load_uids({})


@pytest.fixture
def with_remarks():
    Edge.load_remarks([{'relations': ['abc123', 'xyz321'], 'remark': 'Remarkable'}])
    yield
    Edge.load_remarks([])


class TestUnmatched:
    def test_logs_dropped(self, caplog):
        unmatched = Unmatched()
        unmatched.add_dropped(Encoding('abc123'))
        unmatched.log()
        assert caplog.messages == ['Relationship encoding has no matching uids: abc123 (dropped)']

    def test_logs_orphans(self, caplog):
        caplog.set_level(logging.INFO)
        unmatched = Unmatched()
        unmatched.add_orphan(Encoding('abc123'))
        unmatched.log()
        assert caplog.messages == ['Relationship to encoding could not be matched: abc123 (appears as orphan)']


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

    @pytest.mark.parametrize('entry_type', ['parallels', 'retells', 'mentions'])
    def test_expands_uid_range(self, file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file,
                               database,
                               super_nav_details, relationship, entry_type):
        super_nav_details.insert({'uid': 'an7.75'})
        super_nav_details.insert({'uid': 'an7.76'})
        super_nav_details.insert({'uid': 'pli-tv-pvr7'})
        create_file(notes_file, [])

        create_file(parallels_file, [
            {entry_type: ['an7.75-76', 'pli-tv-pvr7#97.1-#98.1']},
        ])

        load_relationships(file_changed, relationship_dir, additional_info_dir, database)
        docs = tidy_relationship_docs(relationship)

        assert [doc['_from'] for doc in docs] == [
            'super_nav_details/an7.75',
            'super_nav_details/an7.76',
            'super_nav_details/pli-tv-pvr7',
            'super_nav_details/pli-tv-pvr7'
        ]

    @pytest.mark.parametrize('entry_type', ['parallels', 'retells', 'mentions'])
    def test_adds_remarks(self, file_changed, relationship_dir, additional_info_dir, parallels_file, notes_file,
                          database, super_nav_details, relationship, entry_type):
        super_nav_details.insert({'uid': 'abc123'})
        super_nav_details.insert({'uid': 'xyz321'})
        create_file(notes_file, [{'relations': ['abc123', 'xyz321'], 'remark': 'Remarkable'}])
        create_file(parallels_file, [{entry_type: ['abc123', 'xyz321']}])
        load_relationships(file_changed, relationship_dir, additional_info_dir, database)
        docs = tidy_relationship_docs(relationship)
        assert [doc['remark'] for doc in docs] == ['Remarkable', 'Remarkable']

    @pytest.mark.parametrize('entry_data', [
        [{"parallels": ['abc123', 'no_such_uid']}],
        [{"parallels": ['no_such_uid', 'abc321']}],
    ])
    def test_logs_parallels_unmatched_encodings(self, file_changed, relationship_dir, additional_info_dir,
                                                parallels_file, notes_file, database, super_nav_details, relationship,
                                                entry_data, caplog):
        caplog.set_level(logging.INFO)
        super_nav_details.insert({'uid': 'abc123'})
        create_file(notes_file, [])
        create_file(parallels_file, entry_data)
        load_relationships(file_changed, relationship_dir, additional_info_dir, database)

        # We get two messages because we create two edges. Where the from encoding
        # has no matching uids we drop it, for the to encoding we create an orphan.
        assert sorted(caplog.messages) == sorted([
            'Relationship encoding has no matching uids: no_such_uid (dropped)',
            'Relationship to encoding could not be matched: no_such_uid (appears as orphan)'
        ])

    @pytest.mark.parametrize('entry_data', [
        [{"mentions": ['abc123', 'no_such_uid']}],
        [{"retells": ['abc123', 'no_such_uid']}],
    ])
    def test_logs_other_unmatched_encodings(self, file_changed, relationship_dir, additional_info_dir, parallels_file,
                                            notes_file, database, super_nav_details, relationship, entry_data, caplog):
        caplog.set_level(logging.INFO)
        super_nav_details.insert({'uid': 'abc123'})
        create_file(notes_file, [])
        create_file(parallels_file, entry_data)
        load_relationships(file_changed, relationship_dir, additional_info_dir, database)

        assert sorted(caplog.messages) == sorted([
            'Relationship encoding has no matching uids: no_such_uid (dropped)',
        ])

    def test_empties_collection_before_load(self, file_changed, relationship_dir, additional_info_dir, parallels_file,
                                            notes_file, database, super_nav_details, relationship):
        super_nav_details.insert({'uid': 'abc123'})
        super_nav_details.insert({'uid': 'xyz321'})
        super_nav_details.insert({'uid': 'pqr777'})
        super_nav_details.insert({'uid': 'stu888'})
        create_file(notes_file, [])
        create_file(parallels_file, [{'parallels': ['abc123', 'xyz321']}])
        load_relationships(file_changed, relationship_dir, additional_info_dir, database)
        create_file(parallels_file, [{'parallels': ['pqr777', 'stu888']}])
        load_relationships(file_changed, relationship_dir, additional_info_dir, database)
        docs = tidy_relationship_docs(relationship)
        from_to = [(doc['from'], doc['to']) for doc in docs]
        assert from_to == [('pqr777', 'stu888'), ('stu888', 'pqr777')]


class TestEdge:
    @pytest.mark.parametrize('edge_type,uids', [
        (EdgeType.FULL, EdgeUids('abc123', 'xyz321')),
        (EdgeType.MENTION, EdgeUids('abc123', 'xyz321')),
        (EdgeType.RETELLING, EdgeUids('abc123', 'xyz321')),
    ])
    def test_from_uid(self, edge_type, uids):
        encodings = EdgeEncodings(Encoding('abc123'), Encoding('xyz321'))
        assert Edge(edge_type, encodings, uids).as_dict()['_from'] == 'abc123'

    @pytest.mark.parametrize('edge_type,uids', [
        (EdgeType.FULL, EdgeUids('abc123', 'xyz321')),
        (EdgeType.MENTION, EdgeUids('abc123', 'xyz321')),
        (EdgeType.RETELLING, EdgeUids('abc123', 'xyz321')),
    ])
    def test_to_uid(self, edge_type, uids):
        encodings = EdgeEncodings(Encoding('abc123'), Encoding('xyz321'))
        assert Edge(edge_type, encodings, uids).as_dict()['_to'] == 'xyz321'

    @pytest.mark.parametrize('edge_type,from_encoding,from_', [
        (EdgeType.FULL, 'abc123', 'abc123'),
        (EdgeType.MENTION, 'abc123', 'abc123'),
        (EdgeType.RETELLING, 'abc123', 'abc123'),
        (EdgeType.FULL, '~abc123', 'abc123'),
        (EdgeType.MENTION, '~abc123', 'abc123'),
        (EdgeType.RETELLING, '~abc123', 'abc123'),
        (EdgeType.FULL, '~abc123-extra', 'abc123-extra'),
        (EdgeType.MENTION, '~abc123-extra', 'abc123-extra'),
        (EdgeType.RETELLING, '~abc123-extra', 'abc123-extra'),
    ])
    def test_from_encoding(self, edge_type, from_encoding, from_):
        uids = EdgeUids('abc123', 'xyz321')
        encodings = EdgeEncodings(Encoding(from_encoding), Encoding('xyz321'))
        assert Edge(edge_type, encodings, uids).as_dict()['from'] == from_

    @pytest.mark.parametrize('edge_type,to_encoding,to', [
        (EdgeType.FULL, 'xyz321', 'xyz321'),
        (EdgeType.MENTION, 'xyz321', 'xyz321'),
        (EdgeType.RETELLING, 'xyz321', 'xyz321'),
        (EdgeType.FULL, '~xyz321', 'xyz321'),
        (EdgeType.MENTION, '~xyz321', 'xyz321'),
        (EdgeType.RETELLING, '~xyz321', 'xyz321'),
        (EdgeType.FULL, '~xyz321-extra', 'xyz321'),
        (EdgeType.MENTION, '~xyz321-extra', 'xyz321-extra'),
        (EdgeType.RETELLING, '~xyz321-extra', 'xyz321-extra'),
    ])
    def test_to_encoding(self, edge_type, to_encoding, to):
        uids = EdgeUids('abc123', 'xyz321')
        encodings = EdgeEncodings(Encoding('abc123'), Encoding(to_encoding))
        assert Edge(edge_type, encodings, uids).as_dict()['to'] == to

    @pytest.mark.parametrize('edge_type,from_encoding,number', [
        (EdgeType.FULL, 'abc', 0),
        (EdgeType.MENTION, 'abc', 0),
        (EdgeType.RETELLING, 'abc', 0),
        (EdgeType.FULL, 'abc123', 123),
        (EdgeType.MENTION, 'abc123', 123),
        (EdgeType.RETELLING, 'abc123', 123),
    ])
    def test_number(self, edge_type, from_encoding, number):
        uids = EdgeUids('abc123', 'xyz321')
        encodings = EdgeEncodings(Encoding(from_encoding), Encoding('xyz321'))
        assert Edge(edge_type, encodings, uids).as_dict()['number'] == number

    @pytest.mark.parametrize('edge_type,type_', [
        (EdgeType.FULL, 'full'),
        (EdgeType.MENTION, 'mention'),
        (EdgeType.RETELLING, 'retelling'),
    ])
    def test_type(self, edge_type, type_):
        uids = EdgeUids('abc123', 'xyz321')
        encodings = EdgeEncodings(Encoding('abc123'), Encoding('xyz321'))
        assert Edge(edge_type, encodings, uids).as_dict()['type'] == type_

    @pytest.mark.parametrize('edge_type,from_encoding,to_encoding,resembling', [
        (EdgeType.FULL, 'abc123', 'xyz321', False),
        (EdgeType.MENTION, 'abc123', 'xyz321', False),
        (EdgeType.RETELLING, 'abc123', 'xyz321', False),
        (EdgeType.FULL, 'abc123', '~xyz321', True),
        (EdgeType.MENTION, 'abc123', '~xyz321', True),
        (EdgeType.RETELLING, 'abc123', '~xyz321', True),
        (EdgeType.MENTION, '~abc123', 'xyz321', True),
        (EdgeType.RETELLING, '~abc123', 'xyz321', True),
        (EdgeType.RETELLING, '~abc123', '~xyz321', True),
        (EdgeType.MENTION, '~abc123', '~xyz321', True),
        (EdgeType.RETELLING, '~abc123', '~xyz321', True),
    ])
    def test_resembling(self, edge_type, from_encoding, to_encoding, resembling):
        uids = EdgeUids('abc123', 'xyz321')
        encodings = EdgeEncodings(Encoding(from_encoding), Encoding(to_encoding))
        assert Edge(edge_type, encodings, uids).as_dict()['resembling'] is resembling

    @pytest.mark.parametrize('edge_type,from_uid,to_uid,remark', [
        (EdgeType.FULL, 'abc123', 'xyz321', 'Remarkable'),
        (EdgeType.FULL, 'abc123', 'unrelated', None),
    ])
    def test_remark(self, with_remarks, edge_type, from_uid, to_uid, remark):
        uids = EdgeUids(from_uid, to_uid)
        encodings = EdgeEncodings(Encoding('abc123'), Encoding('xyz321'))
        assert Edge(edge_type, encodings, uids).as_dict()['remark'] == remark


class TestParallelsEdges:
    def test_creates_edges(self, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'xyz321'])
        assert [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())] == [
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

    def test_adds_remarks(self, with_remarks, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'xyz321'])
        assert [edge.as_dict()['remark'] for edge in ParallelsEdges(entry, Unmatched())] == ['Remarkable', 'Remarkable']

    @pytest.mark.parametrize('entry_data,numbers', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321']), [123, 321]),
        (Entry(EntryType.PARALLELS, ['abc', 'xyz321']), [0, 321]),
    ])
    def test_adds_numbers(self, with_uids, entry_data, numbers):
        Encoding.load_uids({'abc123', 'xyz321', 'abc'})
        edges = ParallelsEdges(entry_data, Unmatched())
        assert [edge.as_dict()['number'] for edge in edges] == numbers

    @pytest.mark.parametrize('entry,_to', [
        (Entry(EntryType.PARALLELS, ['abc123', 'no_such_uid']), ['orphan']),
        (Entry(EntryType.PARALLELS, ['no_such_uid', 'abc123']), ['orphan']),
    ])
    def test_adds_orphan(self, with_uids, entry, _to):
        edges = ParallelsEdges(entry, Unmatched())
        assert [edge.as_dict()['_to'] for edge in edges] == _to

    def test_no_resembling_encodings(self, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'xyz321'])
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        resembling = [(edge['_to'], edge['_from'], edge['resembling']) for edge in edges]
        assert resembling == [('xyz321', 'abc123', False), ('abc123', 'xyz321', False)]

    @pytest.mark.parametrize('entry,to_from_resembling', [
        (Entry(EntryType.PARALLELS, ['abc123', '~xyz321']), [('xyz321', 'abc123', True)]),
        (Entry(EntryType.PARALLELS, ['~xyz321', 'abc123']), [('xyz321', 'abc123', True)]),
    ])
    def test_with_resembling_encodings(self, with_uids, entry, to_from_resembling):
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert [(edge['_to'], edge['_from'], edge['resembling']) for edge in edges] == to_from_resembling

    @pytest.mark.parametrize('entry,from_uids', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321', 'pqr777']),
         ['abc123', 'abc123', 'xyz321', 'xyz321', 'pqr777', 'pqr777']),
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321', '~pqr777']), ['abc123', 'abc123', 'xyz321', 'xyz321']),
        (Entry(EntryType.PARALLELS, ['abc123', '~xyz321', '~pqr777']), ['abc123', 'abc123']),
        (Entry(EntryType.PARALLELS, ['~abc123', '~xyz321', '~pqr777']), []),
    ])
    def test_encoding_combinations_give_from_uids(self, with_uids, entry, from_uids):
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert sorted([edge['_from'] for edge in edges]) == sorted(from_uids)

    @pytest.mark.parametrize('entry,to_uids', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321', 'pqr777']),
         ['xyz321', 'pqr777', 'abc123', 'pqr777', 'abc123', 'xyz321']),
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321', '~pqr777']), ['xyz321', 'pqr777', 'abc123', 'pqr777']),
        (Entry(EntryType.PARALLELS, ['abc123', '~xyz321', '~pqr777']), ['xyz321', 'pqr777']),
        (Entry(EntryType.PARALLELS, ['~abc123', '~xyz321', '~pqr777']), []),
    ])
    def test_encoding_combinations_give_to_uids(self, with_uids, entry, to_uids):
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert sorted([edge['_to'] for edge in edges]) == sorted(to_uids)

    @pytest.mark.parametrize('entry,to_encoding,from_encoding', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321#654']), 'xyz321#654', 'abc123'),
        (Entry(EntryType.PARALLELS, ['xyz321#654', 'abc123']), 'abc123', 'xyz321#654'),
    ])
    def test_sectional_uids(self, with_uids, entry, to_encoding, from_encoding):
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        to_from = [(edge['to'], edge['from']) for edge in edges]
        assert to_from == [(to_encoding, from_encoding), (from_encoding, to_encoding)]

    def test_external_uid(self, with_uids):
        entry = Entry(EntryType.PARALLELS, ['abc123', 'has space'])
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert [(edge['to'], edge['from']) for edge in edges] == [('has space', 'abc123')]

    @pytest.mark.parametrize('encodings,from_uids', [
        (['mn1-2', 'dn1'], ['mn1', 'mn2', 'dn1', 'dn1']),
        (['mn1', 'dn1-2'], ['mn1', 'mn1', 'dn1', 'dn2']),
        (['mn1-2', 'dn1-2'], ['mn1', 'mn1', 'mn2', 'mn2', 'dn1', 'dn1', 'dn2', 'dn2']),
    ])
    def test_expands_uid_range_in_from_uids(self, with_uids, encodings, from_uids):
        entry = Entry(EntryType.PARALLELS, encodings)
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert [edge['_from'] for edge in edges] == from_uids

    @pytest.mark.parametrize('encodings,to_uids', [
        (['mn1-2', 'dn1'], ['dn1', 'dn1', 'mn1', 'mn2']),
        (['mn1', 'dn1-2'], ['dn1', 'dn2', 'mn1', 'mn1']),
        (['mn1-2', 'dn1-2'], ['dn1', 'dn2', 'dn1', 'dn2', 'mn1', 'mn2', 'mn1', 'mn2']),
    ])
    def test_expands_uid_range_in_to_uids(self, with_uids, encodings, to_uids):
        entry = Entry(EntryType.PARALLELS, encodings)
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert [edge['_to'] for edge in edges] == to_uids

    @pytest.mark.parametrize('entry,from_encodings', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321']), ['abc123', 'xyz321']),
        (Entry(EntryType.PARALLELS, ['abc123', '~xyz321']), ['abc123']),
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321#1.2.3']), ['abc123', 'xyz321#1.2.3']),
    ])
    def test_sets_from_encoding(self, with_uids, entry, from_encodings):
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert [edge['from'] for edge in edges] == from_encodings

    @pytest.mark.parametrize('entry,to_encodings', [
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321']), ['xyz321', 'abc123']),
        (Entry(EntryType.PARALLELS, ['abc123', '~xyz321']), ['xyz321']),
        (Entry(EntryType.PARALLELS, ['abc123', 'xyz321#1.2.3']), ['xyz321#1.2.3', 'abc123']),
    ])
    def test_sets_to_encoding(self, with_uids, entry, to_encodings):
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert [edge['to'] for edge in edges] == to_encodings

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.PARALLELS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.PARALLELS, ['no_such_uid', 'abc123'])),
    ])
    def test_stores_dropped_encodings(self, with_uids, entry):
        unmatched = Unmatched()
        _ = list(ParallelsEdges(entry, unmatched))
        assert unmatched.dropped == {Encoding('no_such_uid')}

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.PARALLELS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.PARALLELS, ['no_such_uid', 'abc123'])),
    ])
    def test_stores_orphan_encodings(self, with_uids, entry):
        unmatched = Unmatched()
        _ = list(ParallelsEdges(entry, unmatched))
        assert unmatched.orphans == {Encoding('no_such_uid')}

    @pytest.mark.parametrize('encodings,from_to', [
        (
                ['abc123', 'xyz321'],
                [
                    ('abc123', 'xyz321'), ('xyz321', 'abc123')
                ]
        ),
        (
                ['abc123', 'xyz321', 'pqr777'],
                [
                    ('abc123', 'xyz321'), ('abc123', 'pqr777'), ('xyz321', 'abc123'),
                    ('xyz321', 'pqr777'), ('pqr777', 'abc123'), ('pqr777', 'xyz321'),
                ]),
    ])
    def test_full_to_full_encodings(self, with_uids, encodings, from_to):
        entry = Entry(EntryType.PARALLELS, encodings)
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert sorted([(edge['from'], edge['to']) for edge in edges]) == sorted(from_to)

    @pytest.mark.parametrize('encodings,from_to', [
        (['abc123', '~xyz321'], [('abc123', 'xyz321')]),
        (
                ['abc123', 'xyz321', '~pqr777'],
                [('abc123', 'xyz321'), ('abc123', 'pqr777'), ('xyz321', 'abc123'), ('xyz321', 'pqr777')],
        ),
        (
                ['abc123', '~xyz321', '~pqr777'],
                [('abc123', 'xyz321'), ('abc123', 'pqr777')],
        ),
    ])
    def test_full_to_resembling_encodings(self, with_uids, encodings, from_to):
        entry = Entry(EntryType.PARALLELS, encodings)
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert sorted([(edge['from'], edge['to']) for edge in edges]) == sorted(from_to)

    @pytest.mark.parametrize('entry, from_to', [
        (Entry(EntryType.PARALLELS, ['abc123', 'no_such_uid']), [('abc123', 'no_such_uid')]),
        (Entry(EntryType.PARALLELS, ['no_such_uid', 'abc123']), [('abc123', 'no_such_uid')]),
    ])
    def test_drops_unmatched_from_encodings(self, with_uids, entry, from_to):
        edges = [edge.as_dict() for edge in ParallelsEdges(entry, Unmatched())]
        assert sorted([(edge['from'], edge['to']) for edge in edges]) == sorted(from_to)


class TestOtherEdges:
    @pytest.mark.parametrize('entry_type,edge_type', [
        (EntryType.MENTIONS, EdgeType.MENTION),
        (EntryType.RETELLS, EdgeType.RETELLING),
    ])
    def test_creates_edges_for_mentions(self, with_uids, entry_type, edge_type):
        entry = Entry(entry_type, ['abc123', 'xyz321'])
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
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
    def test_adds_remarks(self, with_remarks, with_uids, entry_type):
        entry = Entry(entry_type, ['abc123', 'xyz321'])
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['remark'] for edge in edges] == ['Remarkable', 'Remarkable']

    @pytest.mark.parametrize('entry,numbers', [
        (Entry(EntryType.MENTIONS, ['abc123', 'xyz321']), [123, 321]),
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321']), [123, 321]),
        (Entry(EntryType.MENTIONS, ['abc', 'xyz321']), [0, 321]),
        (Entry(EntryType.RETELLS, ['abc', 'xyz321']), [0, 321]),
    ])
    def test_adds_numbers(self, with_uids, entry, numbers):
        Encoding.load_uids({'abc123', 'xyz321', 'abc'})
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['number'] for edge in edges] == numbers

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.RETELLS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.MENTIONS, ['no_such_uid', 'abc123'])),
        (Entry(EntryType.RETELLS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.MENTIONS, ['no_such_uid', 'abc123'])),
    ])
    def test_does_not_add_orphans(self, with_uids, entry):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['_to'] for edge in edges] == []

    @pytest.mark.parametrize('entry,to_from_resembling', [
        (Entry(EntryType.RETELLS, ['abc123', '~xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
        (Entry(EntryType.MENTIONS, ['abc123', '~xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
        (Entry(EntryType.RETELLS, ['~abc123', 'xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
        (Entry(EntryType.MENTIONS, ['~abc123', 'xyz321']), [('xyz321', 'abc123', True), ('abc123', 'xyz321', True)]),
    ])
    def test_adds_resembling(self, with_uids, entry, to_from_resembling):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [(edge['_to'], edge['_from'], edge['resembling']) for edge in edges] == to_from_resembling

    @pytest.mark.parametrize('entry,from_uids', [
        (Entry(EntryType.MENTIONS, ['abc123', 'xyz321', 'pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321', 'pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
        (Entry(EntryType.MENTIONS, ['abc123', 'xyz321', '~pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321', '~pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
        (Entry(EntryType.MENTIONS, ['abc123', '~xyz321', '~pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
        (Entry(EntryType.RETELLS, ['abc123', '~xyz321', '~pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
        (Entry(EntryType.MENTIONS, ['~abc123', '~xyz321', '~pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
        (Entry(EntryType.RETELLS, ['~abc123', '~xyz321', '~pqr777']), ['abc123', 'xyz321', 'abc123', 'pqr777']),
    ])
    def test_encoding_combinations_gives_from_uids(self, with_uids, entry, from_uids):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['_from'] for edge in edges] == from_uids

    @pytest.mark.parametrize('entry,to_encoding,from_encoding', [
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321#654']), 'xyz321#654', 'abc123'),
        (Entry(EntryType.MENTIONS, ['abc123', 'xyz321#654']), 'xyz321#654', 'abc123'),
        (Entry(EntryType.RETELLS, ['xyz321#654', 'abc123']), 'abc123', 'xyz321#654'),
        (Entry(EntryType.MENTIONS, ['xyz321#654', 'abc123']), 'abc123', 'xyz321#654'),
    ])
    def test_sectional_uids(self, with_uids, entry, to_encoding, from_encoding):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        to_from = [(edge['to'], edge['from']) for edge in edges]
        assert to_from == [(to_encoding, from_encoding), (from_encoding, to_encoding)]

    @pytest.mark.parametrize(
        'entry,to_from',
        [
            (Entry(EntryType.RETELLS, ['abc123', 'has space']), []),
            (Entry(EntryType.MENTIONS, ['abc123', 'has space']), []),
        ]
    )
    def test_external_uid(self, with_uids, entry, to_from):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [(edge['to'], edge['from']) for edge in edges] == to_from

    @pytest.mark.parametrize('entry,from_uids', [
        (Entry(EntryType.RETELLS, ['mn1-2', 'dn1']), ['mn1', 'dn1', 'mn2', 'dn1']),
        (Entry(EntryType.MENTIONS, ['mn1-2', 'dn1']), ['mn1', 'dn1', 'mn2', 'dn1']),
        (Entry(EntryType.RETELLS, ['mn1', 'dn1-2']), ['mn1', 'dn1', 'mn1', 'dn2']),
        (Entry(EntryType.MENTIONS, ['mn1', 'dn1-2']), ['mn1', 'dn1', 'mn1', 'dn2']),
        (Entry(EntryType.RETELLS, ['mn1-2', 'dn1-2']), ['mn1', 'dn1', 'mn1', 'dn2', 'mn2', 'dn1', 'mn2', 'dn2']),
        (Entry(EntryType.MENTIONS, ['mn1-2', 'dn1-2']), ['mn1', 'dn1', 'mn1', 'dn2', 'mn2', 'dn1', 'mn2', 'dn2']),
    ])
    def test_expands_uid_range_in_from_uids(self, with_uids, entry, from_uids):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['_from'] for edge in edges] == from_uids

    @pytest.mark.parametrize('entry,to_uids', [
        (Entry(EntryType.RETELLS, ['mn1-2', 'dn1']), ['dn1', 'mn1', 'dn1', 'mn2']),
        (Entry(EntryType.MENTIONS, ['mn1-2', 'dn1']), ['dn1', 'mn1', 'dn1', 'mn2']),
        (Entry(EntryType.RETELLS, ['mn1', 'dn1-2']), ['dn1', 'mn1', 'dn2', 'mn1']),
        (Entry(EntryType.MENTIONS, ['mn1', 'dn1-2']), ['dn1', 'mn1', 'dn2', 'mn1']),
        (Entry(EntryType.RETELLS, ['mn1-2', 'dn1-2']), ['dn1', 'mn1', 'dn2', 'mn1', 'dn1', 'mn2', 'dn2', 'mn2']),
        (Entry(EntryType.MENTIONS, ['mn1-2', 'dn1-2']), ['dn1', 'mn1', 'dn2', 'mn1', 'dn1', 'mn2', 'dn2', 'mn2']),
    ])
    def test_expands_uid_range_in_to_uids(self, with_uids, entry, to_uids):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['_to'] for edge in edges] == to_uids

    @pytest.mark.parametrize('entry,from_encodings', [
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321']), ['abc123', 'xyz321']),
        (Entry(EntryType.RETELLS, ['abc123', '~xyz321']), ['abc123', 'xyz321']),
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321#1.2.3']), ['abc123', 'xyz321#1.2.3']),
    ])
    def test_sets_from_encoding(self, with_uids, entry, from_encodings):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['from'] for edge in edges] == from_encodings

    @pytest.mark.parametrize('entry,to_encodings', [
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321']), ['xyz321', 'abc123']),
        (Entry(EntryType.RETELLS, ['abc123', '~xyz321']), ['xyz321', 'abc123']),
        (Entry(EntryType.RETELLS, ['abc123', 'xyz321#1.2.3']), ['xyz321#1.2.3', 'abc123']),
    ])
    def test_sets_to_encoding(self, with_uids, entry, to_encodings):
        edges = [edge.as_dict() for edge in OtherEdges(entry, Unmatched())]
        assert [edge['to'] for edge in edges] == to_encodings

    @pytest.mark.parametrize('entry', [
        (Entry(EntryType.RETELLS, ['abc123', 'no_such_uid'])),
        (Entry(EntryType.MENTIONS, ['abc123', 'no_such_uid'])),
    ])
    def test_stores_dropped_encodings(self, with_uids, entry):
        unmatched = Unmatched()
        _ = list(OtherEdges(entry, unmatched))
        assert unmatched.dropped == {Encoding('no_such_uid')}


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


class TestRelationshipType:
    @pytest.mark.parametrize('entry,relationship', [
        (EntryType.PARALLELS, EdgeType.FULL),
        (EntryType.MENTIONS, EdgeType.MENTION),
        (EntryType.RETELLS, EdgeType.RETELLING),
    ])
    def test_converts_types(self, entry, relationship):
        assert to_edge_type(entry) == relationship
