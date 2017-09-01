import json
import logging
import pathlib
from pathlib import Path
from collections import Counter
from typing import Set, List, Any

import regex
from git import Repo, InvalidGitRepositoryError
from arango import ArangoClient
from flask import current_app

from . import textdata


def setup_database(conn, db_name):
    if db_name in conn.databases():
        conn.delete_database(db_name)

    db = conn.create_database(db_name)

    collections = [
        ('grouping', False),
        ('language', False),
        ('pitaka', False),
        ('sect', False),
        ('root', False),
        ('root_edges', True),
        ('relationship', True),
        ('html_text', False),
        ('unicode_points', False),
        ('mtimes', False),
    ]

    for name, edge in collections:
        db.create_collection(name=name, edge=edge)

    # create indexes

    db['html_text'].add_hash_index(fields=["uid"], unique=False)
    db['html_text'].add_hash_index(fields=["author_uid"], unique=False)
    db['html_text'].add_hash_index(fields=["lang"], unique=False)
    db['root'].add_hash_index(fields=["uid"], unique=False)

    return db


class ChangeTracker:
    def __init__(self, base_dir, db):
        self.base_dir = base_dir
        self.db = db

        # Extract the mtimes from arangodb

        self.old_mtimes = old_mtimes = {entry['path']: entry['mtime'] for entry in db.aql.execute('''
        FOR entry in mtimes
            RETURN entry
        ''')}

        # Get the mtimes from the file system

        self.new_mtimes = new_mtimes = {}
        for path in base_dir.glob('**/*'):
            if path.is_dir():
                continue
            new_mtimes[str(path.relative_to(base_dir))] = path.stat().st_mtime_ns

        self.deleted = deleted = set(old_mtimes).difference(new_mtimes)
        self.changed_or_new = changed_or_new = {}

        for path, mtime in new_mtimes.items():
            if mtime != old_mtimes.get(path):
                changed_or_new[path] = mtime
        print(f'{len(changed_or_new)} files to be processed')
        print(f'{len(deleted)} files to be deleted')

    def file_has_changed(self, path):
        if str(path.relative_to(self.base_dir)) in self.changed_or_new:
            return True
        return False

    def any_file_has_changed(self, files):
        return any(self.file_has_changed(file) for file in files)

    def update_mtimes(self):
        # Update mtimes in arangodb
        if self.deleted:
            self.db.aql.execute('''FOR entry IN mtimes 
                                FILTER entry.path IN @to_remove 
                                REMOVE entry''', bind_vars={'to_remove': list(self.deleted)})

        self.db['mtimes'].import_bulk(
            [{'path': k, 'mtime': v, '_key': k.replace('/', '_')} for k, v in
             self.changed_or_new.items()], on_duplicate="replace")


def update_data(repo: Repo):
    """Updates given git repo.

    Args:
        repo: Git data repo.
    """
    logging.info(f'Updating repo in {repo.working_dir}')
    repo.remotes.origin.pull()


def get_data(data_dir: Path) -> Repo:
    """Clones git data repo to data_dir

    Args:
        data_dir: Path to data dir.

    Returns:
        Cloned repo.
    """
    repo_addr = current_app.config.get('DATA_REPO')
    logging.info(f'Cloning the repo: {repo_addr}')
    return Repo.clone_from(repo_addr, data_dir)


def collect_data(data_dir: Path):
    """Ensure data is in data dir and update it if needed and if it's git repo.

    Args:
        data_dir: Path to data directory.
    """
    if not data_dir.exists():
        get_data(data_dir)
    else:
        try:
            repo = Repo(data_dir)
        except InvalidGitRepositoryError:
            pass
        else:
            update_data(repo)


def process_root_files(docs, edges, mapping, root_files):
    for root_file in root_files:
        with root_file.open('r', encoding='utf8') as f:
            entries = json.load(f)
        unique_counter = Counter(entry['_path'].split('/')[-1] for entry in entries)

        for i, entry in enumerate(entries):
            path = pathlib.PurePath(entry['_path'])
            mapping[path] = entry

            uid = path.parts[-1]
            if unique_counter[uid] > 1 or uid.startswith('vagga'):
                # uid is the end of path, unless it is non-unique in which case
                # combine with the second to last part of path
                uid = '-'.join(entry['_path'].split('/')[-2:])

            entry['_key'] = uid
            entry['uid'] = uid

            del entry['_path']
            entry['num'] = i  # number is used for ordering, it is not otherwise meaningful

            docs.append(entry)

            # find the parent
            parent = mapping.get(path.parent)
            if parent:
                edges.append({'_from': 'root/' + parent['_key'], '_to': 'root/' + entry['_key'],
                              'type': 'child'})


