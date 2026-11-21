import pytest

from common.utils import current_app
from search.query_aql import construct_search_query_aql, extract_query_conditions, is_complex_query, \
    extract_rest_keywords, generate_aql_for_complex_query, prepare_and_generate_aql_for_volpage_filter, \
    generate_aql_for_volpage_filter, generate_aql_for_lang_filter, generate_general_query_aql, get_filter_part_for_aql, \
    get_limit_part_for_aql, get_lang_condition_for_aql


class TestConstructSearchQueryAql:
    def invoke(self, limit=10, matchpartial=False, offset=0, query='ghosts', lang='en', selected_languages=None):
        if selected_languages is None:
            selected_languages = ['en']

        return construct_search_query_aql(
            limit=limit,
            matchpartial=matchpartial,
            offset=offset,
            query=query,
            query_param={
                'query': query,
                'lang': lang,
                'limit': limit,
                'offset': offset,
                'matchpartial': matchpartial,
                'selected_languages': selected_languages
            },
            selected_languages=selected_languages,
        )

    def test_aql_condition_part(self):
        result = self.invoke()
        lines = [line.strip() for line in result[0].splitlines() if len(line)]
        assert lines == [
            'SEARCH (PHRASE(d.content, @query, "common_text")',
            'OR PHRASE(d.name, @query, "common_text")', 'OR d.uid == @query',
            'OR ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") ) FILTER d.is_segmented != True   AND (d.lang IN [\'en\'] OR d.is_root==null)'
        ]

    def test_bind_param(self):
        result = self.invoke()
        assert result[1] == {'lang': 'en', 'query': 'ghosts'}

    def test_search_aql(self):
        result = self.invoke()
        lines = [line.strip() for line in result[2].splitlines() if len(line.strip())]
        assert lines == [
            'FOR d IN instant_search',
            'SEARCH (PHRASE(d.content, @query, "common_text")',
            'OR PHRASE(d.name, @query, "common_text")',
            'OR d.uid == @query',
            'OR ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") ) FILTER d.is_segmented '
            "!= True   AND (d.lang IN ['en'] OR d.is_root==null)",
            'SORT',
            'd.lang == @lang ? -1 : 1,',
            'd.is_ebt == true ? -1 : d.is_ebt == false ? 1 : 0,',
            'd.is_bilara == true ? -1 : 1,',
            'd.is_segmented == false ? -1 : 1,',
            'REGEX_REPLACE(d.uid, "([a-z-]+).*", "$1"),',
            '// handling e.g. pli-tv-bu-vb-pj1 or pli-tv-pj1 UID with variable number of '
            'parts',
            'REGEX_TEST(d.uid, "^[a-z]+(?:-[a-z-]+)+\\d+$") ?',
            'TO_NUMBER(REGEX_REPLACE(d.uid, "^[a-z]+(?:-[a-z-]+)+(\\d+)$", "$1")) :',
            '// Processing the numeric portion of a standard UID',
            'LENGTH(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), \'.\')) == 0 ? 0 :',
            'TO_NUMBER(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), \'.\')[0]),',
            'LENGTH(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), \'.\')) <= 1 ? 0 :',
            'TO_NUMBER(REGEX_REPLACE(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '
            '\'.\')[1], "([0-9]+).*", "$1")),',
            'LENGTH(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), \'.\')) <= 2 ? 0 :',
            'TO_NUMBER(REGEX_REPLACE(SPLIT(REGEX_REPLACE(d.uid, "[a-z-]+(.*)", "$1"), '
            '\'.\')[2], "([0-9]+).*", "$1"))',
            'LIMIT 0, 10',
            'return {',
            'acronym: d.acronym,',
            'uid: d.uid,',
            'lang: d.lang,',
            'full_lang: d.full_lang,',
            'root_lang: d.root_lang,',
            'name: d.name,',
            'volpage: d.volpage,',
            'author: d.author,',
            'author_uid: d.author_uid,',
            'author_short: d.author_short,',
            'is_root: d.is_root,',
            'heading: d.heading,',
            'content: d.content,',
            'segmented_uid: d.segmented_uid,',
            'segmented_text: d.segmented_text,',
            'is_segmented: d.is_segmented,',
            'is_bilara_text: d.is_bilara_text,',
            'param_lang: @lang,',
            'root_uid: d.root_uid,',
            'is_article: d.is_article,',
            'param_query: @query',
            '}'
        ]

    def test_with_complex_query(self):
        result = self.invoke(query='by:sujato cat OR dog')
        assert len(result) == 3

    def test_lang_filter_needs_flask(self):
        with current_app().app_context():
            result = self.invoke(query='lang:en ghosts')
            assert len(result[2].splitlines()) == 27

    def test_title_filter(self):
        result = self.invoke(query='title:dog')
        lines = [line.strip() for line in result[2].splitlines() if len(line)]
        assert lines[:3] == [
            'FOR d IN instant_search',
            'SEARCH PHRASE(d.name, @query, "common_text")',
            'FILTER d.is_segmented == False'
        ]


