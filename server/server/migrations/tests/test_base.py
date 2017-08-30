import pytest

from common.utils import app_context
from migrations.base import Migration as BaseMigration
from migrations.exceptions import MigrationException


class TestBaseMigrationClass:
    def test_cant_run_without_migration_id_set(self):

        class T(BaseMigration):
            tasks = ['test']

        with pytest.raises(MigrationException):
            T()

    def test_cant_run_without_tasks(self):

        class T(BaseMigration):
            migration_id = '123'

        with pytest.raises(MigrationException):
            T()

    def test_cant_run_base_migration(self):
        with pytest.raises(MigrationException):
            BaseMigration()

    @app_context
    def test_run_all_tasks(self):
        names = []
        tasks_to_run = ['sample_task', 'sample_task_2']

        class T(BaseMigration):
            migration_id = 'test_001'
            tasks = tasks_to_run

            def sample_task(self):
                names.append('sample_task')

            def sample_task_2(self):
                names.append('sample_task_2')

        T().run()

        assert names == tasks_to_run
