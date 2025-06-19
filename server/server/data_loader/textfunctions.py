import regex
import unicodedata

_char_value = {}
char_in_order = [
    '#',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'ā',
    'i',
    'ī',
    'u',
    'ū',
    'e',
    'o',
    'ṁ',
    'ṃ',
    'k',
    'kh',
    'g',
    'gh',
    'ṅ',
    'c',
    'ch',
    'j',
    'jh',
    'ñ',
    'ṭ',
    'ṭh',
    'ḍ',
    'ḍh',
    'ṇ',
    't',
    'th',
    'd',
    'dh',
    'n',
    'p',
    'ph',
    'b',
    'bh',
    'm',
    'y',
    'r',
    'l',
    'ḷ',
    'v',
    's',
    'h',
]
for i, c in enumerate(char_in_order):
    _char_value[c] = i * 2
    if c != c.upper():
        _char_value[c.upper()] = i * 2 - 1
        if len(c) > 1:
            _char_value[c.title()] = i * 2 - 1
del char_in_order


def pali_sort_key(string):
    """sorts strings into pali alphabetical order"""

    values = []
    i = 0
    while i < len(string):
        char = string[i]
        multi_char = string[i: i + 2]
        if multi_char in _char_value:
            value = _char_value[multi_char]
            i += 1  # advance an extra character
        elif char in _char_value:
            value = _char_value[char]
        else:
            value = 0
        values.append(value)
        i += 1

    return tuple(values)


def asciify_roman(string):
    out = unicodedata.normalize('NFD', string)
    out = regex.sub(r'\p{dia}', '', out)
    out = out.replace('\xad', '')
    return out