class TestExtractQueryConditions:
    def test_empty_when_no_conditions(self):
        assert extract_query_conditions('ghosts') == dict()

    def test_extracts_author(self):
        # NOTE: This hits the line: del result['or']
        #       But not             del result['and']
        # Where does the OR come from?
        assert extract_query_conditions('by:sujato') == {'author': 'sujato'}

    def test_extracts_collection(self):
        assert extract_query_conditions('in:dn') == {'collection': 'dn'}

    def test_extracts_or(self):
        assert extract_query_conditions('in:dn dog OR cat') == {'collection': 'dn', 'or': ['dog', 'cat']}

    def test_extracts_and(self):
        assert extract_query_conditions('in:dn dog OR cat') == {'collection': 'dn', 'or': ['dog', 'cat']}

    def test_or_missing_left_operand(self):
        assert extract_query_conditions('in:dn OR cat') == {'collection': 'dn', 'or': ['OR cat']}

    def test_or_missing_right_operand(self):
        assert extract_query_conditions('in:dn cat OR') == {'collection': 'dn', 'or': ['cat OR']}

    def test_or_alone(self):
        assert extract_query_conditions('in:dn OR') == {'collection': 'dn', 'or': ['OR']}


class TestIsComplexQuery:
    @pytest.mark.parametrize(
        'conditions,is_complex', [
            ({'author': 'sujato', 'or': ['dog', 'cat']}, True),
            ({'author': 'sujato', 'and': ['dog', 'cat']}, True),
            ({'author': 'sujato', 'and': ['dog', 'cat'], 'or': ['horse', 'lion']}, True),
        ]
    )
    def test_is_complex_query(self, conditions, is_complex):
        assert is_complex_query(conditions) is True

    @pytest.mark.parametrize(
        'conditions,is_complex', [
            (dict(), False),
            ({'author': 'sujato'}, False),
            ({'collection': 'dn'}, False),
            ({'author': 'sujato', 'collection': 'dn'}, False),
            ({'or': ['dog', 'cat']}, False),
            ({'and': ['dog', 'cat']}, False),
        ]
    )
    def test_is_not_complex_query(self, conditions, is_complex):
        assert is_complex_query(conditions) is False


class TestExtractRestKeywords:
    def test_adds_or_to_result(self):
        result = {}
        extract_rest_keywords(result, 'dog OR cat')
        assert result == {'or': ['dog', 'cat']}

    def test_adds_and_to_result(self):
        result = {}
        extract_rest_keywords(result, 'dog AND cat')
        assert result == {'and': ['dog', 'cat']}

    def test_adds_not_to_result(self):
        result = {}
        extract_rest_keywords(result, 'dog NOT cat')
        assert result == {'not': ['cat'], 'or': ['dog']} != {}

    def test_adds_empty_or_when_no_operator_keywords(self):
        result = {}
        param = 'by:sujato'
        extract_rest_keywords(result, param)
        assert result == {'or': ['']}

    def test_single_keyword_no_conditions(self):
        result = {}
        param = 'ghosts'
        extract_rest_keywords(result, param)
        assert result == {'or': ['ghosts']}

    def test_keywords_no_conditions(self):
        result = {}
        param = 'ghosts goblins witches'
        extract_rest_keywords(result, param)
        assert result == {'or': ['ghosts goblins witches']}


