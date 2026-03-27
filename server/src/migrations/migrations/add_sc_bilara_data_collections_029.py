from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_sc_bilara_data_collections_029'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        collections = [
            ('sc_bilara_texts', False),
            ('names', False),
            ('publications', False),
        ]

        for name, edge in collections:
            db.create_collection(name=name, edge=edge)
