from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_super_nav_details_collections_026'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        collections = [
            ('super_nav_details', False),
            ('super_nav_details_edges', True),
        ]

        for name, edge in collections:
            db.create_collection(name=name, edge=edge)

        db['super_nav_details'].add_hash_index(['uid'], unique=True)