class TestGenerateAqlForComplexQuery:
    def test_bind_param(self):
        query_conditions = {'author': 'sujato', 'or': ['cat', 'dog']}

        query_param = {
            'lang': 'en',
            'limit': 10,
            'matchpartial': False,
            'offset': 0,
            'query': 'by:sujato cat OR dog',
            'selected_languages': ['en']
        }

        bind_param, _, _ = generate_aql_for_complex_query(query_conditions, query_param)
        assert bind_param == {'lang': 'en', 'query': 'by:sujato cat OR dog'}


class TestPrepareAndGenerateAqlForVolpageFilter:
    @pytest.fixture
    def query_param(self) -> dict:
        return {
            'lang': 'en',
            'limit': 10,
            'matchpartial': False,
            'offset': 0,
            'query': 'volpage:M II 246',
            'selected_languages': ['en']
        }

    def test_returns_modified_query_param(self, query_param):
        new_query_param, _, _ = prepare_and_generate_aql_for_volpage_filter(
            search_aql='',
            aql_condition_part='',
            query_param=query_param
        )

        assert new_query_param['query'] == 'Mn II 246'

    def test_query_param_passed_is_also_changed(self, query_param):
        old_query_param = query_param.copy()

        _, _, _ = prepare_and_generate_aql_for_volpage_filter(
            search_aql='',
            aql_condition_part='',
            query_param=old_query_param
        )

        assert old_query_param['query'] == 'Mn II 246'

    def test_search_aql_param_is_unchanged(self, query_param):
        search_aql_param = 'abc123'

        _, _, _ = prepare_and_generate_aql_for_volpage_filter(
            search_aql=search_aql_param,
            aql_condition_part='',
            query_param=query_param
        )

        assert search_aql_param == 'abc123'

    def test_returned_aql_has_many_lines(self, query_param):
        _, search_aql_returned, _ = prepare_and_generate_aql_for_volpage_filter(
            search_aql='',
            aql_condition_part='',
            query_param=query_param
        )

        assert len(search_aql_returned.splitlines()) == 40


class TestGenerateAqlForVolpageFilter:
    def test_generates_aql(self):
        aql = generate_aql_for_volpage_filter(possible_volpages=[
            'Mn II 244', 'Mn II 245', 'Mn II 243', 'PTS 2.246',
            'Mn II 246', 'Mn II 242', 'Mn II 248', 'Mn II 249',
            'Mn II 241', 'Mn II 247',
        ],
            first_part_of_volpage='Mn'
        )

        assert len(aql.splitlines()) == 40


class TestGenerateAqlForLangFilter:
    @pytest.fixture
    def query_param(self) -> dict:
        return {
            'lang': 'en',
            'limit': 10,
            'matchpartial': False,
            'offset': 0,
            'query': 'ghosts',
            'selected_languages': ['en']
        }

    def test_aql_condition_part_when_or(self, query_param):
        _, aql_condition_part = generate_aql_for_lang_filter('en', ['ghosts', 'goblins'], 'OR', query_param)
        assert aql_condition_part == (
            'SEARCH (d.lang == "en" OR d.name==@query) AND (PHRASE(d.content, "ghosts", '
            '"common_text") OR LIKE(d.segmented_text, "%ghosts%") OR '
            'ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") OR '
            'ANALYZER(LIKE(d.segmented_text, "%ghosts%"), "normalize") OR '
            'ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") OR '
            'ANALYZER(LIKE(d.segmented_text, "%ghosts%"), "normalize") OR LIKE(d.name, '
            '"%ghosts%")) OR (PHRASE(d.content, "goblins", "common_text") OR '
            'LIKE(d.segmented_text, "%goblins%") OR ANALYZER(LIKE(d.name, "%goblins%"), '
            '"normalize") OR ANALYZER(LIKE(d.segmented_text, "%goblins%"), "normalize") '
            'OR ANALYZER(LIKE(d.name, "%goblins%"), "normalize") OR '
            'ANALYZER(LIKE(d.segmented_text, "%goblins%"), "normalize") OR LIKE(d.name, '
            '"%goblins%")) FILTER d.is_segmented != True  '
        )

    def test_aql_condition_part_when_and(self, query_param):
        _, aql_condition_part = generate_aql_for_lang_filter('en', ['ghosts', 'goblins'], 'AND', query_param)
        assert aql_condition_part == (
            'SEARCH (d.lang == "en" OR d.name==@query) AND (PHRASE(d.content, "ghosts", '
            '"common_text") OR LIKE(d.segmented_text, "%ghosts%") OR '
            'ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") OR '
            'ANALYZER(LIKE(d.segmented_text, "%ghosts%"), "normalize") OR '
            'ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") OR '
            'ANALYZER(LIKE(d.segmented_text, "%ghosts%"), "normalize") OR LIKE(d.name, '
            '"%ghosts%")) AND (PHRASE(d.content, "goblins", "common_text") OR '
            'LIKE(d.segmented_text, "%goblins%") OR ANALYZER(LIKE(d.name, "%goblins%"), '
            '"normalize") OR ANALYZER(LIKE(d.segmented_text, "%goblins%"), "normalize") '
            'OR ANALYZER(LIKE(d.name, "%goblins%"), "normalize") OR '
            'ANALYZER(LIKE(d.segmented_text, "%goblins%"), "normalize") OR LIKE(d.name, '
            '"%goblins%")) FILTER d.is_segmented != True  '
        )


