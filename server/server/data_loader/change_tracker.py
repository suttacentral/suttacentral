import hashlib
import inspect
import gc

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

    def is_file_new_or_changed(self, path, check_calling_function=True):
        if check_calling_function:
            if self.is_function_changed(who_is_calling()):
                return True
        if str(path.relative_to(self.base_dir)) in self.changed_or_new:
            return True
        return False

    def is_any_file_new_or_changed(self, files, check_calling_function=True):
        if check_calling_function:
            if self.is_function_changed(who_is_calling()):
                return True
        return any(self.is_file_new_or_changed(file, False) for file in files)
    
    def is_any_function_changed(self, functions):
        return any(self.is_function_changed(function) for function in functions)
    
    def is_function_changed(self, function):
        key = f'{function.__module__}.{function.__qualname__}'
        
        # Generate a hash for the function using the source lines
        # this is obviously not foolproof
        
        function_hash = hashlib.md5(function_source(function).encode()).hexdigest()
        
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
        


def function_source(function):
    return ''.join(inspect.getsourcelines(function)[0])

def who_is_calling(depth=2):
    """Return the object for the executing function at given stack depth
    
    adapted from https://stackoverflow.com/a/4506081/4092906
    """
    frame_info = inspect.stack()[depth]
    frame = frame_info.frame
    code  = frame.f_code
    globs = frame.f_globals
    functype = type(lambda: 0)
    funcs = []
    for func in gc.get_referrers(code):
        if type(func) is functype:
            if getattr(func, "__code__", None) is code:
                if getattr(func, "__globals__", None) is globs:
                    funcs.append(func)
                    if len(funcs) > 1:
                        return None
    return funcs[0] if funcs else None

def whoami():
    return who_is_calling(depth=2)
