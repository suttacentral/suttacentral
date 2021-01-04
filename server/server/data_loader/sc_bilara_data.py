import re
from pathlib import Path
from typing import Dict, Set

from arango.database import Database

from data_loader.util import json_load


def load_publications(db: Database, sc_bilara_data_dir: Path) -> None:
    publication_file = sc_bilara_data_dir / '_publication.json'
    publications: Dict[str, dict] = json_load(publication_file)

    docs = [{'_key': pub_id, **publication} for pub_id, publication in publications.items()]

    print(f'{len(docs)} publications added or updated')
    db['publications'].import_bulk(docs, overwrite=True)


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

    print(f'{len(blurbs)} blurbs added or updated')
    db['blurbs'].import_bulk(blurbs, overwrite=True)


def load_names(db: Database, sc_bilara_data_dir: Path) -> None:
    names = []
    pattern = r'^.*?:\d+\.(.*?)$'

    for name_file in sc_bilara_data_dir.glob('**/name/**/*.json'):
        is_root = 'root' in name_file.parts
        lang_folder_idx = name_file.parts.index('root' if is_root else 'translation') + 1
        lang = name_file.parts[lang_folder_idx]
        file_content: Dict[str, str] = json_load(name_file)
        for prefix, name in file_content.items():
            if type(name) != str:
                continue
            match = re.match(pattern, prefix)
            uid = match.group(1) if match else prefix
            names.append({
                '_key': '_'.join((uid, lang)),
                'uid': uid,
                'lang': lang,
                'is_root': is_root,
                'name': name,
            })

    print(f'{len(names)} names added or updated')
    db['names'].import_bulk(names, overwrite=True)


def load_texts(db: Database, sc_bilara_data_dir: Path) -> None:
    docs = []

    all_files = {file for file in sc_bilara_data_dir.glob('**/*.json') if not file.name.startswith('_')}
    files: Set[Path] = all_files.difference({
        *sc_bilara_data_dir.glob('**/name/**/*.json'),
        *sc_bilara_data_dir.glob('**/blurb/*.json'),
    })

    for file in files:
        uid, muids = file.stem.split('_')
        docs.append({
            '_key': file.stem,
            'uid': uid,
            'muids': muids.split('-'),
            'filepath': str(file.relative_to(sc_bilara_data_dir))
        })

    print(f'{len(docs)} texts added or updated')
    db['sc_bilara_texts'].import_bulk(docs, overwrite=True)
