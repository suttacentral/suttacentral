import json
import regex
import hashlib
import logging
from colorama import Fore, Back
from collections import OrderedDict, defaultdict
from itertools import tee

import sc
import tools.html
from sc.util import humansortkey
from sc.csv_loader import csv_dict_reader

logger = logging.getLogger(__name__)

source_dir = sc.base_dir / 'newdata'
db_dir = sc.db_dir / 'forest'

def pairwise(iterable):
    a,b = tee(iterable)
    next(b, None)
    return list(zip(a, b))
    

if not db_dir.exists():
    db_dir.mkdir()

class Node(dict):
    """ A Node is dict with properties
    
    The dictionary key/values are serializable
    It also has helper *properties* that contain information
    that can be readily deduced from the structure and so do not
    need to be serialized, or cannot be serialized due to 
    circular references.
    
    """
    
    def __init__(self, *, parent=None, depth=0, raw=False):
        self.parent = parent
        self.raw = raw
        self.depth = depth
        self.types = {}
        self.children_type = None
    
    def ancestors(self, uid):
        if not self.parent:
            return
        yield self.parent
        yield from self.parent.ancestors
    
    def has_as_ancestor(self, uid):
        if not self.parent:
            return False
        elif self.parent['uid'] == uid:
            return True
        elif self.parent.has_as_ancestor(uid):
            return True
        else:
            return False

