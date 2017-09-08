from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'new_collections_002'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()

        collections = ['po_markup', 'po_strings', 'uid_expansion']

        for name in collections:
            db.create_collection(name=name)
