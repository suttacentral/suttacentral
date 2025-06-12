import json
import logging
import pathlib
from collections import defaultdict
from itertools import product
from pathlib import Path
from typing import Dict
import subprocess

import regex
from arango.database import Database
from flask import current_app
from tqdm import tqdm

from common import arangodb
from common.queries import (
    BUILD_YELLOW_BRICK_ROAD,
    COUNT_YELLOW_BRICK_ROAD,
    BILARA_REFERENCES,
    UPDATE_TEXT_EXTRA_INFO_VOLPAGE,
    UPDATE_TEXT_EXTRA_INFO_ALT_VOLPAGE,
    UPSERT_NAMES,
    ACRONYM_IS_NULL_UIDS,
    SUTTA_PATH,
    UPSERT_TEXT_EXTRA_ACRONYM_INFO,
    UPDATE_SUPER_NAV_DETAILS_ACRONYM_INFO,
    SINGLE_ROOT_TEXT,
    UPSERT_ROOT_NAMES,
    INSERT_EBS_NAMES,
    RANGE_UIDS
)
from common.uid_matcher import UidMatcher
from common.utils import chunks
from . import (
    biblio,
    currencies,
    dictionaries,
    paragraphs,
    textdata,
    homepage,
    languages,
    order,
    sizes,
    sc_bilara_data,
    navigation,
    hyphenation,
    copy_localization,
)
from .change_tracker import ChangeTracker
from .generate_sitemap import generate_sitemap
from .observability import StagePrinter
from .util import json_load
import re
from data_loader.extra_info import process_extra_info_file

def collect_data(repo_dir: Path, repo_addr: str):
    """Ensure data is in data dir and update it if needed and if it's git repo.

    Args:
        repo_dir: Path to data directory.
    """
    print(f'downloading {repo_addr}')
    if not (repo_dir / '.git').exists():
        subprocess.run(['git', 'clone', '--depth', '1', '--branch', 'main', repo_addr, './'], cwd=repo_dir)
    else:
        subprocess.run(['git', 'reset', '--hard'], cwd=repo_dir)
        subprocess.run(['git', 'pull'], cwd=repo_dir)



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


def get_uid_matcher(db):
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


def load_author_edition(change_tracker, additional_info_dir, db):
    author_file = additional_info_dir / 'author_edition.json'
    if change_tracker.is_file_new_or_changed(author_file):
        with author_file.open('r', encoding='utf-8') as authorf:
            authors = json.load(authorf)
        db['author_edition'].import_bulk_logged(authors, wipe=True)


def load_available_voices(change_tracker, additional_info_dir, db):
    voices_file = additional_info_dir / 'available_voices.json'
    voices_info = json_load(voices_file)
    docs = [{'uid': key, 'voices': value} for key, value in voices_info.items()]
    db['available_voices'].truncate()
    db.collection('available_voices').import_bulk_logged(docs, wipe=True)


def load_map_data(additional_info_dir, db):
    map_file = additional_info_dir / 'map_data.json'
    map_data = json_load(map_file)
    map_doc = [
        {'type': map_data['type'], 'features': map_data['features']}
    ]
    db['map_data'].truncate()
    db.collection('map_data').import_bulk_logged(map_doc, wipe=True)


def load_html_texts(change_tracker: ChangeTracker, data_dir: Path, db: Database, html_dir: Path):
    print('Loading HTML texts')
    with textdata.ArangoTextInfoModel(db=db) as tim:
        for lang_dir in tqdm(html_dir.glob('*')):
            if not lang_dir.is_dir:
                continue
            tim.process_lang_dir(lang_dir=lang_dir, data_dir=data_dir, files_to_process=change_tracker.changed_or_new)


def load_json_file(db, change_tracker, json_file):
    if not change_tracker.is_file_new_or_changed(json_file):
        return
    collection_name = json_file.stem

    data = json_load(json_file)

    if 'uid' in data[0]:
        for d in data:
            d['_key'] = d['uid']
        db[collection_name].truncate()
        db[collection_name].import_bulk_logged(data)


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


