from search.instant_search import (
    format_volpage,
    standardization_volpage,
    roman_to_int,
    extract_query_conditions,
    is_chinese,
    extract_lang_param,
    extract_not_param,
    search_string,
    normalize_string,
    sanitize_quoted_query,
    normalize_filter_commands
)

from search.validate_filter import validate_filter_commands

from urllib.parse import quote
from app import app
client = app.test_client()


def test_format_volpage():
    assert format_volpage('S.II,236') == 'S II 236'
    assert format_volpage('A.BC,123') == 'A BC 123'
    assert format_volpage('X.YZ,789') == 'X YZ 789'


def test_standardization_volpage():
    assert standardization_volpage('Vin IV 4') == 'PTS 4.4'
    assert standardization_volpage('Vin I 4') == 'PTS 1.4'
    assert standardization_volpage('pts I 4') == 'PTS 1.4'
    assert standardization_volpage('D I 4') == 'PTS 1.4'
    assert standardization_volpage('d i 4') == 'PTS 1.4'


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
    assert extract_query_conditions('cat in:sn author:sujato') == {"collection": "sn", "author": "sujato", "or": ["cat"]}
    assert extract_query_conditions('in:an author:sujato dog') == {"collection": "an", "author": "sujato", "or": ["dog"]}
    assert extract_query_conditions('author:sujato dog in:an') == {"collection": "an", "author": "sujato", "or": ["dog"]}
    # assert extract_query_conditions('in:dn author:sujato "root of suffering"') == {"collection": "dn", "author": "sujato", "or": ["root of suffering"]}
    # assert extract_query_conditions('in:dn author:sujato root of suffering') == {"collection": "dn", "author": "sujato", "and": ["root", "of", "suffering"]}
    assert extract_query_conditions('in:dn author:sujato root of suffering') == {"collection": "dn", "author": "sujato", "or": ["root of suffering"]}
    assert extract_query_conditions('in:mn author:sujato cat OR dog') == {"collection": "mn", "author": "sujato", "or": ["cat", "dog"]}
    assert extract_query_conditions('in:sn cat') == {"collection": "sn", "or": ["cat"]}
    assert extract_query_conditions('author:sujato cat') == {"author": "sujato", "or": ["cat"]}
    assert extract_query_conditions('author:sujato cat AND dog') == {"author": "sujato", "and": ["cat", "dog"]}
    assert extract_query_conditions('in:mn author:sujato cat AND dog') == {"collection": "mn", "author": "sujato", "and": ["cat", "dog"]}
    assert extract_query_conditions('author:sujato dog AND cat in:mn') == {"collection": "mn", "author": "sujato", "and": ["dog", "cat"]}
    assert extract_query_conditions('cat AND dog in:mn author:sujato') == {"collection": "mn", "author": "sujato", "and": ["cat", "dog"]}
    assert extract_query_conditions('in:vinaya cat') == {"collection": "vinaya", "or": ["cat"]}
    assert extract_query_conditions('cat in:vinaya') == {"collection": "vinaya", "or": ["cat"]}
    assert extract_query_conditions('in:sutta cat') == {"collection": "sutta", "or": ["cat"]}
    assert extract_query_conditions('in:abhidhamma cat') == {"collection": "abhidhamma", "or": ["cat"]}
    assert extract_query_conditions('NOT cat in:an10') == {"collection": "an10", "not": ["cat"]}
    assert extract_query_conditions('in:vinaya respect NOT feet') == {"collection": "vinaya", "or": ["respect"], "not": ["feet"]}
    assert extract_query_conditions('respect NOT feet in:vinaya') == {"collection": "vinaya", "or": ["respect"], "not": ["feet"]}


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


def test_extract_lang_param():
    assert extract_lang_param('lang:en cat') == ['en', 'cat']
    assert extract_lang_param('lang:pli cat OR dog') == ['pli', 'cat OR dog']
    assert extract_lang_param('lang:zh 如是') == ['zh', '如是']
    assert extract_lang_param('lang:zh 如是 AND 八正道') == ['zh', '如是 AND 八正道']


def test_extract_not_param():
    assert extract_not_param('NOT cat') == 'cat'


