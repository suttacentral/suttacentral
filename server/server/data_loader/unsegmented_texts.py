import logging
from dataclasses import dataclass

import regex

from data_loader import sc_html
from data_loader.sc_html import HtHtmlElement

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class TextDetails:
    title: str
    has_title_tags: bool
    authors_long_name: str | None
    publication_date: str | None
    volume_page: str | None


def extract_details(html: str, is_chinese_root: bool = False) -> TextDetails:
    root = sc_html.fromstring(html)
    title_tag = find_title_tag(root)
    title = extract_title(title_tag, is_chinese_root)

    return TextDetails(
        title=title,
        has_title_tags=bool(title_tag),
        authors_long_name=extract_authors_long_name(root),
        publication_date=extract_publication_date(root),
        volume_page=extract_volpage(root, is_chinese_root)
    )


def extract_authors_long_name(root) -> str | None:
    author = None
    e = root.select_one('meta[author]')
    if e:
        author = e.attrib['author']

    if not author:
        e = root.select_one('meta[name=author]')
        if e:
            author = e.attrib['content']

    return author


def extract_publication_date(root) -> str | None:
    e = root.select_one('.publication-date')
    if e:
        return e.text_content()

    return None


def extract_title(title_tag: HtHtmlElement | None, is_chinese_root: bool) -> str:
    if title_tag is None:
        return ''

    if is_chinese_root:
        left_side = title_tag.select_one('.mirror-left')
        right_side = title_tag.select_one('.mirror-right')
        if left_side and right_side:
            right_text = right_side.text_content()
            left_text = left_side.text_content()
            mirrored_title = f'{right_text} ({left_text})'
            return mirrored_title

    return normalise_title(title_tag.text_content())


def find_title_tag(root: HtHtmlElement) -> HtHtmlElement | None:
    header = root.select_one('header')
    if not header:
        return None

    h1 = header.select_one('h1')

    if not h1:
        return None

    return h1


def normalise_title(title: str) -> str:
    # This may return an empty string e.g. when given a title like "11.358–405"
    return regex.sub(r'[\d\.\{\} –-]*', '', title, 1)


def extract_volpage(root: HtHtmlElement, is_chinese_root: bool) -> str | None:
    if is_chinese_root:
        e = root.next_in_order()
        while e is not None:
            if e.tag == 'a' and e.select_one('.t'):
                break
            e = e.next_in_order()
        else:
            return
        return '{}'.format(e.attrib['id']).replace('t', 'T ')
    return None