class Forest:        
    version = 5
    def __init__(self, source_dir, db_dir):
        self.print('Loading Data Trees')
        self.mapping = defaultdict(list)
        self.parents = defaultdict(list)
        self.root_level_stems = [f.stem for f in source_dir.glob('*.json')]
        self.top_level_stems = [f.stem for f in source_dir.glob('*/*.json')]
        self.top_level_objects = {}
        self._file_to_object_mapping = {}
        self.source_dir = source_dir
        
        self._root = self.load_tree(target=source_dir)
        self.scan_html_files(data_cache_file = db_dir / 'data_cache.json')
        self.print('Building Mapping')
        self.build_mapping(self._root)
        self.print('Assigning types and properties')
        self.add_types(self._root)
        self.print('Everything Okay')
        self.mapping = dict(self.mapping)
        self.parents = dict(self.parents)
        
    
    def make_file_key(self, file):
        key = str(file) + str(file.stat().st_mtime) + str(self.version)
        return hashlib.sha1(key.encode()).hexdigest()[:12]
    
    def print(self, *args, **kwargs):
        print(Fore.WHITE + Back.GREEN + 'Forest:' + Fore.RESET + Back.RESET, *args, **kwargs)
        
    def load_raw(self, *, target, parent=None, depth=0):
        if target.suffix == '.json':
            with target.open('r', encoding='utf8') as f:
                data = json.load(f)
            out = Node(depth=depth)
            out['uid'] = target.stem
            out['data'] = data
            out.parent = parent
            out.raw = True
            return out

    def load_tree(self, *, target, parent=None, depth=0):
        uid = target.stem
        out = Node(depth=depth)
        out['uid'] = uid
        
        
        if target.is_dir():
            # A DIR becomes a new level, with the contents being the children
            children = []
            for child in sorted(target.iterdir(), key=lambda f: humansortkey(f.stem)):
                if child.stem in self.root_level_stems:
                    children.append(self.load_raw(target=child, parent=out, depth=depth+1))
                else:
                    children.append(self.load_tree(target=child, parent=out, depth=depth+1))
            
            out['children'] = [child for child in children if child]
        
        elif target.suffix == '.json':
            print('{} is json data'.format(target.name))
            # JSON is treated variably depending whether it is Array or Object
            with target.open('r', encoding='utf8') as f:
                data = json.load(f)
            if isinstance(data, list):
                
                out['children'] = self.promote_json_types(data)
            elif isinstance(data, dict):
                type_name = target.stem
                parent.types[type_name] = data
                return None
            else:
                raise ValueError('Malformed JSON Data in {}'.format(target.relative_to(self.source_dir)))
        # CSV
        elif target.suffix == '.csv':
            # CSV files are treated the same as JSON Object
            type_name = target.stem
            data = csv_dict_reader(target)
            parent.types[type_name] = {d.pop('uid'): d for d  in data}
            
            
            
        # HTML
        elif target.suffix == '.html':
            out['file'] = str(target.relative_to(self.source_dir))
            self._file_to_object_mapping[target] = out

        return out
    
    def promote_json_types(self, data):
        if isinstance(data, list):
            return [self.promote_json_types(child) for child in data]
        elif isinstance(data, dict):
            node = Node()
            for k, v in data.items():
                node[k] = self.promote_json_types(v)
            return node
        else:
            return data
    
    def build_mapping(self, obj):
        if 'uid' in obj:
            self.mapping[obj['uid']].append(obj)
        if 'children' in obj:
            for i, child in enumerate(obj['children']):
                if isinstance(child, str):
                    child = self.mapping[child]
                    obj[i] = child
                try:
                    child.parent = obj
                except AttributeError:
                    print(child)
                    raise
                self.build_mapping(child)
    
    def add_types(self, obj):
        self.add_types_inner(obj)
        if 'children' in obj:
            for child in obj['children']:
                self.add_types(child)
    
    def add_types_inner(self, to_obj, from_obj=None):
        if not from_obj:
            from_obj = to_obj.parent
            if not from_obj:
                return
        uid = to_obj['uid']
        for type_name, type_mapping in from_obj.types.items():
            if uid in type_mapping:
                to_obj['type'] = type_name
                if isinstance(type_mapping[uid], str):
                    to_obj['name'] = type_mapping[uid]
                else:
                    to_obj.update(type_mapping[uid])
        if from_obj.parent:
            self.add_types_inner(to_obj, from_obj.parent)
    
    def scan_html_files(self, data_cache_file):
        
        # Load Cache
        
        file_data_cache = None
        
        try:
            with data_cache_file.open('r', encoding='utf8') as f:
                file_data_cache = json.load(f)
        except (FileNotFoundError, json.decoder.JSONDecodeError, RecursionError) as e:
            pass
        
        if not type(file_data_cache) == dict:
            file_data_cache = {}
        
        # This is to check what contents of the cache are used
        seen = set()
        
        unexamined_files = []
        
        for file, obj in self._file_to_object_mapping.items():
            file_key = self.make_file_key(file)
            if file_key in file_data_cache:
                obj.update(self.promote_json_types(file_data_cache[file_key]))
                
                seen.add(file_key)
            else:
                unexamined_files.append( (file_key, file) )
        
        # clear cache of obsolete entries
        for key in list(file_data_cache):
            if key not in seen:
                del file_data_cache[key]
        
        if len(unexamined_files) > 0:
            self.print('{} new or modified text files to be scanned'.format(len(unexamined_files)))
        else:
            self.print('No new or modified text files')
        
        try:
            for file_key, file in unexamined_files:
                print('Forest: Extracting data from {!s}'.format(file.relative_to(self.source_dir)))
                root = sc.tools.html.parse(str(file)).getroot()
                name = self._get_name(root, file)
                file_data = {
                    'name': name
                }
                children = self._get_children(root, file)
                if children:
                    file_data['children'] = children
                
                self._file_to_object_mapping[file].update(file_data)
                
                file_data_cache[file_key] = file_data
        
        finally:
            # Even if the processing is aborted, we want to save what
            # has been done so far.
            with data_cache_file.open('w', encoding='utf8') as f:
                json.dump(file_data_cache, f, ensure_ascii=False, indent=2)            
            
    def _get_name(self, root, file):
        try:
            hgroup = root.select_one('.hgroup')
            h1 = hgroup.select_one('h1')
            return regex.sub(r'^\P{alpha}*', '', h1.text_content())
        except Exception as e:
            logger.warn('Could not determine name for {!s}'.format(file.relative_to(self.source_dir)))
            return ''
    
    def _get_children(self, root, file):
        elements = root.cssselect('[data-uid]')
        
        children = []
        
        mapping = OrderedDict()
        
        for element in elements:
            uid = element.get('data-uid') or element.get('id')
            if not uid:
                logger.warn('Could not determine uid in {!s} in element {!r}'.format(file.relative_to(self.source_dir), element.attrib))
                continue
            name = element.get('data-name')
            if name is None:
                name = element.text_content()
                if name.isspace():
                    name = ""
            
            type_ = element.get('data-type') or ""
            
            mapping[uid] = Node()
            mapping[uid].update({"uid": uid, 
                            "name": name,
                            "type": type_,
                            "bookmark": element.get('id'),
                            })
        
        # Now assign children
        
        # use divide and conquer to form into groups by type
        def determine_children(*, objs):
            if len(objs) == 0:
                return None
            if len(objs) == 1:
                return objs
                
            children = []
            children_type = objs[0]['type']
            children_indexes = []
            for i, child_obj in enumerate(objs):
                if child_obj['type'] == children_type:
                    children.append(child_obj)
                    children_indexes.append(i)
                    
            children_indexes.append(len(objs))
            
            for start, end in pairwise(children_indexes):
                grandchildren = determine_children(objs=objs[start+1:end])
                if grandchildren:
                    objs[start]['children'] = grandchildren
            
            return children
        return determine_children(objs=list(mapping.values()))
            
