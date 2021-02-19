""" High precision hyphenator
Uses a list of segments to attempt to hyphenate words
Then performs corrections to move hyphens in between double consonants
and such
"""
import logging
from pathlib import Path

import regex

from data_loader.util import json_load

FOLDER = Path(__file__).parent
segments = set(json_load(FOLDER / 'hyphenator_segments.json')['segments'])

cons = '(?:br|[kgcjtṭdḍbp]h|[kgcjtṭdḍp](?!h)|[mnyrlvshṅṇṃṁñḷ]|b(?![rh]))'
vowel_chars = 'aioueāīū'
vowel_pattern = '[' + vowel_chars.lower() + ']'
vowel_antipattern = '[^' + vowel_chars.lower() + '-]'

segments_revoweled = [regex.sub(vowel_pattern + '$', vowel_pattern, segment, flags=regex.I) for segment in
                      sorted(segments, key=len, reverse=True)]

segment_rex = regex.compile('({})'.format('|'.join(segments_revoweled)), flags=regex.I)

alpha_rex = regex.compile(r'\p{alpha}+')


def fix_hyphens(word: str) -> str:
    for i in range(0, 2):
        word = regex.sub(r'-({})({})'.format(cons, cons), r'\1-\2', word, flags=regex.I)
        word = regex.sub(r'([kgcjḍṭdtpb])-(h{})'.format(vowel_pattern), r'\1\2-', word, flags=regex.I)
    word = regex.sub(r'^(\p{alpha}{0,3})-', r'\1', word)
    word = regex.sub(r'-(\p{alpha}{0,3})$', r'\1', word)
    return word


def hyphenate(word: str, max_length: int) -> str:
    if len(word) <= max_length or '\xad' in word:
        return word

    word = segment_rex.sub(r'-\1-', word)
    word = word.replace('--', '-')
    word = word.strip('-')
    word = fix_hyphens(word)

    for segment in alpha_rex.findall(word):
        if len(segment) > max_length:
            print('Segment too long: {}'.format(segment))
    return word.replace('-', '\xad')
