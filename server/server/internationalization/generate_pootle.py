import os
import subprocess
import datetime
from pathlib import Path

import polib

from common.arangodb import get_db

GENERATED_PO_FILES_DIR = Path(os.path.dirname(os.path.realpath(__file__))) / Path('generatedPoFiles')


def process_blurbs(db):
    blurbs_collection = db['blurbs']
    po = polib.POFile()
    po.metadata = {
        'POT-Creation-Date': str(datetime.datetime.now()),
        'Content-Type': 'text/plain; charset=utf-8'
    }
    for blurb in blurbs_collection.find({'lang': 'en'}):
            entry = polib.POEntry(
                msgid=blurb['uid'],
                msgstr=blurb['blurb']
            )
            po.append(entry)

    Path(GENERATED_PO_FILES_DIR).mkdir(parents=True, exist_ok=True)

    po.save(str(GENERATED_PO_FILES_DIR / 'blurbs.po'))


def change_po_file_permissions():
    subprocess.run(['chmod', '-R', 'a+rwX', str(GENERATED_PO_FILES_DIR)])


def run():
    db = get_db()

    process_blurbs(db)

    change_po_file_permissions()


if __name__ == '__main__':
    run()