from common.arangodb import get_db
from migrations.base import Migration


class RemoveImageCollectionMigration(Migration):
    migration_id = 'remove_image_collection_059'
    tasks = ['remove_collections']

    def remove_collections(self):
        db = get_db()
        if db.has_collection('images'):
            db.delete_collection('images')
