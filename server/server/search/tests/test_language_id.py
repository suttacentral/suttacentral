import pytest
from search.language_id import smart_rank


@pytest.mark.parametrize("text,expected", [
    ["බ්‍රහ්මජාල සූත්‍රය", ["si"]],
    ["Sämereien und Pflanzungen anzulegen hat er verschmäht", ["de"]],
    ["trifling and insignificant matters", ["en"]],
    ["abandonnement", ["fr"]],
])
def test_smart_rank(client, text, expected):
    assert smart_rank(text) == expected
