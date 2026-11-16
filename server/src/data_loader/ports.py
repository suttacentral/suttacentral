"""
Ports for a ports-and-adapters approach
"""
from pathlib import Path
from typing import Protocol, Iterable, Iterator


class FileChangeTracker(Protocol):
    def is_file_new_or_changed(self, path: Path, check_calling_function: bool = True) -> bool:
        ...

    def is_any_file_new_or_changed(self, files: list[Path], check_calling_function: bool = True) -> bool:
        ...

    def changed_files(self, paths: Iterable[Path]) -> Iterator[Path]:
        ...
