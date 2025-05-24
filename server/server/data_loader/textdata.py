import json
import logging
from pathlib import Path

import regex
from arango.exceptions import DocumentReplaceError

from . import sc_html, util

logger = logging.getLogger(__name__)


class UnsegmentedText:
    def __init__(self, file: Path, html: str):
        self._file = file
        self._html = html
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

        if not author:
            logging.critical(f'Author not found: {str(self._file)}')
        return author


class TextInfoModel:
    def __init__(self):
        pass

    def get_author_by_name(self, name, file):
        raise NotImplementedError

    def add_document(self, doc):
        raise NotImplementedError

    def update_code_points(self, lang_uid: str, unicode_points: dict[str, set[str]], force: bool) -> None:
        raise NotImplementedError

    def is_bold(self, lang, element):
        if element.tag in {'b', 'strong'}:
            return True
        return lang in {'lzh', 'ko', 'jp', 'tw'} and element.tag in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}

    def is_italic(self, element):
        return element.tag in {'i', 'em'}

    def process_lang_dir(self,
            lang_dir: Path,
            data_dir: Path = None,
            files_to_process: dict[str, int] | None = None,
            force: bool = False
    ):
        # It should be noted SuttaCentral does not use bolditalic
        unicode_points = {'normal': set(), 'bold': set(), 'italic': set()}

        lang_uid = lang_dir.stem

        files = self._files_for_language(lang_dir)

        for html_file in files:
            try:
                if self._should_process_file(data_dir, files_to_process, force, html_file):
                    continue

                logger.info('Adding file: {!s}'.format(html_file))
                uid = html_file.stem
                with html_file.open('r', encoding='utf8') as f:
                    text = f.read()

                unsegmented_text = UnsegmentedText(html_file, text)
                root = sc_html.fromstring(text)

                self._extract_unicode_points(lang_uid, root, unicode_points)

                author = unsegmented_text.authors_long_name()

                author_data = self.get_author_by_name(author, html_file)

                if author_data:
                    author_uid = author_data['uid']
                    author_short = author_data['short_name']
                else:
                    author_uid = None
                    author_short = None

                if author_uid:
                    path = f'{lang_uid}/{uid}/{author_uid}'
                else:
                    path = f'{lang_uid}/{uid}'

                publication_date = self._get_publication_date(root)

                name = self._get_name(root, lang_uid, uid)
                volpage = self._get_volpage(root, lang_uid, uid)

                mtime = html_file.stat().st_mtime

                text_info = {
                    "uid": uid,
                    "lang": lang_uid,
                    "path": path,
                    "name": name,
                    "author": author,
                    "author_short": author_short,
                    "author_uid": author_uid,
                    "publication_date": publication_date,
                    "volpage": volpage,
                    "mtime": mtime,
                    "file_path": str(html_file.resolve()),
                }

                self.add_document(text_info)

            except Exception as e:
                print('An exception occurred: {!s}'.format(html_file))
                raise

        self.update_code_points(
            unicode_points=unicode_points, lang_uid=lang_dir.stem, force=force
        )

    def _extract_unicode_points(self, lang_uid, root, unicode_points):
        _stack = [root]
        while _stack:
            e = _stack.pop()
            if self.is_bold(lang_uid, e):
                unicode_points['bold'].update(e.text_content())
            elif self.is_italic(e):
                unicode_points['italic'].update(e.text_content())
            else:
                _stack.extend(e)
        unicode_points['normal'].update(root.text_content())

    def _should_process_file(self, data_dir, files_to_process, force, html_file):
        return not force and str(html_file.relative_to(data_dir)) not in files_to_process

    def _files_for_language(self, lang_dir):
        all_files = sorted(
            lang_dir.glob('**/*.html'), key=lambda f: util.numericsortkey(f.stem)
        )
        files = [f for f in all_files if f.stem == 'metadata'] + [
            f for f in all_files if f.stem != 'metadata'
        ]
        return files

    def _get_publication_date(self, root):
        e = root.select_one('.publication-date')
        if e:
            return e.text_content()

        return None

    def _get_name(self, root, lang_uid, uid):
        header = root.select_one('header')
        if not header:
            logger.error(f'No header found in {lang_uid}/{uid}')
            return ''

        h1 = header.select_one('h1')
        if not h1:
            logger.error(f'No h1 found in {lang_uid}/{uid}')
            return ''

        if lang_uid == 'lzh':
            left_side = h1.select_one('.mirror-left')
            right_side = h1.select_one('.mirror-right')
            if left_side and right_side:
                return right_side.text_content() + ' (' + left_side.text_content() + ')'

        return regex.sub(r'[\d\.\{\} –-]*', '', h1.text_content(), 1)

    def _get_volpage(self, element, lang_uid, uid):
        if lang_uid == 'lzh':
            e = element.next_in_order()
            while e is not None:
                if e.tag == 'a' and e.select_one('.t'):
                    break
                e = e.next_in_order()
            else:
                return
            return '{}'.format(e.attrib['id']).replace('t', 'T ')
        return None


class ArangoTextInfoModel(TextInfoModel):
    def __init__(self, db):
        super().__init__()
        self.db = db
        self.queue = []
        self._author_cache = dict(
            db.aql.execute(
                '''
            RETURN MERGE(
                FOR doc IN author_edition
                    RETURN {[doc.long_name]: doc}
            )'''
            ).next()
        )

    def get_author_by_name(self, name, file):
        author = self._author_cache.get(name)
        if author is None:
            logging.critical(f'Author data not defined for "{name}" ( {str(file)} )')
        return author

    def add_document(self, doc):
        doc['_key'] = doc['path'].replace('/', '_')
        self.queue.append(doc)
        if len(self.queue) > 100:
            self.flush_documents()

    def flush_documents(self):
        if len(self.queue) > 0:
            print('\033[2K\r' + self.queue[-1]['path'], end='')
            self.db['html_text'].import_bulk_logged(self.queue)
            self.queue.clear()

    def update_code_points(self, lang_uid: str, unicode_points: dict[str, set[str]], force: bool = False) -> None:
        keys = ('normal', 'bold', 'italic')
        try:
            existing = self.db['unicode_points'].get(lang_uid)
            if existing and not force:
                for key in keys:
                    unicode_points[key].update(existing.get(key, []))

            doc = {key: ''.join(sorted(set(unicode_points[key]))) for key in keys}
            doc['_key'] = lang_uid
        except Exception as e:
            print(unicode_points)
            raise e

        if existing or force:
            try:
                self.db['unicode_points'].replace(doc)
            except DocumentReplaceError:
                self.db['unicode_points'].insert(doc)
        else:
            self.db['unicode_points'].insert(doc)

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.flush_documents()
