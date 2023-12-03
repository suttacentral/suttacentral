from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_expanded_sutta_uids_054'
    tasks = ['create_collections']

    def create_collections(self):
        db = get_db()
        expanded_sutta_uids = db.create_collection('expanded_sutta_uids', False)

        expanded_sutta_uids_indexes = (
            ('range_uid',),
            ('expanded_uids',)
        )

        for name_idx in expanded_sutta_uids_indexes:
            expanded_sutta_uids.add_hash_index(
                fields=name_idx,
                unique=False
            )
