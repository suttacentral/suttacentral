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


class Hyphenator:
    _HYPHENATION_MAX_WORD_LEN = 20

    def __init__(self, segments_file: Path):
        vowel_chars = 'aioueāīū'

        self.segments = set(json_load(segments_file)['segments'])
        self.cons = '(?:br|[kgcjtṭdḍbp]h|[kgcjtṭdḍp](?!h)|[mnyrlvshṅṇṃṁñḷ]|b(?![rh]))'
        self.vowel_pattern = '[' + vowel_chars.lower() + ']'

        segments_revoweled = [regex.sub(self.vowel_pattern + '$', self.vowel_pattern, segment, flags=regex.I)
                              for segment in sorted(self.segments, key=len, reverse=True)]

        self.segment_rex = regex.compile('({})'.format('|'.join(segments_revoweled)), flags=regex.I)
        self.alpha_rex = regex.compile(r'\p{alpha}+')

    def _fix_hyphens(self, word: str) -> str:
        for i in range(0, 2):
            word = regex.sub(r'-({})({})'.format(self.cons, self.cons), r'\1-\2', word, flags=regex.I)
            word = regex.sub(r'([kgcjḍṭdtpb])-(h{})'.format(self.vowel_pattern), r'\1\2-', word, flags=regex.I)
        word = regex.sub(r'^(\p{alpha}{0,3})-', r'\1', word)
        word = regex.sub(r'-(\p{alpha}{0,3})$', r'\1', word)
        return word

    def hyphenate(self, word: str) -> str:
        if len(word) <= self._HYPHENATION_MAX_WORD_LEN or '\xad' in word:
            return word

        word = self.segment_rex.sub(r'-\1-', word)
        word = word.replace('--', '-')
        word = word.strip('-')
        word = self._fix_hyphens(word)

        for segment in self.alpha_rex.findall(word):
            if len(segment) > self._HYPHENATION_MAX_WORD_LEN:
                logging.warning(f'Segment too long: {segment}')
        return word.replace('-', '\xad')


class PaliHyphenator(Hyphenator):

    def __init__(self):
        super().__init__(FOLDER / 'hyphenator_pli.json', )


class SanskritHyphenator(Hyphenator):

    def __init__(self):
        super().__init__(FOLDER / 'hyphenator_san.json')
