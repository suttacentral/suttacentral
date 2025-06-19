from common.arangodb import get_db
from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'add_text_content_hash_index_052'
    tasks = ['add_hash_index']

    def add_hash_index(self):
        db = get_db()

        text_content_collection = 'text_contents'
        segmented_text_contents_collection = 'segmented_text_contents'
        text_references_collection = 'text_references'

        indexes = (
            ('uid',),
            ('author_uid',),
            ('uid', 'author_uid')
        )

        text_content = db.collection(text_content_collection)
        for index in indexes:
            text_content.add_hash_index(
                fields=index,
                unique=False
            )

        segmented_text_contents = db.collection(segmented_text_contents_collection)
        for index in indexes:
            segmented_text_contents.add_hash_index(
                fields=index,
                unique=False
            )

        text_references = db.collection(text_references_collection)
        text_references.add_hash_index(fields=['uid'], unique=True)
