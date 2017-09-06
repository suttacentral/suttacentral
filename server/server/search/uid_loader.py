import regex
from search import uid_expansion

# Load uid to acro map
_uid_to_acro_map = {}
_uid_to_name_map = {}
for row in uid_expansion.table_reader('uid_expansion'):
    _uid_to_acro_map[row.uid] = row.acro
    _uid_to_name_map[row.uid] = row.name


def _expand_uid(uid, mapping):
    components = regex.findall(r'\p{alpha}+|\d+(?:\.\d+)?(?:-\d+)?', uid)
    out = ' '.join(mapping.get(c) or c.upper() for c in components)
    out = regex.sub(r'(?<=\d+)-(?=\d+)', r'–', out)
    return out


def uid_to_acro(uid):
    return _expand_uid(uid, _uid_to_acro_map)


def uid_to_name(uid):
    return _expand_uid(uid, _uid_to_name_map)


languages = uid_expansion.load_table('language')