def process_prioritize(db, additional_info_dir):
    print('Loading prioritize')
    prioritize_file = additional_info_dir / 'prioritize.json'
    prioritize_info = json_load(prioritize_file)
    db['prioritize'].truncate()
    db.collection('prioritize').import_bulk_logged(prioritize_info, wipe=True)


def process_creator_bio(db, additional_info_dir):
    print('Loading creator bio')
    creator_bio_file = additional_info_dir / 'creator_bio.json'
    creator_bio_info = json_load(creator_bio_file)
    db['creator_bio'].truncate()
    db.collection('creator_bio').import_bulk_logged(creator_bio_info, wipe=True)


def make_yellow_brick_road(db: Database):
    db.collection('yellow_brick_road').truncate()
    db.aql.execute(BUILD_YELLOW_BRICK_ROAD)
    db.aql.execute(COUNT_YELLOW_BRICK_ROAD)


def load_guides_file(db: Database, guides_file: Path):
    guides_content = json_load(guides_file)
    db['guides'].truncate()
    db.collection('guides').import_bulk(guides_content)


def load_pali_reference_edition_file(db: Database, pali_reference_edition_file: Path):
    pali_reference_content = json_load(pali_reference_edition_file)
    db['pali_reference_edition'].truncate()
    db.collection('pali_reference_edition').import_bulk(pali_reference_content)


def load_root_edition_file(db: Database, root_edition_file: Path):
    root_edition_content = json_load(root_edition_file)
    db['root_edition'].truncate()
    db.collection('root_edition').import_bulk(root_edition_content)


def load_text_extra_info_file(db: Database, text_extra_info_file: Path):
    text_extra_info_content = json_load(text_extra_info_file)
    db['text_extra_info'].truncate()
    db.collection('text_extra_info').import_bulk(text_extra_info_content)


def load_shortcuts_file(db: Database, shortcuts_file: Path):
    shortcuts: Dict[str, dict] = json_load(shortcuts_file)
    docs = [{'uid': key, 'shortcuts': value, } for key, value in shortcuts.items()]
    db.collection('shortcuts').import_bulk(docs)


def load_fallen_leaves_files(db: Database, fallen_leaves_file_dir: Path):
    fallen_leaves = []
    for fallen_leaves_file in fallen_leaves_file_dir.glob('*.json'):
        leaves: Dict[str, dict] = json_load(fallen_leaves_file)
        docs = [{'uid': key, 'fallen_leaves': value, } for key, value in leaves.items()]
        fallen_leaves.extend(docs)
    db['fallen_leaves'].truncate()
    db.collection('fallen_leaves').import_bulk(fallen_leaves)


def update_text_extra_info():
    """Format volpage and alt_volpage and upsert to ArangoDB
    """
    db = arangodb.get_db()
    bilara_references = list(db.aql.execute(BILARA_REFERENCES))
    for reference in tqdm(bilara_references):
        refs = json_load(reference['file_path'])
        pts_refs_1st = []
        pts_refs_2nd = []
        for uid, ref in refs.items():
            refs = get_pts_ref(ref)
            for pts_ref in refs:
                if pts_ref.find('pts-vp-pli2ed') != -1:
                    pts_refs_2nd.append(
                        pts_ref.replace('pts-vp-pli2ed', 'PTS (2nd ed) ')
                    )
                    continue
                elif pts_ref.find('pts-vp-pli1ed') != -1:
                    pts_refs_1st.append(
                        pts_ref.replace('pts-vp-pli1ed', 'PTS (1st ed) ')
                    )
                    continue
                elif pts_ref.find('pts-vp-pli') != -1:
                    pts_refs_1st.append(pts_ref.replace('pts-vp-pli', 'PTS '))
        if pts_refs_1st:
            db.aql.execute(
                UPDATE_TEXT_EXTRA_INFO_VOLPAGE,
                bind_vars={
                    'uid': reference['uid'],
                    'ref': ','.join(pts_refs_1st)
                }
            )
        if pts_refs_2nd:
            db.aql.execute(
                UPDATE_TEXT_EXTRA_INFO_ALT_VOLPAGE,
                bind_vars={
                    'uid': reference['uid'],
                    'ref': ','.join(pts_refs_2nd)
                }
            )


