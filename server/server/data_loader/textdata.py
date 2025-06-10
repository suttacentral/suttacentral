import logging
from pathlib import Path

from arango.exceptions import DocumentReplaceError

from data_loader import util
from data_loader.unsegmented_texts import extract_details

logger = logging.getLogger(__name__)


class TextInfoModel:
    def __init__(self):
        pass

    def get_author_by_name(self, name, file):
        raise NotImplementedError

    def add_document(self, doc):
        raise NotImplementedError

    def process_lang_dir(self,
            lang_dir: Path,
            data_dir: Path = None,
            files_to_process: dict[str, int] | None = None,
            force: bool = False
    ):
        lang_uid = lang_dir.stem

        files = self._files_for_language(lang_dir)

        for html_file in files:
            try:
                if self._should_process_file(data_dir, files_to_process, force, html_file):
                    continue

                logger.info('Adding file: {!s}'.format(html_file))
                document = self.create_document(html_file, lang_uid)

                self.add_document(document)

            except Exception as e:
                print('An exception occurred: {!s}'.format(html_file))
                raise

    def create_document(self, html_file, lang_uid):
        uid = html_file.stem

        with html_file.open('r', encoding='utf8') as f:
            html = f.read()

        is_chinese_root = (lang_uid == 'lzh')
        text_details = extract_details(html, is_chinese_root=is_chinese_root)

        author_long_name = text_details.authors_long_name

        if not author_long_name:
            logging.critical(f'Author not found: {str(html_file)}')

        author_data = self.get_author_by_name(author_long_name, html_file)

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

        if not text_details.has_title_tags:
            logger.error(f'Could not find title in file: {str(html_file)}')

        document = {
            "uid": uid,
            "lang": lang_uid,
            "path": path,
            "name": text_details.title,
            "author": author_long_name,
            "author_short": author_short,
            "author_uid": author_uid,
            "publication_date": text_details.publication_date,
            "volpage": text_details.volume_page,
            "mtime": self.last_modified(html_file),
            "file_path": str(html_file.resolve()),
        }

        return document

    def last_modified(self, html_file):
        return html_file.stat().st_mtime

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
