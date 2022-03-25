from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_editions_043'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()


        db.create_collection('publications_v2', False)
        db.create_collection('publication_editions', False)


        db.collection('publications_v2').add_persistent_index(['publication_number'])
        db.collection('publication_editions').add_persistent_index(['publication_number'])