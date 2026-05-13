from pathlib import Path
from typing import Iterable, Iterator

from data_loader.ports import FileChangeTracker


class FakeFileChangeTracker(FileChangeTracker):
    def __init__(self):
        self._changed_files: list[Path] = []

    def change_file(self, path: Path) -> None:
        self._changed_files.append(path)

    def is_file_new_or_changed(self, path: Path, check_calling_function: bool = True) -> bool:
        return path in self._changed_files

    def is_any_file_new_or_changed(self, files: list[Path], check_calling_function: bool = True) -> bool:
        return any(self.is_file_new_or_changed(file) for file in files)

    def changed_files(self, paths: Iterable[Path]) -> Iterator[Path]:
        yield from self._changed_files
