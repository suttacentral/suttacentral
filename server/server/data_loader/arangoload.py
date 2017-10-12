import json
import logging
import pathlib
from collections import Counter
from pathlib import Path
from typing import Any, List, Set

import regex
from arango import ArangoClient
from flask import current_app
from tqdm import tqdm
from git import InvalidGitRepositoryError, Repo

from . import po, textdata, dictionaries, currencies, biblio


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

    def is_file_new_or_changed(self, path):
        if str(path.relative_to(self.base_dir)) in self.changed_or_new:
            return True
        return False

    def is_any_file_new_or_changed(self, files):
        return any(self.is_file_new_or_changed(file) for file in files)

    def update_mtimes(self):
        # Update mtimes in arangodb
        if self.deleted:
            self.db.aql.execute('''FOR entry IN mtimes 
                                FILTER entry.path IN @to_remove 
                                REMOVE entry IN mtimes''', bind_vars={'to_remove': list(self.deleted)})

        self.db['mtimes'].import_bulk(
            [{'path': k, 'mtime': v, '_key': k.replace('/', '_')} for k, v in
             self.changed_or_new.items()], on_duplicate="replace")


def update_data(repo: Repo, repo_addr: str):
    """Updates given git repo.

    Args:
        repo: Git data repo.
        repo_addr: url address of the repo
    """
    logging.info(f'Updating repo in {repo.working_dir}')
    if 'origin' not in [r.name for r in repo.remotes]:
        repo.create_remote('origin', repo_addr)
    repo.remotes.origin.fetch('+refs/heads/*:refs/remotes/origin/*')
    repo.remotes.origin.pull()


def get_data(repo_dir: Path, repo_addr: str) -> Repo:
    """Clones git data repo to repo_dir

    Args:
        repo_dir: Path to data dir.
        repo_addr: repo url.

    Returns:
        Cloned repo.
    """
    logging.info(f'Cloning the repo: {repo_addr}')
    return Repo.clone_from(repo_addr, repo_dir)


def collect_data(repo_dir: Path, repo_addr: str):
    """Ensure data is in data dir and update it if needed and if it's git repo.

    Args:
        repo_dir: Path to data directory.
    """
    if not repo_dir.exists():
        get_data(repo_dir, repo_addr)
    else:
        try:
            repo = Repo(repo_dir)
        except InvalidGitRepositoryError:
            pass
        else:
            update_data(repo, repo_addr)


def process_root_languages(structure_dir):
    file = structure_dir / 'language.json'
    with file.open('r', encoding='utf-8') as f:
        languages = json.load(f)
    data = {}
    for lang in languages:
        uid = lang['uid']
        if 'contains' in lang:
            data.update({sutta_id: uid for sutta_id in lang['contains']})
    return data


def process_root_files(docs, edges, mapping, root_files, root_languages, structure_dir):
    with open(structure_dir / 'sutta.json', 'r') as f:
        sutta_file = json.load(f)

    sutta_data = {}
    for sutta in sutta_file:
        uid = sutta.pop('uid')
        sutta_data[uid] = {'acronym': sutta['acronym'], 'biblio_uid': sutta['biblio_uid']}

    reg = regex.compile(r'^\D+')
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
            base_uid = reg.match(uid)[0]
            while base_uid:
                try:
                    entry['root_lang'] = root_languages[base_uid]
                    break
                except KeyError:
                    base_uid = '-'.join(base_uid.split('-')[:-1])

            del entry['_path']
            entry['num'] = i  # number is used for ordering, it is not otherwise meaningful
            try:
                entry['acronym'] = sutta_data[uid]['acronym']
            except KeyError:
                pass
            try:
                entry['biblio_uid'] = sutta_data[uid]['biblio_uid']
            except KeyError:
                pass

            docs.append(entry)

            # find the parent
            parent = mapping.get(path.parent)
            edge_type = entry.get('type', 'text')
            if parent:
                edges.append({'_from': 'root/' + parent['_key'], '_to': 'root/' + entry['_key'],
                              'type': edge_type})


