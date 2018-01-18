import json
import regex
import logging
import pathlib

from collections import Counter, defaultdict
from itertools import product
from pathlib import Path
from typing import Any, List, Set
from arango import ArangoClient
from flask import current_app
from git import InvalidGitRepositoryError, Repo
from tqdm import tqdm

from .util import json_load
from .change_tracker import ChangeTracker
from . import biblio, currencies, dictionaries, dictionary_full, paragraphs, po, textdata, \
    divisions, images_files, homepage


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
    print(f'downloading {repo_addr}')
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
    language_file = structure_dir / 'language.json'
    languages = json_load(language_file)
    data = {}
    for lang in languages:
        uid = lang['uid']
        if 'contains' in lang:
            data.update({sutta_id: uid for sutta_id in lang['contains']})
    return data


def process_menu_ordering(structure_dir):
    raw_data = json_load(structure_dir / 'menu-structure.json')

    data = {}
    for level in raw_data:
        for i, sutta in enumerate(level):
            data[sutta] = i
    return data


def process_division_files(docs, name_docs, edges, mapping, division_files, root_languages,
                           structure_dir):
    sutta_file = json_load(structure_dir / 'sutta.json')

    sutta_data = {}
    for sutta in sutta_file:
        uid = sutta.pop('uid')
        sutta_data[uid] = {'acronym': sutta['acronym'], 'biblio_uid': sutta['biblio_uid'],
                           'volpage': sutta['volpage']}

    reg = regex.compile(r'^\D+')
    number_reg = regex.compile(r'.*?([0-9]+)$')

    uids_seen = defaultdict(list)
    # Sort the division folders to process subdirectories later
    division_files.sort(key=lambda path: len(path.parts))

    for division_file in division_files:
        entries = json_load(division_file)

        for i, entry in enumerate(entries):
            path = pathlib.PurePath(entry['_path'])
            mapping[path] = entry

            uid = path.parts[-1]
            uids_seen[uid].append(entry['_path'])
            entry['_key'] = uid
            entry['uid'] = uid

            base_uid = reg.match(uid)[0]

            lang = 'en'

            while base_uid:
                try:
                    entry['root_lang'] = root_languages[base_uid]
                    lang = root_languages[base_uid]
                    break
                except KeyError:
                    base_uid = '-'.join(base_uid.split('-')[:-1])

            if 'name' in entry:
                name_docs.append({'name': entry.pop('name'),
                                  'uid': uid,
                                  'lang': lang,
                                  'root': True,
                                  '_key': f'{uid}_{lang}'})

            del entry['_path']
            ordering_data = process_menu_ordering(structure_dir)
            try:
                entry['num'] = ordering_data[uid]
            except KeyError:
                if 'num' not in entry:
                    m = number_reg.match(uid)
                    if m:
                        num = m.group(1)
                        entry['num'] = int(num)
                    else:
                        entry['num'] = i

            for data_name in ['volpage', 'biblio_uid', 'acronym']:
                try:
                    entry[data_name] = sutta_data[uid][data_name]
                except KeyError:
                    pass
            docs.append(entry)

            # find the parent
            parent = mapping.get(path.parent)
            edge_type = entry.get('type', 'text')
            if parent:
                edges.append({'_from': 'root/' + parent['_key'], '_to': 'root/' + entry['_key'],
                              'type': edge_type})
    for uid, paths in uids_seen.items():
        if len(paths) == 1:
            continue
        logging.error(f'{uid} appears {len(paths)} times: {",".join(paths)}')


def process_category_files(category_files, db, edges, mapping):
    for category_file in category_files:
        category_name = category_file.stem
        if category_name not in ['grouping', 'language', 'pitaka', 'sect']:
            continue
        collection = db[category_name]
        category_docs = []

        entries = json_load(category_file)

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


def perform_update_queries(db):
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
    name_docs = []
    edges = []
    mapping = {}
    division_files = sorted((structure_dir / 'division').glob('**/*.json'))
    category_files = sorted(structure_dir.glob('*.json'))

    root_languages = process_root_languages(structure_dir)

    if change_tracker.is_any_file_new_or_changed(division_files + category_files):
        # To handle deletions as easily as possible we completely rebuild
        # the root structure
        process_division_files(docs, name_docs, edges, mapping, division_files, root_languages,
                               structure_dir)

        process_category_files(category_files, db, edges, mapping)

        for entry in docs:
            if entry.get('pitaka') == 'su':
                if 'grouping' not in entry:
                    entry['grouping'] = 'other'

        # make documents
        db['root'].truncate()
        db['root'].import_bulk(docs)
        db['root_names'].truncate()
        db['root_names'].import_bulk(name_docs)
        db['root_edges'].truncate()
        db['root_edges'].import_bulk(edges)

        perform_update_queries(db)


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

        >>> get_true_uids('dk12-dk13', {'dk12', 'dk13'})
        >>> ['dk12', 'dk13']
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

    # More complex: dk1-dk17 sn19.1-sn19.21
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


