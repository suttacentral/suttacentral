from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_available_languages_019'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        paragraphs = db.create_collection('available_languages')
        paragraphs.add_hash_index(fields=['iso_code'], unique=True)
