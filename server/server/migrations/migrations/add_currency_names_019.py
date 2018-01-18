from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_currency_names_019'
    tasks = ['create_collection']

    def create_collection(self):
        db = get_db()

        paragraphs = db.create_collection('currency_names')
        paragraphs.add_hash_index(fields=['symbol'], unique=False)
        paragraphs.add_hash_index(fields=['lang'], unique=False)
