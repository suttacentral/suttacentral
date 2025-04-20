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

    def detach(self):
        """ Detach the element from the tree for re-insertion

        Like drop_tree but there are two differences, first, the
        tail is automatically removed (drop_tree always leaves the tail
        in the document, but it also leaves it attached to the dropped
        tag), secondly, the dropped element is returned as a convenience
        for re-insertion.

        """

        self.drop_tree()
        self.tail = None
        return self

    def prepend(self, other):
        """Inserts other at the start of self.

        Unlike .insert(0, other), handles text properly.

        """
        self.insert(0, other)
        if self.text:
            other.tail = self.text + (other.tail or '')
            self.text = None

    def wrap_outer(self, other):
        """Wrap self in other"""

        self.addprevious(other)
        other.tail = self.tail
        self.tail = None
        other.append(self)

    def wrap_inner(self, other):
        """Wrap the contents of self inside other """

        other.extend(self)
        other.text = self.text
        self.text = None
        self.append(other)

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

    def select_or_fail(self, selector):
        """ Raises ``CssSelectorFailed`` instead of returning an empty list """

        result = self.select(selector)
        if not result:
            raise CssSelectorFailed(selector)
        return result

    def each_text(self, callback):
        """ Apply callback to each text and tail, in proper order

        If the return value of the callback is not False, the text
        will be set to the return value.

        """
        if self.text:
            result = callback(self.text)
            if result is not False:
                self.text = result
        for child in self:
            child.each_text(callback)
        if self.tail:
            result = callback(self.tail)
            if result is not False:
                self.tail = result

    def convert_bad_tags(self):
        """ Convert invalid html tags into div/span class="tag"

        Uses a simple heuristic to decide whether it should be a span
        or div, an element which contains block level elements will
        be a div, otherwise it will be span.

        """

        validtags = _html.defs.tags
        blocktags = _html.defs.block_tags

        for e in self.iter():
            if e.tag not in validtags:
                e.attrib['class'] = (
                    e.attrib['class'] + ' ' + e.tag if 'class' in e.attrib else e.tag
                )
                e.tag = 'span'
                for desc in e.iterdescendants():
                    print(e.tag)
                    if desc.tag in blocktags:
                        e.tag = 'div'
                        break

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

    def pretty(self, **kwargs):
        """ Return a string with prettified whitespace """
        string = _html.tostring(self, pretty_print=True, **kwargs).decode()
        extra_tags = ('article', 'section', 'hgroup')
        string = regex.sub(
            r'(<(?:{})[^>]*>)'.format('|'.join(extra_tags)), r'\n\1\n', string
        )
        string = regex.sub(
            r'(</(?:{})>)'.format('|'.join(extra_tags)), r'\n\1\n', string
        )
        string = string.replace('<br>', '<br>\n')
        string = string.replace('\n\n', '\n')
        string = regex.sub(r'\n +', '\n', string)
        return string

    @property
    def headsure(self):
        """ Returns head, creating it if it doesn't exist """
        try:
            return self.head
        except IndexError:
            head = self.makeelement('head')
            root = self.getroottree().getroot()
            assert root.tag == 'html', "Incomplete HTML tree"
            root.insert(0, head)
            return head

    def add_class(self, value):
        if 'class' in self.attrib:
            if value not in self.attrib['class']:
                self.attrib['class'] += ' ' + value
        else:
            self.attrib['class'] = value

    def remove_class(self, value):
        if 'class' in self.attrib:
            if 'value' in self.attrib['class']:
                new_class = ' '.join(
                    e for e in self.attr['class'].split() if e != value
                )
                if new_class:
                    self.attrib['class'] = new_class
                else:
                    del self.attrib['class']

    def id_map(self):
        """ Get a mapping of ids to elements """
        return {id: e for id, e in ((e.get('id'), e) for e in self.iter()) if e}

    def __bool__(self):
        """ Objects are always truth, as in future lxml

        Use 'len' to discover if contains children.
        """
        return True


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
