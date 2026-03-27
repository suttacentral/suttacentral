from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_indexes_bilara_texts_and_names_035'
    tasks = ['add_indexes']

    def add_indexes(self):
        db = get_db()

        names_collection = 'names'
        bilara_texts_collection = 'sc_bilara_texts'

        names_indexes = (
            ('uid',),
            ('lang',),
            ('uid', 'lang')
        )
        bilara_texts_indexes = (
            ('uid',),
            ('uid', 'muids[*]')
        )

        names = db.collection(names_collection)
        for name_idx in names_indexes:
            names.add_hash_index(
                fields=name_idx,
                unique=False
            )

        bilara_texts = db.collection(bilara_texts_collection)
        for bilara_idx in bilara_texts_indexes:
            bilara_texts.add_hash_index(
                fields=bilara_idx,
                unique=False
            )
