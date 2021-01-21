from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_divisions_010'
    tasks = ['create_divisions_collection', 'create_text_divisions_collection']

    def create_divisions_collection(self):
        db = get_db()

        paragraphs = db.create_collection('divisions')
        paragraphs.add_hash_index(fields=['uid'], unique=True)

    def create_text_divisions_collection(self):
        db = get_db()

        paragraphs = db.create_collection('text_divisions')
        paragraphs.add_hash_index(fields=['uid'], unique=True)
        paragraphs.add_hash_index(fields=['division'], unique=False)
