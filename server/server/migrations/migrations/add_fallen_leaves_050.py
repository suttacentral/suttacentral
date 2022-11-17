from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_fallen_leaves_050'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        db.create_collection('fallen_leaves', False)
