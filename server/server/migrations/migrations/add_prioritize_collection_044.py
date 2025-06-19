from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_prioritize_collection_044'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        db.create_collection('prioritize', False)
