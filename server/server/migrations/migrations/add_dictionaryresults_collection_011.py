from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_dictionaryresults_collection_011'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        dictionaryresults = db.create_collection('dictionaryresults')
        dictionaryresults.add_hash_index(fields=['from'], unique=False)
        dictionaryresults.add_hash_index(fields=['to'], unique=False)
