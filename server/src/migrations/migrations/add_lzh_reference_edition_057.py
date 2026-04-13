from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_lzh_reference_edition_057'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        db.create_collection('lzh_reference_edition', edge=False)