class API:
    def __init__(self, forest):
        self.forest = forest
        self._subtree_hash_cache = {}
    
    def uids(self, *uids):
        if not uids:
            return {}
        depth = None
        if isinstance(uids[-1], int) or uids[-1].isdigit():
            depth = int(uids[-1])
            uids = uids[:-1]
        
        results = self.get_by_uids(*uids)
        
        pruned_results = [self.make_pruned_subtree(obj=obj, depth=depth) for obj in results]
        for obj, result in zip(results, pruned_results):
            result['ancestors'] = self.get_ancestors(obj)
            
        return pruned_results
    
    def make_pruned_subtree(self, obj, depth):
        parent_obj = obj.parent
        obj = dict(obj)
        if 'children' in obj:            
            if depth == 0:
                obj['children'] = len(obj['children'])
            else:
                if depth is not None:
                    depth = depth - 1
                obj['children'] = [self.make_pruned_subtree(child, depth) for child in obj['children']]

        return obj
    
    def get_ancestors(self, obj):
        ancestors = []
        
        parent_obj = obj.parent
        while parent_obj:
            parent_copy = dict(parent_obj)
            del parent_copy['children']
            ancestors.append(parent_copy)
            if parent_obj['uid'] == 'root':
                break
            parent_obj = parent_obj.parent
        return ancestors
    
    def get_by_uids(self, *uids):
        uids = set(uids)
        
        results = []
        
        for uid in uids:
            other_uids = uids.difference({uid})
            for obj in self.forest.mapping[uid]:
                for other_uid in other_uids:
                    if not obj.has_as_ancestor(other_uid):
                        break
                else:
                    results.append(obj)
        return results
        
    def get_by_uids_wildcard(self, *uids):
        keys = self.forest.mapping.keys()
        wildcard_uids = None
        filter_uids = []
        for uid in uids:
            if '*' in uid:
                if wildcard_uids is not None:
                    raise ValueError('In a wildcard query only one entry may contain wildcards')
                
                rex = regex.compile(uid.replace('*', '.*'))
                wildcard_uids = [u for u in keys if rex.fullmatch(uid)]
            else:
                filter_uids.append(uid)
        
        results = []
        
        for uid in wildcard_uids:
            results.extend(self.get_by_uids(uid, *filter_uids))
        
        return results
    
    def get_subtree_hash(self, *uids):
        key = tuple(uids)
        if key not in self._subtree_hash_cache:
            subtree = self.get_by_uids(*uids)
            self._subtree_hash_cache[key] = hashlib.blake2s(json.dumps(subtree, sort_keys=1, ensure_ascii=0).encode(encoding='utf8')).hexdigest()[:12]
            
        return self._subtree_hash_cache[key]
        
            
forest = Forest(source_dir=source_dir, db_dir=db_dir)
api = API(forest=forest)