def process_category_files(category_files, db, edges, mapping):
    for category_file in category_files:
        category_name = category_file.stem
        collection = db[category_name]
        category_docs = []

        with category_file.open('r', encoding='utf8') as f:
            entries = json.load(f)

        edge_type = category_file.stem

        for i, entry in enumerate(entries):
            entry['type'] = edge_type
            entry['_key'] = entry['uid']
            entry['num'] = i
            if 'contains' in entry:
                for uid in entry['contains']:
                    child = mapping.get(pathlib.PurePath(uid))
                    child[entry['type']] = entry['uid']
                    edges.append({'_from': f'{category_name}/{entry["_key"]}',
                                  '_to': f'root/{child["_key"]}', 'type': edge_type})
                del entry['contains']
            category_docs.append(entry)
        collection.truncate()
        collection.import_bulk(category_docs)


def add_root_docs_and_edges(change_tracker, db, structure_dir):
    docs = []
    edges = []
    mapping = {}
    root_files = sorted((structure_dir / 'division').glob('**/*.json'))
    category_files = sorted(structure_dir.glob('*.json'))
    if change_tracker.any_file_has_changed(root_files + category_files):
        # To handle deletions as easily as possible we completely rebuild
        # the root structure
        process_root_files(docs, edges, mapping, root_files)

        process_category_files(category_files, db, edges, mapping)

        for entry in docs:
            if entry.get('pitaka') == 'su':
                if 'grouping' not in entry:
                    entry['grouping'] = 'other'

        # make documents
        db['root'].truncate()
        db['root'].import_bulk(docs)
        db['root_edges'].truncate()
        db['root_edges'].import_bulk(edges)


def get_true_uids(uid: str, all_uids: Set[str]) -> List[str]:
    """Extract list of indexes out of our range notation.

    It also makes sure that all the extracted UIDs exists in list of all available UIDs q.

    Args:
        uid: Uids range we want to expand eg. sn12-14
        all_uids: All available UIDs

    Returns:
        List od all valid UIDs in given range.

    Examples:
        >>> get_true_uids('sn12-14', {'sn12', 'sn13', 'sn14', 'fh12.33'})
        >>> ['sn12', 'sn13', 'sn14']

        >>> get_true_uids('fh12.33-12.34', {'fh12.33', 'fh12.34', 'ss222'})
        >>> ['fh12.33', 'fh12.34']

        >>> get_true_uids('sn19.19-sn19.21', {'sn19.19', 'sn19.20', 'agh54'})
        >>> ['sn19.19', 'sn19.20']

        >>> get_true_uids('dhsk12-dhsk13', {'dhsk12', 'dhsk13'})
        >>> ['dhsk12', 'dhsk13']
    """
    uids = []
    seen = set()
    uid = uid.lstrip('~').split('#')[0]
    if uid in all_uids:
        uids.append(uid)
        seen.add(uid)

    # Welcome to hell

    def expand(prefix, start, end):
        for i in range(int(start), int(end) + 1):
            possible_uid = prefix + str(i)
            if possible_uid in all_uids and possible_uid not in seen:
                uids.append(possible_uid)
                seen.add(possible_uid)

    # deal with ranges: sa390-391
    # non-greedy match to the rescue
    m = regex.match(r'(.*?)(\d+)-(\d+)(.*)', uid)
    if m:
        if m[4]:
            # deal with weird ranges: sn19.1-19.21
            # lets try a crazier regex with back reference
            m = regex.match(r'((.*?)(.*\.?))(\d+)-\3(\d+)$', uid)
            if m:
                expand(m[1], m[4], m[5])
        else:
            expand(m[1], m[2], m[3])

    # More complex: dhsk1-dhsk17 sn19.1-sn19.21
    # backreference is a big help here!
    m = regex.match(r'(.*)(\d+)-\1(\d+)', uid)
    if m:
        expand(m[1], m[2], m[3])

    return uids


