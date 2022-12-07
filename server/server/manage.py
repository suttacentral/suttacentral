from flask.cli import FlaskGroup
from common import arangodb
from migrations.runner import run_migrations

from app import app
cli = FlaskGroup(app)


@app.cli.command('load_data')
def load_data(no_pull=False):
    """
    Loads data from the data repo to database.
    """
    from data_loader.arangoload import run

    run(no_pull=no_pull)


@app.cli.command('migrate')
def migrate():
    """
    Initialize the database structure.
    """
    print('Running migrations')
    run_migrations()
    print('DONE')


@app.cli.command('list_routes')
def list_routes():
    """
    Lists all available routes/URLs.
    """
    import urllib

    output = []
    for rule in app.url_map.iter_rules():
        options = {arg: "[{0}]".format(arg) for arg in rule.arguments}
        methods = ','.join(rule.methods)
        line = urllib.parse.unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, rule))
        output.append(line)

    for line in sorted(output):
        print(line)


@app.cli.command('delete_db')
def delete_db():
    """
    Clear database data.
    """
    arangodb.delete_db(arangodb.get_db())
    from flask import current_app

    storage_dir = current_app.config.get('STORAGE_DIR')
    for file_path in storage_dir.glob('.*'):
        file_path.unlink()


@app.cli.command('index_elasticsearch')
def index_elasticsearch():
    """
    Create Elasticsearch index.
    """
    from search.texts import update

    update()


@app.cli.command('calculate_download_sizes')
def calculate_download_sizes():
    """
    Calculate download sizes.
    """
    from tools.calculate_download_size import run

    run()


@app.cli.command('hyphenate')
def hyphenate():
    """
    Hyphenate pali and san
    """
    from data_loader.arangoload import hyphenate_pali_and_san

    hyphenate_pali_and_san()


if __name__ == '__main__':
    cli()
