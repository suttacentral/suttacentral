from common.arangodb import get_db
from ._base import Migration


class InitialMigration(Migration):
    migration_id = 'initial_migration_001'
    tasks = ['create_collections']

    def create_collections(self):
        """
        Creates collections of suttas and collection of edges between them.
        """
        db = get_db()
        graph = db.create_graph('suttas_graph')
        suttas = graph.create_vertex_collection('suttas')
        parallels = graph.create_edge_definition(
            name='parallels',
            from_collections=['suttas'],
            to_collections=['suttas']
        )

