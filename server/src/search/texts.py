import logging
import json
import time
import lxml.html
import regex
from tqdm import tqdm

from common.arangodb import get_db
from common.queries import (
    CURRENT_MTIMES,
    CURRENT_BILARA_MTIMES,
    TEXTS_BY_LANG_FOR_SEARCH,
    BILARA_TEXT_BY_LANG_FOR_SEARCH,
    TEXT_REFERENCES
)

logger = logging.getLogger('arango_search.texts')

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
    def truncate_text_contents():
        print('Deleting index...')
        get_db().collection('text_contents').truncate()
        get_db().collection('segmented_text_contents').truncate()
        get_db().collection('text_references').truncate()

    def import_all_text_to_db(self):
        self.import_bilara_texts()
        self.import_html_texts()
        self.import_segmented_texts()
        self.import_text_references()

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

    def import_bilara_texts(self):
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
                'root_lang': text['root_lang'],
                'author': text['author'],
                'author_uid': text['author_uid'],
                'author_short': text['author_short'],
                'is_root': self.lang == text['root_lang'],
                'heading': {
                    'title': (
                        strings[list(strings.keys())[0]]
                        if 'site' in text['muids']
                        else self.fix_text(text['title'])
                        if text['title']
                        else text['uid']
                    )
                },
                'content': '\n\n'.join(f'{key.split(":")[1] if ":" in key else key}: {value}' for key, value in strings.items()),
                'is_segmented': False,
                'is_bilara_text': True,
                'is_ebt': self.is_ebt(text['root_uid']),
                'is_ebs': self.is_ebs(text['root_uid']),
                'is_ebct': self.is_ebct(text['root_uid']),
                'is_article': 'site' in text['muids'],
                'root_uid': text['root_uid'],
                'full_path': text['full_path']
            }

            segmented_texts.append(text_info)

        if segmented_texts:
            print(
                f'Index {len(segmented_texts)} {self.full_lang} segmented texts.'
            )
            get_db().collection('text_contents').import_bulk(segmented_texts)

    def import_segmented_texts(self):
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
                        'root_lang': text['root_lang'],
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
            get_db().collection(
                'segmented_text_contents'
            ).import_bulk(segmented_texts)
            segmented_texts = []

    def import_text_references(self):
        bilara_text_references = list(
            get_db().aql.execute(
                TEXT_REFERENCES, bind_vars={'lang': self.lang}
            )
        )
        if not bilara_text_references:
            return
        print(
            f'Index {len(bilara_text_references)} {self.full_lang} text references.'
        )
        text_references = []
        for text in bilara_text_references:
            uid = text['uid']
            with open(text['strings_path']) as f:
                strings = json.load(f)

            text_reference_info = {
                'acronym': text['acronym'],
                'uid': uid,
                'lang': text['lang'],
                'full_lang': text['full_lang'],
                'volpage': ','.join(strings.values()),
            }
            text_references.append(text_reference_info)
            get_db().collection('text_references').import_bulk(text_references)
            text_references = []

    def import_html_texts(self):
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
            get_db().collection('text_contents').import_bulk(legacy_texts)

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


def import_texts_to_arangodb():
    db = get_db()
    TextLoader.truncate_text_contents()
    time.sleep(5)
    print('Start re-indexing...')
    query = (
        'FOR l IN language '
        'SORT l.uid '
        'RETURN {uid: l.uid, name: l.name}'
    )
    languages = list(db.aql.execute(query))

    order = [
        "en", "pli", "lzh", "san", "pra", "xct", "pgd", "de", "zh", "af",
        "ar", "bn", "ca", "cs", "es", "fa", "fi", "fr", "gu",
        "haw", "he", "hi", "hr", "hu", "id", "it", "jpn", "kan", "kho",
        "ko", "la", "lt", "mr", "my", "nl", "no", "pl", "pt",
        "ro", "ru", "si", "sk", "sl", "sld", "sr", "sv", "ta", "th",
        "uig", "vi", "xto"
    ]
    # languages = sorted(languages, key=lambda x: order.index(x["uid"]))

    for lang in tqdm(languages):
        loader = TextLoader(lang)
        loader.import_all_text_to_db()
