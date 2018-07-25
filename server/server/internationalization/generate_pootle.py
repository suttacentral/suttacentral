import os
import subprocess
import datetime
from pathlib import Path

import polib
from tqdm import tqdm

from common.arangodb import get_db
from common.utils import uid_sort_key

GENERATED_PO_FILES_DIR = Path('/srv/pootle/po/')


BLURBS_QUERY = r'''
FOR doc IN blurbs
    FILTER doc.lang == 'en'
    COLLECT division = REGEX_REPLACE(doc.uid, "^([a-z]+(-([1-9]|[a-z]{0,3}(?=[.-])))?).*", "$1") INTO group = {[doc.uid]: doc.blurb}
    RETURN {
        "division": division,
        "entries": MERGE(group)
    }
'''

def process_blurbs(db):
    print('PROCESSING_BLURBS')
    
    out_dir = GENERATED_PO_FILES_DIR / 'server_blurbs' / 'templates'
    out_dir.mkdir(parents=True, exist_ok=True)
    leftovers = {}
    for doc in tqdm(db.aql.execute(BLURBS_QUERY)):
        division = doc['division']
        
        entries = doc['entries']
        if len(entries) < 2:
            leftovers.update(entries)
            continue
        pot = polib.POFile()
        for uid in sorted(entries.keys(), key=uid_sort_key):
            blurb = entries[uid]
            pot.append(polib.POEntry(
                msgid=blurb,
                msgctxt=uid
            ))        
        pot.save(str(out_dir / f'{division}.pot'))
    
    if leftovers:
        #print(leftovers)
        pot = polib.POFile()
        for uid in sorted(leftovers.keys(), key=uid_sort_key):
            blurb = leftovers[uid]
            pot.append(polib.POEntry(
                msgid=blurb,
                msgctxt=uid
            ))
        pot.save(str(out_dir / '0-blurbs.pot'))

    print('✓ FINISHED PROCESSING BLURBS')


def process_menu(db):
    print('PROCESSING MENU')

    (GENERATED_PO_FILES_DIR / 'server_root_names').mkdir(parents=True, exist_ok=True)

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

        po_file.save(str(GENERATED_PO_FILES_DIR / 'server_root_names' / f'{lang}.pot'))

    print('✓ FINISHED PROCESSING ROOT NAMES')


def process_currencies(db):
    print('PROCESSING CURRENCIES')

    currency_names_collection = db['currency_names']
    po = polib.POFile()
    po.metadata = {
        'POT-Creation-Date': str(datetime.datetime.now()),
        'Content-Type': 'text/plain; charset=utf-8'
    }
    pot = polib.POFile()
    pot.metadata = {
        'POT-Creation-Date': str(datetime.datetime.now()),
        'Content-Type': 'text/plain; charset=utf-8'
    }
    for name in tqdm(currency_names_collection.find({'lang': 'en'})):
        entry = polib.POEntry(
            msgid=name['name'],
            msgstr=name['name'],
            msgctxt=name['symbol']
        )
        po.append(entry)
        pot.append(polib.POEntry(
            msgid=name['name'],
            msgctxt=name['symbol']
        ))

    (GENERATED_PO_FILES_DIR / 'server_currency_names').mkdir(parents=True, exist_ok=True)
    po.save(str(GENERATED_PO_FILES_DIR / 'server_currency_names' / 'en.po'))
    pot.save(str(GENERATED_PO_FILES_DIR / 'server_currency_names' / 'templates.pot'))

    print('✓ FINISHED PROCESSING CURRENCIES')


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
    process_currencies(db)

    change_po_file_permissions()


if __name__ == '__main__':
    run()
