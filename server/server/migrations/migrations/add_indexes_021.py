from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_indexes_021'
    tasks = ['add_indexes']

    def add_indexes(self):
        db = get_db()

        po_markup = db['po_markup']
        po_markup.add_hash_index(fields=['uid'], unique=False)
        
        language = db['language']
        language.add_hash_index(fields=['uid'], unique=True)
        language.add_hash_index(fields=['is_root'], unique=False)
