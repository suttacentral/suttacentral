from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_child_range_collection_027'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        db.create_collection('child_range', edge=False)
        db['child_range'].add_hash_index(['uid'], unique=True)