def upsert_text_acronym(structure_dir):
    """Generate acronym from super_extra_info and upsert to ArangoDB

    Args:
        structure_dir: Path to structure data directory.
    """
    db = arangodb.get_db()
    uids = list(db.aql.execute(ACRONYM_IS_NULL_UIDS))
    file_path = structure_dir / 'super_extra_info.json'
    super_extra_info = process_extra_info_file(file_path)
    for uid in tqdm(uids):
        params = {'uid': uid}
        sutta_full_path = db.aql.execute(SUTTA_PATH, bind_vars=params).next()
        for path in reversed(sutta_full_path['full_path'].split('/')):
            sutta_superior_path = super_extra_info.get(path)
            if sutta_superior_path is not None:
                acronym = ''
                if re.match(r'.*-\d+$', uid):
                    replacement = sutta_superior_path['acronym'] + ' '
                    acronym_with_path_replaced = uid.replace(path, replacement)
                    acronym = acronym_with_path_replaced.replace('-', '–')
                    if acronym.find(
                        sutta_superior_path['acronym'] + ' –'
                    ) != -1:
                        old = sutta_superior_path['acronym'] + ' –'
                        new = sutta_superior_path['acronym'] + ' '
                        acronym = acronym.replace(old, new)
                        # Add space between Numbers and Alphabets in String
                        acronym = re.sub(
                            "[A-Za-z]+",
                            lambda ele: f" {ele[0]} ",
                            acronym
                        )
                        acronym = str(acronym).title().replace("   ", " ")
                else:
                    first_part_index = uid.find(f'{path}-')
                    if first_part_index != -1:
                        sutta_name_subsection = uid.replace(
                            f'{path}-',
                            ''
                        ).capitalize()
                        # Add spaces before numbers
                        pattern = r"([0-9]+(\.[0-9]+)?)"
                        replacement = r" \1 "
                        sutta_name_subsection = re.sub(
                            pattern,
                            replacement,
                            sutta_name_subsection
                        ).strip()
                        acronym = (
                            sutta_superior_path['acronym']
                            + ' '
                            + sutta_name_subsection
                        )
                    else:
                        acronym = uid.replace(
                            path,
                            sutta_superior_path['acronym'] + ' '
                        )
                if acronym != '':
                    bind_vars = {'uid': uid, 'acronym': acronym}
                    db.aql.execute(
                        UPSERT_TEXT_EXTRA_ACRONYM_INFO,
                        bind_vars=bind_vars
                    )
                    db.aql.execute(
                        UPDATE_SUPER_NAV_DETAILS_ACRONYM_INFO,
                        bind_vars=bind_vars
                    )
                break


def get_pts_ref(ref):
    arr = ref.split(',')
    return [ref for ref in arr if ref.find('pts-vp-pli') != -1]


def update_translated_title():
    """Format translated title and upsert to ArangoDB
    """
    db = arangodb.get_db()
    translations = list(
        db.aql.execute(
            "FOR trans IN sc_bilara_texts "
            "FILTER 'translation' IN trans.muids "
            "RETURN trans"
        )
    )
    title_index = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for translation in tqdm(translations):
        trans = json_load(translation['file_path'])
        title = ''
        for i in reversed(title_index):
            title = trans.get(translation['uid'] + ':0.' + str(i))
            if title is None and translation['uid'].find('-') != -1:
                title = trans.get(translation['uid'].split('-')[0] + ':0.' + str(i))
            if title is not None:
                break

        if (
            title is not None
            and title.find('.') != -1
            and len(title.split('.')) == 2
            and title.find('Etc.') == -1
        ):
            title = title.split('.')[1].strip()

        db.aql.execute(
            UPSERT_NAMES,
            bind_vars={
                'uid': translation['uid'],
                'lang': translation['lang'],
                'name': title
            }
        )