class TestGenerateGeneralQueryAql:
    def test_aql_condition_part(self):
        _, aql_condition_part = generate_general_query_aql(
            query='ghosts',
            limit=10,
            offset=0,
            matchpartial=False,
            selected_languages=['en'],
        )

        lines = [line.strip() for line in aql_condition_part.splitlines() if len(line)]

        assert lines == [
            'SEARCH (PHRASE(d.content, @query, "common_text")',
            'OR PHRASE(d.name, @query, "common_text")',
            'OR d.uid == @query',
            'OR ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") ) FILTER d.is_segmented '
            "!= True   AND (d.lang IN ['en'] OR d.is_root==null)"
        ]

    def test_match_partial(self):
        _, aql_condition_part = generate_general_query_aql(
            query='ghosts',
            limit=10,
            offset=0,
            matchpartial='true',
            selected_languages=['en'],
        )

        lines = [line.strip() for line in aql_condition_part.splitlines() if len(line)]

        assert lines == [
            'SEARCH (PHRASE(d.content, @query, "common_text")',
            'OR PHRASE(d.name, @query, "common_text")',
            'OR d.uid == @query',
            'OR ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") OR LIKE(d.volpage, '
            '"%ghosts%") OR LIKE(d.name, "%ghosts%") OR ANALYZER(LIKE(d.name, '
            '"%ghosts%"), "normalize") OR ANALYZER(LIKE(d.segmented_text, "%ghosts%"), '
            '"normalize") OR ANALYZER(LIKE(d.name, "%ghosts%"), "normalize") OR '
            'ANALYZER(LIKE(d.segmented_text, "%ghosts%"), "normalize")  OR '
            '(LIKE(d.segmented_text, "%ghosts%") OR LIKE(d.segmented_text, "%ghosts%"))) '
            "FILTER d.is_segmented == True  AND (d.lang IN ['en'] OR d.is_root==null)"
        ]


@pytest.mark.parametrize(
    'matchpartial,aql', [
        ('true', ' FILTER d.is_segmented == True '),
        ('false', ' FILTER d.is_segmented != True  '),
        ('something', ' FILTER d.is_segmented != True  '),
    ]
)
def test_get_filter_part_for_aql(matchpartial, aql):
    assert get_filter_part_for_aql(matchpartial) == aql


def test_get_limit_part_for_aql():
    assert get_limit_part_for_aql(limit=10, offset=20) == 'LIMIT 20, 10'


@pytest.mark.parametrize(
    'selected_languages,aql', [
        (None, ''),
        (dict(), ''),
        ([], ''),
        (['en'], " AND (d.lang IN ['en'] OR d.is_root==null) "),
    ]
)
def test_lang_condition_for_aql(selected_languages, aql):
    assert get_lang_condition_for_aql(selected_languages) == aql
