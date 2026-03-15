from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_collections_004'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        difficulties = db.create_collection('difficulties')
        difficulties.add_hash_index(fields=['uid'], unique=False)
        difficulties.add_hash_index(fields=['difficulty'], unique=False)

        blurbs = db.create_collection('blurbs')
        blurbs.add_hash_index(fields=['uid'], unique=False)
        blurbs.add_hash_index(fields=['lang'], unique=False)
