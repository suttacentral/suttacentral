import logging
import time
import json

import lxml.html
import regex
from elasticsearch.helpers import scan
from tqdm import tqdm

from itertools import chain

from common.arangodb import get_db
from data_loader import change_tracker
from data_loader.util import get_path_from_uri
from common.queries import CURRENT_MTIMES, TEXTS_BY_LANG, PO_TEXTS_BY_LANG
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
        
    def get_extra_state(self):
        # If this class has changed not much choice but to 
        # re-index all texts.
        return change_tracker.function_source(TextIndexer)
        
    def make_id(self, uid, author_uid):
        return f'{uid}_{author_uid}'
    
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
    
    def yield_po_texts(self, lang, size, to_add):
        po_texts = get_db().aql.execute(
            PO_TEXTS_BY_LANG,
            bind_vars={'lang': lang},
            count=True
        )
        
        count = po_texts.count()
        if not count:
            return
        
        chunk = []
        chunk_size = 0
        
        for text in po_texts:
            uid = text['uid']
            author_uid = text['author_uid']
            _id = self.make_id(uid, author_uid)
            if _id not in to_add:
                continue

            with open(text['strings_path']) as f:
                strings = json.load(f)

            action = {
                '_id': _id,
                'uid': uid,
                'lang': lang,
                'author': text['author'],
                'author_uid': text['author_uid'],
                'author_short': text['author_short'],
                'is_root': lang == text['root_lang'],
                'mtime': int(text['mtime']),
                'heading': {
                    'title': self.fix_text(text['title']),
                    'division': [self.fix_text(text['division_title']) if 'division_title' in text else '']
                },
                'content': '\n\n'.join(strings.values())
            }
            
            chunk_size += len(action['content'].encode('utf-8'))
            chunk.append(action)
            if chunk_size > size:
                yield chunk
                chunk = []
                chunk_size = 0
                time.sleep(0.25)
        if chunk:
            yield chunk
    
    def yield_html_texts(self, lang, size, to_add):
        html_texts = get_db().aql.execute(
            TEXTS_BY_LANG,
            bind_vars={'lang': lang},
            count=True
        )
        
        count = html_texts.count()
        if not count:
            return
        
        chunk = []
        chunk_size = 0

        for i, text in enumerate(html_texts):
            uid = text['uid']
            author_uid = text['author_uid']
            _id = self.make_id(uid, author_uid)
            if _id not in to_add:
                continue
            try:
                
                with open(text['file_path'], 'rb') as f:
                    html_bytes = f.read()
                chunk_size += len(html_bytes) + 512

                root_lang = text['root_lang']

                action = {
                    '_id': _id,
                    'uid': uid,
                    'lang': lang,
                    'root_lang': root_lang,
                    'author': text['author'],
                    'author_uid': author_uid,
                    'author_short': text['author_short'],
                    'is_root': lang == root_lang,
                    'mtime': int(text['mtime'])
                }

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
    
    def yield_actions_for_lang(self, lang, size):
        stored_mtimes = {hit["_id"]: hit["_source"]["mtime"] for hit in scan(self.es,
                                                                             index=self.index_name,
                                                                             doc_type="text",
                                                                             _source_include=[
                                                                                 "mtime"],
                                                                             query=None,
                                                                             size=500)}
        current_html_mtimes = list(get_db().aql.execute(CURRENT_MTIMES,
                                              bind_vars={
                                                'lang': self.lang,
                                                '@collection': 'html_text'
                                                }))
        current_po_mtimes = list(get_db().aql.execute(CURRENT_MTIMES,
                                              bind_vars={
                                                'lang': self.lang,
                                                '@collection': 'po_strings'
                                                }))
        
        to_add = set()
        to_delete = set(stored_mtimes)
        
        for doc in chain(current_html_mtimes, current_po_mtimes):
            _id = self.make_id(doc['uid'], doc['author_uid'])
            if _id in to_delete:
                to_delete.remove(_id)
            if _id not in stored_mtimes or stored_mtimes[_id] != int(doc['mtime']):
                to_add.add(_id)
        
        delete_actions = []
        for _id in to_delete:
            delete_actions.append({
                '_id': _id,
                '_op_type': 'delete'
            })
        if delete_actions:
            print(f'Deleting {len(delete_actions)} documents from {lang} index')
            yield delete_actions
        
        if to_add:
            print(f'Indexing {len(to_add)} new or modified texts to {lang} index')
        
            yield from self.yield_po_texts(lang, size, to_add=to_add)
            yield from self.yield_html_texts(lang, size, to_add=to_add)
    
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
        # This delivers lists of actions in digestble chunks
        chunks = self.yield_actions_for_lang(self.lang, size=500000)
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

    for lang in tqdm(languages):
        indexer = TextIndexer(lang)
        indexer.update()
