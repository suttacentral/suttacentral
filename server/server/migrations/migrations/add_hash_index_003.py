from common.arangodb import get_db
from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'add_hash_index_003'
    tasks = ['add_hash_index']

    def add_hash_index(self):
        db = get_db()

        db['html_text'].add_hash_index(fields=["path"], unique=False)
