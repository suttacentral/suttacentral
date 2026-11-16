from pathlib import Path

from fakes import FakeFileChangeTracker


class TestFakeFileChangeTracker:
    def test_file_not_changed(self):
        tracker = FakeFileChangeTracker()
        path = Path('/foo')
        assert tracker.is_file_new_or_changed(path) is False

    def test_file_is_changed(self):
        tracker = FakeFileChangeTracker()
        path = Path('/foo')
        tracker.change_file(path)
        assert tracker.is_file_new_or_changed(path) is True

    def test_any_file_not_changed(self):
        tracker = FakeFileChangeTracker()
        paths = [Path('/foo'), Path('/bar')]
        assert tracker.is_any_file_new_or_changed(paths) is False

    def test_any_file_is_changed(self):
        tracker = FakeFileChangeTracker()
        paths = [Path('/foo'), Path('/bar')]
        tracker.change_file(Path('/foo'))
        assert tracker.is_any_file_new_or_changed(paths) is True

    def test_yield_changed_files(self):
        tracker = FakeFileChangeTracker()
        paths = [Path('/foo'), Path('/bar'), Path('/baz')]
        tracker.change_file(Path('/foo'))
        tracker.change_file(Path('/baz'))
        assert sorted(list(tracker.changed_files(paths))) == [Path('/baz'), Path('/foo')]
