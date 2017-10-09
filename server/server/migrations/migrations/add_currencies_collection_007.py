from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_currencies_collection_007'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        po_htmls = db.create_collection('currencies')
        po_htmls.add_hash_index(fields=['symbol'], unique=True)
