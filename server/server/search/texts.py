import logging
import time

import lxml.html
import regex
from elasticsearch.helpers import scan
from tqdm import tqdm

from common.arangodb import get_db
from common.queries import CURRENT_MTIMES, TEXTS_BY_LANG
from search.indexer import ElasticIndexer
from search.util import unique

logger = logging.getLogger('search.texts')


class TextIndexer(ElasticIndexer):
    doc_type = 'text'
    version = '1'

    htmlparser = lxml.html.HTMLParser(encoding='utf8')
    numstriprex = regex.compile(r'(?=\S*\d)\S+')

    def __init__(self, lang):
        self.lang = lang
        super().__init__(lang)
    
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

    def extract_fields_from_html(self, data):
        root = lxml.html.fromstring(data, parser=self.htmlparser)
        text = root.find('body/div')
        if text is None:
            raise ValueError("Structure of html is not body > div")
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

        hgroup = text.cssselect('.hgroup')[0]
        division = hgroup[0]
        title = hgroup[-1]
        if title == division:
            division = None
        others = hgroup[1:-1]
        hgroup.drop_tree()
        content = self.fix_text(text.text_content())

        if title is not None:
            title = self.fix_text(title.text_content())
        else:
            title = ''

        if division is not None:
            division = self.fix_text(division.text_content())
        else:
            division = ''

        return {
            'content': content,
            'heading': {
                'title': title,
                'division': division,
                'subhead': [e.text_content().strip() for e in others]
            },
            'boost': self.boost_factor(content)
        }

    def boost_factor(self, content):
        boost = self.length_boost(len(content))
        if len(content) < 500:
            content = content.casefold()
            if 'preceding' in content or 'identical' in content:
                boost = boost * 0.4
        return boost
    
    def yield_docs_from_dir(self, lang, size, to_add=None, to_delete=None):
        yield from self.yield_html_texts(self, lang, size, to_add=None, to_delete=None)
        yield from self.yield_po_texts(self, lang, size, to_add=None, to_delete=None)
    
    def yield_po_texts(self, lang, size):
        po_texts = db.aql.execute(
            PO_TEXTS_BY_LANG,
            bind_vars={'lang': lang}
        )
        
                
        
    
    def yield_html_texts(self, lang, size, to_add=None, to_delete=None):
        html_texts = db.aql.execute(
            TEXTS_BY_LANG,
            bind_vars={'lang': lang}
        )

        chunk = []
        chunk_size = 0
        if to_delete:
            yield ({"_op_type": "delete", "_id": uid}
                   for uid in to_delete)

        for i, text in enumerate(html_texts):
            uid = text['uid']
            if uid not in to_add and uid not in to_delete:
                continue
            try:
                action = {
                    '_id': uid,
                }
                if uid in to_add:

                    html_bytes = bytes(text['text'], encoding='utf-8')
                    chunk_size += len(html_bytes) + 512

                    root_lang = text['root_lang']

                    action.update({
                        'uid': uid,
                        'lang': lang,
                        'root_lang': root_lang,
                        'author': text['author'],
                        'author_uid': text['author_uid'],
                        'author_short': text['author_short'],
                        'is_root': lang == root_lang,
                        'mtime': int(text['mtime'])
                    })

                    action.update(self.extract_fields_from_html(html_bytes))
                    chunk.append(action)
            except (ValueError, IndexError) as e:
                logger.exception(f'{text["uid"]}, {e}')

            if chunk_size > size:
                yield chunk
                chunk = []
                chunk_size = 0
                time.sleep(0.25)
        if chunk:
            yield chunk
        raise StopIteration

    def index_name_from_uid(self, lang_uid):
        return lang_uid

    @staticmethod
    def load_index_config(config_name):
        try:
            return ElasticIndexer.load_index_config(config_name)
        except Exception as e:
            logger.warning(
                'No indexer settings or invalid settings for language "{}" ({}), using "default"'.format(
                    config_name, type(e)))
            try:
                return ElasticIndexer.load_index_config('default')
            except:
                logger.error('could not find default config')
                raise

    def update_data(self, force=False):
        stored_mtimes = {hit["_id"]: hit["_source"]["mtime"] for hit in scan(self.es,
                                                                             index=self.index_name,
                                                                             doc_type="text",
                                                                             _source_include=[
                                                                                 "mtime"],
                                                                             query=None,
                                                                             size=500)}
        current_mtimes = get_db().aql.execute(CURRENT_MTIMES,
                                              bind_vars={'lang': self.lang})
        current_mtimes = {hit['uid']: hit['mtime'] for hit in current_mtimes}

        to_delete = set(stored_mtimes).difference(current_mtimes)
        to_add = current_mtimes.copy()
        for uid, mtime in stored_mtimes.items():
            if uid in to_delete:
                continue
            #if mtime <= current_mtimes.get(uid):
                #to_add.pop(uid)
        logger.info(
            "For index {} ({}), {} files already indexed, {} files to be added, {} files to be deleted".format(
                self.index_name, self.index_alias, len(stored_mtimes), len(to_add), len(to_delete)))
        chunks = self.yield_docs_from_dir(self.lang, size=500000, to_add=to_add,
                                          to_delete=to_delete)
        self.process_chunks(chunks)


def update(force=False):
    def sort_key(d):
        if d == 'en':
            return 0
        if d == 'pli':
            return 1
        return 10

    db = get_db()
    languages = sorted(db.aql.execute('FOR l IN language RETURN l.uid'), key=sort_key)

    # lang_dirs = sorted(sorted(search.text_dir.glob('*')), key=sort_key)

    for lang in tqdm(languages):
        indexer = TextIndexer(lang)
        indexer.update()
