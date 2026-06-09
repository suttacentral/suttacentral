import logging
from collections import defaultdict
from collections.abc import Iterator, Iterable
from dataclasses import dataclass
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
    matcher: UidMatcher = UidMatcher(set())

    def __init__(self, encoding: str):
        self._encoding = encoding

    def __str__(self) -> str:
        return self._encoding

    def __eq__(self, other: Self) -> bool:
        return self._encoding == other._encoding

    def matching_uids(self) -> list[str]:
        return self.matcher.get_matching_uids(self._encoding)

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


@dataclass
class Entry:
    entry_type: str
    relationship_type: str
    encodings: list[Encoding]


def entries(relationship_file: Path) -> Iterator[Entry]:
    relationship_data = json_load(relationship_file)

    relationship_types = {
        'retells': 'retelling',
        'mentions': 'mention',
        'parallels': 'full',
    }

    for entry_data in relationship_data:
        entry_data.pop('remarks', None)
        for entry_type, encodings in entry_data.items():
            yield Entry(
                entry_type=entry_type,
                relationship_type=relationship_types[entry_type],
                encodings=[Encoding(encoding) for encoding in encodings]
            )


class Remarks:
    _remarks = defaultdict(dict)

    @classmethod
    def load(cls, notes_file: Path):
        cls._remarks = defaultdict(dict)
        data = json_load(notes_file)
        for remark in data:
            uids = remark['relations']
            remark_text = remark['remark']
            cls._remarks[frozenset(uids)] = remark_text

    @classmethod
    def lookup(cls, from_uid: str, to_uid: str) -> str | None:
        return cls._remarks.get(frozenset([from_uid, to_uid]), None)


def load_relationships(change_tracker: FileChangeTracker, relationship_dir: Path, additional_info_dir: Path,
                       db: StandardDatabase) -> None:
    relationship_file = relationship_dir / Path('parallels.json')
    if not change_tracker.is_file_new_or_changed(relationship_file):
        return

    Encoding.matcher = UidMatcher(all_uids(db))
    Remarks.load(additional_info_dir / Path('notes.json'))

    ll_edges = []
    for entry in tqdm(entries(relationship_file)):
        if entry.entry_type == 'parallels':
            ll_edges.extend(parallels_edges(entry))
        else:
            ll_edges.extend(other_edges(entry))

    # Because there are many edges (nearly 400k at last count) chunk the import
    db['relationship'].truncate()
    for chunk in chunks(ll_edges, 10000):
        db['relationship'].import_bulk_logged(chunk, from_prefix='super_nav_details', to_prefix='super_nav_details')


@dataclass
class ParallelsEdgeData:
    to_encoding: Encoding
    from_encoding: Encoding
    relationship_type: str


def parallels_edges(entry: Entry, ) -> Iterator[dict]:
    full_encodings = [encoding for encoding in entry.encodings if not encoding.is_resembling()]

    for from_encoding in drop_when_no_match(full_encodings):
        to_encodings = [encoding for encoding in entry.encodings if encoding != from_encoding]

        for to_encoding in to_encodings:
            edge_data = ParallelsEdgeData(
                to_encoding=to_encoding,
                from_encoding=from_encoding,
                relationship_type=entry.relationship_type
            )
            yield from create_parallel_edges(edge_data)


def create_parallel_edges(edge_data: ParallelsEdgeData) -> Iterator[dict]:
    from_uids = edge_data.from_encoding.matching_uids()
    to_uids = edge_data.to_encoding.matching_uids()

    if not to_uids:
        to_uids = ['orphan']
        logging.info(f'Relationship to encoding could not be matched: {edge_data.to_encoding} (appears as orphan)')

    for from_uid, to_uid in product(from_uids, to_uids):
        yield {
            '_from': from_uid,
            '_to': to_uid,
            'from': str(edge_data.from_encoding),
            'number': edge_data.from_encoding.number(),
            'to': edge_data.to_encoding.first_part(),
            'type': edge_data.relationship_type,
            'resembling': edge_data.to_encoding.is_resembling(),
            'remark': Remarks.lookup(from_uid, to_uid),
        }


@dataclass
class OtherEdgeData:
    first_encoding: Encoding
    second_encoding: Encoding
    first_uid: str
    second_uid: str
    relationship_type: str
    remark: str

    @property
    def is_resembling(self) -> bool:
        return self.first_encoding.is_resembling() or self.second_encoding.is_resembling()


def other_edges(entry: Entry) -> Iterator[dict]:
    first_encoding = entry.encodings[0]
    second_encodings = drop_when_no_match(entry.encodings[1:])

    for first_uid in first_encoding.matching_uids():
        for second_encoding in second_encodings:
            for second_uid in second_encoding.matching_uids():
                yield from create_other_edges(
                    OtherEdgeData(
                        first_encoding=first_encoding,
                        second_encoding=second_encoding,
                        first_uid=first_uid,
                        second_uid=second_uid,
                        relationship_type=entry.relationship_type,
                        remark=Remarks.lookup(second_uid, first_uid)
                    )
                )


def drop_when_no_match(encodings: Iterable[Encoding]) -> Iterator[Encoding]:
    for encoding in encodings:
        if encoding.has_matching_uid():
            yield encoding
        else:
            logging.error(f'Relationship encoding has no matching uids: {encoding} (dropped)')


def create_other_edges(edge_data: OtherEdgeData):
    first_edge = {
        '_from': edge_data.first_uid,
        '_to': edge_data.second_uid,
        'from': edge_data.first_encoding.strip_resembling(),
        'to': edge_data.second_encoding.strip_resembling(),
        'number': edge_data.first_encoding.number(),
        'type': edge_data.relationship_type,
        'resembling': edge_data.is_resembling,
        'remark': edge_data.remark,
    }

    second_edge = {
        '_from': edge_data.second_uid,
        '_to': edge_data.first_uid,
        'from': edge_data.second_encoding.strip_resembling(),
        'to': edge_data.first_encoding.strip_resembling(),
        'number': edge_data.second_encoding.number(),
        'type': edge_data.relationship_type,
        'resembling': edge_data.is_resembling,
        'remark': edge_data.remark,
    }

    return first_edge, second_edge
