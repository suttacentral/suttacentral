from flask_script import Manager

from app import app
from migrations.runner import run_migrations

manager = Manager(app)


@manager.command
def migrate():
    print('Running migrations')
    run_migrations()
    print('DONE')


@manager.command
def list_routes():
    """
    Lists all available routes/URLs.
    """
    import urllib
    output = []
    for rule in app.url_map.iter_rules():

        options = {}
        for arg in rule.arguments:
            options[arg] = "[{0}]".format(arg)

        methods = ','.join(rule.methods)
        line = urllib.parse.unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, rule))
        output.append(line)

    for line in sorted(output):
        print(line)


@manager.command
def load_data(force=False):
    """
    Loads data from the data repo to database.
    Args:
        force: Whether or not force clean db setup.
    """
    from data_loader.arangoload import run
    run(force)


@manager.command
def index_elasticsearch():
    from search.texts import update
    update()


if __name__ == '__main__':
    manager.run()
