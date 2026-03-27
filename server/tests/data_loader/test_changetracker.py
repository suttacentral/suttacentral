import common.utils
from common import arangodb
from data_loader.change_tracker import whoami, who_is_calling, function_source, ChangeTracker


def test_whomai():
    assert whoami() == test_whomai


class Foo:
    def method_returning_caller(self):
        return who_is_calling()

    def method_returns_itself(self):
        return whoami()


def test_method_call():
    foo = Foo()
    assert foo.method_returning_caller() == test_method_call
    assert foo.method_returns_itself() == Foo.method_returns_itself


def test_nested_call():
    def nested_returning_itself():
        return whoami()

    def nested_returning_caller():
        return who_is_calling()

    assert nested_returning_itself() == nested_returning_itself
    assert nested_returning_caller() == test_nested_call


def test_function_source():
    def bar():
        pass

    assert function_source(bar) == '    def bar():\n        pass\n'

class TestChangeTracker:
    def test_new_file_is_changed(self, tmp_path):
        app_ = common.utils.current_app()
        app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

        with app_.app_context():
            db = arangodb.get_db()
            db.collection('mtimes').truncate()

            tracker = ChangeTracker(base_dir=tmp_path, db=db)
            tracker.update_mtimes()

            new_file = tmp_path / 'new_file.txt'
            new_file.touch()

            tracker = ChangeTracker(base_dir=tmp_path, db=db)

            assert tracker.is_file_new_or_changed(path=new_file, check_calling_function=False)

    def test_old_file_is_not_changed(self, tmp_path):
        app_ = common.utils.current_app()
        app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

        with app_.app_context():
            db = arangodb.get_db()
            db.collection('mtimes').truncate()

            new_file = tmp_path / 'new_file.txt'
            new_file.touch()

            tracker = ChangeTracker(base_dir=tmp_path, db=db)
            tracker.update_mtimes()

            tracker = ChangeTracker(base_dir=tmp_path, db=db)

            assert not tracker.is_file_new_or_changed(path=new_file, check_calling_function=False)

    def test_adding_file_to_mtimes_collection_makes_it_not_changed(self, tmp_path):
        app_ = common.utils.current_app()
        app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

        with app_.app_context():
            db = arangodb.get_db()
            db.collection('mtimes').truncate()

            new_file = tmp_path / 'new_file.txt'
            new_file.touch()

            mtimes_doc = {
                '_key': 'new_file.txt',
                'path': 'new_file.txt',
                'mtime': new_file.stat().st_mtime_ns,
                }

            db.collection('mtimes').insert(mtimes_doc)

            tracker = ChangeTracker(base_dir=tmp_path, db=db)
            assert not tracker.is_file_new_or_changed(path=new_file, check_calling_function=False)

    def test_changed_files(self, tmp_path):
        app_ = common.utils.current_app()
        app_.config['ARANGO_DB'] = 'suttacentral_data_load_tests'

        with app_.app_context():
            db = arangodb.get_db()
            db.collection('mtimes').truncate()

            unchanged = [
                tmp_path / 'abc.txt',
                tmp_path / 'def.txt',
                tmp_path / 'hij.txt',
            ]

            for path in unchanged:
                path.touch()

            tracker = ChangeTracker(base_dir=tmp_path, db=db)
            tracker.update_mtimes()

            changed = [
                tmp_path / '123.txt',
                tmp_path / '456.txt',
                tmp_path / '789.txt',
            ]

            for path in changed:
                path.touch()


            tracker = ChangeTracker(base_dir=tmp_path, db=db)

            to_check = [
                tmp_path / 'abc.txt',
                tmp_path / '123.txt',
            ]

            assert list(tracker.changed_files(to_check)) == [tmp_path / '123.txt']