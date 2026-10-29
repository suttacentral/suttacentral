from common.arangodb import get_db
from migrations.base import Migration


class RemoveImageCollectionMigration(Migration):
    migration_id = 'remove_image_collection_059'
    tasks = ['remove_collection']

    def remove_collection(self):
        db = get_db()
        if db.has_collection('images'):
            db.delete_collection('images')
