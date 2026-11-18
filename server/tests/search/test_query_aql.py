import pytest

from search.query_aql import construct_search_query_aql


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
