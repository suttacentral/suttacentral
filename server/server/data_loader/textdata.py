import json
import logging

import regex
from arango.exceptions import DocumentReplaceError

from . import sc_html, util

logger = logging.getLogger(__name__)


class TextInfoModel:
    def __init__(self):
        self._metadata = {}

    def get_author_by_name(self, name, file):
        raise NotImplementedError

    def add_document(self, doc):
        raise NotImplementedError

    def update_code_points(self, lang_uid, unicode_points, force):
        raise NotImplementedError

    def is_bold(self, lang, element):
        if element.tag in {'b', 'strong'}:
            return True
        return lang in {'lzh', 'ko', 'jp', 'tw'} and element.tag in {'h1', 'h2', 'h3', 'h4', 'h5', 'h6'}

    def is_italic(self, element):
        return element.tag in {'i', 'em'}

    def process_lang_dir(
            self, lang_dir, data_dir=None, files_to_process=None, force=False
    ):
        # files_to_process is actually "files that may be processed" its
        # not the list of files to actually process

        # The pagenumbinator should be scoped because it uses
        # a large chunk of memory which should be gc'd.
        # But it shouldn't be created at all if we don't need it.
        # So we use a getter, and delete it when we are done.

        self._ppn = None
        if lang_dir.stem == 'pli':
            try:
                self._ppn = PaliPageNumbinator(data_dir=data_dir)
            except:
                logger.exception("Error while loading Pali volpages")

            # It should be noted SuttaCentral does not use bolditalic
        unicode_points = {'normal': set(), 'bold': set(), 'italic': set()}

        lang_uid = lang_dir.stem
        all_files = sorted(
            lang_dir.glob('**/*.html'), key=lambda f: util.numericsortkey(f.stem)
        )
        files = [f for f in all_files if f.stem == 'metadata'] + [
            f for f in all_files if f.stem != 'metadata'
        ]
        for i, htmlfile in enumerate(files):
            try:
                # Should we process this file?

                if (
                        not force
                        and str(htmlfile.relative_to(data_dir)) not in files_to_process
                ):
                    continue

                # By the way we can't just iterate over the files_to_process
                # because we also care about the previous and next file

                logger.info('Adding file: {!s}'.format(htmlfile))
                uid = htmlfile.stem
                with htmlfile.open('r', encoding='utf8') as f:
                    text = f.read()

                root = sc_html.fromstring(text)

                # Set codepoint data

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

                author = self._get_author(root, htmlfile)
                author_data = self.get_author_by_name(author, htmlfile)

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

                mtime = htmlfile.stat().st_mtime

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
                    "file_path": str(htmlfile.resolve()),
                }

                self.add_document(text_info)

            except Exception as e:
                print('An exception occurred: {!s}'.format(htmlfile))
                raise

        self.update_code_points(
            unicode_points=unicode_points, lang_uid=lang_dir.stem, force=force
        )

        del self._ppn

    def _get_author(self, root, file):
        author = None
        e = root.select_one('meta[author]')
        if e:
            author = e.attrib['author']

        if not author:
            e = root.select_one('meta[name=author]')
            if e:
                author = e.attrib['content']

        if not author:
            logging.critical(f'Author not found: {str(file)}')
        return author

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
        elif lang_uid == 'pli':
            if self._ppn is None:
                return None
            ppn = self._ppn
            e = element.next_in_order()
            while e:
                if e.tag == 'a' and e.select_one('.ms'):
                    try:
                        return ppn.get_pts_ref_from_pid(e.attrib['id'])
                    except:
                        logger.exception(f'Error while loading Pali volpage for {uid}')
                        return None
                e = e.next_in_order()

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

    def update_code_points(self, lang_uid, unicode_points, force=False):
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


# This code converts the volume page concordence from mahasangiti
# data dump into a form useful for us
# Maybe put it in DB one day


