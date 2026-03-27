from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_guides_and_pali_reference_edition_collections_034'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        db.create_collection('guides', edge=False)
        db.create_collection('pali_reference_edition', edge=False)
