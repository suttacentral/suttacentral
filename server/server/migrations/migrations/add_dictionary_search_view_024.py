from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_dictionary_search_view_024'
    tasks = ['create_view']

    def create_view(self):
        db = get_db()
        db.create_arangosearch_view(
            'v_dict',
            properties={
                'links': {
                    'dictionary_full': {
                        'fields': {
                            'word_ascii': {'analyzers': ['identity']}
                        }
                    }
                }
            },
        )
