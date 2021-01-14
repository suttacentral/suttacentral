import json
import regex
import logging
import pathlib
import os

from collections import defaultdict
from itertools import product
from pathlib import Path
from typing import Any, Set, List, Dict

from arango.database import Database
from flask import current_app
from git import InvalidGitRepositoryError, Repo
from tqdm import tqdm

from common import arangodb
from common.queries import BUILD_YELLOW_BRICK_ROAD, COUNT_YELLOW_BRICK_ROAD
from common.utils import chunks
from common.uid_matcher import UidMatcher
from .util import json_load
from .change_tracker import ChangeTracker
from . import (
    biblio,
    currencies,
    dictionaries,
    paragraphs,
    po,
    textdata,
    divisions,
    images_files,
    homepage,
    localized_languages,
    order,
    sizes,
    segmented_data,
    sc_bilara_data,
)

from .generate_sitemap import generate_sitemap


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
            repo = Repo(str(repo_dir))
        except InvalidGitRepositoryError:
            pass
        else:
            update_data(repo, repo_addr)


def process_root_languages(language_file: Path) -> Dict[str, str]:
    languages: List[dict] = json_load(language_file)
    data = {}
    for language in languages:
        lang_iso = language['root_lang_iso']
        if 'contains' in language:
            data.update({uid: lang_iso for uid in language['contains']})
    return data


def process_extra_info_file(extra_info_file: Path) -> Dict[str, Dict[str, str]]:
    """
    Method to process super_extra_info.json and text_extra_info.json files

    Args:
        extra_info_file - path to the file
    """
    info = json_load(extra_info_file)
    data = {item['uid']: item for item in info}
    return data


def process_division_files(
    docs, name_docs, edges, mapping, division_files, root_languages, structure_dir
):
    sutta_file = json_load(structure_dir / 'text_extra_info.json')

    sutta_data = {}
    for sutta in sutta_file:
        uid = sutta.pop('uid')
        sutta_data[uid] = {
            'acronym': sutta['acronym'],
            'biblio_uid': sutta['biblio_uid'],
            'volpage': sutta['volpage'],
            'alt_name': sutta['alt_name'],
            'alt_acronym': sutta['alt_acronym'],
            'alt_volpage': sutta['alt_volpage'],
        }

    reg = regex.compile(r'^\D+')
    number_reg = regex.compile(r'.*?([0-9]+)$')

    uids_seen = defaultdict(list)
    # Sort the division folders to process subdirectories later
    division_files.sort(key=lambda path: len(path.parts))

    for division_file in division_files:
        entries = json_load(division_file)

        for i, entry in enumerate(entries):
            path = pathlib.PurePath(entry['_path'])
            uid = path.name
            entry['_key'] = uid
            entry['uid'] = uid

            is_link = entry.get('type') == 'link'
            if not is_link:
                mapping[uid] = entry
                uids_seen[uid].append(entry['_path'])
                base_uid = reg.match(uid)[0]
                lang = 'en'
                while base_uid:
                    try:
                        if base_uid == 't':
                            entry['root_lang'] = 'lzh'
                            lang = 'lzh'
                        else:
                            entry['root_lang'] = root_languages[base_uid]
                            lang = root_languages[base_uid]
                        break
                    except KeyError:
                        base_uid = '-'.join(base_uid.split('-')[:-1])

                if 'name' in entry:
                    name_docs.append(
                        {
                            'name': entry['name'],
                            'uid': uid,
                            'lang': lang,
                            'root': True,
                            '_key': f'{uid}_{lang}',
                        }
                    )

                del entry['_path']
                if 'num' not in entry:
                    entry['num'] = i

                for data_name in ['volpage', 'biblio_uid', 'acronym', 'alt_name', 'alt_acronym', 'alt_volpage']:
                    try:
                        entry[data_name] = sutta_data[uid][data_name]
                    except KeyError:
                        pass
                docs.append(entry)

            # find the parent
            parent = mapping.get(path.parent.name)
            edge_type = entry.get('type', 'text')
            if parent:
                edges.append(
                    {
                        '_from': 'root/' + parent['_key'],
                        '_to': 'root/' + entry['_key'],
                        'type': edge_type,
                    }
                )
    for uid, paths in uids_seen.items():
        if len(paths) == 1:
            continue
        logging.error(f'{uid} appears {len(paths)} times: {",".join(paths)}')

    docs.append({'uid': 'orphan', '_key': 'orphan'})


