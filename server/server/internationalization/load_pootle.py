import os
from pathlib import Path

import polib
from tqdm import tqdm

from common.arangodb import get_db

CURRENT_FILE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
GENERATED_PO_FILES_DIR = CURRENT_FILE_DIR / Path('generatedPoFiles')


class Loader:
    def __init__(self, db):
        self.db = db
        self.counter_updated = 0
        self.counter_created = 0

    def _reset_counters(self):
        self.counter_updated = 0
        self.counter_created = 0

    def run(self, collection_name: str, translated_field: str):
        print()
        print(f'LOADING {collection_name}')
        self._reset_counters()

        collection = self.db[collection_name]
        for file in tqdm(list((GENERATED_PO_FILES_DIR / collection_name).glob('*.po'))):
            po_data = polib.pofile(str(file))

            self._process_entries(po_data, collection, translated_field, file.stem)

        print(f'UPDATED {self.counter_updated}; CREATED {self.counter_created}')

    def _process_entries(self, po_data, collection, translated_field, lang):
        for entry in po_data:
            self._process_entry(entry, collection, translated_field, lang)

    def _process_entry(self, entry, collection, translated_field, language):
        uid = entry.msgid
        field = entry.msgstr
        update = False
        try:
            document = collection.find({'uid': uid, 'lang': language}).batch()[0]
            if document[translated_field] == field:
                return
            update = True
        except IndexError:
            document = {'uid': uid, 'lang': language}

        document[translated_field] = field

        self._affect_db(collection, update, document)

    def _affect_db(self, collection, update, document):
        if update:
            collection.update(document)
            self.counter_updated += 1
        else:
            collection.insert(document)
            self.counter_created += 1


def run():
    db = get_db()
    loader = Loader(db)
    loader.run('blurbs', 'blurb')


if __name__ == '__main__':
    run()
