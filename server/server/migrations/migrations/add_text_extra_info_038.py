from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_text_extra_info_038'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        db.create_collection('text_extra_info', edge=False)