def process_names_files(
        names_files: List[Path],
        root_languages: Dict[str, str],
        super_extra_info:  Dict[str, Dict[str, str]],
        text_extra_info:  Dict[str, Dict[str, str]]
) -> List[dict]:
    """
    Method for processing name files from sc-data/structure/name

    Args:
        names_files - list of name Path objects to files from name folder
        root_languages - parsed data from language.json
        super_extra_info - parsed data from super_extra_info.json
        text_extra_info - parsed data from text_extra_info.json

    Returns:
        list of processed data
    """
    docs = []
    names_files.sort(key=lambda path: len(path.parts))
    for name_file in names_files:
        entries: Dict[str, str] = json_load(name_file)
        for uid, name in entries.items():
            if type(name) != str:
                continue
            extra_info = super_extra_info if uid in super_extra_info else text_extra_info
            entry = {
                'uid': uid,
                '_key': uid,
                'name': name,
                'root_lang': root_languages.get(uid, None),
                'volpage': extra_info.get(uid, {}).get('volpage', None),
                'biblio_uid': extra_info.get(uid, {}).get('biblio_uid', None),
                'acronym': extra_info.get(uid, {}).get('acronym', None)
            }

            docs.append(entry)
    return docs


def parse_tree_recursive(element: Dict[str, list]) -> List[Dict[str, str]]:
    """
    Method to parse a subtree from tree files and super-tree.json file

    Args:
        element - dict with one key as uid and list of elements with the
            same structure as value
    """
    edges = []
    for name, content in element.items():
        for item in content:
            if type(item) == dict:
                edges.extend(
                    [{'_from': name, '_to': subgroup_name} for subgroup_name in item.keys()]
                )
                edges.extend(parse_tree_recursive(item))
            else:
                edges.append({
                    '_from': name,
                    '_to': item,
                })
    return edges


def process_super_tree_file(super_tree_file: Path) -> List[Dict[str, str]]:
    """
    Method for super-tree.json file processing

    Args:
        super_tree_file - path to the super-tree.json file
    """
    content: List[Dict[str, list]] = json_load(super_tree_file)
    data = []
    for division in content:
        data.extend(parse_tree_recursive(division))
    return data


def process_tree_files(tree_files: List[Path]) -> List[Dict[str, str]]:
    """
    Method for processing tree files from tree sc-data/structure/tree folder

    Args:
        tree_files - list of Paths to the tree files
    """
    edges = []
    for tree_file in tree_files:
        content = json_load(tree_file)
        edges.extend(
            parse_tree_recursive(content)
        )
    return edges


def process_category_files(category_files, db, edges, mapping):
    division_ordering = []
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
                if category_name == 'pitaka':
                    division_ordering.extend(entry['contains'])
                for uid in entry['contains']:
                    child = mapping.get(uid)
                    if child is None:
                        logging.error(
                            f'Division defined in {category_name} not found: {uid}'
                        )
                        continue
                    child[entry['type']] = entry['uid']
                    edges.append(
                        {
                            '_from': f'{category_name}/{entry["_key"]}',
                            '_to': f'root/{child["_key"]}',
                            'type': edge_type,
                        }
                    )
                del entry['contains']

            category_docs.append(entry)
        collection.import_bulk_logged(category_docs, wipe=True)

    for i, uid in enumerate(division_ordering):
        try:
            mapping[uid]['num'] = i
        except KeyError:
            # We should've already reported an error earlier
            continue


def perform_update_queries(db):
    # add root language uid to everything.
    db.aql.execute(
        '''
    FOR lang IN language
        FOR sutta IN 1..10 OUTBOUND lang root_edges
            UPDATE sutta WITH {
                "root_lang": lang.uid
            } IN root
    '''
    )


