from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_indexes_021'
    tasks = ['add_indexes']

    def add_indexes(self):
        db = get_db()

        language = db['language']
        language.add_hash_index(fields=['uid'], unique=True)
        language.add_hash_index(fields=['is_root'], unique=False)
