from common.arangodb import get_db
from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'add_type_index_012'
    tasks = ['add_type_index']

    def add_type_index(self):
        db = get_db()

        db['root'].add_hash_index(fields=["type"], unique=False)
