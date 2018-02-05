from common.arangodb import get_db
from migrations.base import Migration

class SecondMigration(Migration):
    migration_id = 'add_author_edition_022'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        author_edition = db.create_collection('author_edition')
        author_edition.add_hash_index(fields=['uid'], unique=True)
