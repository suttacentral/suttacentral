from search.instant_search import (
    format_volpage,
    standardization_volpage,
    roman_to_int,
    extract_query_conditions,
    is_chinese,
    extract_lang_param,
    extract_not_param
)


def test_format_volpage():
    assert format_volpage('S.II,236') == 'S II 236'
    assert format_volpage('A.BC,123') == 'A BC 123'
    assert format_volpage('X.YZ,789') == 'X YZ 789'


def test_standardization_volpage():
    assert standardization_volpage('Vin IV 4') == 'pts-vp-pli4.4'
    assert standardization_volpage('Vin I 4') == 'pts-vp-pli1.4'
    assert standardization_volpage('pts I 4') == 'pts-vp-pli1.4'


def test_roman_to_int():
    assert roman_to_int('I') == 1
    assert roman_to_int('II') == 2
    assert roman_to_int('III') == 3
    assert roman_to_int('IV') == 4
    assert roman_to_int('V') == 5
    assert roman_to_int('VI') == 6
    assert roman_to_int('VII') == 7
    assert roman_to_int('VIII') == 8
    assert roman_to_int('IX') == 9
    assert roman_to_int('X') == 10
    assert roman_to_int('XI') == 11
    assert roman_to_int('XII') == 12
    assert roman_to_int('XIII') == 13
    assert roman_to_int('XIV') == 14
    assert roman_to_int('XV') == 15
    assert roman_to_int('XVI') == 16
    assert roman_to_int('XVII') == 17
    assert roman_to_int('XVIII') == 18
    assert roman_to_int('XIX') == 19
    assert roman_to_int('XX') == 20
    assert roman_to_int('XXI') == 21
    assert roman_to_int('XXII') == 22
    assert roman_to_int('XXIII') == 23
    assert roman_to_int('XXIV') == 24
    assert roman_to_int('XXV') == 25
    assert roman_to_int('i') == 1
    assert roman_to_int('ii') == 2
    assert roman_to_int('iii') == 3
    assert roman_to_int('iv') == 4
    assert roman_to_int('v') == 5
    assert roman_to_int('vi') == 6
    assert roman_to_int('vii') == 7
    assert roman_to_int('viii') == 8
    assert roman_to_int('ix') == 9
    assert roman_to_int('x') == 10
    assert roman_to_int('xi') == 11


def test_extract_param():
    assert extract_query_conditions('in:sn author:sujato cat') == {"collection": "sn", "author": "sujato", "or": ["cat"]}
    assert extract_query_conditions('in:an author:sujato dog') == {"collection": "an", "author": "sujato", "or": ["dog"]}
    assert extract_query_conditions('in:dn author:sujato root of suffering') == {"collection": "dn", "author": "sujato",
                                                                      "or": ["root of suffering"]}
    assert extract_query_conditions('in:mn author:sujato cat OR dog') == {"collection": "mn", "author": "sujato",
                                                               "or": ["cat", "dog"]}
    assert extract_query_conditions('in:sn cat') == {"collection": "sn", "or": ["cat"]}
    assert extract_query_conditions('author:sujato cat') == {"author": "sujato", "or": ["cat"]}
    assert extract_query_conditions('author:sujato cat AND dog') == {"author": "sujato", "and": ["cat", "dog"]}
    assert extract_query_conditions('in:mn author:sujato cat AND dog') == {"collection": "mn", "author": "sujato",
                                                               "and": ["cat", "dog"]}
    assert extract_query_conditions('in:vinaya cat') == {"collection": "vinaya", "or": ["cat"]}
    assert extract_query_conditions('in:sutta cat') == {"collection": "sutta", "or": ["cat"]}
    assert extract_query_conditions('in:abhidhamma cat') == {"collection": "abhidhamma", "or": ["cat"]}
    assert extract_query_conditions('in:vinaya respect NOT feet') == {"collection": "vinaya", "or": ["respect"], "not": ["feet"]}


def test_is_chinese():
    assert is_chinese('四念处') == True
    assert is_chinese('四正勤') == True
    assert is_chinese('四神足') == True
    assert is_chinese('五根') == True
    assert is_chinese('五力') == True
    assert is_chinese('七觉支') == True
    assert is_chinese('八正道') == True
    assert is_chinese('Buddha') == False
    assert is_chinese('Metta') == False
    assert is_chinese('八正道 AND 四圣谛') == True
    assert is_chinese('in:sa 如实知见') == False


def test_extract_lang_param():
    assert extract_lang_param('lang:en cat') == ['en', 'cat']
    assert extract_lang_param('lang:pli cat OR dog') == ['pli', 'cat OR dog']
    assert extract_lang_param('lang:zh 如是') == ['zh', '如是']
    assert extract_lang_param('lang:zh 如是 AND 八正道') == ['zh', '如是 AND 八正道']


def test_extract_not_param():
    assert extract_not_param('NOT cat') == 'cat'