def test_search_string():
    assert search_string('rupa', 'Yañcāvuso, cakkhu ye ca rūpā') == [24]
    assert search_string('rupa', 'Rūpā saddā rasā gandhā,') == [0]
    assert search_string('Rūpā', 'Rūpā saddā rasā gandhā,') == [0]
    assert search_string('Rūpā', 'Rūpa saddā rasā gandhā,') == [0]
    assert search_string('samma', 'Evaṁ sammā vimuttacittassa') == [5]
    assert search_string('sāmma', 'Evaṁ sammā vimuttacittassa') == [5]


def test_normalize_string():
    assert normalize_string('rupa') == 'rupa'
    assert normalize_string('Rūpā') == 'Rupa'
    assert normalize_string('samma') == 'samma'
    assert normalize_string('sāmma') == 'samma'


def instant_search(query, languages):
    encoded_query = quote(query)
    response = client.post(f'/search/instant?query={encoded_query}&language=en&limit=10&offset=0&matchpartial=false',
                            json={'selectedLanguages': languages})
    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data['total'] != '0'


def test_volpage_search():
    instant_search('volpage:s ii 1', ['en', 'pli'])
    instant_search('volpage:d i 1', ['en', 'pli'])
    instant_search('volpage:m i 1', ['en', 'pli'])
    instant_search('volpage:a i 1', ['en', 'pli'])


def test_author_search():
    instant_search('author:sujato cat', ['en', 'pli'])


def test_title_search():
    instant_search('title:intention', ['en', 'pli'])


def test_collection_search():
    instant_search('in:dn cat', ['en', 'pli'])


def test_ebt_search():
    instant_search('in:ebt free', ['en', 'pli'])


def test_ebs_search():
    instant_search('in:ebs free', ['en', 'pli'])


def test_ebct_search():
    instant_search('in:ebct 四念处', ['en', 'pli'])


def test_operators_search():
    instant_search('greed OR desire NOT anicca', ['en', 'pli'])


def test_chinese_search():
    instant_search('八正道 涅槃', ['lzh', 'zh'])


def test_sanitize_quoted_query():
    assert sanitize_quoted_query('"root of suffering"') == 'root of suffering'
    assert sanitize_quoted_query("'root of suffering'") == "root of suffering"
    assert sanitize_quoted_query("“root of suffering“") == "root of suffering"
    assert sanitize_quoted_query("「苦的根源」") == "苦的根源"
    assert sanitize_quoted_query("『苦的根源』") == "苦的根源"
    assert sanitize_quoted_query("‘苦的根源’") == "苦的根源"
    assert sanitize_quoted_query('„root of suffering"') == 'root of suffering'
    assert sanitize_quoted_query("«root of suffering»") == "root of suffering"
    assert sanitize_quoted_query("〈苦的根源〉") == "苦的根源"
    assert sanitize_quoted_query("《root of suffering》") == "root of suffering"
    assert sanitize_quoted_query("﴾root of suffering﴿") == "root of suffering"


