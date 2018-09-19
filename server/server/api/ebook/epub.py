#!/usr/bin/env python3

"""
Create Epub files.

This code was designed to provide a very simple and straight-forward API for
creating epub files, by sacrificing most of the versatility of the format.

Example usage:

>>> book = Book(title='Example Book', author='John Doe')
>>> with open('cover.png', 'br') as file:
>>>     book.add_cover(file.read())
>>> with open('style.css') as file:
>>>     book.add_stylesheet(file.read())
>>> book.add_page(title='First Page', content='some text')
>>> chapter = book.add_page(title='First Chapter', content='more text')
>>> book.add_page(
>>>     title='Sub-Page 1',
>>>     content='first subpage of the chapter',
>>>     parent=chapter)
>>> with open('image.jpg', 'br') as file:
>>>     book.add_image('image.jpg', file.read())
>>> book.save('example.epub')

"""

###############################################################################
# Module Imports
###############################################################################

import arrow
import collections
import itertools
import logging
import lxml.etree
import lxml.html
import pathlib
import pkgutil
import tempfile
import uuid
import zipfile

###############################################################################

log = logging.getLogger(__name__)

###############################################################################


class ETreeWrapper:
    """Convinience wrapper around xml trees."""

    def __init__(self, *args, namespaces, **kwargs):
        self.tree = lxml.etree.ElementTree(*args, **kwargs)
        self.namespaces = namespaces

    def __call__(self, tag='*', **kwargs):
        path = './/{}'.format(tag)
        for key, value in kwargs.items():
            path += '[@{}="{}"]'.format(key, value)
        return self.tree.find(path, namespaces=self.namespaces)

    def __getattr__(self, name):
        return getattr(self.tree, name)

    def write(self, path):
        self.tree.write(str(path), xml_declaration=True,
                        encoding='UTF-8', pretty_print=True)


def template(name):
    """Get file template."""
    here = pathlib.Path(__file__).parent
    with open(here / name, 'rb') as file:
        template = file.read()
    return ETreeWrapper(
        lxml.etree.fromstring(
            template,
            lxml.etree.XMLParser(remove_blank_text=True)),
        namespaces=dict(
            opf='http://www.idpf.org/2007/opf',
            dc='http://purl.org/dc/elements/1.1/',
            xhtml='http://www.w3.org/1999/xhtml',
            ncx='http://www.daisy.org/z3986/2005/ncx/'))


def flatten(tree):
    for item in tree:
        yield item
        yield from flatten(item.children)

###############################################################################

Page = collections.namedtuple('Page', 'uid title children')
Image = collections.namedtuple('Image', 'name type')


class Book:
    """Wrapper around a epub archive."""

    def __init__(self, **kwargs):
        self.tempdir = tempfile.TemporaryDirectory()
        self.root = []
        self.images = []
        self.uid_generator = map('p{:04}'.format, itertools.count(1))

        self.path = pathlib.Path(self.tempdir.name).resolve()
        self.oebps = self.path / 'OEBPS'
        self.oebps.mkdir()
        
        (self.oebps / 'pages').mkdir()
        (self.oebps / 'images').mkdir()
        (self.oebps / 'styles').mkdir()

        self.title = kwargs.get('title', 'Untitled')
        self.language = kwargs.get('language', 'en')
        self.author = kwargs.get('author', 'Unknown Author')

    def add_page(self, title, content, parent=None, uid=None):
        """Add a new page/chapter to the root of the book."""
        log.info('New page: {}'.format(title))
        uid = uid or next(self.uid_generator)
        page = Page(uid, title, [])
        self.root.append(page) if not parent else parent.children.append(page)

        file = template('page.xhtml')
        file('xhtml:title').text = title
        file('xhtml:body').append(lxml.html.fromstring(content))
        file.write(self.oebps / 'pages' / (page.uid + '.xhtml'))
        return page

    def add_image(self, name, data):
        log.info('New image: {}'.format(name))
        if name.endswith('.jpg'):
            media_type = 'image/jpeg'
        if name.endswith('.png'):
            media_type = 'image/png'
        self.images.append(Image(name, media_type))
        with open(str(self.oebps / 'images' / name), 'wb') as file:
            file.write(data)
    
    def add_cover(self, data):
        with open(str(self.path / 'cover.png'), 'wb') as file:
            file.write(data)
        
    def add_stylesheet(self, data):
        with open(str(self.oebps / 'styles/stylesheet.css'), 'w') as file:
            file.write(data)

    def save(self, filename):
        self._write_spine()
        self._write_container()
        self._write_toc()
        with open(str(self.path / 'mimetype'), 'w') as file:
            file.write('application/epub+zip')
        with zipfile.ZipFile(filename, 'w') as archive:
            archive.write(
                str(self.path / 'mimetype'), 'mimetype',
                compress_type=zipfile.ZIP_STORED)
            for file in self.path.rglob('*.*'):
                archive.write(
                    str(file), str(file.relative_to(self.path)),
                    compress_type=zipfile.ZIP_DEFLATED)
        log.info('Book saved: {}'.format(self.title))

    def _write_spine(self):
        spine = template('content.opf')
        now = arrow.utcnow().format('YYYY-MM-DDTHH:mm:ss')
        spine('dc:date').text = now
        spine('dc:title').text = self.title
        spine('dc:creator').text = self.author
        spine('dc:language').text = self.language
        spine(id='BookID').text = str(uuid.uuid4())

        for page in flatten(self.root):
            lxml.etree.SubElement(
                spine('opf:manifest'), 'item',
                href='pages/{}.xhtml'.format(page.uid), id=page.uid,
                **{'media-type': 'application/xhtml+xml'})
            lxml.etree.SubElement(
                spine('opf:spine'), 'itemref', idref=page.uid)

        for uid, image in enumerate(self.images):
            lxml.etree.SubElement(
                spine('opf:manifest'),
                'item',
                href='images/' + image.name,
                id='img{:03}'.format(uid + 1),
                **{'media-type': image.type})

        spine.write(self.oebps / 'content.opf')

    def _write_container(self):
        container = template('container.xml')
        meta_inf = self.path / 'META-INF'
        meta_inf.mkdir()
        container.write(meta_inf / 'container.xml')

    def _write_toc(self):
        toc = template('toc.ncx')
        toc('ncx:text').text = self.title
        for i, page in enumerate(self.root, 1):
            self._page_to_toc(page, toc('ncx:navMap'), num=i)
        toc.write(self.oebps / 'toc.ncx')

    def _page_to_toc(self, page, node, num):
        navpoint = lxml.etree.SubElement(
            node, 'navPoint', id=page.uid, playOrder=str(num))
        navlabel = lxml.etree.SubElement(navpoint, 'navLabel')
        lxml.etree.SubElement(navlabel, 'text').text = page.title
        lxml.etree.SubElement(
            navpoint, 'content', src='pages/{}.xhtml'.format(page.uid))
        for child in page.children:
            self._page_to_toc(child, navpoint)
