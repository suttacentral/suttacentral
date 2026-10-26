import logging
from collections import defaultdict
from itertools import product
from pathlib import Path

import regex
from arango.database import StandardDatabase
from tqdm import tqdm

from common.uid_matcher import UidMatcher
from common.utils import chunks
from data_loader.ports import FileChangeTracker
from data_loader.util import json_load


def get_uid_matcher(db: StandardDatabase) -> UidMatcher:
    all_uids = set(
        db.aql.execute(
            '''
            FOR doc IN super_nav_details
                RETURN doc.uid
            '''
        )
    )

    return UidMatcher(all_uids)


def generate_relationship_edges(
        change_tracker: FileChangeTracker, relationship_dir: Path, additional_info_dir: Path, db: StandardDatabase
) -> None:
    relationship_files = [relationship_dir / Path('parallels.json')]

    if not change_tracker.is_any_file_new_or_changed(relationship_files):
        return

    print('Generating Parallels')
    relationship_data = []
    for relationship_file in relationship_files:
        relationship_data.extend(json_load(relationship_file))

    uid_matcher = get_uid_matcher(db)

    remarks_data = json_load(additional_info_dir / 'notes.json')

    remarks = defaultdict(dict)

    for remark in remarks_data:
        uids = remark['relations']
        remark_text = remark['remark']
        remarks[frozenset(uids)] = remark_text

    ll_edges = []
    for entry in tqdm(relationship_data):
        entry.pop('remarks', None)
        for r_type, uids in entry.items():
            if r_type == 'retells':
                r_type = 'retelling'
            elif r_type == 'mentions':
                r_type = 'mention'
            elif r_type == 'parallels':
                r_type = 'full'

            if r_type == 'full':
                full = [uid for uid in uids if not uid.startswith('~')]
                partial = [uid for uid in uids if uid.startswith('~')]
                for from_uid in full:
                    m = regex.search('[0-9]+$', from_uid)
                    if m:
                        from_nr = int(m[0])
                    else:
                        from_nr = 0
                    true_from_uids = uid_matcher.get_matching_uids(from_uid)
                    if not true_from_uids and ' ' not in from_uid:
                        logging.error(
                            f'Relationship from uid could not be matched: {from_uid} (dropped)'
                        )
                        continue

                    for to_uids, is_resembling in ((full, False), (partial, True)):
                        for to_uid in to_uids:
                            if to_uid == from_uid:
                                continue
                            true_to_uids = uid_matcher.get_matching_uids(to_uid)
                            if not true_to_uids:
                                logging.info(
                                    f'Relationship to uid could not be matched: {to_uid} (appears as orphan)'
                                )
                                true_to_uids = ['orphan']

                            for true_from_uid in true_from_uids:
                                for true_to_uid in true_to_uids:
                                    remark = remarks.get(
                                        frozenset([true_from_uid, true_to_uid]), None
                                    )
                                    ll_edges.append(
                                        {
                                            '_from': true_from_uid,
                                            '_to': true_to_uid,
                                            'from': from_uid,
                                            'number': from_nr,
                                            'to': to_uid.lstrip('~').split('-')[0],
                                            'type': r_type,
                                            'resembling': is_resembling,
                                            'remark': remark,
                                        }
                                    )
            else:
                first_uid = uids[0]
                m = regex.search('[0-9]+$', first_uid)
                if m:
                    from_nr = int(m[0])
                else:
                    from_nr = 0
                true_first_uids = uid_matcher.get_matching_uids(first_uid)
                for true_first_uid, to_uid in product(true_first_uids, uids[1:]):
                    true_from_uids = uid_matcher.get_matching_uids(to_uid)
                    if not true_from_uids and ' ' not in from_uid:
                        logging.error(
                            f'Relationship from uid could not be matched: {from_uid} (dropped)'
                        )
                        continue
                    for true_from_uid in true_from_uids:
                        remark = remarks.get(
                            frozenset([true_from_uid, true_first_uid]), None
                        )
                        ll_edges.append(
                            {
                                '_from': true_first_uid,
                                '_to': true_from_uid,
                                'from': first_uid.lstrip('~'),
                                'to': to_uid,
                                'number': from_nr,
                                'type': r_type,
                                'resembling': any(
                                    x.startswith('~') for x in [first_uid, from_uid]
                                ),
                                'remark': remark,
                            }
                        )
                        m = regex.search('[0-9]+$', to_uid)
                        if m:
                            to_nr = int(m[0])
                        else:
                            to_nr = 0
                        ll_edges.append(
                            {
                                '_from': true_from_uid,
                                '_to': true_first_uid,
                                'from': to_uid,
                                'to': first_uid.lstrip('~'),
                                'number': to_nr,
                                'type': r_type,
                                'resembling': any(
                                    x.startswith('~') for x in [first_uid, from_uid]
                                ),
                                'remark': remark,
                            }
                        )

    # Because there are many edges (nearly 400k at last count) chunk the import
    db['relationship'].truncate()
    for chunk in chunks(ll_edges, 10000):
        db['relationship'].import_bulk_logged(chunk, from_prefix='super_nav_details', to_prefix='super_nav_details')
