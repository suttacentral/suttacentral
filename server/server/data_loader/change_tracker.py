import hashlib
import inspect

class ChangeTracker:
    def __init__(self, base_dir, db):
        self.base_dir = base_dir
        self.db = db
        
        self.old_function_hashes = {doc['_key']: doc['hash'] for doc in db.aql.execute('''
            FOR doc IN function_hashes
                RETURN doc
        ''')}
        self.new_function_hashes = {}
        
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
    
    def is_any_function_changed(self, functions):
        return any(self.is_function_changed(function) for function in functions)
    
    def is_function_changed(self, function):
        key = f'{function.__module__}.{function.__qualname__}'
        
        # Generate a hash for the function using the source lines
        # this is obviously not foolproof
        function_source = ''.join(inspect.getsourcelines(function)[0])
        function_hash = hashlib.md5(function_source.encode()).hexdigest()
        
        self.new_function_hashes[key] = function_hash
        if self.old_function_hashes.get(key) == function_hash:
            return False
        return True        

    def update_mtimes(self):
        # Update mtimes in arangodb
        if self.deleted:
            self.db.aql.execute('''FOR entry IN mtimes 
                                FILTER entry.path IN @to_remove 
                                REMOVE entry IN mtimes''', bind_vars={'to_remove': list(self.deleted)})

        self.db['mtimes'].import_bulk(
            [{'path': k, 'mtime': v, '_key': k.replace('/', '_')} for k, v in
             self.changed_or_new.items()], on_duplicate="replace")
        self.db['function_hashes'].truncate()
        self.db['function_hashes'].import_bulk([{'_key': k, 'hash': v} for k, v in self.new_function_hashes.items()])
