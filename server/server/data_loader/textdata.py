import logging
from pathlib import Path

from arango.database import Database
from tqdm import tqdm

from data_loader.change_tracker import ChangeTracker
from data_loader.unsegmented_texts import extract_details, TextDetails

logger = logging.getLogger(__name__)


class TextInfoModel:
    def __init__(self):
        pass

    def get_author_by_name(self, name, file):
        raise NotImplementedError

    def add_document(self, doc):
        raise NotImplementedError

    def process_lang_dir(self, lang_dir: Path, data_dir: Path = None, files_to_process: dict[str, int] | None = None):
        language_code = lang_dir.stem
        html_files = lang_dir.glob('**/*.html')

        for html_file in html_files:
            if should_process_file(data_dir, files_to_process, html_file):
                logger.info('Adding file: {!s}'.format(html_file))
                document = self.create_document(html_file, language_code)
                self.add_document(document)

    def create_document(self, html_file, language_code):
        sutta_uid = html_file.stem

        with html_file.open('r', encoding='utf8') as f:
            html = f.read()

        text_details = extract_details(html, is_chinese_root=(language_code == 'lzh'))
        log_missing_details(text_details, str(html_file))

        author_data = self.get_author_by_name(text_details.authors_long_name, html_file)

        if author_data:
            author_uid = author_data['uid']
            author_short = author_data['short_name']
        else:
            author_uid = None
            author_short = None
        if author_uid:
            path = f'{language_code}/{sutta_uid}/{author_uid}'
        else:
            path = f'{language_code}/{sutta_uid}'

        document = {
            "uid": sutta_uid,
            "lang": language_code,
            "path": path,
            "author": text_details.authors_long_name,
            "author_short": author_short,
            "author_uid": author_uid,
            "mtime": self.last_modified(html_file),
            "file_path": str(html_file.resolve()),
        }

        add_text_details(document, text_details)

        return document

    def last_modified(self, html_file):
        return html_file.stat().st_mtime


def should_process_file(data_dir, files_to_process, html_file):
    return str(html_file.relative_to(data_dir)) in files_to_process


def log_missing_details(details: TextDetails, file_name: str) -> None:
    if not details.has_title_tags:
        logger.error(f'Could not find title in file: {file_name}')
    if not details.authors_long_name:
        logging.critical(f'Could not find author in file: {file_name}')


def add_text_details(document: dict, details: TextDetails) -> None:
    document['name'] = details.title
    document['publication_date'] = details.publication_date
    document['volpage'] = details.volume_page


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

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.flush_documents()


def load_html_texts(change_tracker: ChangeTracker, data_dir: Path, db: Database, html_dir: Path):
    print('Loading HTML texts')
    with ArangoTextInfoModel(db=db) as tim:
        for lang_dir in tqdm(html_dir.glob('*')):
            if lang_dir.is_dir:
                tim.process_lang_dir(
                    lang_dir=lang_dir,
                    data_dir=data_dir,
                    files_to_process=change_tracker.changed_or_new
                )