class PaliPageNumbinator:
    msbook_to_ptsbook_mapping = {
        'a': 'AN',
        'ap': 'Ap',
        'bu': 'Bv',
        'cn': 'Cnd',
        'cp': 'Cp',
        'd': 'DN',
        'dh': 'Dhp',
        'dhs': 'Ds',
        'dht': 'Dt',
        'it': 'It',
        'j': 'Ja',
        'kh': 'Kp',
        'kv': 'Kv',
        'm': 'MN',
        'mi': 'Mil',
        'mn': 'Mnd',
        'ne': 'Ne',
        'p': 'Pt',
        'pe': 'Pe',
        'ps': 'Ps',
        'pu': 'Pp',
        'pv': 'Pv',
        's': 'SN',
        'sn': 'Snp',
        'th1': 'Thag',
        'th2': 'Thig',
        'ud': 'Ud',
        'v': 'Vin',
        'vbh': 'Vb',
        'vv': 'Vv',
        'y': 'Ya',
    }

    default_attempts = list(range(0, -16, -1)) + list(range(1, 6))

    def __init__(self, data_dir):
        self.mapping = {}
        self.load(data_dir)

    def load(self, data_dir):
        with (data_dir / 'misc' / 'all_pali_concordance.json').open('r', encoding='utf8') as f:
            entries = json.load(f)

        # v is an array of reference-strings. Each such string is a
        # reference into a particular manuscript edition for the given
        # text segment (k).
        self.mapping = mapping = {}
        for k, v in entries.items():

            # We are so far only interested in concordance between Mahasangiti
            # volumes and Pali Text Society ones.
            ms = []
            pts = []

            # Pick out only the references we're interested in.
            for ref in v:
                match = regex.fullmatch(r'ms(\d+[A-Z][a-z]*\d*)_(\d+)', ref)
                if match:
                    msbook, msnum = match.groups()
                    ms.append((msbook.lower(), int(msnum)))
                    continue

                match = regex.fullmatch(r'(pts-vp-pli(?:[12]ed)?)(?:(\d+)\.)?(\d+)', ref)
                if match:
                    pts_edition, vol, page = match.groups()
                    if pts_edition == 'pts-vp-pli':
                        pts_edition = 'pts-vp-pli1ed'
                    pts.append((pts_edition, vol, int(page)))
                    continue

                match = regex.fullmatch(r'vnp(\d+)', ref)
                if match:
                    verse = match[1]
                    pts.append(('vnp', None, int(verse)))
                    continue

            for msbook, msnum in ms:
                for pts_edition, vol, page in pts:
                    mapping[msbook, msnum, pts_edition] = (vol, page)

    def msbook_to_ptsbook(self, msbook):
        m = regex.match(r'\d+([A-Za-z]+(?:(?<=th)[12])?)', msbook)
        return self.msbook_to_ptsbook_mapping[m[1]]

    def get_pts_ref_from_pid(self, pid):
        m = regex.match(r'p_(\w+)_(\d+)', pid)

        msbook = m[1].lower()
        msnum = int(m[2])
        return self.get_pts_ref(msbook, msnum)

    def get_pts_ref(self, msbook, msnum, attempts=None):
        if not attempts:
            attempts = self.default_attempts

        refs = {}
        for edition in ['pts-vp-pli1ed', 'pts-vp-pli2ed', 'vnp']:
            for i in attempts:
                n = msnum + i
                if n < 1:
                    continue
                key = (msbook, n, edition)
                if key in self.mapping:
                    book, num = self.mapping[key]
                    ptsbook = self.msbook_to_ptsbook(msbook)
                    refs[edition] = self.format_book(ptsbook, book, num)
                    break
        return refs or None

    def format_book(self, ptsbook, book, num):
        if not book:
            return f'{ptsbook} {num}'

        book = {'1': 'i', '2': 'ii', '3': 'iii', '4': 'iv', '5': 'v', '6': 'vi'}.get(
            book, book
        )
        return f'{ptsbook} {book} {num}'
