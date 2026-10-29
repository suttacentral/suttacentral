from common.arangodb import get_db
from migrations.base import Migration


class RemoveImageCollectionMigration(Migration):
    migration_id = 'remove_image_collection_057'
    tasks = ['remove_collection']

    def remove_collection(self):
        db = get_db()
        db.delete_collection('images')