def update_root_title():
    """Format root title and upsert to ArangoDB
    """
    db = arangodb.get_db()
    root_title_is_null_uids = list(
        db.aql.execute(
            "FOR u IN super_nav_details "
            "FILTER u.root_lang == 'pli' AND u.name == '' "
            "RETURN u.uid"
        )
    )
    for uid in tqdm(root_title_is_null_uids):
        root = db.aql.execute(SINGLE_ROOT_TEXT, bind_vars={'uid': uid}).next()
        if root is not None:
            root_text = json_load(root['file_path'])
            title = ''
            title_index = [1, 2, 3, 4, 5, 6, 7, 8, 9]
            for i in reversed(title_index):
                title = root_text.get(f'{uid}:0.{str(i)}')
                if title is None and uid.find('-') != -1:
                    title = root_text.get(uid.split('-')[0] + ':0.' + str(i))
                if title is not None:
                    break
            db.aql.execute(
                UPSERT_ROOT_NAMES,
                bind_vars={'uid': uid, 'name': title}
            )


def load_ebs_names():
    db = arangodb.get_db()
    db['ebs_names'].truncate()
    db.aql.execute(INSERT_EBS_NAMES)


def generate_sutta_uid_list_from_range_sutta_uid():
    db = arangodb.get_db()
    db['expanded_sutta_uids'].truncate()
    range_uid_list = list(db.aql.execute(RANGE_UIDS))

    dot_list = []
    dhp_list = []
    vb_list = []
    for uid in range_uid_list:
        if '.' in uid:
            dot_list.append(uid)
        elif 'dhp' in uid:
            dhp_list.append(uid)
        elif '-vb-' in uid:
            vb_list.append(uid)

    for uid in dot_list:
        uid_prefix, uid_suffix = uid.split('-')
        uid_prefix_prefix, uid_prefix_suffix = uid_prefix.split('.')
        uid_list = [
            f'{uid_prefix_prefix}.{i}'
            for i in range(int(uid_prefix_suffix), int(uid_suffix) + 1)
        ]
        db['expanded_sutta_uids'].insert({'range_uid': uid, 'expanded_uids': uid_list})

    for uid in dhp_list:
        match = re.search(r'\d+-\d+', uid)
        prefix = uid[:match.start()]
        range_part = uid[match.start():]
        start, end = map(int, range_part.split('-'))
        uid_list = [f'{prefix}{i}' for i in range(start, end + 1)]
        db['expanded_sutta_uids'].insert({'range_uid': uid, 'expanded_uids': uid_list})

    pli_tv_bu_vb_as_list = generate_uids("pli-tv-bu-vb-as", 1, 7)
    pli_tv_bi_vb_pj_list = generate_uids("pli-tv-bi-vb-pj", 1, 4)
    pli_tv_bi_vb_pc_list = generate_uids("pli-tv-bi-vb-pc", 91, 93)
    pli_tv_bi_vb_pd_list = generate_uids("pli-tv-bi-vb-pd", 2, 8)
    pli_tv_bi_vb_as_list = generate_uids("pli-tv-bi-vb-as", 1, 7)

    insert_uids(db, 'pli-tv-bu-vb-as1-7', pli_tv_bu_vb_as_list)
    insert_uids(db, 'pli-tv-bi-vb-pj1-4', pli_tv_bi_vb_pj_list)
    insert_uids(db, 'pli-tv-bi-vb-pc91-93', pli_tv_bi_vb_pc_list)
    insert_uids(db, 'pli-tv-bi-vb-pd2-8', pli_tv_bi_vb_pd_list)
    insert_uids(db, 'pli-tv-bi-vb-as1-7', pli_tv_bi_vb_as_list)


