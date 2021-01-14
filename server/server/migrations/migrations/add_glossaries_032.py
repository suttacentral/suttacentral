from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_glossaries_032'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        collection = 'dictionaries_glossary'
        db.create_collection('dictionaries_glossary')
        db.collection(collection).add_hash_index(('entry',))
