from data_loader.sc_html import fromstring


class TestHtHtmlElementMixin:
    def test_detach(self):
        p = fromstring('<p><em>p1</em>Once upon a time...</p>')
        p.append(p.find('em').detach())
        assert str(p) == '<p>Once upon a time...<em>p1</em></p>'

    def test_prepend(self):
        p = fromstring('<p>There can be only one.</p>')
        p.insert(0, p.makeelement('a', {'id': 'wrong'}))
        assert str(p) == '<p>There can be only one.<a id="wrong"></a></p>'
        p.prepend(p.makeelement('a', {'id': 'right'}))
        assert str(p) == '<p><a id="right"></a>There can be only one.<a id="wrong"></a></p>'

    def test_wrap_outer(self):
        dom = fromstring('<div><a>foo</a>bar</div>')
        dom.find('a').wrap_outer(dom.makeelement('b'))
        assert str(dom) == '<div><b><a>foo</a></b>bar</div>'

    def test_wrap_inner(self):
        dom = fromstring('<div><a>foo</a>bar</div>')
        dom.find('a').wrap_inner(dom.makeelement('i'))
        assert str(dom) == '<div><a><i>foo</i></a>bar</div>'