def generate_relationship_edges(change_tracker, relationship_dir, additional_info_dir, db):
    relationship_files = list(relationship_dir.glob('*.json'))

    if not change_tracker.is_any_file_new_or_changed(relationship_files):
        return

    print('Generating Parallels')
    relationship_data = []
    for relationship_file in relationship_files:
        relationship_data.extend(json_load(relationship_file))

    all_uids = set(db.aql.execute('''
    FOR doc IN root
        SORT doc.num
        RETURN doc.uid
    '''))

    remarks_data = json_load(additional_info_dir / 'notes.json')

    remarks = defaultdict(dict)

    for remark in remarks_data:
        uids = remark['relations']
        remark_text = remark['remark']
        remarks[frozenset(uids)] = remark_text

    antispam = set()
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
                    true_from_uids = get_true_uids(from_uid, all_uids)
                    if not true_from_uids:
                        print_once(f'Could not find any uids for: {from_uid}', antispam)
                        continue
                    for to_uids, is_resembling in ((full, False), (partial, True)):
                        for to_uid in to_uids:
                            if to_uid == from_uid:
                                continue
                            if not true_from_uids:
                                if is_resembling:
                                    print_once(f'Could not find any uids for: {to_uid}', antispam)
                                continue

                            true_to_uids = get_true_uids(to_uid, all_uids)
                            for true_from_uid in true_from_uids:
                                for true_to_uid in true_to_uids:
                                    remark = remarks.get(frozenset([true_from_uid, true_to_uid]),
                                                         None)
                                    ll_edges.append({
                                        '_from': true_from_uid,
                                        '_to': true_to_uid,
                                        'from': from_uid,
                                        'to': to_uid.lstrip('~'),
                                        'type': r_type,
                                        'resembling': is_resembling,
                                        'remark': remark
                                    })
            else:
                first_uid = uids[0]
                true_first_uids = get_true_uids(first_uid, all_uids)
                for true_first_uid, to_uid in product(true_first_uids, uids[1:]):
                    true_from_uids = get_true_uids(to_uid, all_uids)
                    for true_from_uid in true_from_uids:
                        remark = remarks.get(frozenset([true_from_uid, true_first_uid]), None)
                        ll_edges.append({
                            '_from': true_first_uid,
                            '_to': true_from_uid,
                            'from': first_uid.lstrip('~'),
                            'to': to_uid,
                            'type': r_type,
                            'resembling': any(x.startswith('~') for x in [first_uid, from_uid]),
                            'remark': remark
                        })
    db['relationship'].truncate()
    db['relationship'].import_bulk(ll_edges, from_prefix='root/', to_prefix='root/')


def load_html_texts(change_tracker, data_dir, db, html_dir, additional_info_dir):
    print('Loading HTML texts')
    # Load HTML texts
    languages = db.aql.execute('''/* return all language objects as a key: value mapping */
        RETURN MERGE(
            FOR l IN language
                RETURN {[l.uid] : l} /* Set the key as the uid */
        )''').next()

    author_file = additional_info_dir / 'author_edition.json'

    with author_file.open('r', encoding='utf-8') as authorf:
        authors = json.load(authorf)

    force = change_tracker.is_any_function_changed(
        [textdata.TextInfoModel, textdata.ArangoTextInfoModel])
    if force:
        print('This might take a while')
        db['html_text'].truncate()

    with textdata.ArangoTextInfoModel(db=db) as tim:
        for lang_dir in tqdm(html_dir.glob('*')):
            if not lang_dir.is_dir:
                continue
            tim.process_lang_dir(lang_dir=lang_dir, authors=authors, data_dir=data_dir,
                                 files_to_process=change_tracker.changed_or_new,
                                 force=force)


def load_json_file(db, change_tracker, json_file):
    if not change_tracker.is_file_new_or_changed(json_file):
        return
    collection_name = json_file.stem

    data = json_load(json_file)

    if 'uid' in data[0]:
        for d in data:
            d['_key'] = d['uid']
        db[collection_name].truncate()
        db[collection_name].import_bulk(data)


def process_blurbs(db, additional_info_dir):
    print('Loading blurbs')
    blurb_file = additional_info_dir / 'blurbs.json'
    collection_name = 'blurbs'

    blurb_info = json_load(blurb_file)

    docs = [{'uid': uid, 'lang': lang, 'blurb': blurb}
            for lang, groups in blurb_info.items() for suttas in groups.values() for uid, blurb in
            tqdm(suttas.items())]

    db.collection(collection_name).truncate()
    db.collection('blurbs').import_bulk(docs)


def process_difficulty(db, additional_info_dir):
    print('Loading difficulties')
    difficulty_file = additional_info_dir / 'difficulties.json'
    collection_name = 'difficulties'

    difficulty_info = json_load(difficulty_file)

    docs = [{'uid': uid, 'difficulty': lvl}
            for x in difficulty_info.values() for uid, lvl in tqdm(x.items())]

    db.collection(collection_name).truncate()
    db.collection('difficulties').import_bulk(docs)


def run(no_pull=False):
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

    if not no_pull:
        collect_data(data_dir, current_app.config.get('DATA_REPO'))
        collect_data(po_dir, current_app.config.get('PO_REPO'))

    images_files.load_images_links(db)

    change_tracker = ChangeTracker(data_dir, db)

    load_json_file(db, change_tracker, misc_dir / 'uid_expansion.json')

    add_root_docs_and_edges(change_tracker, db, structure_dir)

    po.load_po_texts(change_tracker, po_dir, db, additional_info_dir)

    generate_relationship_edges(change_tracker, relationship_dir, additional_info_dir, db)

    load_html_texts(change_tracker, data_dir, db, html_dir, additional_info_dir)

    process_blurbs(db, additional_info_dir)

    process_difficulty(db, additional_info_dir)

    dictionaries.load_dictionaries(db, dictionaries_dir)

    dictionary_full.load_dictionary_full(db, dictionaries_dir, change_tracker)

    currencies.load_currencies(db, additional_info_dir)

    paragraphs.load_paragraphs(db, additional_info_dir)

    biblio.load_biblios(db, additional_info_dir)

    divisions.load_divisions(db, structure_dir)

    homepage.load_epigraphs(db, additional_info_dir)

    homepage.load_why_we_read(db, additional_info_dir)

    change_tracker.update_mtimes()
