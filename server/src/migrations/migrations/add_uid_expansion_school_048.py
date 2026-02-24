from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_uid_expansion_school_048'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        uid_expansion_school = db.create_collection('uid_expansion_school', False)
        uid_expansion_school.add_hash_index(fields=['uid'], unique=True)
