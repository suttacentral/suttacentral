import logging
from collections.abc import Iterator, Iterable
from dataclasses import dataclass
from pathlib import Path

from arango.database import Database
from tqdm import tqdm

from data_loader.change_tracker import ChangeTracker
from data_loader.unsegmented_texts import extract_details, TextDetails

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class FileDetails:
    path: str
    sutta_uid: str
    html: str
    last_modified: float


def extract_file_details(file: Path) -> FileDetails:
    path = str(file.resolve())
    sutta_uid = file.stem
    html = file.read_text()
    last_modified = file.stat().st_mtime

    return FileDetails(
        path=path,
        sutta_uid=sutta_uid,
        html=html,
        last_modified=last_modified,
    )


class TextInfoModel:
    def __init__(self):
        pass

    def get_author_by_name(self, name, file):
        raise NotImplementedError

    def add_document(self, doc):
        raise NotImplementedError

    def load_language(self, files: Iterable[Path], language_code: str):
        for file in files:
            document = self.create_document(file, language_code)
            self.add_document(document)

    def create_document(self, html_file: Path, language_code: str):
        file_details = extract_file_details(html_file)

        text_details = extract_details(
            file_details.html,
            is_chinese_root=(language_code == 'lzh')
        )

        log_missing_details(text_details, file_details.path)

        author_data = self.get_author_by_name(text_details.authors_long_name, html_file)

        if author_data:
            author_uid = author_data['uid']
            author_short = author_data['short_name']
        else:
            author_uid = None
            author_short = None
        if author_uid:
            path = f'{language_code}/{file_details.sutta_uid}/{author_uid}'
        else:
            path = f'{language_code}/{file_details.sutta_uid}'

        document = {
            "uid": file_details.sutta_uid,
            "lang": language_code,
            "path": path,
            "name": text_details.title,
            "author": text_details.authors_long_name,
            "author_short": author_short,
            "author_uid": author_uid,
            "publication_date": text_details.publication_date,
            "volpage": text_details.volume_page,
            "mtime": file_details.last_modified,
            "file_path": file_details.path,
        }

        return document


def log_missing_details(details: TextDetails, file_name: str) -> None:
    if not details.has_title_tags:
        logger.error(f'Could not find title in file: {file_name}')
    if not details.authors_long_name:
        logging.critical(f'Could not find author in file: {file_name}')


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
            self.db['html_text'].import_bulk_logged(self.queue)
            self.queue.clear()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.flush_documents()


def load_html_texts(change_tracker: ChangeTracker, db: Database, html_dir: Path):
    with ArangoTextInfoModel(db=db) as tim:
        directories = language_directories(html_dir)

        for directory in tqdm(directories):
            files = html_files(directory, change_tracker)
            tim.load_language(files, directory.stem)


def language_directories(html_dir: Path) -> list[Path]:
    return [path for path in html_dir.glob('*') if path.is_dir()]


def html_files(language_directory: Path, change_tracker: ChangeTracker) -> Iterator[Path]:
    paths = language_directory.glob('**/*.html')
    yield from change_tracker.changed_files(paths)