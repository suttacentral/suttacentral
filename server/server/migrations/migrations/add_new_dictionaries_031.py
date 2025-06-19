from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_new_dictionaries_031'
    tasks = ['create_collections', 'update_view', 'remove_collections']

    def create_collections(self):
        db = get_db()

        collections = [
            ('dictionaries_simple', False),
            ('dictionaries_complex', False),
        ]

        for collection_name, is_edge in collections:
            db.create_collection(collection_name, edge=is_edge)

        simple_indexes = ('to', 'from')
        complex_indexes = ('word', 'to', 'from', 'word_ascii')

        db.collection('dictionaries_simple').add_hash_index(simple_indexes)
        db.collection('dictionaries_complex').add_hash_index(complex_indexes)

    def update_view(self):
        db = get_db()
        db.replace_view(
            'v_dict',
            properties={
                'links': {
                    'dictionaries_complex': {
                        'fields': {'word_ascii': {'analyzers': ['identity']}}
                    }
                }
            }
        )

    def remove_collections(self):
        """
        Remove old dictionary collections
        """
        db = get_db()
        db.delete_collection('dictionaries')
        db.delete_collection('dictionary_full')
