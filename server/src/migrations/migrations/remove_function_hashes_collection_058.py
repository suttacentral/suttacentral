from common.arangodb import get_db
from migrations.base import Migration

# Why is every migration called SecondMigration? Copy & paste?
class SecondMigration(Migration):
    migration_id = 'remove_function_hashes_collection_058'
    tasks = ['remove_collections']

    def remove_collections(self):
        db = get_db()
        db.delete_collection('function_hashes')