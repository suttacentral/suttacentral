from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_images_collection_011'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        currencies = db.create_collection('images')
        currencies.add_hash_index(fields=['division'], unique=False)
        currencies.add_hash_index(fields=['name'], unique=True)
        currencies.add_hash_index(fields=['vol'], unique=False)
