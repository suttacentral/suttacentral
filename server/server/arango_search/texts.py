import logging
import time
import json

import lxml.html
import regex
from tqdm import tqdm

from common.arangodb import get_db
from common.queries import CURRENT_MTIMES, CURRENT_BILARA_MTIMES, TEXTS_BY_LANG, BILARA_TEXT_BY_LANG
from data_loader import change_tracker
from itertools import chain
from math import log

logger = logging.getLogger('arango_search.texts')

class TextLoader(object):
    doc_type = 'text'
    version = '1'
    htmlparser = lxml.html.HTMLParser(encoding='utf8')
    numstriprex = regex.compile(r'(?=\S*\d)\S+')

    def __init__(self, lang):
        self.lang = lang

    def truncateTextContentCollection(self):
        get_db().collection('text_contents').truncate()

    def add_to_DB(self):
        self.load_bilara_texts(self)
        self.load_html_texts()

    def fix_text(self, string):
        """ Removes repeated whitespace and numbers.

        A newline  in the output indicates a paragraph break.
        """

        string = regex.sub(r'(?<!\n)\n(?!\n)', ' ', string)
        string = regex.sub(r'  +', ' ', string)
        string = regex.sub(r'\n\n+', r'\n', string)
        string = regex.sub('\S*?\d\S*', '', string)
        string = string.replace('\xad', '')
        return string.strip()

    @staticmethod
    def load_bilara_texts(self):
        bilara_texts = list(get_db().aql.execute(BILARA_TEXT_BY_LANG, bind_vars={'lang': self.lang}))
        if not bilara_texts:
            return

        chunk = []

        # print(len(bilara_texts))

        for text in bilara_texts:
            uid = text['uid']
            with open(text['strings_path']) as f:
                strings = json.load(f)

            action = {
                'acronym': text['acronym'],
                'uid': uid,
                'lang': self.lang,
                'author': text['author'],
                'author_uid': text['author_uid'],
                'author_short': text['author_short'],
                'is_root': self.lang == text['root_lang'],
                'mtime': int(text['mtime']),
                'heading': {
                    'title': self.fix_text(text['title']) if text['title'] else text['uid']
                },
                'content': '\n\n'.join(strings.values())
            }

            chunk.append(action)

        if chunk:
            print(len(chunk))
            get_db().collection('text_contents').import_bulk(chunk)


    def load_html_texts(self):
        html_texts = list(get_db().aql.execute(TEXTS_BY_LANG, bind_vars={'lang': self.lang}))
        if not html_texts:
            return

        chunk = []
        chunk_size = 0

        for i, text in enumerate(html_texts):
            uid = text['uid']
            author_uid = text['author_uid']
            try:
                with open(text['file_path'], 'rb') as f:
                    html_bytes = f.read()
                chunk_size += len(html_bytes) + 512

                root_lang = text['root_lang']

                action = {
                    'acronym': text['acronym'],
                    'uid': uid,
                    'lang': self.lang,
                    'root_lang': root_lang,
                    'author': text['author'],
                    'author_uid': author_uid,
                    'author_short': text['author_short'],
                    'is_root': self.lang == root_lang,
                    'mtime': int(text['mtime']),
                }

                action.update(self.extract_fields_from_html(html_bytes))
                chunk.append(action)
            except (ValueError, IndexError) as e:
                logger.exception(f'{text["uid"]}, {e}')

        if chunk:
            get_db().collection('text_contents').import_bulk(chunk)


    def extract_fields_from_html(self, data):
        root = lxml.html.fromstring(data, parser=self.htmlparser)
        text = root.find('body/article')
        if text is None:
            text = root.find('body/section')

        if text is None:
            raise ValueError("Structure of html is not body > article or not body > section")

        metaarea = root.cssselect('#metaarea')
        author = []
        if metaarea:
            metaarea[0].drop_tree()

        for section in root.iter('section'):
            for sib in section.itersiblings():
                if sib.tag == 'section':
                    break
                sib.drop_tree()

        for p in root.iter('p'):
            p.tail = '\n\n' + (p.tail or '')

        for e in root.cssselect('.add'):
            e.drop_tree()

        header = text.cssselect('header')[0]
        division = header[0]
        title = header[-1]
        if title == division:
            division = None
        others = header[1:-1]
        header.drop_tree()
        content = self.fix_text(text.text_content())
        title = self.fix_text(title.text_content()) if title is not None else ''
        division = '' if division is None else self.fix_text(division.text_content())

        return {
            'content': content,
            'heading': {
                'title': title,
                'division': division,
                'subhead': [e.text_content().strip() for e in others],
            },
            'boost': self.boost_factor(content),
        }

    def boost_factor(self, content):
        boost = self.length_boost(len(content))
        if len(content) < 500:
            content = content.casefold()
            if 'preceding' in content or 'identical' in content:
                boost = boost * 0.4
        return boost

    def length_boost(self, length, midpoint=250):
        return length / midpoint if length < midpoint else 0.5 + 1 / (1 + abs(log(length / (10 * midpoint), 10)))


def update(force=False):
    def sort_key(lang):
        if lang == 'en':
            return 0
        if lang == 'pli':
            return 1
        return 10

    db = get_db()
    loader = TextLoader('en')
    loader.truncateTextContentCollection()

    languages = sorted(db.aql.execute('FOR l IN language RETURN l.uid'), key=sort_key)
    for lang in tqdm(languages):
        loader = TextLoader(lang)
        loader.add_to_DB()
