from pathlib import Path

from common.arangodb import get_client, get_system_db, get_db
from common.utils import app_context, empty_arango
from migrations import base, runner


@app_context
def test_run_migrations_and_class_import(monkeypatch):
    paths = []

    def mock__run(path):
        paths.append(path)

    monkeypatch.setattr(runner, '_run_migration', mock__run)

    runner.run_migrations()
    assert len(paths) != 0

    migration_class = runner._import_migration_class(paths[0])
    assert issubclass(migration_class, base.Migration)


def test_get_file_id():
    path = Path('test_123')
    assert runner._get_file_id(path) == 123


@app_context
def test_ensure_migration_collection_exists():
    db = get_db()
    collection = base.Migration.migrations_collection

    db.collection(collection)
    db.delete_collection(collection)

    runner._ensure_migration_collection_exists()

    db.collection(collection)


@empty_arango
def test_ensure_db_exists(app):
    client = get_client()

    runner._ensure_sutta_db_exists()
    client.db(app.config.get('ARANGO_DB'))  # No error means that the db has been created.
