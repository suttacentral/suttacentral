import itertools
import regex
import json
import logging


def numericsortkey(string, _split=regex.compile(r'(\d+)').split):
    """ Intelligently sorts most kinds of data.

    Should work on absolutely any configuration of characters in a string
    this doesn't mean it'll always order sensibly, just that it wont throw
    any 'TypeError: unorderable types' exceptions.
    Also works on all unicode decimal characters, not just ASCII 0-9.

    Does not handle dotted ranges unless the string ends with the range.
    >>> sorted(['1', '1.1', '1.1.1'], key=numericsortkey)
    ['1', '1.1', '1.1.1']

    >>> sorted(['1.txt', '1.1.txt', '1.1.1.txt'], key=numericsortkey)
    ['1.1.1.txt', '1.1.txt', '1.txt']

    """

    # if regex.fullmatch('\d+', s) then int(s) is valid, and vice-verca.
    return [int(s) if i % 2 else s for i, s in enumerate(_split(str(string)))]


def humansortkey(string, _split=regex.compile(r'(\d+(?:[.-]\d+)*)').split):
    """ Properly sorts more constructions than numericsort

    Should generally be preferred to numericsort unless a simpler ordering
    is required.

    >>> sorted(['1.txt', '1.1.txt', '1.1.1.txt'], key=humansortkey)
    ['1.txt', '1.1.txt', '1.1.1.txt']

    """
    # With split, every second element will be the one in the capturing group.
    return [numericsortkey(s) if i % 2 else s
            for i, s in enumerate(_split(str(string)))]


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


def grouper(n, iterable, fillvalue=None):
    "Collect data into fixed-length chunks or blocks"
    # grouper(3, 'ABCDEFG', 'x') --> ABC DEF Gxx"
    args = [iter(iterable)] * n
    return itertools.zip_longest(*args, fillvalue=fillvalue)


def unique(iterable, key=None):
    "List unique elements, preserving order. Remember all elements ever seen."
    # unique_everseen('AAAABBBCCDAABBB') --> A B C D
    # unique_everseen('ABBCcAD', str.lower) --> A B C D
    seen = set()
    seen_add = seen.add
    if key is None:
        for element in itertools.filterfalse(seen.__contains__, iterable):
            seen_add(element)
            yield element
    else:
        for element in iterable:
            k = key(element)
            if k not in seen:
                seen_add(k)
                yield element


def iter_sub_dirs(path):
    for subdir in path.iterdir():
        if not subdir.is_dir():
            continue
        if subdir.stem.startswith('.'):
            continue
        yield subdir


def json_load(path):
    try:
        with open(path, 'r', encoding='utf8') as f:
            return json.load(f)
    except (json.decoder.JSONDecodeError, FileNotFoundError) as e:
        logging.error(f'{path}: {e}')
        raise e


class TwoWayDict(dict):
    def __setitem__(self, key, value):
        # Remove any previous connections with these values
        if key in self:
            del self[key]
        if value in self:
            del self[value]
        dict.__setitem__(self, key, value)
        dict.__setitem__(self, value, key)

    def __delitem__(self, key):
        dict.__delitem__(self, self[key])
        dict.__delitem__(self, key)

    def __len__(self):
        """Returns the number of connections"""
        return dict.__len__(self) // 2

def sort_and_groupby(iterable, function):
    return itertools.groupby(sorted(iterable, key=function), key=function)
