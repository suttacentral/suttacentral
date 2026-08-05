from collections.abc import Iterable, Iterator
from pathlib import Path

from arango.database import Database


class ChangeTracker:
    def __init__(self, base_dir: Path, db: Database):
        self.base_dir = base_dir
        self.db = db

        # Extract the mtimes from arangodb
        self.old_mtimes = {
            entry['path']: entry['mtime']
            for entry in db.aql.execute(
                '''
        FOR entry in mtimes
            RETURN entry
        '''
            )
        }

        # Get the mtimes from the file system
        self.new_mtimes = {}
        for path in base_dir.glob('**/*'):
            if path.is_dir():
                continue
            self.new_mtimes[str(path.relative_to(base_dir))] = path.stat().st_mtime_ns

        self.deleted = set(self.old_mtimes).difference(self.new_mtimes)
        self.changed_or_new = {}

        for path, mtime in self.new_mtimes.items():
            if mtime != self.old_mtimes.get(path):
                self.changed_or_new[path] = mtime
        print(f'{len(self.changed_or_new)} files to be processed')
        print(f'{len(self.deleted)} files to be deleted')

    def is_file_new_or_changed(self, path: Path) -> bool:
        return str(path.relative_to(self.base_dir)) in self.changed_or_new

    def is_any_file_new_or_changed(self, files: list[Path]) -> bool:
        return any(self.is_file_new_or_changed(file) for file in files)

    def changed_files(self, paths: Iterable[Path]) -> Iterator[Path]:
        for path in paths:
            if self.is_file_new_or_changed(path):
                yield path

    def update_mtimes(self) -> None:
        # Update mtimes in arangodb
        if self.deleted:
            self.db.aql.execute(
                '''FOR entry IN mtimes 
                                FILTER entry.path IN @to_remove 
                                REMOVE entry IN mtimes''',
                bind_vars={'to_remove': list(self.deleted)},
            )

        self.db['mtimes'].import_bulk_logged(
            [
                {'path': k, 'mtime': v, '_key': k.replace('/', '_')}
                for k, v in self.changed_or_new.items()
            ],
            on_duplicate="replace",
        )