def process_category_files(category_files, db, edges, mapping):
    for category_file in category_files:
        category_name = category_file.stem
        if category_name in ['sutta']:
            continue
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
                    if child is None:
                        continue
                    child[entry['type']] = entry['uid']
                    edges.append({
                        '_from': f'{category_name}/{entry["_key"]}',
                        '_to': f'root/{child["_key"]}',
                        'type': edge_type
                    })
                del entry['contains']

            if edge_type == 'pitaka':
                for group in entry['grouping']:
                    edges.append({
                        '_from': f'pitaka/{entry["_key"]}',
                        '_to': f'grouping/{group}',
                        'type': edge_type
                    })
                del entry['grouping']

            category_docs.append(entry)
        collection.truncate()
        collection.import_bulk(category_docs)

    # add root language uid to everything.
    db.aql.execute('''
    FOR lang IN language
        FOR sutta IN 1..10 OUTBOUND lang root_edges
            UPDATE sutta WITH {
                "lang": lang.uid
            } IN root
    ''')


def add_root_docs_and_edges(change_tracker, db, structure_dir):
    docs = []
    edges = []
    mapping = {}
    root_files = sorted((structure_dir / 'division').glob('**/*.json'))
    category_files = sorted(structure_dir.glob('*.json'))

    root_languages = process_root_languages(structure_dir)

    if change_tracker.is_any_file_new_or_changed(root_files + category_files):
        # To handle deletions as easily as possible we completely rebuild
        # the root structure
        process_root_files(docs, edges, mapping, root_files, root_languages, structure_dir)

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

    if not change_tracker.is_any_file_new_or_changed(relationship_files):
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
    for entry in tqdm(relationship_data):
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
        for lang_dir in tqdm(html_dir.glob('*')):
            if not lang_dir.is_dir:
                continue
            tim.process_lang_dir(lang_dir=lang_dir, data_dir=data_dir,
                                 files_to_process=change_tracker.changed_or_new,
                                 force=False)


def load_json_file(db, change_tracker, json_file):
    if not change_tracker.is_file_new_or_changed(json_file):
        return
    collection_name = json_file.stem

    with json_file.open() as f:
        data = json.load(f)

    if 'uid' in data[0]:
        for d in data:
            d['_key'] = d['uid']
        db[collection_name].truncate()
        db[collection_name].import_bulk(data)


def process_blurbs(db, additional_info_dir):
    print('Loading blurbs')
    file = (additional_info_dir / 'blurbs.json')
    collection_name = 'blurbs'

    with file.open('r', encoding='utf-8') as f:
        blurb_info = json.load(f)

    docs = [{'uid': uid, 'lang': lang, 'blurb': blurb}
            for lang, groups in blurb_info.items() for suttas in groups.values() for uid, blurb in tqdm(suttas.items())]

    db.collection(collection_name).truncate()
    db.collection('blurbs').import_bulk(docs)


def process_difficulty(db, additional_info_dir):
    print('Loading difficulties')
    file = (additional_info_dir / 'difficulties.json')
    collection_name = 'difficulties'

    with file.open('r', encoding='utf-8') as f:
        difficulty_info = json.load(f)

    docs = [{'uid': uid, 'difficulty': lvl}
            for x in difficulty_info.values() for uid, lvl in tqdm(x.items())]

    db.collection(collection_name).truncate()
    db.collection('difficulties').import_bulk(docs)


def run():
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
    misc_dir = data_dir / 'misc'
    po_dir = data_dir / 'po_text'
    additional_info_dir = data_dir / 'additional-info'
    dictionaries_dir = data_dir / 'dictionaries'

    db_name = current_app.config.get('ARANGO_DB')
    db = conn.database(db_name)

    collect_data(data_dir, current_app.config.get('DATA_REPO'))
    collect_data(po_dir, current_app.config.get('PO_REPO'))

    change_tracker = ChangeTracker(data_dir, db)

    load_json_file(db, change_tracker, misc_dir / 'uid_expansion.json')

    add_root_docs_and_edges(change_tracker, db, structure_dir)

    generate_relationship_edges(change_tracker, relationship_dir, db)

    po.load_po_texts(change_tracker, po_dir, db)

    load_html_texts(change_tracker, data_dir, db, html_dir)

    process_blurbs(db, additional_info_dir)

    process_difficulty(db, additional_info_dir)

    dictionaries.load_dictionaries(db, dictionaries_dir)

    currencies.load_currencies(db, additional_info_dir)

    biblio.load_biblios(db, additional_info_dir)

    change_tracker.update_mtimes()
