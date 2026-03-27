from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'update_text_search_view_028'
    tasks = ['update_view']

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
                }
            },
        )
