from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_homepage_collections_012'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        epigraphs = db.create_collection('epigraphs')
        epigraphs.add_hash_index(fields=['uid'], unique=False)

        why_we_read = db.create_collection('why_we_read')
