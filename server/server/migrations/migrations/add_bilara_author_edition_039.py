from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_bilara_author_edition_039'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        db.create_collection('bilara_author_edition', edge=False)