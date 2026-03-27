from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_fallen_leaves_050'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        fallen_leaves = db.create_collection('fallen_leaves', False)
        fallen_leaves.add_hash_index(fields=['uid'], unique=True)
