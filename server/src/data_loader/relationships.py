import logging
from collections.abc import Iterator, Iterable
from dataclasses import dataclass
from enum import StrEnum
from itertools import product, combinations
from pathlib import Path
from typing import Self

import regex
from arango.database import StandardDatabase
from tqdm import tqdm

from common.uid_matcher import UidMatcher
from common import utils
from data_loader.ports import FileChangeTracker
from data_loader.util import json_load


class Encoding:
    _matcher: UidMatcher = UidMatcher(set())

    @classmethod
    def load_uids(cls, uids: Iterable[str]) -> None:
        Encoding._matcher = UidMatcher(uids)

    def __init__(self, encoding: str):
        self._encoding = encoding

    def __str__(self) -> str:
        return self._encoding

    def __eq__(self, other: Self) -> bool:
        return self._encoding == other._encoding

    def __hash__(self) -> int:
        return hash(self._encoding)

    def matching_uids(self) -> list[str]:
        return self._matcher.get_matching_uids(self._encoding)

    def is_resembling(self) -> bool:
        return self._encoding.startswith('~')

    def is_external(self) -> bool:
        return ' ' in self._encoding

    def has_matching_uid(self) -> bool:
        if self.is_external():
            return True
        if self.matching_uids():
            return True
        return False

    def number(self) -> int:
        m = regex.search('[0-9]+$', self._encoding)
        if m:
            from_nr = int(m[0])
        else:
            from_nr = 0
        return from_nr

    def strip_resembling(self) -> str:
        return self._encoding.lstrip('~')

    def first_part(self) -> str:
        return self._encoding.lstrip('~').split('-')[0]


class EdgeType(StrEnum):
    FULL = 'full'
    MENTION = 'mention'
    RETELLING = 'retelling'


class EntryType(StrEnum):
    PARALLELS = 'parallels'
    MENTIONS = 'mentions'
    RETELLS = 'retells'

    def to_edge_type(self) -> EdgeType:
        edge_types = {
            EntryType.PARALLELS: EdgeType.FULL,
            EntryType.MENTIONS: EdgeType.MENTION,
            EntryType.RETELLS: EdgeType.RETELLING,
        }

        return edge_types[self]


class Entry:
    def __init__(self, entry_type: str, encodings: list[str]):
        self._entry_type = EntryType(entry_type)
        self._encodings = [Encoding(encoding) for encoding in encodings]

    @property
    def entry_type(self) -> EntryType:
        return self._entry_type

    @property
    def edge_type(self) -> EdgeType:
        return self.entry_type.to_edge_type()

    @property
    def encodings(self) -> list[Encoding]:
        return self._encodings


class Remarks:
    def __init__(self, data: list[dict]):
        self._remarks = {
            self._relation_key(remark['relations']): remark['remark']
            for remark in data
        }

    def lookup(self, uids: Iterable[str]) -> str | None:
        return self._remarks.get(self._relation_key(uids), None)

    def _relation_key(self, uids: Iterable[str]) -> frozenset[str]:
        return frozenset(uids)


@dataclass
class EdgeEncodings:
    from_: Encoding
    to: Encoding

    def reversed(self) -> Self:
        return EdgeEncodings(self.to, self.from_)


@dataclass
class EdgeUids:
    from_: str
    to: str

    def reversed(self) -> Self:
        return EdgeUids(self.to, self.from_)


class Edge:
    _remarks = Remarks([])

    @classmethod
    def load_remarks(cls, notes_data) -> None:
        Edge._remarks = Remarks(notes_data)

    def __init__(self, edge_type: EdgeType, encodings: EdgeEncodings, uids: EdgeUids):
        self._edge_type = edge_type
        self._encodings = encodings
        self._uids = uids

    def _from(self) -> str:
        return self._encodings.from_.strip_resembling()

    def _to(self) -> str:
        # Note: Requires further scrutiny. Why is the handling different?
        if self._edge_type == EdgeType.FULL:
            return self._encodings.to.first_part()
        else:
            return self._encodings.to.strip_resembling()

    def _number(self) -> int:
        return self._encodings.from_.number()

    def _resembling(self) -> bool:
        # Note: for parallels entries the first encoding is never resembling.
        return self._encodings.from_.is_resembling() or self._encodings.to.is_resembling()

    def _remark(self) -> str:
        return self._remarks.lookup((self._uids.from_, self._uids.to))

    def as_dict(self) -> dict:
        return {
            '_from': self._uids.from_,
            '_to': self._uids.to,
            'from': self._from(),
            'to': self._to(),
            'number': self._number(),
            'type': str(self._edge_type),
            'resembling': self._resembling(),
            'remark': self._remark(),
        }


class Unmatched:
    def __init__(self):
        self._dropped: set[Encoding] = set()
        self._orphans: set[Encoding] = set()

    @property
    def dropped(self) -> set[Encoding]:
        return self._dropped

    @property
    def orphans(self) -> set[Encoding]:
        return self._orphans

    def add_dropped(self, encoding: Encoding) -> None:
        self._dropped.add(encoding)

    def add_orphan(self, encoding: Encoding) -> None:
        self._orphans.add(encoding)

    def log(self) -> None:
        for encoding in self._dropped:
            logging.error(f'Relationship encoding has no matching uids: {encoding} (dropped)')

        for encoding in self._orphans:
            logging.info(f'Relationship to encoding could not be matched: {encoding} (appears as orphan)')


