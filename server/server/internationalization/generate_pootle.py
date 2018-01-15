import os
import subprocess
import datetime
from pathlib import Path

import polib
from tqdm import tqdm

from common.arangodb import get_db

CURRENT_FILE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
GENERATED_PO_FILES_DIR = CURRENT_FILE_DIR / Path('generatedPoFiles')


def process_blurbs(db):
    print('PROCESSING_BLURBS')

    blurbs_collection = db['blurbs']
    po = polib.POFile()
    po.metadata = {
        'POT-Creation-Date': str(datetime.datetime.now()),
        'Content-Type': 'text/plain; charset=utf-8'
    }
    for blurb in tqdm(blurbs_collection.find({'lang': 'en'})):
            entry = polib.POEntry(
                msgid=blurb['blurb'],
                msgstr=blurb['blurb'],
                msgctxt=blurb['uid']
            )
            po.append(entry)

    (GENERATED_PO_FILES_DIR / 'blurbs').mkdir(parents=True, exist_ok=True)
    po.save(str(GENERATED_PO_FILES_DIR / 'blurbs' / 'en.po'))

    print('✓ FINISHED PROCESSING BLURBS')


def process_menu(db):
    print('PROCESSING MENU')

    (GENERATED_PO_FILES_DIR / 'root_names').mkdir(parents=True, exist_ok=True)

    menu_names_collection = db['root_names']

    root_names = list(menu_names_collection.find({'root': True}))
    languages = set(x['lang'] for x in root_names)

    po_files = {}

    for lang in languages:
        po = polib.POFile()

        po.metadata = {
            'POT-Creation-Date': str(datetime.datetime.now()),
            'Content-Type': 'text/plain; charset=utf-8'
        }

        po_files[lang] = po

    for lang, po_file in tqdm(po_files.items()):
        current_translation = get_current_translation('root_names', lang)
        for name in root_names:
            if lang == name['lang']:
                msgstr = name['name']
            elif name['name'] in current_translation:
                msgstr = current_translation[name['name']]
            else:
                msgstr = ''

            entry = polib.POEntry(
                msgid=name['name'],
                msgstr=msgstr,
                msgctxt=name['uid']
            )

            po_file.append(entry)

        po_file.save(str(GENERATED_PO_FILES_DIR / 'root_names' / f'{lang}.po'))

    print('✓ FINISHED PROCESSING ROOT NAMES')


def get_current_translation(collection_name, language) -> dict:
    file = (GENERATED_PO_FILES_DIR / collection_name / f'{language}.po')
    if file.exists():
        return {x.msgid: x.msgstr for x in polib.pofile(str(file))}
    else:
        return {}


def change_po_file_permissions():
    subprocess.run(['chmod', '-R', 'a+rwX', str(GENERATED_PO_FILES_DIR)])


def run():
    db = get_db()

    Path(GENERATED_PO_FILES_DIR).mkdir(parents=True, exist_ok=True)

    process_blurbs(db)
    process_menu(db)

    change_po_file_permissions()


if __name__ == '__main__':
    run()
