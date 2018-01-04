class ChangeTracker:
    def __init__(self, base_dir, db):
        self.base_dir = base_dir
        self.db = db

        # Extract the mtimes from arangodb

        self.old_mtimes = old_mtimes = {entry['path']: entry['mtime'] for entry in db.aql.execute('''
        FOR entry in mtimes
            RETURN entry
        ''')}

        # Get the mtimes from the file system

        self.new_mtimes = new_mtimes = {}
        for path in base_dir.glob('**/*'):
            if path.is_dir():
                continue
            new_mtimes[str(path.relative_to(base_dir))] = path.stat().st_mtime_ns

        self.deleted = deleted = set(old_mtimes).difference(new_mtimes)
        self.changed_or_new = changed_or_new = {}

        for path, mtime in new_mtimes.items():
            if mtime != old_mtimes.get(path):
                changed_or_new[path] = mtime
        print(f'{len(changed_or_new)} files to be processed')
        print(f'{len(deleted)} files to be deleted')

    def is_file_new_or_changed(self, path):
        if str(path.relative_to(self.base_dir)) in self.changed_or_new:
            return True
        return False

    def is_any_file_new_or_changed(self, files):
        return any(self.is_file_new_or_changed(file) for file in files)

    def update_mtimes(self):
        # Update mtimes in arangodb
        if self.deleted:
            self.db.aql.execute('''FOR entry IN mtimes 
                                FILTER entry.path IN @to_remove 
                                REMOVE entry IN mtimes''', bind_vars={'to_remove': list(self.deleted)})

        self.db['mtimes'].import_bulk(
            [{'path': k, 'mtime': v, '_key': k.replace('/', '_')} for k, v in
             self.changed_or_new.items()], on_duplicate="replace")