def add_root_docs_and_edges(change_tracker, db, structure_dir):
    docs = []
    name_docs = []
    edges = []
    mapping = {}

    tree_dir = structure_dir / 'tree'

    division_files = sorted((structure_dir / 'division').glob('**/*.json'))
    names_files = sorted((structure_dir / 'name').glob('**/*.json'))
    tree_files = sorted(tree_dir.glob('**/*.json'))
    category_files = sorted(structure_dir.glob('*.json'))

    super_tree_file = tree_dir / 'super-tree.json'
    tree_files.remove(super_tree_file)

    root_languages = process_root_languages(structure_dir / 'super_root_lang.json')
    super_extra_info = process_extra_info_file(structure_dir / 'super_extra_info.json')
    text_extra_info = process_extra_info_file(structure_dir / 'text_extra_info.json')

    if change_tracker.is_any_file_new_or_changed(
        division_files + category_files
    ) or change_tracker.is_any_function_changed(
        [process_division_files, process_category_files, perform_update_queries,
         process_super_tree_file, process_tree_files, process_names_files, parse_tree_recursive]
    ):
        nav_details_docs = process_names_files(
            names_files,
            root_languages,
            super_extra_info,
            text_extra_info
        )

        super_tree_edges = process_super_tree_file(super_tree_file)
        nav_details_edges = process_tree_files(tree_files)
        nav_details_edges.extend(super_tree_edges)

        # To handle deletions as easily as possible we completely rebuild
        # the root structure
        process_division_files(
            docs,
            name_docs,
            edges,
            mapping,
            division_files,
            root_languages,
            structure_dir,
        )

        process_category_files(category_files, db, edges, mapping)

        for entry in docs:
            if entry.get('pitaka') == 'su':
                if 'grouping' not in entry:
                    entry['grouping'] = 'other'

        # make documents
        db['root'].import_bulk_logged(docs, wipe=True)
        db['root_names'].import_bulk_logged(name_docs, wipe=True)
        db['root_edges'].import_bulk_logged(edges, wipe=True)

        # new data loading
        db['super_nav_details'].truncate()
        db['super_nav_details_edges'].truncate()
        db['super_nav_details'].import_bulk(nav_details_docs)
        db['super_nav_details_edges'].import_bulk(
            nav_details_edges,
            from_prefix='super_nav_details',
            to_prefix='super_nav_details',
        )

        perform_update_queries(db)


def load_child_range(db: Database, structure_dir: Path) -> None:
    """
    Load child range data from structure_dir/child_range.json file
    Data are loaded into the child_range collection in ArangoDB

    Args:
        db - ArangoDB instance
        structure_dir - path to the structure dir
    """
    child_range_content: Dict[str, str] = json_load(structure_dir / 'child_range.json')
    data = [{
        '_key': uid,
        'uid': uid,
        'range': nav_range
    } for uid, nav_range in child_range_content.items()]
    db['child_range'].import_bulk(data, overwrite=True)


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


def get_uid_matcher(db):
    all_uids = set(
        db.aql.execute(
            '''
    FOR doc IN root
        SORT doc.num
        RETURN doc.uid
    '''
        )
    )

    return UidMatcher(all_uids)


