import pytest

import lxml.html

from data_loader import sc_html


class TestHtHtmlElementMixin:
    def test_detach(self):
        p = sc_html.fromstring('<p><em>p1</em>Once upon a time...</p>')
        p.append(p.find('em').detach())
        assert str(p) == '<p>Once upon a time...<em>p1</em></p>'

    def test_prepend(self):
        p = sc_html.fromstring('<p>There can be only one.</p>')
        p.insert(0, p.makeelement('a', {'id': 'wrong'}))
        assert str(p) == '<p>There can be only one.<a id="wrong"></a></p>'
        p.prepend(p.makeelement('a', {'id': 'right'}))
        assert str(p) == '<p><a id="right"></a>There can be only one.<a id="wrong"></a></p>'

    def test_wrap_outer(self):
        dom = sc_html.fromstring('<div><a>foo</a>bar</div>')
        dom.find('a').wrap_outer(dom.makeelement('b'))
        assert str(dom) == '<div><b><a>foo</a></b>bar</div>'

    def test_wrap_inner(self):
        dom = sc_html.fromstring('<div><a>foo</a>bar</div>')
        dom.find('a').wrap_inner(dom.makeelement('i'))
        assert str(dom) == '<div><a><i>foo</i></a>bar</div>'

    def test_convert_bad_tags(self):
        dom = sc_html.fromstring('<baa><p><moo>Goes the cow</namo> ...')
        dom.convert_bad_tags()
        assert str(dom) == '<div class="baa"><p><span class="moo">Goes the cow ...</span></p></div>'

    def test_str_returns_html_code(self):
        p = sc_html.fromstring('<p>There can be only one.</p>')
        assert str(p) == '<p>There can be only one.</p>'

    def test_bool_returns_true_for_object(self):
        p = sc_html.fromstring('<p>There can be only one.</p>')
        assert bool(p) is True

class TestLxmlHtmlElement:
    parser = lxml.html.HTMLParser(encoding='utf-8')

    def fromstring(self, string: str):
        return lxml.html.fromstring(string, parser=self.parser)

    def test_lxml_html5_tags_are_monkey_patched(self):
        patched_definitions = frozenset({'section', 'article', 'header'})
        assert lxml.html.defs.html5_tags == patched_definitions

    def test_str_returns_object_representation(self):
        p = self.fromstring('<p>There can be only one.</p>')
        assert str(p).startswith("<Element p at")

    def test_falsy_if_has_no_children(self):
        p = self.fromstring('<p>I have no children.</p>')
        assert bool(p) is False

    def test_truthy_if_has_no_children(self):
        p = self.fromstring('<p>I have a child.<br/></p>')
        assert bool(p) is True

    def test_no_detach(self):
        p = self.fromstring('<p><em>p1</em>Once upon a time...</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'detach'"):
            p.append(p.find('em').detach())

    def test_no_prepend(self):
        p = self.fromstring('<p>There can be only one.</p>')
        p.insert(0, p.makeelement('a', {'id': 'wrong'}))
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'prepend'"):
            p.prepend(p.makeelement('a', {'id': 'right'}))

    def test_no_wrap_outer(self):
        dom = self.fromstring('<div><a>foo</a>bar</div>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'wrap_outer'"):
            dom.find('a').wrap_outer(dom.makeelement('b'))

    def test_no_wrap_inner(self):
        dom = self.fromstring('<div><a>foo</a>bar</div>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'wrap_inner'"):
            dom.find('a').wrap_inner(dom.makeelement('i'))

    def test_no_select_or_fail(self):
        p = self.fromstring('<p>There can be only one.</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'select_or_fail'"):
            p.select_or_fail('p')

    def test_no_each_text(self):
        p = self.fromstring('<p>There can be only one.</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'each_text'"):
            p.each_text(None)

    def test_no_convert_bad_tags(self):
        dom = self.fromstring('<baa><p><moo>Goes the cow</namo> ...')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'convert_bad_tags'"):
            dom.convert_bad_tags()

    def test_no_pretty(self):
        p = self.fromstring('<p>There can be only one.</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'pretty'"):
            p.pretty()

    def test_no_head(self):
        p = self.fromstring('<p>There can be only one.</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'headsure'"):
            p.headsure

    def test_no_add_class(self):
        p = self.fromstring('<p>There can be only one.</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'add_class'"):
            p.add_class(None)

    def test_no_remove_class(self):
        p = self.fromstring('<p>There can be only one.</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'remove_class'"):
            p.remove_class(None)

    def test_no_id_map(self):
        p = self.fromstring('<p>There can be only one.</p>')
        with pytest.raises(AttributeError, match="'HtmlElement' object has no attribute 'id_map'"):
            p.id_map()