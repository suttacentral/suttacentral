from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_dictionary_full_collection_012'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        dictionary_full = db.create_collection('dictionary_full')
        dictionary_full.add_hash_index(fields=['word'], unique=False)

