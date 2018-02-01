from common.arangodb import get_db
from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'add_hash_indexes_for_po_texts_020'
    tasks = ['add_hash_index']

    def add_hash_index(self):
        db = get_db()

        db['po_strings'].add_hash_index(fields=['lang'], unique=False)
        db['po_strings'].add_hash_index(fields=['uid'], unique=False)
        db['po_strings'].add_hash_index(fields=['author_uid'], unique=False)
