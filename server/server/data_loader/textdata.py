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


@dataclass(frozen=True)
class Document:
    language_code: str
    file: FileDetails
    text: TextDetails
    author: AuthorDetails

    @property
    def path(self) -> str:
        if self.author.uid:
            return f'{self.language_code}/{self.file.sutta_uid}/{self.author.uid}'
        else:
            return f'{self.language_code}/{self.file.sutta_uid}'

    def as_dict(self):
        return {
        "uid": self.file.sutta_uid,
        "lang": self.language_code,
        "path": self.path,
        "name": self.text.title,
        "author": self.author.long_name,
        "author_short": self.author.short_name,
        "author_uid": self.author.uid,
        "publication_date": self.text.publication_date,
        "volpage": self.text.volume_page,
        "mtime": self.file.last_modified,
        "file_path": self.file.path,
    }


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
    authors = Authors(db)

    with HtmlTextWriter(db) as writer:
        directories = language_directories(html_dir)

        for directory in tqdm(directories):
            files = html_files(directory, change_tracker)
            for document in load_language(authors, files, directory.stem):
                writer.add_document(document.as_dict())


def language_directories(html_dir: Path) -> list[Path]:
    return [path for path in html_dir.glob('*') if path.is_dir()]


def html_files(language_directory: Path, change_tracker: ChangeTracker) -> Iterator[Path]:
    paths = language_directory.glob('**/*.html')
    yield from change_tracker.changed_files(paths)


def load_language(authors: Mapping[str, AuthorDetails], files: Iterable[Path], language_code: str) -> Iterator[Document]:
    for file in files:
        document = create_document(language_code, file, authors)
        log_missing_details(document)
        yield document


def create_document(language_code: str, file: Path, authors: Mapping[str, AuthorDetails]) -> Document:
    file = extract_file_details(file)
    text = extract_details(file.html, is_chinese_root=(language_code == 'lzh'))
    author = authors[text.authors_long_name]
    return Document(language_code, file, text, author)


def log_missing_details(document: Document) -> None:
    if not document.text.has_title_tags:
        logger.error(f'Could not find title in file: {document.file.path}')
    if not document.text.authors_long_name:
        logging.critical(f'Could not find author in file: {document.file.path}')
    if document.author.missing:
        logging.critical(f'Author data not defined for "{document.author.long_name}" ( {document.file.path} )')
