import os
import logging
import json
import time
import lxml.html
import regex
import sys
from tqdm import tqdm

from algoliasearch.search_client import SearchClient

# algolia_client = SearchClient.create('B3DSEV09M1', '')
algolia_client = SearchClient.create('6P1QMGK4ZX', '')
algolia_index = algolia_client.init_index('sc_text_contents')

from common.arangodb import get_db
from common.queries import (
    TEXTS_BY_LANG_FOR_SEARCH,
    BILARA_TEXT_BY_LANG_FOR_SEARCH,
)

EBS_NAMES = '''
FOR d IN ebs_names
    LET acronym = (
        FOR t IN text_extra_info
            FILTER t.uid == d.uid
            LIMIT 1
            RETURN t.acronym
    )[0]
    RETURN {
        uid: d.uid,
        name: d.name,
        acronym: acronym,
        lang: d.lang,
        node_type: d.node_type,
        is_root: d.is_root,
        segmented_text: "",
        author_uid: "",
        author: "",
        is_ebs: true,
        is_ebs_name: true
    }
'''

logger = logging.getLogger('algolia_search.texts')

ebt_prefixes = [
    "dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an",
    "ea", "ea-2", "kp", "iti", "ud", "snp", "dhp", "thig",
    "thag", "pli-tv", "lzh-mg", "lzh-mi", "lzh-dg",
    "lzh-sarv", "lzh-mu", "lzh-ka", "lzh-upp", "san-mg",
    "san-lo", "up", "ea-ot", "d", "sf"
]

ebs_prefixes = [
    "dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an",
    "ea", "ea-2", "kp", "iti", "ud", "snp", "dhp", "thig",
    "thag", "sf"
]

ebct_prefixes = [
    "da", "ma", "sa", "sa-2", "sa-3", "ea", "ea-2", "lzh-mg",
    "lzh-mi", "lzh-dg", "lzh-sarv", "lzh-mu", "lzh-ka",
    "lzh-upp", "ea-ot", "d"
]


