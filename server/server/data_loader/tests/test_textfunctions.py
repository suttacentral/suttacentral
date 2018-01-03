
import pytest

from data_loader.textfunctions import pali_sort_key, asciify_roman

from random import Random



# A random selection of pali words, in proper alphabetical order
pali_words = [
    'aṃsa',
    'añjasa',
    'apāṅga',
    'āma',
    'uggama',
    'oṭṭha',
    'kukku',
    'kusala',
    'gokaṇṇa',
    'cuta',
    'tahiṃ',
    'tivassika',
    'thanita',
    'theva',
    'nikasa',
    'niṭṭhita',
    'nipatati',
    'pakkhandikā',
    'pakkhī',
    'pajahati',
    'pasaṃsā',
    'pājana',
    'piṃsana',
    'piññāka',
    'piṇḍapāta',
    'puccaṇḍa',
    'punnāga',
    'mekhalā',
    'rañjeti',
    'rameti',
    'vañjhā',
    'vapu',
    'vinaddha',
    'vimhita',
    'saṃsāra',
    'sakaṭa',
    'santosa',
    'samatikkanta',
    'sayha',
    'sikhara',
    'sukkha',
    'horā'
]

def test_data_sanity():
    # make sure each word is unique
    assert len(pali_words) == len(set(pali_words))
    # and the data sorts differently unicode-wise
    assert pali_words != sorted(pali_words)

def test_uniqueness():
    # check that the function returns a unique value for each pali word
    # (this is not guaranteed for non pali words!)
    assert len(pali_words) == len({pali_sort_key(word) for word in pali_words})

def test_pali_sort_order():
    random = Random(42)
    shuffled = random.sample(pali_words, k=len(pali_words))
    assert pali_words == sorted(shuffled, key=pali_sort_key)
    
def test_pali_sort_order_upper():
    random = Random(42)
    upper_words = [word.upper() for word in pali_words]
    shuffled = random.sample(upper_words, k=len(upper_words))
    assert upper_words == sorted(shuffled, key=pali_sort_key)
    
def test_asciify_roman():
    assert asciify_roman('saṃsāra') == 'samsara'
