import itertools
import json
import logging
from pathlib import Path

import regex


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
    return [
        numericsortkey(s) if i % 2 else s for i, s in enumerate(_split(str(string)))
    ]


def json_load(path: Path) -> dict:
    try:
        with open(path, 'r', encoding='utf8') as f:
            return json.load(f)
    except (json.decoder.JSONDecodeError, FileNotFoundError) as e:
        logging.error(f'{path}: {e}')
        raise e


def json_save(data: dict, path: Path) -> None:
    with open(path, 'w', encoding='utf8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def sort_and_groupby(iterable, function):
    return itertools.groupby(sorted(iterable, key=function), key=function)