def test_normalize_filter_commands():
    # Basic Functionality Test - Single Filter Command
    assert normalize_filter_commands('IN:sn author:sujato cat') == 'in:sn author:sujato cat'
    assert normalize_filter_commands('AUTHOR:sujato root of suffering') == 'author:sujato root of suffering'
    assert normalize_filter_commands('BY:sujato meditation') == 'by:sujato meditation'
    assert normalize_filter_commands('VOLPAGE:SN II') == 'volpage:SN II'
    assert normalize_filter_commands('TITLE:SUFFER') == 'title:SUFFER'
    assert normalize_filter_commands('LANG:en four noble truths') == 'lang:en four noble truths'
    assert normalize_filter_commands('REF:SN11') == 'ref:SN11'

    # Mixed case test
    assert normalize_filter_commands('In:sn AuThOr:sujato cat') == 'in:sn author:sujato cat'
    assert normalize_filter_commands('VOLPAGE:sn BY:SUJATO') == 'volpage:sn by:SUJATO'
    assert normalize_filter_commands('TiTlE:meditation') == 'title:meditation'
    assert normalize_filter_commands('LaNg:EN REF:an1') == 'lang:EN ref:an1'

    # Multiple filter combination testing
    assert normalize_filter_commands('IN:SN LANG:en AUTHOR:sujato') == 'in:SN lang:en author:sujato'
    assert normalize_filter_commands('VOLPAGE:D I BY:sujato TITLE:noble') == 'volpage:D I by:sujato title:noble'
    assert normalize_filter_commands('LANG:pli IN:mn REF:mn1 suffering') == 'lang:pli in:mn ref:mn1 suffering'

    # Already lowercase (should not be changed)
    assert normalize_filter_commands('in:sn author:sujato root of suffering') == 'in:sn author:sujato root of suffering'
    assert normalize_filter_commands('volpage:a i 1 by:sujato') == 'volpage:a i 1 by:sujato'
    assert normalize_filter_commands('title:meditation lang:en') == 'title:meditation lang:en'

    # Edge Case Testing
    assert normalize_filter_commands('') == ''
    assert normalize_filter_commands('   ') == '   '
    assert normalize_filter_commands('meditation without filters') == 'meditation without filters'
    assert normalize_filter_commands('just some text') == 'just some text'

    # Colon Separator Test
    assert normalize_filter_commands('IN:') == 'in:'
    assert normalize_filter_commands('AUTHOR:') == 'author:'
    assert normalize_filter_commands('VOLPAGE:   ') == 'volpage:   '

    # Testing for special characters and spaces
    assert normalize_filter_commands('IN:sn  AUTHOR:sujato   cat') == 'in:sn  author:sujato   cat'
    assert normalize_filter_commands('VOLPAGE:SN II 123 TITLE:noble truth') == 'volpage:SN II 123 title:noble truth'
    assert normalize_filter_commands('IN:dn-sutta AUTHOR:sujato-translator') == 'in:dn-sutta author:sujato-translator'

    # Chinese content test
    assert normalize_filter_commands('IN:sa LANG:zh 四念处') == 'in:sa lang:zh 四念处'
    assert normalize_filter_commands('TITLE:八正道 AUTHOR:玄奘') == 'title:八正道 author:玄奘'

    # Quotation content test
    assert normalize_filter_commands('IN:sn "root of suffering"') == 'in:sn "root of suffering"'
    assert normalize_filter_commands('AUTHOR:sujato "noble eightfold path"') == 'author:sujato "noble eightfold path"'
    assert normalize_filter_commands('TITLE:"Four Noble Truths"') == 'title:"Four Noble Truths"'

    # Repeat filter test
    assert normalize_filter_commands('IN:sn IN:an meditation') == 'in:sn in:an meditation'
    assert normalize_filter_commands('AUTHOR:sujato AUTHOR:brahm') == 'author:sujato author:brahm'

    # Filters tested in different locations
    assert normalize_filter_commands('meditation IN:sn AUTHOR:sujato') == 'meditation in:sn author:sujato'
    assert normalize_filter_commands('AUTHOR:sujato meditation VOLPAGE:SN II') == 'author:sujato meditation volpage:SN II'
    assert normalize_filter_commands('suffering LANG:en IN:dn TITLE:truth') == 'suffering lang:en in:dn title:truth'

    # Continuous filter testing
    assert normalize_filter_commands('IN:snVOLPAGE:SN') == 'in:snvolpage:SN'
    assert normalize_filter_commands('AUTHOR:sujatoBY:brahm') == 'author:sujatoby:brahm'

    # Tests for numbers and special identifiers
    assert normalize_filter_commands('VOLPAGE:SN 1.1 REF:an10.1') == 'volpage:SN 1.1 ref:an10.1'
    assert normalize_filter_commands('IN:mn123 AUTHOR:sujato-en') == 'in:mn123 author:sujato-en'

    # Boolean operator combination test
    assert normalize_filter_commands('IN:sn meditation AND mindfulness') == 'in:sn meditation AND mindfulness'
    assert normalize_filter_commands('AUTHOR:sujato cat OR dog') == 'author:sujato cat OR dog'
    assert normalize_filter_commands('VOLPAGE:SN II NOT suffering') == 'volpage:SN II NOT suffering'

    # Complex query test
    assert normalize_filter_commands('IN:dn AUTHOR:sujato LANG:en TITLE:noble VOLPAGE:D I suffering AND meditation') == \
           'in:dn author:sujato lang:en title:noble volpage:D I suffering AND meditation'

    # Incomplete filter test (should still convert）
    assert normalize_filter_commands('IN meditation') == 'IN meditation'
    assert normalize_filter_commands('IN: meditation') == 'in: meditation'
    assert normalize_filter_commands(':sn meditation') == ':sn meditation'

    # Mixed case complications
    assert normalize_filter_commands('iN:SN AuThOr:SuJaTo LaNg:En TiTlE:NoBlE meditation') == \
           'in:SN author:SuJaTo lang:En title:NoBlE meditation'

    # Unicode and Special Characters
    assert normalize_filter_commands('IN:sa-unicode AUTHOR:सुजातो TITLE:धर्म') == 'in:sa-unicode author:सुजातो title:धर्म'
    assert normalize_filter_commands('VOLPAGE:SN II 123 TITLE:nirvāṇa') == 'volpage:SN II 123 title:nirvāṇa'

    # Performance test case (long string)
    long_query = 'IN:sn ' + 'meditation ' * 100 + 'AUTHOR:sujato'
    expected = 'in:sn ' + 'meditation ' * 100 + 'author:sujato'
    assert normalize_filter_commands(long_query) == expected

    # Misspelled filter (should not be converted)
    assert normalize_filter_commands('INN:sn AUTHRO:sujato') == 'INN:sn AUTHRO:sujato'
    assert normalize_filter_commands('VOLPAG:SN II TITL:noble') == 'VOLPAG:SN II TITL:noble'

    # When the filter value is empty
    assert normalize_filter_commands('IN: AUTHOR: VOLPAGE:') == 'in: author: volpage:'

    # Special symbols as filter values
    assert normalize_filter_commands('TITLE:@#$% IN:sn!@#') == 'title:@#$% in:sn!@#'
    assert normalize_filter_commands('AUTHOR:sujato-123 VOLPAGE:SN-II-456') == 'author:sujato-123 volpage:SN-II-456'


