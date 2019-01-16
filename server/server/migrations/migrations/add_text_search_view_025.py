from common.arangodb import get_db
from migrations.base import Migration

class SecondMigration(Migration):
    migration_id = 'add_text_search_view_025'
    tasks = ['create_view']

    def create_view(self):
        db = get_db()
        db.create_view(
            'v_text',
            view_type='arangosearch',
            properties={
                'links': {
                    'html_text': {
                        'fields': {
                            'uid': {
                                'analyzers': ['identity']
                            },
                            'lang': {
                                'analyzers': ['identity']
                            }
                        }
                    },
                    'po_strings': {
                        'fields': {
                            'uid': {
                                'analyzers': ['identity']
                            },
                            'lang': {
                                'analyzers': ['identity']
                            }
                        }
                    }
                }
            }
        )