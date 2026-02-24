from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'extend_change_tracker_016'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()
        db.create_collection('function_hashes')
