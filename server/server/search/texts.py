import time
import regex
import logging
import lxml.html
from elasticsearch.helpers import scan
from search import uid_expansion
from search.util import unique

from search.indexer import ElasticIndexer
from common.arangodb import get_db
from common.queries import TEXTS_BY_LANG

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
            author = ' '.join(unique(e.text_content() for e in metaarea[0].cssselect('.author')))
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
            'author': author,
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
        db = get_db()
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

                    html_bytes = bytes(text['text'])
                    chunk_size += len(html_bytes) + 512
                    subdivision = division = None

                    parts = file.relative_to(lang_dir).parent.parts

                    if len(parts) > 0:
                        if parts[0] in uid_expansion.languages:
                            root_lang = parts[0]
                            parts = parts[1:]
                        else:
                            root_lang = lang

                    else:
                        root_lang = None

                    subdivision = None
                    if len(parts) > 1:
                        division = parts[1]
                        if len(parts) > 2:
                            subdivision = parts[2]
                        else:
                            subdivision = uid
                    else:
                        division = uid

                    action.update({
                        'uid': uid,
                        'division': division,
                        'subdivision': subdivision,
                        'lang': lang,
                        'root_lang': root_lang,
                        'is_root': lang == root_lang,
                        'mtime': int(text['mtime'])
                    })

                    action.update(self.extract_fields_from_html(html_bytes))
            except (ValueError, IndexError) as e:
                logger.exception(f'{text["uid"]}, {e}')

            chunk.append(action)
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

    def update_data(self):
        lang_uid = self.lang_dir.stem
        stored_mtimes = {hit["_id"]: hit["_source"]["mtime"] for hit in scan(self.es,
                                                                             index=self.index_name,
                                                                             doc_type="text",
                                                                             _source_include=[
                                                                                 "mtime"],
                                                                             query=None,
                                                                             size=500)}
        current_mtimes = {file.stem: int(file.stat().st_mtime) for file in
                          self.lang_dir.glob('**/*.html')}
        to_delete = set(stored_mtimes).difference(current_mtimes)
        to_add = current_mtimes.copy()
        for uid, mtime in stored_mtimes.items():
            if uid in to_delete:
                continue
            if mtime <= current_mtimes.get(uid):
                to_add.pop(uid)
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
        if d == 'pi':
            return 1
        return 10

    db = get_db()
    languages = sorted(db.aql.execute('FOR l IN language RETURN l.uid'), key=sort_key)
    print(languages)

    # lang_dirs = sorted(sorted(search.text_dir.glob('*')), key=sort_key)

    for lang in languages:
        indexer = TextIndexer(lang)
        indexer.update()
