import time
from collections import deque
from functools import lru_cache

from common.arangodb import get_db
from common.queries import LANGUAGES


class TimedCache:
    """ A lightweight cache which removes content after a given time

    Useful for when you anticipate multiple calls to a function with the
    same parameters, but want the guarantee the returned object wont be older
    than lifetime seconds.

    Must be used in a Try/Catch clause:
    >>> try: cache[key]
    >>> except KeyError:

    """

    __slots__ = ('_values', '_lifetime', '_added', '_maxsize')

    def __init__(self, lifetime=300, maxsize=100):
        self._lifetime = lifetime
        self._added = deque()
        self._values = {}
        self._maxsize = maxsize

    def __getitem__(self, key):
        now = time.time()
        try:
            while True:
                append_time, doomed_key = self._added.popleft()
                if (
                        now - append_time > self._lifetime
                        or len(self._added) > self._maxsize
                ):
                    del self._values[doomed_key]
                else:
                    # pop and put back is for thread safety
                    self._added.appendleft([append_time, doomed_key])
                    break
        except IndexError:
            pass

        return self._values.__getitem__(key)

    def __setitem__(self, key, value):
        # This isn't perfect, if a key is added multiple times in succession
        # it wont work properly, but it also wont break catastrophically.
        # Desired performance is only obtained when using the cache normally.
        # (i.e. setting an item only when the key isn't in the cache)
        self._added.append((time.time(), key))
        self._values.__setitem__(key, value)

    def __contains__(self, key):
        raise RuntimeError("Inappropriate operation, use Try/Catch.")


def recursive_merge(dict1, dict2):
    """ Merge dict2 into dict1

    where both dict2 and dict1 have the same key, and the value
    are both dicts, then the dicts are recusively merged.
    where the values can otherwise be meaningfully merged such
    as sets or lists, merge in a sensible way.
    Where both have the same key, but the values cannot be merged
    then clobber dict1's value with dict2's value.

    dict1 provides the default values
    """

    for key in set(dict1.keys()) | set(dict2.keys()):
        if key in dict1 and key in dict2:
            val1, val2 = dict1[key], dict2[key]
            if isinstance(val1, dict) and isinstance(val2, dict):
                recursive_merge(val1, val2)
            elif isinstance(val1, set) and isinstance(val2, set):
                val1.update(val2)
            elif isinstance(val1, list) and isinstance(val2, list):
                val1set = set(val1)
                for val in val2:
                    if val not in val1set:
                        val1.append(val)
            else:
                dict1[key] = val2
        elif key in dict1:
            pass
        elif key in dict2:
            dict1[key] = dict2[key]

    return dict1


@lru_cache(maxsize=1)
def get_root_language_uids():
    db = get_db()
    languages = db.aql.execute(LANGUAGES)
    return [lang['uid'] for lang in languages if lang['is_root']]
