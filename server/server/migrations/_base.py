from datetime import datetime

from common.arangodb import get_db


class Migration:
    """
    Base class for migration. In order to create new migration follow those steps:
        1. Create file named <name>_<id of the last migration +1>.py
        2. Add this line at the top of the file:
            'from ._base import Migration'
        3. Create class that inherits from Migration class
        4. Set migration_id class atribute to match the file name
        5. create some tasks. Each task should be separate method
         accepting only 'self' as a parameter.
        6. Set tasks = ['first_task', 'second_task', ...] in class attributes.
        7. You are good to go just remember to never change the 'migration_id'
        otherwise your migrations might fail.
    """
    migration_id = None
    tasks = None
    migrations_collection = 'migrations'

    def __init__(self):
        """
        Migration base class. Run all methods that starts with.
        """
        if self.migration_id is None:
            raise Exception('Every migrations has to have `migration_id`')
        if self.tasks is None:
            raise Exception('Every migrations has to have `tasks` list')

    def run(self):
        """
        Run all tasks from self.tasks list in given order.
        """
        db = get_db()
        if not db.collection(self.migrations_collection).has(self.migration_id):
            print(f'  * Running {self.migration_id}')
            for task in self.tasks:
                getattr(self, task)()
            self.end_migrations()

    def end_migrations(self):
        """
        Run at the end of each migration file
        and add document to the db about finishing the migrations.
        """
        db = get_db()
        migrations = db.collection(self.migrations_collection)
        migrations.insert({
            '_key': self.migration_id,
            'date': str(datetime.now())
        })
