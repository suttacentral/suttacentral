from common.arangodb import get_db
from migrations.base import Migration


class RemoveUnicodePointsMigration(Migration):
    migration_id = 'remove_unicode_points_060'
    tasks = ['remove_collections']

    def remove_collections(self):
        db = get_db()
        if db.has_collection('unicode_points'):
            db.delete_collection('unicode_points')