def generate_uids(prefix, start, end):
    return [f"{prefix}{i}" for i in range(start, end + 1)]


def insert_uids(db, range_uid, uids):
    db['expanded_sutta_uids'].insert({'range_uid': range_uid, 'expanded_uids': uids})


def run(no_pull: bool = False) -> StagePrinter:
    """Runs data load.

    It will take data from sc-data repository and populate the database with it.

    Args:
        no_pull: Whether force clean db setup.
        printer: Prints information for each stage.
    """

    data_dir = current_app.config.get('BASE_DIR') / 'sc-data'
    html_dir = data_dir / 'html_text'
    structure_dir = data_dir / 'structure'
    relationship_dir = data_dir / 'relationship'
    misc_dir = data_dir / 'misc'
    additional_info_dir = data_dir / 'additional-info'
    dictionaries_dir = data_dir / 'dictionaries'
    sizes_dir = current_app.config.get('BASE_DIR') / 'server' / 'tools'
    sc_bilara_data_dir = data_dir / 'sc_bilara_data'
    localized_elements_dir = current_app.config.get('ASSETS_DIR') / 'localization/elements'
    languages_file = structure_dir / 'language.json'

    storage_dir = current_app.config.get('STORAGE_DIR')
    if not storage_dir.exists():
        storage_dir.mkdir()
    db = arangodb.get_db()

    printer = StagePrinter()

    if not no_pull:
        printer.print_stage("Retrieving Data Repository")
        collect_data(data_dir, current_app.config.get('DATA_REPO'))

    printer.print_stage("Copying localization files")
    copy_localization.copy_localization(sc_bilara_data_dir, localized_elements_dir)

    printer.print_stage("Loading languages")
    languages.load_languages(db, languages_file, localized_elements_dir)

    # print_stage("Loading images")
    # images_files.load_images_links(db)

    printer.print_stage("Loading ChangeTracker")
    change_tracker = ChangeTracker(data_dir, db)

    printer.print_stage("Loading uid_expansion.json")
    load_json_file(db, change_tracker, misc_dir / 'uid_expansion.json')

    printer.print_stage("Loading uid_expansion_edition.json")
    load_json_file(db, change_tracker, misc_dir / 'uid_expansion_edition.json')

    printer.print_stage("Loading uid_expansion_language.json")
    load_json_file(db, change_tracker, misc_dir / 'uid_expansion_language.json')

    printer.print_stage("Loading uid_expansion_school.json")
    load_json_file(db, change_tracker, misc_dir / 'uid_expansion_school.json')

    printer.print_stage("Loading author_edition.json")
    load_author_edition(change_tracker, additional_info_dir, db)

    printer.print_stage("Loading available_voices.json")
    load_available_voices(change_tracker, additional_info_dir, db)

    printer.print_stage("Loading map_data.json")
    load_map_data(additional_info_dir, db)

    printer.print_stage('Loading guides.json')
    load_guides_file(db, structure_dir / 'guides.json')

    printer.print_stage('Loading pali_reference_edition.json')
    load_pali_reference_edition_file(db, misc_dir / 'pali_reference_edition.json')

    printer.print_stage('Loading root_edition.json')
    load_root_edition_file(db, misc_dir / 'root_edition.json')

    printer.print_stage('Loading text_extra_info.json')
    load_text_extra_info_file(db, structure_dir / 'text_extra_info.json')

    printer.print_stage('Loading shortcuts.json')
    load_shortcuts_file(db, structure_dir / 'shortcuts.json')

    printer.print_stage('Loading fallen-leaves files')
    load_fallen_leaves_files(db, structure_dir / 'fallen-leaves')

    printer.print_stage("Building and loading navigation from structure_dir")
    navigation.add_navigation_docs_and_edges(change_tracker, db, structure_dir, sc_bilara_data_dir)

    printer.print_stage("Loading child ranges from structure_dir")
    load_child_range(db, structure_dir)

    printer.print_stage('Load names from sc_bilara_data')
    sc_bilara_data.load_names(db, sc_bilara_data_dir, languages_file)

    printer.print_stage('Load super names from sc_bilara_data')
    sc_bilara_data.load_super_names_root_misc_site(db, sc_bilara_data_dir)

    printer.print_stage('Load blurbs from sc_bilara_data')
    sc_bilara_data.load_blurbs(db, sc_bilara_data_dir)

    printer.print_stage('Load publications from sc_bilara_data')
    sc_bilara_data.load_publications(db, sc_bilara_data_dir)

    printer.print_stage('Load publication editions from sc_bilara_data')
    sc_bilara_data.load_publication_editions(db, sc_bilara_data_dir)

    printer.print_stage('Load texts from sc_bilara_data')
    sc_bilara_data.load_texts(db, sc_bilara_data_dir)

    printer.print_stage("Updating names")
    update_translated_title()

    printer.print_stage("Updating root names")
    update_root_title()

    printer.print_stage('Load bilara_author_edition from sc_bilara_data')
    sc_bilara_data.load_bilara_author_edition(db, sc_bilara_data_dir)

    printer.print_stage("Generating and loading relationships")
    generate_relationship_edges(
        change_tracker, relationship_dir, additional_info_dir, db
    )

    printer.print_stage("Loading html_text")
    load_html_texts(change_tracker, data_dir, db, html_dir)

    printer.print_stage('Make yellow brick road')
    make_yellow_brick_road(db)

    printer.print_stage("Loading difficulty from additional_info")
    process_difficulty(db, additional_info_dir)

    printer.print_stage("Loading prioritize from additional_info")
    process_prioritize(db, additional_info_dir)

    printer.print_stage("Loading creator bio from additional_info")
    process_creator_bio(db, additional_info_dir)

    printer.print_stage('Loading simple dictionaries')
    dictionaries.load_simple_dictionaries(db, dictionaries_dir)

    printer.print_stage('Loading complex dictionaries')
    dictionaries.load_complex_dictionaries(db, dictionaries_dir)

    printer.print_stage('Loading glossary dictionaries')
    dictionaries.load_glossaries(db, dictionaries_dir)

    printer.print_stage("Loading currencies from additional_info")
    currencies.load_currencies(db, additional_info_dir)

    printer.print_stage("Loading paragraphs from additional_info")
    paragraphs.load_paragraphs(db, additional_info_dir)

    printer.print_stage("Loading biblio from additional_info")
    biblio.load_biblios(db, additional_info_dir)

    printer.print_stage("Loading epigraphs from additional_info")
    homepage.load_epigraphs(db, additional_info_dir)

    printer.print_stage("Loading why_we_read from additional_info")
    homepage.load_why_we_read(db, additional_info_dir)

    printer.print_stage("Updating text_extra_info")
    update_text_extra_info()

    printer.print_stage("Update Acronym")
    upsert_text_acronym(structure_dir)

    printer.print_stage("Loading ebs_names")
    load_ebs_names()

    printer.print_stage("Generate uid list from range uid")
    generate_sutta_uid_list_from_range_sutta_uid()

    printer.print_stage("Generating sitemap")
    sitemap = generate_sitemap(db)
    for folder in pathlib.Path('/opt/sc/frontend/builds').glob('*'):
        if folder.is_dir():
            (folder / 'sitemap.xml').open('w').write(sitemap)

    printer.print_stage("Generating and loading ordering information")
    order.add_next_prev_using_menu_data(db)

    printer.print_stage("Calculating and loading size data")
    sizes.load_sizes(sizes_dir, db)

    printer.print_stage("Updating mtimes")
    change_tracker.update_mtimes()

    printer.print_stage('All done')

    return printer

def hyphenate_pali_and_san():
    db = arangodb.get_db()
    print(f'\nHyphenate Pali and Sanskrit texts:')
    hyphenation.hyphenate_texts(db)
