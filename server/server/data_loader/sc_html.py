"""
lxml.html extended.

Makes lxml.html easier to use in the python3 ecosystem and also
correctly handles text/tail transformations for some common
manipulations.

The only HtmlElement method which is overridden by this module is __str__,
which now returns the html code of the element.

Ajahn J.R.: This is not true, we override __bool__ as well. And the code
may change again so don't write comments like this.
"""

import itertools

import lxml.html as _html
import regex
from lxml.html import defs

defs.html5_tags = frozenset({'section', 'article', 'header'})


class CssSelectorFailed(Exception):
    """
    The exception returned by select_or_fail
    """

    def __init__(self, selector):
        self.selector = selector

    def __str__(self):
        return 'No matches for "{}"'.format(self.selector)


class HtHtmlElementMixin:
    """ Adds methods primarily to aid with proper handling of text/tail.

    Also adds some convenience methods.

    """

    def __str__(self):
        return _html.tostring(self, encoding='utf8').decode()

    def __bool__(self):
        """ Objects are always truth, as in future lxml

        Use 'len' to discover if contains children.
        """
        return True

    def select(self, selector):
        """ Shorthand for csssselect, less sss's

        Also much faster for the simple case of selecting simply by tag
        name(s), cssselect is quite slow especially when many elements are
        returned, the highly optimized iter can be 5-400x faster.

        """

        parts = [s.strip() for s in selector.split(',')]
        if all(map(str.isalpha, parts)):
            return list(self.iter(*parts))
        return self.cssselect(selector)

    def select_one(self, selector):
        """ Returns the first matching element, or None """

        result = self.select(selector)
        if result:
            return result[0]
        return None

    def next_in_order(self):
        """ Returns the next element in document order

        If you started at the root element and called this until
        reaching the end, the order would be identical to that
        returned by 'iter'. The difference is that this function
        can traverse sideways and upwards as well as down.

        """

        def iterparentsiblings(e):
            parent = e.getparent()
            while parent:
                yield from parent.itersiblings()
                parent = parent.getparent()

        ees = itertools.chain(
            self.iterchildren(), self.itersiblings(), iterparentsiblings(self)
        )

        for e in ees:
            if isinstance(e, HtHtmlElement):
                return e

        return None

    def detach(self):
        raise NotImplementedError('Unused mixin method deleted.')

    def prepend(self, other):
        raise NotImplementedError('Unused mixin method deleted.')

    def wrap_outer(self, other):
        raise NotImplementedError('Unused mixin method deleted.')

    def wrap_inner(self, other):
        raise NotImplementedError('Unused mixin method deleted.')

    def select_or_fail(self, selector):
        raise NotImplementedError('Unused mixin method deleted.')

    def each_text(self, callback):
        raise NotImplementedError('Unused mixin method deleted.')

    def convert_bad_tags(self):
        raise NotImplementedError('Unused mixin method deleted.')

    def pretty(self, **kwargs):
        raise NotImplementedError('Unused mixin method deleted.')

    def add_class(self, value):
        raise NotImplementedError('Unused mixin method deleted.')

    def remove_class(self, value):
        raise NotImplementedError('Unused mixin method deleted.')

    def id_map(self):
        raise NotImplementedError('Unused mixin method deleted.')

    @property
    def headsure(self):
        raise NotImplementedError('Unused mixin method deleted.')


# We need to jump through some hoops to ensure the mixins are included
# in all Element class for every tag type. (in lxml.html, some, like input
# and select, have a custom element type, these require the mixins parameter
# to set_element_class_lookup, but there the mixins don't apply to any
# non-customized tag, so we also need to manually mix them into a new
# HtmlElement and create a CustomLookup class which returns our new
# HtmlElement class as the default)
class HtHtmlElement(HtHtmlElementMixin, _html.HtmlElement):
    pass


class CustomLookup(_html.HtmlElementClassLookup):
    """ Returns CustomHtmlElement by default

    Oddly enough HtmlElement is hardcoded as the default in
    lxml.html.HtmlElementClassLookup which seems really strange, mixins will be
    properly mixed into custom classes (like Select) but not the default.
    """

    def lookup(self, node_type, document, namespace, name):
        if node_type == 'element':
            return self._element_classes.get(name.lower(), HtHtmlElement)
        super().lookup(node_type, document, namespace, name)


# lxml still has a number of issues handling utf8. We need to
# explicitly define that our parser is using utf-8 for some systems.
# http://stackoverflow.com/questions/15302125/html-encoding-and-lxml-parsing
def get_parser(encoding='utf-8'):
    parser = _html.HTMLParser(encoding=encoding)
    parser.set_element_class_lookup(CustomLookup(mixins=[('*', HtHtmlElementMixin)]))
    return parser


utf8parser = get_parser('utf-8')


def fromstring(string):
    return _html.fromstring(string, parser=utf8parser)
