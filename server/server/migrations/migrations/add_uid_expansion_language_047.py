from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_uid_expansion_language_047'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        uid_expansion_language = db.create_collection('uid_expansion_language', False)
        uid_expansion_language.add_hash_index(fields=['uid'], unique=True)
