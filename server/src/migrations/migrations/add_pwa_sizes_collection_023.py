from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_pwa_sizes_collection_023'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        pwa_sizes = db.create_collection('pwa_sizes')
        pwa_sizes.add_hash_index(fields=['lang'], unique=True)
