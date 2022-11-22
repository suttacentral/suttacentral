from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_map_data_051'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        db.create_collection('map_data', False)
