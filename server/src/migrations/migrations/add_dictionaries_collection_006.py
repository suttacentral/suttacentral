from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_dictionaries_collection_006'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        dictionaries = db.create_collection('dictionaries')
        dictionaries.add_hash_index(fields=['from'], unique=False)
        dictionaries.add_hash_index(fields=['to'], unique=False)
        dictionaries.add_hash_index(fields=['lookup'], unique=False)
        dictionaries.add_hash_index(fields=['main'], unique=False)
        dictionaries.add_hash_index(fields=['type'], unique=False)
