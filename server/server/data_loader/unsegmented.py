import logging
from collections.abc import Iterator, Iterable, Mapping
from dataclasses import dataclass
from pathlib import Path

import regex
from arango.database import Database
from tqdm import tqdm

from data_loader import sc_html
from data_loader.change_tracker import ChangeTracker
from data_loader.sc_html import HtHtmlElement

logger = logging.getLogger(__name__)


@dataclass
class FileDetails:
    path: str
    sutta_uid: str
    html: str
    last_modified: float


@dataclass
class TextDetails:
    title: str
    has_title_tags: bool
    authors_long_name: str | None
    publication_date: str | None
    volume_page: str | None


@dataclass
class AuthorDetails:
    long_name: str | None
    short_name: str | None
    uid: str | None
    missing: bool


@dataclass
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

    @property
    def key(self) -> str:
        return self.path.replace('/', '_')

    def as_dict(self):
        return {
        "_key": self.key,
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

    def __getitem__(self, long_name: str | None) -> AuthorDetails:
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


class HtmlTextWriter:
    QUEUE_SIZE = 100

    def __init__(self, db):
        self.db = db
        self.queue = []

    def add_document(self, doc: dict) -> None:
        self.queue.append(doc)
        if len(self.queue) > self.QUEUE_SIZE:
            self.flush_documents()

    def flush_documents(self):
        if len(self.queue) > 0:
            self.db['html_text'].import_bulk_logged(self.queue)
            self.queue.clear()

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        self.flush_documents()


def load_unsegmented_texts(change_tracker: ChangeTracker, db: Database, html_dir: Path):
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
    text = extract_text_details(file.html, is_chinese_root=(language_code == 'lzh'))
    author = authors[text.authors_long_name]
    return Document(language_code, file, text, author)


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


def extract_text_details(html: str, is_chinese_root: bool = False) -> TextDetails:
    root = sc_html.fromstring(html)
    title_tag = find_title_tag(root)
    title = extract_title(title_tag, is_chinese_root)

    return TextDetails(
        title=title,
        has_title_tags=bool(title_tag),
        authors_long_name=extract_authors_long_name(root),
        publication_date=extract_publication_date(root),
        volume_page=extract_volpage(root, is_chinese_root)
    )


def extract_authors_long_name(root) -> str | None:
    author = None
    e = root.select_one('meta[author]')
    if e:
        author = e.attrib['author']

    if not author:
        e = root.select_one('meta[name=author]')
        if e:
            author = e.attrib['content']

    return author


def extract_publication_date(root) -> str | None:
    e = root.select_one('.publication-date')
    if e:
        return e.text_content()

    return None


def extract_title(title_tag: HtHtmlElement | None, is_chinese_root: bool) -> str:
    if title_tag is None:
        return ''

    if is_chinese_root:
        if title := extract_side_by_side_title(title_tag):
            return title

    return normalise_title(title_tag.text_content())


def extract_side_by_side_title(title_tag: HtHtmlElement) -> str | None:
    left_side = title_tag.select_one('.mirror-left')
    right_side = title_tag.select_one('.mirror-right')

    if not (left_side and right_side):
        return None

    left_text = left_side.text_content()
    right_text = right_side.text_content()

    return f'{right_text} ({left_text})'


def find_title_tag(root: HtHtmlElement) -> HtHtmlElement | None:
    header = root.select_one('header')
    if not header:
        return None

    h1 = header.select_one('h1')

    if not h1:
        return None

    return h1


def normalise_title(title: str) -> str:
    # This may return an empty string e.g. when given a title like "11.358–405"
    return regex.sub(r'[\d\.\{\} –-]*', '', title, 1)


def extract_volpage(root: HtHtmlElement, is_chinese_root: bool) -> str | None:
    if is_chinese_root:
        e = root.next_in_order()
        while e is not None:
            if e.tag == 'a' and e.select_one('.t'):
                break
            e = e.next_in_order()
        else:
            return
        return '{}'.format(e.attrib['id']).replace('t', 'T ')
    return None


def log_missing_details(document: Document) -> None:
    if not document.text.has_title_tags:
        logger.error(f'Could not find title in file: {document.file.path}')
    if not document.text.authors_long_name:
        logging.critical(f'Could not find author in file: {document.file.path}')
    if document.author.missing:
        logging.critical(f'Author data not defined for "{document.author.long_name}" ( {document.file.path} )')