import re
from pathlib import Path
from typing import Dict, List

from tqdm import tqdm

from common.queries import SET_SUPER_NAV_DETAILS_NODES_TYPES, SET_SUPER_NAV_DETAILS_ROOT_LANGUAGES
from data_loader import languages
from data_loader.extra_info import process_extra_info_file
from data_loader.util import json_load


def add_navigation_docs_and_edges(change_tracker, db, structure_dir, sc_bilara_data_dir):
    tree_dir = structure_dir / 'tree'

    names_files = sorted((sc_bilara_data_dir / 'root' / 'misc' / 'site' / 'name').glob('**/*.json'))
    tree_files = sorted(tree_dir.glob('**/*.json'))
    super_tree_file = tree_dir / 'super-tree.json'
    tree_files.remove(super_tree_file)

    root_languages = languages.process_languages(structure_dir / 'super_root_lang.json', True)
    super_extra_info = process_extra_info_file(structure_dir / 'super_extra_info.json')
    text_extra_info = process_extra_info_file(structure_dir / 'text_extra_info.json')

    if change_tracker.is_any_function_changed(
            [_perform_update_queries, _process_super_tree_file, _process_tree_files, _process_names_files]
    ):
        nav_details_docs = _process_names_files(names_files, root_languages, super_extra_info, text_extra_info)

        nav_details_edges = _process_tree_files(tree_files) + _process_super_tree_file(super_tree_file)

        db['super_nav_details'].truncate()
        db['super_nav_details_edges'].truncate()
        db['super_nav_details'].import_bulk(nav_details_docs)
        db['super_nav_details_edges'].import_bulk(
            nav_details_edges,
            from_prefix='super_nav_details',
            to_prefix='super_nav_details',
        )

        _perform_update_queries(db)


def _perform_update_queries(db):
    db.aql.execute(SET_SUPER_NAV_DETAILS_NODES_TYPES)
    # add root language uid to everything.
    db.aql.execute(SET_SUPER_NAV_DETAILS_ROOT_LANGUAGES)


def _parse_name_file_entries(
        file_content: dict,
        root_languages: Dict[str, str],
        super_extra_info: Dict[str, Dict[str, str]],
        text_extra_info: Dict[str, Dict[str, str]]
) -> List[dict]:
    """
    Method for processing entries in a single name-file
    """
    names = []
    pattern = r'^.*?:\d+\.(.*?)$'
    for prefix, name in file_content.items():
        if type(name) is dict:
            names.extend(_parse_name_file_entries(name, root_languages, super_extra_info, text_extra_info))
        else:
            match = re.match(pattern, prefix)
            uid = match.group(1) if match else prefix
            extra_info = super_extra_info if uid in super_extra_info else text_extra_info
            names.append({
                'uid': uid,
                '_key': uid,
                'name': name,
                'root_lang': root_languages.get(uid, None),
                'volpage': extra_info.get(uid, {}).get('volpage', None),
                'biblio_uid': extra_info.get(uid, {}).get('biblio_uid', None),
                'acronym': extra_info.get(uid, {}).get('acronym', None)
            })
    return names


def _process_names_files(
        names_files: List[Path],
        root_languages: Dict[str, str],
        super_extra_info: Dict[str, Dict[str, str]],
        text_extra_info: Dict[str, Dict[str, str]]
) -> List[dict]:
    """
    Method for processing name files from sc-data/structure/name

    Args:
        names_files - list of name Path objects to files from name folder
        root_languages - parsed data from super_root_lang.json
        super_extra_info - parsed data from super_extra_info.json
        text_extra_info - parsed data from text_extra_info.json

    Returns:
        list of processed data
    """
    docs = []
    names_files.sort(key=lambda path: len(path.parts))
    for name_file in tqdm(names_files):
        entries: Dict[str, str] = json_load(name_file)
        docs.extend(_parse_name_file_entries(entries, root_languages, super_extra_info, text_extra_info))
    return docs


def _parse_tree_recursive(element: Dict[str, list]) -> List[Dict[str, str]]:
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
                edges.extend(_parse_tree_recursive(item))
            else:
                edges.append({
                    '_from': name,
                    '_to': item,
                })
    return edges


def _process_super_tree_file(super_tree_file: Path) -> List[Dict[str, str]]:
    """
    Method for super-tree.json file processing

    Args:
        super_tree_file - path to the super-tree.json file
    """
    content: List[Dict[str, list]] = json_load(super_tree_file)
    data = []
    for division in content:
        data.extend(_parse_tree_recursive(division))
    return data


def _process_tree_files(tree_files: List[Path]) -> List[Dict[str, str]]:
    """
    Method for processing tree files from tree sc-data/structure/tree folder

    Args:
        tree_files - list of Paths to the tree files
    """
    edges = []
    for tree_file in tqdm(tree_files):
        content = json_load(tree_file)
        edges.extend(
            _parse_tree_recursive(content)
        )
    return edges
