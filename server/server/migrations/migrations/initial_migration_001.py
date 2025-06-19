from common.arangodb import get_db
from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'initial_migration_001'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        collections = [
            ('language', False),
            ('relationship', True),
            ('html_text', False),
            ('unicode_points', False),
            ('mtimes', False),
        ]

        for name, edge in collections:
            db.create_collection(name=name, edge=edge)

        # create indexes
        db['html_text'].add_hash_index(fields=["uid"], unique=False)
        db['html_text'].add_hash_index(fields=["author_uid"], unique=False)
        db['html_text'].add_hash_index(fields=["lang"], unique=False)