class TextLoader:
    doc_type = 'text'
    version = '2'
    htmlparser = lxml.html.HTMLParser(encoding='utf8')
    numstriprex = regex.compile(r'(?=\S*\d)\S+')

    def __init__(self, lang):
        self.lang = lang['uid']
        self.full_lang = lang['name']
        super().__init__()

    @staticmethod
    def clear_index():
        print('Deleting index...')
        algolia_index.clear_objects()

    def index_all_text(self):
        # self.index_bilara_texts()
        # self.index_html_texts()

        # self.index_segmented_texts()
        self.index_merged_segmented_texts()


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

    def is_ebt(self, root_uid):
        return root_uid in ebt_prefixes

    def is_ebs(self, root_uid):
        return root_uid in ebs_prefixes

    def is_ebct(self, root_uid):
        return root_uid in ebct_prefixes

    def index_bilara_texts(self):
        bilara_texts = list(
            get_db().aql.execute(
                BILARA_TEXT_BY_LANG_FOR_SEARCH, bind_vars={'lang': self.lang}
            )
        )
        if not bilara_texts:
            return

        segmented_texts = []
        for text in bilara_texts:
            uid = text['uid']
            with open(text['strings_path']) as f:
                strings = json.load(f)

            strings = {
                key: value
                for key, value in strings.items()
                if ":0." not in key
            }

            text_info = {
                'acronym': text['acronym'],
                'uid': uid,
                'name': (
                    self.fix_text(text['title'])
                    if text['title']
                    else text['uid']
                ),
                'lang': text['lang'],
                'full_lang': text['full_lang'],
                'author': text['author'],
                'author_uid': text['author_uid'],
                'author_short': text['author_short'],
                'is_root': self.lang == text['root_lang'],
                'heading': {
                    'title': (
                        self.fix_text(text['title'])
                        if text['title']
                        else text['uid']
                    )
                },
                'content': '\n\n'.join(strings.values()),
                'is_segmented': False,
                'is_bilara_text': True,
                'is_ebt': self.is_ebt(text['root_uid']),
                'is_ebs': self.is_ebs(text['root_uid']),
                'is_ebct': self.is_ebct(text['root_uid']),
                'root_uid': text['root_uid'],
                'full_path': text['full_path']
            }

            segmented_texts.append(text_info)

        if segmented_texts:
            print(f'Index {len(segmented_texts)} {self.full_lang} segmented texts.')
            algolia_index.save_objects(
                segmented_texts, {'autoGenerateObjectIDIfNotExist': True}
            )

    def index_segmented_texts(self):
        bilara_texts = list(
            get_db().aql.execute(
                BILARA_TEXT_BY_LANG_FOR_SEARCH, bind_vars={'lang': self.lang}
            )
        )
        if not bilara_texts:
            return

        segmented_texts = []
        for text in bilara_texts:
            uid = text['uid']
            with open(text['strings_path']) as f:
                strings = json.load(f)
            for key, value in strings.items():
                if value and f'{uid}:0.' not in key:
                    segmented_text_info = {
                        'acronym': text['acronym'],
                        'uid': uid,
                        'name': (
                            self.fix_text(text['title'])
                            if text['title']
                            else text['uid']
                        ),
                        'lang': text['lang'],
                        'full_lang': text['full_lang'],
                        'author': text['author'],
                        'author_uid': text['author_uid'],
                        'author_short': text['author_short'],
                        'is_root': self.lang == text['root_lang'],
                        'heading': {
                            'title': (
                                self.fix_text(text['title'])
                                if text['title']
                                else text['uid']
                            )
                        },
                        'segmented_uid': key,
                        'segmented_text': value,
                        'content': '',
                        'is_segmented': True,
                        'is_ebt': self.is_ebt(text['root_uid']),
                        'is_ebs': self.is_ebs(text['root_uid']),
                        'is_ebct': self.is_ebct(text['root_uid']),
                        'root_uid': text['root_uid'],
                        'full_path': text['full_path']
                    }
                    segmented_texts.append(segmented_text_info)
            algolia_index.save_objects(
                segmented_texts, {'autoGenerateObjectIDIfNotExist': True}
            )
            segmented_texts = []

    def index_merged_segmented_texts(self):
        bilara_texts = list(
            get_db().aql.execute(
                BILARA_TEXT_BY_LANG_FOR_SEARCH, bind_vars={'lang': self.lang}
            )
        )
        if not bilara_texts:
            return

        segmented_texts = []
        for text in bilara_texts:
            uid = text['uid']
            with open(text['strings_path']) as f:
                strings = json.load(f)

            merged_count = 0
            merged_values = []
            for key, value in strings.items():
                if value and f'{uid}:0.' not in key:
                    merged_values.append(key.split(':')[1] + ':' + value)
                    merged_count += 1
                    if merged_count % 10 == 0:
                        segmented_text_info = {
                            'acronym': text['acronym'],
                            'uid': uid,
                            'name': (
                                self.fix_text(text['title'])
                                if text['title']
                                else text['uid']
                            ),
                            'lang': text['lang'],
                            'author': text['author'],
                            'author_uid': text['author_uid'],
                            'is_root': self.lang == text['root_lang'],
                            'is_ebs': self.is_ebs(text['root_uid']),
                            'segmented_text': '\n\n'.join(merged_values),
                        }
                        segmented_texts.append(segmented_text_info)
                        merged_values = []
            algolia_index.save_objects(
                segmented_texts, {'autoGenerateObjectIDIfNotExist': True}
            )
            segmented_texts = []

    def index_ebs_names(self):
        if ebs_names := list(get_db().aql.execute(EBS_NAMES)):
            print(f'Index {len(ebs_names)} early buddhist suttas names.')
            algolia_index.save_objects(ebs_names, {'autoGenerateObjectIDIfNotExist': True})
        else:
            return

    def index_html_texts(self):
        html_texts = list(
            get_db().aql.execute(
                TEXTS_BY_LANG_FOR_SEARCH, bind_vars={'lang': self.lang}
            )
        )
        if not html_texts:
            return

        legacy_texts = []

        for text in html_texts:
            uid = text['uid']
            author_uid = text['author_uid']
            try:
                with open(text['file_path'], 'rb') as f:
                    html_bytes = f.read()

                root_lang = text['root_lang']
                text_info = {
                    'acronym': text['acronym'],
                    'uid': uid,
                    'lang': text['lang'],
                    'full_lang': text['full_lang'],
                    'root_lang': root_lang,
                    'author': text['author'],
                    'author_uid': author_uid,
                    'author_short': text['author_short'],
                    'is_root': self.lang == root_lang,
                    'is_segmented': False,
                    'is_legacy_text': True,
                    'is_ebt': self.is_ebt(text['root_uid']),
                    'is_ebs': self.is_ebs(text['root_uid']),
                    'is_ebct': self.is_ebct(text['root_uid']),
                    'root_uid': text['root_uid'],
                    'full_path': text['full_path']
                }
                text_info |= self.extract_fields_from_html(html_bytes)
                legacy_texts.append(text_info)
            except (ValueError, IndexError) as e:
                logger.exception(f'{text["uid"]}, {e}')

        if legacy_texts:
            print(f'Index {len(legacy_texts)} {self.full_lang} legacy texts.')
            algolia_index.save_objects(
                legacy_texts, {'autoGenerateObjectIDIfNotExist': True}
            )

    def extract_fields_from_html(self, data):
        root = lxml.html.fromstring(data, parser=self.htmlparser)
        text = root.find('body/article')
        if text is None:
            text = root.find('body/section')
        if text is None:
            raise ValueError(
                "Structure of html is not body > article or not body > section"
            )

        if metaarea := root.cssselect('#metaarea'):
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

        for a in text.cssselect('a'):
            a.drop_tree()

        for e in text.cssselect('footer'):
            e.drop_tree()

        content = text.text_content()
        title = self.fix_text(title.text_content()) if title is not None else ''
        division = (
            '' if division is None
            else self.fix_text(division.text_content())
        )

        return {
            'name': title,
            'content': content,
            'heading': {
                'title': title,
                'division': division,
                'subhead': [e.text_content().strip() for e in others],
            },
        }


def import_texts_to_algolia():
    db = get_db()
    TextLoader.clear_index()
    time.sleep(5)
    print('Start re-indexing...')
    languages = list(
        db.aql.execute(
            'FOR l IN language SORT l.uid RETURN {uid: l.uid, name: l.name}'
        )
    )
    order = [
        "en", "pli", "lzh", "san", "pra", "xct", "pgd", "de", "zh", "af",
        "ar", "bn", "ca", "cs", "es", "fa", "fi", "fr", "gu",
        "haw", "he", "hi", "hr", "hu", "id", "it", "jpn", "kan", "kho",
        "ko", "la", "lt", "mr", "my", "nl", "no", "pl", "pt",
        "ro", "ru", "si", "sk", "sl", "sld", "sr", "sv", "ta", "th",
        "uig", "vi", "xto"
    ]
    languages = sorted(languages, key=lambda x: order.index(x["uid"]))

    for lang in tqdm(languages):
        loader = TextLoader(lang)
        loader.index_all_text()

    loader = TextLoader({'uid': 'en', 'name': 'English'})
    loader.index_ebs_names()
