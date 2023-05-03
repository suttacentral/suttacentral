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

ebt_prefixes = ["dn", "da", "mn", "ma", "sn", "sa", "sa-2", "sa-3", "an", "ea", "ea-2", "kp", "iti", "ud", "snp",
                    "dhp", "thig", "thag", "pli-tv", "lzh-mg", "lzh-mi", "lzh-dg", "lzh-sarv", "lzh-mu", "lzh-ka",
                    "lzh-upp", "san-mg", "san-lo", "up", "t25", "t24", "t23", "t22", "t21", "t20", "t19", "t18", "t17",
                    "t16", "t15", "t14", "t13", "t12", "t11", "t10", "t9", "t8", "t7", "t6", "t5", "t4", "t3", "t2",
                    "t98", "t97", "t96", "t95", "t94", "t93", "t92", "t91", "t90", "t89", "t88", "t87", "t86", "t85",
                    "t84", "t83", "t82", "t81", "t80", "t79", "t78", "t77", "t76", "t75", "t74", "t73", "t72", "t71",
                    "t70", "t69", "t68", "t67", "t66", "t65", "t64", "t63", "t62", "t61", "t60", "t59", "t58", "t57",
                    "t56", "t55", "t54", "t53", "t52", "t51", "t50", "t49", "t48", "t47", "t46", "t45", "t44", "t43",
                    "t42", "t41", "t40", "t39", "t38", "t37", "t36", "t35", "t34", "t33", "t32", "t31", "t30", "t29",
                    "t28", "t27", "t124", "t123", "t122", "t121", "t120", "t119", "t118", "t117", "t116", "t115",
                    "t114", "t113", "t112", "t111", "t110", "t109", "t108", "t107", "t106", "t105", "t104", "t103",
                    "t102", "t151", "t150b", "t149", "t148", "t147", "t146", "t145", "t144", "t143", "t142b", "t142a",
                    "t141", "t140", "t139", "t138", "t137", "t136", "t135", "t134", "t133", "t132b", "t132a", "t131",
                    "t130", "t129", "t128b", "t128a", "t127", "t126", "xct-mu-kd-eimer", "d974", "d617", "d338",
                    "d337", "d331", "d316", "d313", "d300", "d297", "d296", "d294", "d293", "d292", "d291", "d290",
                    "d211", "d42", "d41", "d38", "d34", "d33", "d31", "d6", "d3", "d1"]

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
        print('The original index is being deleted...')
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

    def check_text_whether_is_ebt(self, uid):
        return any(uid.startswith(prefix) for prefix in ebt_prefixes)

    def import_bilara_texts(self):
        bilara_texts = list(get_db().aql.execute(BILARA_TEXT_BY_LANG_FOR_SEARCH, bind_vars={'lang': self.lang}))
        if not bilara_texts:
            return

        segmented_texts = []
        for text in bilara_texts:
            uid = text['uid']
            with open(text['strings_path']) as f:
                strings = json.load(f)

            text_info = {
                'acronym': text['acronym'],
                'uid': uid,
                'name': self.fix_text(text['title']) if text['title'] else text['uid'],
                'lang': text['lang'],
                'full_lang': text['full_lang'],
                'author': text['author'],
                'author_uid': text['author_uid'],
                'author_short': text['author_short'],
                'is_root': self.lang == text['root_lang'],
                'heading': {
                    'title': self.fix_text(text['title']) if text['title'] else text['uid']
                },
                'content': '\n\n'.join(strings.values()),
                'is_segmented': False,
                'is_bilara_text': True,
                'is_ebt': self.check_text_whether_is_ebt(uid)
            }

            segmented_texts.append(text_info)

        if segmented_texts:
            print(f'Import {len(segmented_texts)} {self.full_lang} segmented texts to arangoDB')
            get_db().collection('text_contents').import_bulk(segmented_texts)

    def import_segmented_texts(self):
        bilara_texts = list(get_db().aql.execute(BILARA_TEXT_BY_LANG_FOR_SEARCH, bind_vars={'lang': self.lang}))
        if not bilara_texts:
            return

        segmented_texts = []
        for text in bilara_texts:
            uid = text['uid']
            with open(text['strings_path']) as f:
                strings = json.load(f)
            for key, value in strings.items():
                if value:
                    segmented_text_info = {
                        'acronym': text['acronym'],
                        'uid': uid,
                        'name': self.fix_text(text['title']) if text['title'] else text['uid'],
                        'lang': text['lang'],
                        'full_lang': text['full_lang'],
                        'author': text['author'],
                        'author_uid': text['author_uid'],
                        'author_short': text['author_short'],
                        'is_root': self.lang == text['root_lang'],
                        'heading': {
                            'title': self.fix_text(text['title']) if text['title'] else text['uid']
                        },
                        'segmented_uid': key,
                        'segmented_text': value,
                        'content': '',
                        'is_segmented': True,
                        'is_ebt': self.check_text_whether_is_ebt(uid)
                    }
                    segmented_texts.append(segmented_text_info)
            get_db().collection('segmented_text_contents').import_bulk(segmented_texts)
            segmented_texts = []

    def import_text_references(self):
        bilara_text_references = list(get_db().aql.execute(TEXT_REFERENCES, bind_vars={'lang': self.lang}))
        if not bilara_text_references:
            return
        print(f'Import {len(bilara_text_references)} {self.full_lang} text references to arangoDB')
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
        html_texts = list(get_db().aql.execute(TEXTS_BY_LANG_FOR_SEARCH, bind_vars={'lang': self.lang}))
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
                    'is_ebt': self.check_text_whether_is_ebt(uid),
                }
                text_info |= self.extract_fields_from_html(html_bytes)
                legacy_texts.append(text_info)
            except (ValueError, IndexError) as e:
                logger.exception(f'{text["uid"]}, {e}')

        if legacy_texts:
            print(f'Import {len(legacy_texts)} {self.full_lang} legacy texts to arangoDB')
            get_db().collection('text_contents').import_bulk(legacy_texts)

    def extract_fields_from_html(self, data):
        root = lxml.html.fromstring(data, parser=self.htmlparser)
        text = root.find('body/article')
        if text is None:
            text = root.find('body/section')
        if text is None:
            raise ValueError("Structure of html is not body > article or not body > section")

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
        division = '' if division is None else self.fix_text(division.text_content())

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
    languages = list(db.aql.execute('FOR l IN language SORT l.uid RETURN {uid: l.uid, name: l.name}'))

    order = ["en", "pli", "lzh", "san", "pra", "xct", "pgd", "de", "zh", "af", "ar", "au", "bn", "ca", "cs", "es", "ev",
             "fa", "fi", "fr", "gu", "haw", "he", "hi", "hr", "hu", "id", "it", "jpn", "kan", "kho", "kln", "ko", "la",
             "lt", "mr", "my", "nl", "no", "pl", "pt", "ro", "ru", "si", "sk", "sl", "sld", "sr", "sv", "ta", "th",
             "uig", "vi", "vu", "xto"]
    languages = sorted(languages, key=lambda x: order.index(x["uid"]))

    for lang in tqdm(languages):
        loader = TextLoader(lang)
        loader.import_all_text_to_db()
