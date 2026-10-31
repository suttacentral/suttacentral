from common.arangodb import get_db
from migrations.base import Migration


class RemoveUnicodePointsMigration(Migration):
    migration_id = 'remove_unicode_points_059'
    tasks = ['remove_unicode_points']

    def remove_unicode_points(self):
        db = get_db()
        if db.has_collection('unicode_points'):
            db.delete_collection('unicode_points')
