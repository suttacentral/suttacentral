from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_ebs_names_053'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        ebs_names = db.create_collection('ebs_names', False)

        ebs_names_indexes = (
            ('uid',),
            ('lang',),
            ('uid', 'lang')
        )

        for name_idx in ebs_names_indexes:
            ebs_names.add_hash_index(
                fields=name_idx,
                unique=False
            )
