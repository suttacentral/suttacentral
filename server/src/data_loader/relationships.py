import logging
from collections.abc import Iterator, Iterable
from dataclasses import dataclass
from enum import StrEnum
from itertools import product
from pathlib import Path
from typing import Self

import regex
from arango.database import StandardDatabase
from tqdm import tqdm

from common.uid_matcher import UidMatcher
from common.utils import chunks
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


def all_uids(db: StandardDatabase) -> set[str]:
    return set(
        db.aql.execute(
            '''
            FOR doc IN super_nav_details
                RETURN doc.uid
            '''
        )
    )


class EntryType(StrEnum):
    PARALLELS = 'parallels'
    MENTIONS = 'mentions'
    RETELLS = 'retells'


class EdgeType(StrEnum):
    FULL = 'full'
    MENTION = 'mention'
    RETELLING = 'retelling'


def to_edge_type(entry_type: EntryType) -> EdgeType:
    edge_types = {
        EntryType.PARALLELS: EdgeType.FULL,
        EntryType.MENTIONS: EdgeType.MENTION,
        EntryType.RETELLS: EdgeType.RETELLING,
    }

    return edge_types[entry_type]


class Entry:
    def __init__(self, entry_type: str, encodings: list[str]):
        self._entry_type = EntryType(entry_type)
        self._edge_type = to_edge_type(self._entry_type)
        self._encodings = [Encoding(encoding) for encoding in encodings]

    @property
    def entry_type(self) -> EntryType:
        return self._entry_type

    @property
    def edge_type(self) -> EdgeType:
        return self._edge_type

    @property
    def encodings(self) -> list[Encoding]:
        return self._encodings


def entries(relationship_data: dict) -> Iterator[Entry]:
    for entry_data in relationship_data:
        for entry_type, encodings in entry_data.items():
            yield Entry(entry_type, encodings)


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

    edges = list(all_edges(relationship_data, notes_data))

    # Because there are many edges (nearly 400k at last count) chunk the import
    db['relationship'].truncate()
    for chunk in chunks(edges, 10000):
        db['relationship'].import_bulk_logged(chunk, from_prefix='super_nav_details', to_prefix='super_nav_details')


def all_edges(relationship_data, notes_data) -> Iterator[dict]:
    remarks = Remarks(notes_data)
    for entry in tqdm(entries(relationship_data)):
        if entry.entry_type == EntryType.PARALLELS:
            yield from ParallelsEdges(entry, remarks)
        else:
            yield from OtherEdges(entry, remarks)


class ParallelsEdges(Iterable):
    def __init__(self, entry: Entry, remarks: Remarks):
        self._entry = entry
        self._remarks = remarks

    def __iter__(self) -> Iterator[dict]:
        return iter(self.edges())

    def edges(self) -> Iterator[dict]:
        full_encodings = [encoding for encoding in self._entry.encodings if not encoding.is_resembling()]

        for from_encoding in drop_when_no_match(full_encodings):
            to_encodings = [encoding for encoding in self._entry.encodings if encoding != from_encoding]

            for to_encoding in to_encodings:
                yield from self.create_edges(to_encoding, from_encoding)

    def create_edges(self, to_encoding: Encoding, from_encoding: Encoding) -> Iterator[dict]:
        from_uids = from_encoding.matching_uids()
        to_uids = to_encoding.matching_uids()

        if not to_uids:
            to_uids = ['orphan']
            logging.info(f'Relationship to encoding could not be matched: {to_encoding} (appears as orphan)')

        for from_uid, to_uid in product(from_uids, to_uids):
            yield {
                '_from': from_uid,
                '_to': to_uid,
                'from': str(from_encoding),
                'number': from_encoding.number(),
                'to': to_encoding.first_part(),
                'type': str(self._entry.edge_type),
                'resembling': to_encoding.is_resembling(),
                'remark': self._remarks.lookup((from_uid, to_uid)),
            }


class OtherEdges(Iterable):
    def __init__(self, entry: Entry, remarks: Remarks):
        self._entry = entry
        self._remarks = remarks

    def __iter__(self) -> Iterator[dict]:
        return iter(self.edges())

    def edges(self) -> Iterator[dict]:
        first_encoding = self._entry.encodings[0]
        second_encodings = list(drop_when_no_match(self._entry.encodings[1:]))

        for first_uid in first_encoding.matching_uids():
            for second_encoding in second_encodings:
                for second_uid in second_encoding.matching_uids():
                    yield from self.create_edges(first_encoding, second_encoding, first_uid, second_uid,)

    def create_edges(self, first_encoding: Encoding, second_encoding: Encoding, first_uid: str, second_uid: str):
        is_resembling = first_encoding.is_resembling() or second_encoding.is_resembling()
        remark = self._remarks.lookup((second_uid, first_uid))

        first_edge = {
            '_from': first_uid,
            '_to': second_uid,
            'from': first_encoding.strip_resembling(),
            'to': second_encoding.strip_resembling(),
            'number': first_encoding.number(),
            'type': str(self._entry.edge_type),
            'resembling': is_resembling,
            'remark': remark,
        }

        second_edge = {
            '_from': second_uid,
            '_to': first_uid,
            'from': second_encoding.strip_resembling(),
            'to': first_encoding.strip_resembling(),
            'number': second_encoding.number(),
            'type': str(self._entry.edge_type),
            'resembling': is_resembling,
            'remark': remark,
        }

        return first_edge, second_edge


def drop_when_no_match(encodings: Iterable[Encoding]) -> Iterator[Encoding]:
    for encoding in encodings:
        if encoding.has_matching_uid():
            yield encoding
        else:
            logging.error(f'Relationship encoding has no matching uids: {encoding} (dropped)')
