from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_available_voices_036'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        available_voices = db.create_collection('available_voices', edge=False)
        available_voices.add_hash_index(fields=['uid'], unique=True)
