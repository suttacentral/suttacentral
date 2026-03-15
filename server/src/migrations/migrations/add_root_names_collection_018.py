from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_root_names_collection_018'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        paragraphs = db.create_collection('root_names')
        paragraphs.add_hash_index(fields=['uid'], unique=False)
        paragraphs.add_hash_index(fields=['lang'], unique=False)