def generate_relationship_edges(
    change_tracker, relationship_dir, additional_info_dir, db
):
    relationship_files = list(relationship_dir.glob('*.json'))

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
                                logging.error(
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
                                            'to': to_uid.lstrip('~'),
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
        db['relationship'].import_bulk_logged(chunk, from_prefix='root/', to_prefix='root/')


def load_author_edition(change_tracker, additional_info_dir, db):
    author_file = additional_info_dir / 'author_edition.json'
    if change_tracker.is_file_new_or_changed(author_file):
        with author_file.open('r', encoding='utf-8') as authorf:
            authors = json.load(authorf)
        db['author_edition'].import_bulk_logged(authors, wipe=True)


def load_html_texts(change_tracker, data_dir, db, html_dir, additional_info_dir):
    print('Loading HTML texts')

    force = change_tracker.is_any_function_changed(
        [textdata.TextInfoModel, textdata.ArangoTextInfoModel]
    )
    if force:
        print('This might take a while')
        db['html_text'].truncate()

    with textdata.ArangoTextInfoModel(db=db) as tim:
        for lang_dir in tqdm(html_dir.glob('*')):
            if not lang_dir.is_dir:
                continue
            tim.process_lang_dir(
                lang_dir=lang_dir,
                data_dir=data_dir,
                files_to_process=change_tracker.changed_or_new,
                force=force,
            )


def load_json_file(db, change_tracker, json_file):
    if not change_tracker.is_file_new_or_changed(json_file):
        return
    collection_name = json_file.stem

    data = json_load(json_file)

    if 'uid' in data[0]:
        for d in data:
            d['_key'] = d['uid']
        db[collection_name].import_bulk_logged(data, wipe=True)


def process_difficulty(db, additional_info_dir):
    print('Loading difficulties')
    difficulty_file = additional_info_dir / 'difficulties.json'

    difficulty_info = json_load(difficulty_file)

    docs = [
        {'uid': uid, 'difficulty': lvl}
        for x in difficulty_info.values()
        for uid, lvl in tqdm(x.items())
    ]

    db.collection('difficulties').import_bulk_logged(docs, wipe=True)


def make_yellow_brick_road(db: Database):
    db.collection('yellow_brick_road').truncate()
    db.aql.execute(BUILD_YELLOW_BRICK_ROAD)
    db.aql.execute(COUNT_YELLOW_BRICK_ROAD)


def run(no_pull=False):
    """Runs data load.

    It will take data from sc-data repository and populate the database with it.

    Args:
        force: Whether or not force clean db setup.
    """

    data_dir = current_app.config.get('BASE_DIR') / 'sc-data'
    segmented_data_dir = data_dir / 'segmented_data'
    html_dir = data_dir / 'html_text'
    structure_dir = data_dir / 'structure'
    relationship_dir = data_dir / 'relationship'
    misc_dir = data_dir / 'misc'
    po_dir = data_dir / 'po_text'
    additional_info_dir = data_dir / 'additional-info'
    dictionaries_dir = data_dir / 'dictionaries'
    sizes_dir = current_app.config.get('BASE_DIR') / 'server' / 'tools'
    sc_bilara_data_dir = data_dir / 'sc_bilara_data'

    storage_dir = current_app.config.get('STORAGE_DIR')
    if not storage_dir.exists():
        storage_dir.mkdir()
    db = arangodb.get_db()

    _stage = 1
    def print_stage(msg):
        nonlocal _stage
        print(f'\n   {_stage}: {msg}')
        _stage += 1

    if not no_pull:
        print_stage("Retrieving Data Repository")
        collect_data(data_dir, current_app.config.get('DATA_REPO'))

    print_stage("Loading images")
    images_files.load_images_links(db)

    print_stage("Loading ChangeTracker")
    change_tracker = ChangeTracker(data_dir, db)

    print_stage("Loading uid_expansion.json")
    load_json_file(db, change_tracker, misc_dir / 'uid_expansion.json')

    print_stage("Loading author_edition.json")
    load_author_edition(change_tracker, additional_info_dir, db)

    print_stage("Building and loading navigation from structure_dir")
    add_root_docs_and_edges(change_tracker, db, structure_dir)

    print_stage("Loading child ranges from structure_dir")
    load_child_range(db, structure_dir)

    print_stage("Loading localization")
    localized_languages.update_languages(
        db, current_app.config.get('ASSETS_DIR') / 'localization/elements'
    )

    print_stage('Loading Segmented Data')
    segmented_data.load_segmented_data(db, change_tracker, segmented_data_dir)
                      
    print_stage("Loading po_text")
    po.load_po_texts(change_tracker, po_dir, db, additional_info_dir, storage_dir)

    print_stage('Load names from sc_bilara_data')
    sc_bilara_data.load_names(db, sc_bilara_data_dir)

    print_stage('Load blurbs from sc_bilara_data')
    sc_bilara_data.load_blurbs(db, sc_bilara_data_dir)

    print_stage('Load publications from sc_bilara_data')
    sc_bilara_data.load_publications(db, sc_bilara_data_dir)

    print_stage('Load texts from sc_bilara_data')
    sc_bilara_data.load_texts(db, sc_bilara_data_dir)

    print_stage("Generating and loading relationships")
    generate_relationship_edges(
        change_tracker, relationship_dir, additional_info_dir, db
    )

    print_stage("Loading html_text")
    load_html_texts(change_tracker, data_dir, db, html_dir, additional_info_dir)

    print_stage('Make yellow brick road')
    make_yellow_brick_road(db)

    print_stage("Loading difficulty from additional_info")
    process_difficulty(db, additional_info_dir)

    print_stage('Loading simple dictionaries')
    dictionaries.load_simple_dictionaries(db, dictionaries_dir)

    print_stage('Loading complex dictionaries')
    dictionaries.load_complex_dictionaries(db, dictionaries_dir)

    print_stage("Loading currencies from additional_info")
    currencies.load_currencies(db, additional_info_dir)

    print_stage("Loading paragraphs from additional_info")
    paragraphs.load_paragraphs(db, additional_info_dir)

    print_stage("Loading biblio from additional_info")
    biblio.load_biblios(db, additional_info_dir)

    print_stage("Loading division data")
    divisions.load_divisions(db, structure_dir)

    print_stage("Loading epigraphs from additional_info")
    homepage.load_epigraphs(db, additional_info_dir)

    print_stage("Loading why_we_read from additional_info")
    homepage.load_why_we_read(db, additional_info_dir)

    print_stage("Generating sitemap")
    sitemap = generate_sitemap(db)
    for folder in pathlib.Path('/opt/sc/frontend/builds').glob('*'):
        if folder.is_dir():
            (folder / 'sitemap.xml').open('w').write(sitemap)

    print_stage("Generating and loading ordering information")
    order.add_next_prev_using_menu_data(db)

    print_stage("Calculating and loading size data")
    sizes.load_sizes(sizes_dir, db)

    print_stage("Updating mtimes")
    change_tracker.update_mtimes()

    print_stage('All done')


def bilara_run():
    print("Loading bilara data")
    data_dir = current_app.config.get('BASE_DIR') / 'sc-data' / 'bilara-data'
    if not os.path.exists(data_dir):
        print("Bilara data directory does not exist.")
        return

