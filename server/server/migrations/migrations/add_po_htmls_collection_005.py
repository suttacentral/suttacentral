from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_po_htmls_collection_005'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        po_htmls = db.create_collection('po_htmls')
        po_htmls.add_hash_index(fields=['uid'], unique=False)
        po_htmls.add_hash_index(fields=['lang'], unique=False)
        po_htmls.add_hash_index(fields=['author'], unique=False)
