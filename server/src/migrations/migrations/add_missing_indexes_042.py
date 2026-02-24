from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_missing_indexes_042'
    tasks = ['add_missing_indexes']

    def add_missing_indexes(self):
        db = get_db()

        language = db['language']
        language.add_persistent_index(fields=['iso_code'], unique=False)

        text_extra_info = db['text_extra_info']
        text_extra_info.add_persistent_index(fields=["uid"], unique=False)