def test_validate_filter_commands():
    """Test filter validation functionality"""
    # Testing effective filters
    assert validate_filter_commands('author:sujato meditation')['is_valid'] is True
    assert validate_filter_commands('in:sn title:noble')['is_valid'] is True
    assert validate_filter_commands('lang:en volpage:SN I 123')['is_valid'] is True

    # Testing for duplicate filter errors
    result = validate_filter_commands('in:sn in:an meditation')
    assert result['is_valid'] is False
    assert result['error_type'] == 'duplicate_filter'
    assert 'in:' in result['error_message']

    result = validate_filter_commands('in:in:pli-tv-ab')
    assert result['is_valid'] is False
    assert result['error_type'] == 'duplicate_filter'
    assert 'in:' in result['error_message']

    # Testing for consecutive colon errors
    result = validate_filter_commands('in:lang:pli-tv-ab')
    assert result['is_valid'] is False
    assert result['error_type'] == 'syntax_error'
    assert 'in:' in result['error_message']

    # Testing for null errors
    result = validate_filter_commands('author: meditation')
    assert result['is_valid'] is False
    assert result['error_type'] == 'empty_value'

    # Testing unknown filters
    result = validate_filter_commands('invalid_filter:value')
    assert result['is_valid'] is False
    assert result['error_type'] == 'unknown_filter'

    # Testing for invalid language codes
    result = validate_filter_commands('lang:invalid123')
    assert result['is_valid'] is False
    assert result['error_type'] == 'invalid_language'

    # Testing for conflicting filters
    result = validate_filter_commands('author:sujato by:brahm')
    assert result['is_valid'] is False
    assert result['error_type'] == 'conflicting_filters'

    # Test for common spelling errors
    result = validate_filter_commands('autor:sujato')
    assert result['is_valid'] is False
    assert 'author:' in result['suggestions'][1]

    # Testing complex valid queries
    assert validate_filter_commands('in:sn author:sujato lang:en meditation AND mindfulness')['is_valid'] is True
