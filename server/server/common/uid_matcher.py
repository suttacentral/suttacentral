import regex
import logging
from data_loader.util import humansortkey

# This regex will identify a prefix and numerical ranges. Uses backreferences to be more magical.
# can dn1, an1.1-10, an1.1-10
decompose_rex = regex.compile(r'(?<prefix>[a-z]++.*?)(?<num_start>\d+)(?:-\1?(?<num_end>\d+))?$')

# If this regex matches the uid itself is probably bad
duplicate_string_rex = regex.compile(r'(\b[a-z]++\d*\b).*\1')

class UidMatcher:
    def __init__(self, db):
        self.db = db
        self.coll = db['uids']
        
    def decompose(self, uid):
        num_start = None
        num_end = None
        bookmark = None
        
        if '#' in uid:
            uid = regex.sub(r'-?#[\w.]+', '', uid)

        m = decompose_rex.match(uid)
        if m:
            
            prefix = m['prefix']
            if duplicate_string_rex.match(prefix):
                logging.error(f'Prefix {prefix} determined for uid {uid}, malformed uid suspected')
            if prefix.endswith('-'):
                # This handles cases like "sa-2"
                prefix += m[2]
            else:
                num_start = int(m["num_start"])
                num_end = int(m["num_end"]) if m["num_end"] else num_start
            prefix = prefix.rstrip('.')
        else:
            prefix = uid
        
        return {"uid": uid,
                "prefix": prefix,
                "num_start": num_start,
                "num_end": num_end}
    
    def populate(self, uids):
        docs = [self.decompose(uid) for uid in uids]
        self.coll.import_bulk(docs, overwrite='true')
        
    def get_matching_uids(self, uid):
        decomposed = self.decompose(uid)
        r = self.query_arango(decomposed)
        uids = sorted(r, key=humansortkey)
        if not uids:
            uids = list(self.query_arango_prefix(prefix=decomposed['prefix']))
                
        return uids
    
    def query_arango(self, decomposed_uid):
        del decomposed_uid['uid']
        return self.db.aql.execute('''
            FOR doc IN uids
                FILTER doc.prefix == @prefix
                FILTER (@num_start <= doc.num_end AND @num_end >= doc.num_start) OR 
                       (doc.num_start <= @num_end AND doc.num_end >= @num_start)
                
                RETURN doc.uid
    ''', bind_vars=decomposed_uid)
    
    def query_arango_prefix(self, prefix):
        return self.db.aql.execute('''
            FOR doc IN uids
                FILTER doc.prefix == @prefix OR doc.uid == @prefix
                RETURN doc.uid
        ''', bind_vars={'prefix': prefix})