def print_once(msg: Any, antispam: Set):
    """Print msg if it is not in antispam.

    Args:
        msg:  Massage we want to print
        antispam: Set of messages we've already printed.

    Examples:
        >>> print_once('test', {'something else'})
        >>> test
        >>> print_once('test', {'test', 'something else'})
        >>>
    """
    if msg in antispam:
        return
    print(msg)
    antispam.add(msg)


def generate_relationship_edges(change_tracker, relationship_dir, db):
    relationship_files = list(relationship_dir.glob('*.json'))
    
    if not change_tracker.any_file_has_changed(relationship_files):
        return

    print('Generating Parallels')
    relationship_data = []
    for relationship_file in relationship_files:
        with relationship_file.open('r', encoding='utf8') as f:
            relationship_data.extend(json.load(f))
    
    all_uids = set(db.aql.execute('''
    FOR doc IN root
        SORT doc.num
        RETURN doc.uid
    '''))
    antispam = set()
    ll_edges = []
    for entry in relationship_data:
        remarks = entry.pop('remarks', None)
        assert len(entry) == 1
        for r_type, uids in entry.items():
            pass
        full = [uid for uid in uids if not uid.startswith('~')]
        partial = [uid for uid in uids if uid.startswith('~')]
        
        # TODO: directionality has to be taken into account
        # for some relationship kinds
        for from_uid in full:
            true_from_uids = get_true_uids(from_uid, all_uids)
            if not true_from_uids:
                print_once(f'Could not find any uids for: {from_uid}', antispam)
                continue
            for to_uids, is_partial in ((full, False), (partial, True)):
                for to_uid in to_uids:
                    if to_uid == from_uid:
                        continue
                    true_to_uids = get_true_uids(to_uid, all_uids)
                    if not true_from_uids:
                        if is_partial:
                            print_once(f'Could not find any uids for: {to_uid}', antispam)
                        continue

                    for true_from_uid in true_from_uids:
                        for true_to_uid in true_to_uids:
                            ll_edges.append({
                                '_from': true_from_uid,
                                '_to': true_to_uid,
                                'from': from_uid,
                                'to': to_uid.lstrip('~'),
                                'type': r_type,
                                'partial': is_partial,
                            })
    db['relationship'].truncate()
    db['relationship'].import_bulk(ll_edges, from_prefix='root/', to_prefix='root/')


def load_html_texts(change_tracker, data_dir, db, html_dir):
    print('Loading HTML texts')
    # Load HTML texts
    languages = db.aql.execute('''/* return all language objects as a key: value mapping */
        RETURN MERGE(
            FOR l IN language
                RETURN {[l.uid] : l} /* Set the key as the uid */
        )''').next()
    authors = {}  # to do
    with textdata.ArangoTextInfoModel(db=db) as tim:
        for lang_dir in html_dir.glob('*'):
            if not lang_dir.is_dir:
                continue
            tim.process_lang_dir(lang_dir=lang_dir, data_dir=data_dir,
                                 files_to_process=change_tracker.changed_or_new,
                                 force=False)


def run(force=False):
    """Runs data load.

    It will take data from nextdata repository and populate the database with it.

    Args:
        force: Whether or not force clean db setup.
    """
    conn = ArangoClient(**current_app.config.get('ARANGO_CLIENT'))

    data_dir = current_app.config.get('BASE_DIR') / 'nextdata'
    html_dir = data_dir / 'html_text'
    structure_dir = data_dir / 'structure'
    relationship_dir = data_dir / 'relationship'

    db_name = current_app.config.get('ARANGO_DB')
    if force or db_name not in conn.databases():
        db = setup_database(conn, db_name)
    else:
        db = conn.database(db_name)

    collect_data(data_dir)

    change_tracker = ChangeTracker(data_dir, db)

    add_root_docs_and_edges(change_tracker, db, structure_dir)

    generate_relationship_edges(change_tracker, relationship_dir, db)

    load_html_texts(change_tracker, data_dir, db, html_dir)

    change_tracker.update_mtimes()
