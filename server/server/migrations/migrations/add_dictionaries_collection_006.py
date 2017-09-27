from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_dictionaries_collection_006'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        po_htmls = db.create_collection('dictionaries')
        po_htmls.add_hash_index(fields=['from'], unique=False)
        po_htmls.add_hash_index(fields=['to'], unique=False)
