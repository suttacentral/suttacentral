from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_super_name_049'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        db.create_collection('super_name', False)
