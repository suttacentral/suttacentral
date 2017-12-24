from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_glossary_collection_013'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        glossary = db.create_collection('glossary')
        glossary.add_hash_index(fields=['glossword'], unique=True)
