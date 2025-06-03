import logging

import regex

from data_loader import sc_html

logger = logging.getLogger(__name__)

class UnsegmentedText:
    def __init__(self, html: str, lang_uid: str):
        self._html = html
        self._lang_uid = lang_uid
        self._root = sc_html.fromstring(html)

    def authors_long_name(self):
        author = None
        e = self._root.select_one('meta[author]')
        if e:
            author = e.attrib['author']

        if not author:
            e = self._root.select_one('meta[name=author]')
            if e:
                author = e.attrib['content']

        return author

    def publication_date(self):
        e = self._root.select_one('.publication-date')
        if e:
            return e.text_content()

        return None

    def title(self) -> str:
        root = self._root
        header = root.select_one('header')
        if not header:
            return ''

        h1 = header.select_one('h1')
        if not h1:
            return ''

        if self._lang_uid == 'lzh':
            left_side = h1.select_one('.mirror-left')
            right_side = h1.select_one('.mirror-right')
            if left_side and right_side:
                return right_side.text_content() + ' (' + left_side.text_content() + ')'

        return regex.sub(r'[\d\.\{\} –-]*', '', h1.text_content(), 1)

    def volpage(self):
        if self._lang_uid == 'lzh':
            e = self._root.next_in_order()
            while e is not None:
                if e.tag == 'a' and e.select_one('.t'):
                    break
                e = e.next_in_order()
            else:
                return
            return '{}'.format(e.attrib['id']).replace('t', 'T ')
        return None
