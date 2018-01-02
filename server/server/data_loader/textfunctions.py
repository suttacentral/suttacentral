import regex
import unicodedata

def pali_sort_key(input, _charvalue = {}):
    "for sorting strings into pali alphabetical order"
    if len(_charvalue) == 0:
        charInorder = [
            '#', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'ā',
            'i', 'ī', 'u', 'ū', 'e', 'o', 'ṁ', 'ṃ', 'k', 'kh', 'g', 'gh', 'ṅ', 'c',
            'ch', 'j', 'jh', 'ñ', 'ṭ', 'ṭh', 'ḍ', 'ḍh', 'ṇ', 't', 'th', 'd',
            'dh', 'n', 'p', 'ph', 'b', 'bh', 'm', 'y', 'r', 'l', 'ḷ', 'v', 's', 'h',
        ]
        for i in range(0, len(charInorder)):
            c = charInorder[i]
            _charvalue[c] = i * 2
            if c != c.upper():
                _charvalue[c.upper()] = i * 2 - 1
        del charInorder
    mult = len(_charvalue)
    vals = []
    for i in range(0, len(input)):
        val = 0
        c1 = input[i]
        c2 = input[i:i+2]
        if c2 in _charvalue:
            val = _charvalue[c2]
            i += 1
        elif c1 in _charvalue:
            val = _charvalue[c1]
        vals.append(val)
    return tuple(vals)

def asciify_roman(string, _rexdia=regex.compile(r'\p{dia}')):
    out = unicodedata.normalize('NFD', string)
    out = _rexdia.sub('', out)
    out = out.replace('\xad', '')
    return out

