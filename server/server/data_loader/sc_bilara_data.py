import re
from pathlib import Path
from typing import Dict, Set, List

from arango.database import Database

from data_loader.languages import process_languages
from data_loader.util import json_load
import shutil

def load_publications(db: Database, sc_bilara_data_dir: Path) -> None:
    publication_file = sc_bilara_data_dir / '_publication.json'
    publications: Dict[str, dict] = json_load(publication_file)

    docs = [{'_key': pub_id, **publication} for pub_id, publication in publications.items()]

    print(f'{len(docs)} publications added or updated')
    db['publications'].truncate()
    db['publications'].import_bulk(docs)

def load_publication_editions(db: Database, sc_bilara_data_dir: Path) -> None:
    publications_file = sc_bilara_data_dir / '_publication-v2.json'
    publications: Dict[str, str] = json_load(publications_file)
    docs = []
    for pub in publications:
        pub['_key'] = pub['publication_number']
        docs.append(pub)

    print(f'{len(docs)} publications (v2) added or updated')
    db['publications_v2'].truncate()
    db['publications_v2'].import_bulk(docs)

    docs = []
    editions_dir = sc_bilara_data_dir / '_publication'
    for file in editions_dir.glob('**/*.json'):
        doc = json_load(file)
        doc['working_dir'] = str(file.parent.absolute())
        doc['edition_id'] = file.stem
        doc['_key'] = file.stem
        docs.append(doc)

    print(f'{len(docs)} publication editions added or updated')

    db['publication_editions'].truncate()
    db['publication_editions'].import_bulk(docs)

def load_blurbs(db: Database, sc_bilara_data_dir: Path) -> None:
    blurbs = []
    pattern = r'^.*?:(.*?)$'

    for blurb_file in sc_bilara_data_dir.glob('**/blurb/*.json'):
        lang = blurb_file.parent.parent.name
        file_content: Dict[str, str] = json_load(blurb_file)
        for prefix, blurb in file_content.items():
            match = re.match(pattern, prefix)
            uid = match.group(1) if match else prefix
            blurbs.append({
                '_key': '_'.join((uid, lang)),
                'uid': uid,
                'lang': lang,
                'blurb': blurb
            })

    check_val  = set()
    res = []
    for i in blurbs:
        if i["_key"] not in check_val:
            res.append(i)
            check_val.add(i["_key"])
        else:
            print(f'Duplicate key value：{i["_key"]}')

    print(f'{len(res)} blurbs added or updated')
    db['blurbs'].truncate()
    db['blurbs'].import_bulk_logged(res)


def parse_name_file_content(
        file_content: dict,
        is_root: bool,
        lang: str,
        languages: Dict[str, str]
) -> List[dict]:
    names = []
    pattern = r'^.*?:\d+\.(.*?)$'
    for prefix, name in file_content.items():
        if type(name) is dict:
            names.extend(parse_name_file_content(name, is_root, lang, languages))
        else:
            match = re.match(pattern, prefix)
            uid = match.group(1) if match else prefix
            lang = languages.get(uid, None) if lang == 'misc' else lang
            key = '_'.join((uid, lang)) if lang else uid
            names.append({
                '_key': key,
                'uid': uid,
                'lang': lang,
                'is_root': is_root,
                'name': name,
            })
    return names


def load_names(db: Database, sc_bilara_data_dir: Path, languages_file: Path) -> None:
    names = []
    lang_folder_idx = len(sc_bilara_data_dir.parts) + 1

    languages: Dict[str, str] = process_languages(languages_file)

    for name_file in sc_bilara_data_dir.glob('**/name/**/*.json'):
        is_root = 'root' in name_file.parts
        lang = name_file.parts[lang_folder_idx]
        file_content: Dict[str, str] = json_load(name_file)
        names.extend(parse_name_file_content(file_content, is_root, lang, languages))

    check_val  = set()
    res = []
    for i in names:
        if i["_key"] not in check_val:
            res.append(i)
            check_val.add(i["_key"])
        else:
            print(f'Duplicate key value：{i["_key"]}')

    print(f'{len(res)} names added or updated')
    db['names'].truncate()
    db['names'].import_bulk_logged(res)


def load_super_names_root_misc_site(db: Database, sc_bilara_data_dir: Path):
    file_content = json_load(sc_bilara_data_dir / 'root/misc/site/name/super-name_root-misc-site.json')
    names = []
    for name in file_content.items():
        names.append({
            'uid': name[0].replace('super-name:', '').split('.')[1],
            'type': 'misc',
            'name': name[1],
        })
    db['super_name'].truncate()
    db['super_name'].import_bulk_logged(names)

def load_texts(db: Database, sc_bilara_data_dir: Path) -> None:
    docs = []
    lang_folder_idx = len(sc_bilara_data_dir.parts) + 1

    folders: List[Path] = {folder for folder in sc_bilara_data_dir.glob('*') 
                           if not folder.name.startswith(('_', '.')) and not folder.name in {'name', 'blurb'}}
    
    files: List[Path] = []
    for folder in folders:
        files.extend(file for file in folder.glob('**/*.json') if not file.name.startswith(('_', '.')))

    for file in files:
        uid, muids = file.stem.split('_')
        lang = file.parts[lang_folder_idx]
        docs.append({
            '_key': file.stem,
            'uid': uid,
            'lang': lang,
            'muids': muids.split('-'),
            'file_path': str(file.resolve())
        })

    check_val  = set()
    res = []
    for i in docs:
        if i["_key"] not in check_val:
            res.append(i)
            check_val.add(i["_key"])
        else:
            print(f'Duplicate key value：{i["_key"]}')

    print(f'{len(res)} texts added or updated')
    db['sc_bilara_texts'].truncate()
    db['sc_bilara_texts'].import_bulk(res)


def load_bilara_author_edition(db: Database, sc_bilara_data_dir: Path) -> None:
    db['bilara_author_edition'].truncate()
    docs = load_bilara_author(db, sc_bilara_data_dir) + \
        load_bilara_edition(db, sc_bilara_data_dir)
    db.collection('bilara_author_edition').import_bulk_logged(docs, wipe=True)


def load_bilara_author(db: Database, sc_bilara_data_dir: Path) -> None:
    author_file = sc_bilara_data_dir / '_author.json'
    authors: Dict[str, dict] = json_load(author_file)

    docs = []
    for key, value in authors.items():
        docs.append({
            'type': 'author',
            'uid': key,
            'short_name': key,
            'long_name': value['name']
        })

    return docs


def load_bilara_edition(db: Database, sc_bilara_data_dir: Path) -> None:
    edition_file = sc_bilara_data_dir / '_edition.json'
    editions: Dict[str, dict] = json_load(edition_file)

    docs = []
    for key, value in editions.items():
        docs.append({
            'type': 'edition',
            'uid': key,
            'language': value['language'],
            'is_root': value['is_root']
        })

    return docs