class ParallelsEdges(Iterable):
    def __init__(self, entry: Entry, unmatched: Unmatched):
        self._edge_type = entry.edge_type
        self._full_encodings = [encoding for encoding in entry.encodings if not encoding.is_resembling()]
        self._resembling_encodings = [encoding for encoding in entry.encodings if encoding.is_resembling()]
        self._unmatched = unmatched

    def __iter__(self) -> Iterator[Edge]:
        return (
            Edge(self._edge_type, edge_encodings, edge_uids)
            for edge_encodings in drop_unmatched_from(self._edge_encodings(), self._unmatched)
            for edge_uids in self._uids(edge_encodings)
        )

    def _edge_encodings(self) -> Iterator[EdgeEncodings]:
        yield from self._full_to_full()
        yield from self._full_to_full_reversed()
        yield from self._full_to_resembling()

    def _full_to_full(self) -> Iterator[EdgeEncodings]:
        return (EdgeEncodings(from_, to) for from_, to in combinations(self._full_encodings, 2))

    def _full_to_full_reversed(self) -> Iterator[EdgeEncodings]:
        return (edge_encodings.reversed() for edge_encodings in self._full_to_full())

    def _full_to_resembling(self) -> Iterator[EdgeEncodings]:
        return (
            EdgeEncodings(from_, to)
            for from_ in self._full_encodings
            for to in self._resembling_encodings
        )

    def _uids(self, encodings: EdgeEncodings) -> Iterator[EdgeUids]:
        from_uids = encodings.from_.matching_uids()
        to_uids = encodings.to.matching_uids()

        if not to_uids:
            self._unmatched.add_orphan(encodings.to)
            to_uids = ['orphan']

        return (EdgeUids(*uids) for uids in product(from_uids, to_uids))


def drop_unmatched_from(edge_encodings: Iterable[EdgeEncodings], unmatched: Unmatched) -> Iterator[EdgeEncodings]:
    for encodings in edge_encodings:
        if encodings.from_.has_matching_uid():
            yield encodings
        else:
            unmatched.add_dropped(encodings.from_)


class OtherEdges(Iterable):
    def __init__(self, entry: Entry, unmatched: Unmatched):
        self._edge_type = entry.edge_type
        self._first = entry.encodings[0]
        self._others = entry.encodings[1:]
        self._drop_encodings(unmatched)

    def __iter__(self) -> Iterator[Edge]:
        return (
            edge for encodings in self._encodings()
            for uids in self._uids(encodings)
            for edge in self._reciprocal_edges(encodings, uids)
        )

    def _reciprocal_edges(self, encodings: EdgeEncodings, uids: EdgeUids) -> Iterator[Edge]:
        yield Edge(self._edge_type, encodings, uids)
        yield Edge(self._edge_type, encodings.reversed(), uids.reversed())

    def _encodings(self) -> Iterator[EdgeEncodings]:
        return (
            EdgeEncodings(self._first, second)
            for second in self._matched_others()
        )

    def _uids(self, encodings: EdgeEncodings) -> Iterator[EdgeUids]:
        return (
            EdgeUids(first_uid, second_uid)
            for first_uid in encodings.from_.matching_uids()
            for second_uid in encodings.to.matching_uids()
        )

    def _matched_others(self) -> Iterator[Encoding]:
        return (
            encoding for encoding in self._others
            if encoding.has_matching_uid()
        )

    def _drop_encodings(self, unmatched: Unmatched) -> None:
        to_drop = (
            encoding for encoding in self._others
            if not encoding.has_matching_uid()
        )

        for encoding in to_drop:
            unmatched.add_dropped(encoding)


def load_relationships(change_tracker: FileChangeTracker, relationship_dir: Path, additional_info_dir: Path,
                       db: StandardDatabase) -> None:
    relationship_file = relationship_dir / Path('parallels.json')
    notes_file = additional_info_dir / Path('notes.json')

    if not change_tracker.is_any_file_new_or_changed([relationship_file, notes_file]):
        return

    relationship_data = json_load(relationship_file)
    notes_data = json_load(notes_file)
    uids = all_uids(db)

    Encoding.load_uids(uids)
    Edge.load_remarks(notes_data)

    unmatched = Unmatched()
    entries = all_entries(relationship_data)
    import_entries(db, entries, unmatched)
    unmatched.log()


def import_entries(db: StandardDatabase, entries: list[Entry], unmatched: Unmatched) -> None:
    db['relationship'].truncate()
    edges = entries_to_edges(tqdm(entries), unmatched)
    for chunk in edge_chunks(edges):
        write_chunk(db, chunk)


def all_entries(relationship_data: list[dict]) -> list[Entry]:
    return [
        Entry(entry_type, encodings)
        for entry_data in relationship_data
        for entry_type, encodings in entry_data.items()
    ]


def entries_to_edges(entries: Iterable[Entry], unmatched: Unmatched) -> Iterator[Edge]:
    for entry in entries:
        yield from edges_for_entry(entry, unmatched)


def edges_for_entry(entry: Entry, unmatched: Unmatched) -> Iterator[Edge]:
    if entry.entry_type == EntryType.PARALLELS:
        yield from ParallelsEdges(entry, unmatched)
    else:
        yield from OtherEdges(entry, unmatched)


def edge_chunks(edges: Iterable[Edge], chunk_size=10000) -> Iterator[list[dict]]:
    edges = (edge.as_dict() for edge in edges)
    for chunk in utils.chunks(edges, chunk_size):
        yield chunk


def write_chunk(db: StandardDatabase, chunk: list[dict]):
    db['relationship'].import_bulk_logged(
        chunk,
        from_prefix='super_nav_details',
        to_prefix='super_nav_details'
    )


def all_uids(db: StandardDatabase) -> set[str]:
    return set(
        db.aql.execute(
            '''
            FOR doc IN super_nav_details
                RETURN doc.uid
            '''
        )
    )
