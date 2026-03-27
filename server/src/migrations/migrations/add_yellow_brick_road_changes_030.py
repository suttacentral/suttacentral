from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_yellow_brick_road_changes_030'
    tasks = ['create_collections', 'update_view']

    def create_collections(self):
        db = get_db()
        db.create_collection('yellow_brick_road', edge=False)

    def update_view(self):
        db = get_db()
        db.replace_view(
            'v_text',
            properties={
                'links': {
                    'html_text': {
                        'fields': {
                            'uid': {'analyzers': ['identity']},
                            'lang': {'analyzers': ['identity']},
                        }
                    },
                    'sc_bilara_texts': {
                        'fields': {
                            'uid': {'analyzers': ['identity']},
                            'lang': {'analyzers': ['identity']},
                        }
                    },
                }
            },
        )
