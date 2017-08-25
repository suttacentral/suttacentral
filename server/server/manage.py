from app import app
from flask_script import Manager

from migrations._runner import run_migrations

manager = Manager(app)


@manager.command
def migrate():
    print('Running migrations')
    run_migrations()
    print('DONE')


if __name__ == '__main__':
    manager.run()
