import regex
import logging
from collections import defaultdict
from data_loader.util import humansortkey


# This regex will identify a prefix and numerical ranges. Uses backreferences to be more magical.
# can dn1, an1.1-10, an1.1-10
decompose_rex = regex.compile(r'(?<prefix>[a-z]++.*?)(?<num_start>\d+)(?:-\1?(?<num_end>\d+))?$')

# this regex deals with the rather insane case like an1.188-197-an1.219-234
decompose_x_rex = regex.compile(r'(?<prefix>[a-z]++.*?)(?<num_start>\d+)(?:-\d+-\1\d+-(?<num_end>\d+))$')

# If this regex matches the uid itself is probably bad
duplicate_string_rex = regex.compile(r'(\b[a-z]++\d*\b).*\1')

bookmark_stripper_rex = regex.compile(r'-?#[\w.]+(?:-\d+[.\d]*)?')

def strip_bookmark(uid):
    return bookmark_stripper_rex.sub('', uid)

class UidMatcher:
    def __init__(self, all_uids):
        self.populate(all_uids)            
        self.all_uids = set(all_uids)
        
    def decompose(self, uid):
        num_start = None
        num_end = None
        
        m = decompose_rex.match(uid)
        if m:
            # Test for an edge case that is handled incorrectly
            m2 = decompose_x_rex.match(uid)
            if m2:
                m = m2
            
            prefix = m['prefix']
            if duplicate_string_rex.match(prefix):
                logging.error(f'Prefix {prefix} determined for uid {uid}, malformed uid suspected')
            if prefix.endswith('-'):
                # This handles cases like "sa-2"
                prefix += m[2]
            else:
                num_start = int(m["num_start"])
                num_end = int(m["num_end"]) if m["num_end"] else num_start
                if num_end < num_start:
                    logging.error(f'Uid {uid} appears to contain a range, but the {num_end} < {num_start}')
            prefix = prefix.rstrip('.')
        else:
            prefix = uid
        
        return {"uid": uid,
                "prefix": prefix,
                "num_start": num_start,
                "num_end": num_end}
    
    def populate(self, uids):
        docs = [self.decompose(uid) for uid in uids]
        self.prefix_index = defaultdict(list)
        for doc in docs:
            if doc['num_start'] is None:
                continue
            self.prefix_index[doc['prefix']].append(doc)
    
    def get_matching_uids(self, uid):
        uid = strip_bookmark(uid)
        if uid in self.all_uids:
            return [uid]
        decomposed = self.decompose(uid)
        
        matches = sorted(self.range_query(**decomposed), key=humansortkey)
        if matches:
            return matches
        prefix = decomposed['prefix']
        if prefix in self.all_uids:
            return [prefix]
        return self.prefix_query(prefix)
    
    def range_query(self, prefix, num_start, num_end, uid):
        candidates = self.prefix_index.get(prefix, [])
        for doc in candidates:
            if (num_start <= doc['num_end'] and num_end >= doc['num_start'] or
                doc['num_start'] <= num_end and doc['num_end'] >= num_start):
                    yield doc['uid']
    
    def prefix_query(self, prefix):
        return [doc['uid'] for doc in self.prefix_index.get(prefix, [])]
        
