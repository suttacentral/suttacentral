from search.chinese import is_chinese


def test_is_chinese():
    assert is_chinese('四念处') is True
    assert is_chinese('四正勤') is True
    assert is_chinese('四神足') is True
    assert is_chinese('五根') is True
    assert is_chinese('五力') is True
    assert is_chinese('七觉支') is True
    assert is_chinese('八正道') is True
    assert is_chinese('Buddha') is False
    assert is_chinese('Metta') is False
    assert is_chinese('八正道 AND 四圣谛') is True
    assert is_chinese('in:sa 如实知见') is False
