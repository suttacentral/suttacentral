import logging
from collections.abc import Iterator, Iterable, Mapping
from dataclasses import dataclass
from pathlib import Path
from typing import Protocol

from arango.database import Database
from tqdm import tqdm

from data_loader.change_tracker import ChangeTracker
from data_loader.unsegmented_texts import extract_details, TextDetails

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class AuthorDetails:
    long_name: str
    short_name: str | None
    uid: str | None
    missing: bool


class Authors(Mapping[str, AuthorDetails]):
    def __init__(self, db):
        self.db = db
        self.queue = []
        self._author_cache: dict = dict(
            db.aql.execute(
                '''
            RETURN MERGE(
                FOR doc IN author_edition
                    RETURN {[doc.long_name]: doc}
            )'''
            ).next()
        )

    def __getitem__(self, long_name: str) -> AuthorDetails:
        author_data = self._author_cache.get(long_name)

        if author_data:
            short_name = author_data['short_name']
            uid = author_data['uid']
            missing = False
        else:
            short_name = None
            uid = None
            missing = True

        return AuthorDetails(
            long_name=long_name,
            short_name=short_name,
            uid=uid,
            missing=missing,
        )

    def __iter__(self) -> Iterator[str]:
        return iter(self._author_cache.keys())

    def __len__(self) -> int:
        return len(self._author_cache)


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


class Writer(Protocol):
    def add_document(self, doc: dict) -> None: ...


class TextInfoModel:
    def __init__(self, authors: Mapping[str, AuthorDetails], html_text_writer: Writer):
        self.authors = authors
        self.html_text_writer = html_text_writer

    def load_language(self, files: Iterable[Path], language_code: str):
        for file in files:
            document = self.create_document(file, language_code)
            self.html_text_writer.add_document(document)

    def create_document(self, html_file: Path, language_code: str):
        file_details = extract_file_details(html_file)

        text_details = extract_details(
            file_details.html,
            is_chinese_root=(language_code == 'lzh')
        )

        author_details = self.authors[text_details.authors_long_name]

        log_missing_details(text_details, file_details.path)

        if author_details.missing:
            logging.critical(f'Author data not defined for "{text_details.authors_long_name}" ( {str(html_file)} )')

        if author_details.uid:
            path = f'{language_code}/{file_details.sutta_uid}/{author_details.uid}'
        else:
            path = f'{language_code}/{file_details.sutta_uid}'

        document = {
            "uid": file_details.sutta_uid,
            "lang": language_code,
            "path": path,
            "name": text_details.title,
            "author": author_details.long_name,
            "author_short": author_details.short_name,
            "author_uid": author_details.uid,
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


class HtmlTextWriter:
    def __init__(self, db):
        self.db = db
        self.queue = []

    def add_document(self, doc: dict) -> None:
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
    reader = Authors(db)

    with HtmlTextWriter(db) as writer:
        tim = TextInfoModel(reader, writer)
        directories = language_directories(html_dir)

        for directory in tqdm(directories):
            files = html_files(directory, change_tracker)
            tim.load_language(files, directory.stem)


def language_directories(html_dir: Path) -> list[Path]:
    return [path for path in html_dir.glob('*') if path.is_dir()]


def html_files(language_directory: Path, change_tracker: ChangeTracker) -> Iterator[Path]:
    paths = language_directory.glob('**/*.html')
    yield from change_tracker.changed_files(paths)