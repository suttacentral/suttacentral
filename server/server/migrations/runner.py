import os
from pathlib import Path
import importlib
from inspect import getmembers, isclass
from .base import Migration
from common.arangodb import get_db, get_client
from arango.exceptions import CollectionCreateError, DatabaseCreateError
from app import app

MIGRATIONS_FOLDER = 'migrations'


def run_migrations():
    """
    Run all migrations that hasn't been ran yet,
    that are not in the database in collection set in ._base.Migration class.
    """
    _ensure_sutta_db_exists()
    _ensure_migration_collection_exists()

    file_dir = Path(os.path.dirname(os.path.abspath(__file__))) / MIGRATIONS_FOLDER
    # get all .py in migrations dir
    migration_files = sorted(file_dir.glob('[!_]*.py'), key=_get_file_id)
    for file in migration_files:
        _run_migration(file)


def _run_migration(file_path: Path):
    MigrationSubCls = _import_migration_class(file_path)
    MigrationSubCls().run()


def _import_migration_class(file_path: Path):
    """
    :return: Class object of Migrate subclass
    """
    # Remove .py extension from file name
    module_name = file_path.name.rstrip(file_path.suffix)
    # Import migration file/module
    migrations = importlib.import_module(f'migrations.{MIGRATIONS_FOLDER}.{module_name}')
    # Get class that inherits from Migration class
    migration_classes = getmembers(migrations,
                                   lambda cls: isclass(cls) and issubclass(cls, Migration))
    # filter out base class from results and get class object
    migration_class = [migration_cls for migration_cls in migration_classes if
                       migration_cls[0] != 'Migration'][0][1]
    return migration_class


def _get_file_id(file_name: Path) -> int:
    """
    Extract and returns file id. eg:
    >>>_get_file_id(Path('initial_migration_0001.py'))
    >>> 1
    """
    name = file_name.name.rstrip(file_name.suffix)
    return int(name.split('_')[-1])


def _ensure_migration_collection_exists():
    """
    Creates migration collection if it does not exists yet.
    """
    db = get_db()
    try:
        db.create_collection(Migration.migrations_collection, user_keys=True)
    except CollectionCreateError as e:
        if '[ERR 1207] duplicate name' not in str(e):
            raise e


def _ensure_sutta_db_exists():
    """
    Creates db if it does not exists yet.
    """
    client = get_client()
    db_name = app.config.get('ARANGO_DB')
    try:
        client.create_database(db_name)
    except DatabaseCreateError as e:
        if '[ERR 1207] duplicate name' not in str(e):
            raise e
