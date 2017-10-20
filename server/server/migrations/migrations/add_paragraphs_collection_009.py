from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_paragraphs_collection_009'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        paragraphs = db.create_collection('paragraphs')
        paragraphs.add_hash_index(fields=['uid'], unique=True)
