from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add-num-index-to-dictionary_017'
    tasks = ['add_index']

    def add_index(self):
        db = get_db()
        db['dictionary_full'].add_skiplist_index(fields=['num'], unique=False)

