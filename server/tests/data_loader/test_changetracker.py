import pytest
from arango.database import Database

import common.utils
from common import arangodb
from data_loader.change_tracker import ChangeTracker

@pytest.fixture
def mtimes_db():
    app_ = common.utils.current_app()
    app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

    with app_.app_context():
        db = arangodb.get_db()
        db.collection('mtimes').truncate()
        yield db


class TestIsFileNewOrChanged:
    def test_true_when_new(self, mtimes_db, tmp_path):
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        tracker.update_mtimes()
        new_file = tmp_path / 'new_file.txt'
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        assert tracker.is_file_new_or_changed(path=new_file)

    def test_true_when_changed(self, mtimes_db, tmp_path):
        new_file = tmp_path / 'new_file.txt'
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        tracker.update_mtimes()
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        assert tracker.is_file_new_or_changed(path=new_file)

    def test_false_when_not_new_or_changed(self, mtimes_db, tmp_path):
        new_file = tmp_path / 'new_file.txt'
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        tracker.update_mtimes()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        assert not tracker.is_file_new_or_changed(path=new_file)


class TestIsAnyFileNewOrChanged:
    def test_true_when_one_new(self, mtimes_db, tmp_path):
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        tracker.update_mtimes()
        new_file = tmp_path / 'new_file.txt'
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        assert tracker.is_any_file_new_or_changed(files=[new_file])

    def test_true_when_one_changed(self, mtimes_db, tmp_path):
        new_file = tmp_path / 'new_file.txt'
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        tracker.update_mtimes()
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        assert tracker.is_any_file_new_or_changed(files=[new_file])

    def test_false_when_none_new_or_changed(self, mtimes_db, tmp_path):
        new_file = tmp_path / 'new_file.txt'
        new_file.touch()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        tracker.update_mtimes()
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        assert not tracker.is_any_file_new_or_changed(files=[new_file])


class TestChangeTracker:
    def test_adding_file_to_mtimes_collection_makes_it_not_changed(self, mtimes_db, tmp_path):
        new_file = tmp_path / 'new_file.txt'
        new_file.touch()
        mtimes_doc = {
            '_key': 'new_file.txt',
            'path': 'new_file.txt',
            'mtime': new_file.stat().st_mtime_ns,
            }
        mtimes_db.collection('mtimes').insert(mtimes_doc)
        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        assert not tracker.is_file_new_or_changed(path=new_file)

    def test_changed_files(self, mtimes_db, tmp_path):
        unchanged = [
            tmp_path / 'abc.txt',
            tmp_path / 'def.txt',
            tmp_path / 'hij.txt',
        ]

        for path in unchanged:
            path.touch()

        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)
        tracker.update_mtimes()

        changed = [
            tmp_path / '123.txt',
            tmp_path / '456.txt',
            tmp_path / '789.txt',
        ]

        for path in changed:
            path.touch()


        tracker = ChangeTracker(base_dir=tmp_path, db=mtimes_db)

        to_check = [
            tmp_path / 'abc.txt',
            tmp_path / '123.txt',
        ]

        assert list(tracker.changed_files(to_check)) == [tmp_path / '123.txt']