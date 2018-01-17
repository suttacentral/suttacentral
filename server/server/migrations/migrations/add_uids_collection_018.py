from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_uids_collection_018'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()
        uids = db.create_collection('uids')
        uids.add_hash_index(fields=['uid'], unique=True)
        uids.add_hash_index(fields=['prefix'], unique=False)


