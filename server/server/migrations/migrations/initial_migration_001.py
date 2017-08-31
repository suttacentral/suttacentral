from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'initial_migration_001'
    tasks = ['sample_task']

    def sample_task(self):
        """
        Just a sample task.
        """
        pass

