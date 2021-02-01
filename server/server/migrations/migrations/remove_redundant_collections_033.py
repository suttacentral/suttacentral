from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'remove_redundant_collections_033'
    tasks = ['remove_collections']

    def remove_collections(self):
        db = get_db()
        collections = [
            'available_languages',
            'divisions',
            'grouping',
            'pitaka',
            'po_markup',
            'po_strings',
            'root',
            'root_edges',
            'root_names',
            'sect',
            'segmented_data',
            'text_divisions',
        ]
        for collection in collections:
            db.delete_collection(collection, ignore_missing=True)
