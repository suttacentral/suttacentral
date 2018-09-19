from random import randint, random
from typing import Dict, List, Union

from arango.exceptions import CollectionLoadError
from faker import Faker

from common.arangodb import get_db


class Model:
    collection: str = None
    edge = False

    def __init__(self, _key=None, _id=None, _rev=None):
        self._key = _key
        self._id = _id
        self._rev = _rev

        if self.collection is None:
            raise NotImplementedError('You have to specify collection name')

    @property
    def document(self):
        raise NotImplementedError

    def _add_data(self, data):
        if self._rev and '_rev' not in data:
            data['_rev'] = self._rev
        if self._id and '_id' not in data:
            data['_id'] = self._id
        if self._key and '_key' not in data:
            data['_key'] = self._key
        return data

    def save(self):
        """Saves document to the db.
        """
        db = get_db()

        try:
            collection = db.collection(self.collection)
        except CollectionLoadError:
            collection = db.create_collection(self.collection, edge=self.edge)

        result = collection.insert(self.document)
        self._rev = result['_rev']
        self._id = result['_id']

        return self


class ModelList(list):
    """
    Extend standard list implementation with save method for bulk data importing to db.
    """
    def save(self):
        collection = self[0].collection
        db = get_db()
        collection = db.collection(collection)

        return collection.import_bulk([m.document for m in self])


class Language(Model):
    collection = 'language'  # this is constant

    def __init__(self, uid: str, name: str, is_root: bool, iso_code: str, num: int,
                 *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.uid = uid
        self.name = name
        self.is_root = is_root
        self.iso_code = iso_code
        self.num = num

    def __str__(self):
        return f'{self.name}: {self.iso_code}'

    @classmethod
    def generate(cls) -> 'Language':
        """ Generate random language object.

        Returns:
            Generated object.
        """
        fake = Faker()
        _key = iso_code = uid = fake.language_code()
        name = fake.color_name()  # Faker has no language name generator, use color instead.
        is_root = bool(randint(0, 1))
        num = randint(1, 50)
        return cls(uid, name, is_root, iso_code, num, _key=_key)

    @property
    def type(self) -> str:
        return self.collection

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Returns Arango document representation.
        """
        data = {
            'uid': self.uid,
            'name': self.name,
            'is_root': self.is_root,
            'iso_code': self.iso_code,
            'num': self.num,
            '_key': self._key,
        }
        self._add_data(data)

        return data


class Root(Model):
    collection = 'root'

    def __init__(self, name: str, uid: str, root_lang: str, num: int, *args, **kwargs):
        self.name = name
        self.uid = uid
        self.root_lang = root_lang
        self.num = num
        _id = f'root/{uid}'
        super().__init__(*args, _id=_id, _key=uid, **kwargs)

    def __str__(self):
        return self._id

    @classmethod
    def generate(cls) -> 'Root':
        """ Generate random root object.

        Returns:
            Generated object.
        """
        fake = Faker()
        uid = generate_uid()
        name = fake.first_name()
        root_lang = fake.language_code()
        num = randint(1, 100)
        return cls(name, uid, root_lang, num)

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation.
        """
        data = {
            'name': self.name,
            'uid': self.uid,
            'root_lang': self.root_lang,
            'num': self.num,
            '_id': self._id,
            '_key': self._key,
        }
        self._add_data(data)

        return data


class RootEdges(Model):
    collection = 'root_edges'
    edge = True

    def __init__(self, edge_type, _from, _to, *args, **kwargs):
        self._from = _from
        self._to = _to
        self.type = edge_type
        super().__init__(*args, **kwargs)

    def __str__(self):
        return f'from: {self._from}, to: {self._to}'

    @classmethod
    def generate(cls, roots: List[Root]) -> 'ModelList':
        """ Generate Root objects for given list of roots.

        Returns:
            Generated objects.
        """
        edges = ModelList()
        sep = randint(1, len(roots))
        roots = [roots[:sep], roots[sep:]]

        for submenu in roots:
            for i, menu_element in enumerate(submenu):
                try:
                    _from = submenu[i-1]._id
                except IndexError:
                    _from = None
                _to = menu_element._id
                edges.append(cls(edge_type='test', _from=_from, _to=_to))
        return edges

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {
            'type': self.type,
            '_from': self._from,
            '_to': self._to
        }
        self._add_data(data)

        return data


class Blurb(Model):
    collection = 'blurbs'

    def __init__(self, blurb, lang, uid, *args, **kwargs):
        self.blurb = blurb
        self.uid = uid
        self.lang = lang
        super().__init__(*args, **kwargs)

    def __str__(self) -> str:
        return f'{self.uid}: {self.lang}'

    @classmethod
    def generate(cls) -> 'Blurb':
        """ Generate Blurb object.

        Returns:
            Generated object.
        """
        fake = Faker()
        blurb = fake.paragraph(nb_sentences=3, variable_nb_sentences=True, ext_word_list=None)
        lang = fake.language_code()
        uid = generate_uid()
        return cls(blurb, lang, uid)

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {
            'blurb': self.blurb,
            'uid': self.uid,
            'lang': self.lang
        }
        self._add_data(data)

        return data


class Difficulty(Model):
    collection = 'difficulties'

    def __init__(self, difficulty, uid, *args, **kwargs):
        self.difficulty = difficulty
        self.uid = uid
        super().__init__(*args, **kwargs)

    def __str__(self) -> str:
        return f'{self.uid}: {self.difficulty}'

    @classmethod
    def generate(cls) -> 'Difficulty':
        """ Generate Difficulty object.

        Returns:
            Generated object.
        """
        fake = Faker()
        difficulty = randint(1, 3)
        uid = generate_uid()
        return cls(difficulty, uid)

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {
            'difficulty': self.difficulty,
            'uid': self.uid,
        }
        self._add_data(data)

        return data


class HtmlText(Model):
    collection = 'html_text'

    def __init__(self, uid, lang, name, author, volpage, prev_uid, next_uid, mtime, text, *args, **kwargs):
        self.uid = uid
        self.lang = lang
        self.name = name
        self.author = author
        self.volpage = volpage
        self.prev_uid = prev_uid
        self.next_uid = next_uid
        self.mtime = mtime
        self.text = text
        self.path = f'{self.lang}/{self.uid}'
        super().__init__(*args, **kwargs)

    def __str__(self) -> str:
        return f'{self.uid}: {self.lang}: {self.name}'

    @classmethod
    def generate(cls) -> 'HtmlText':
        """ Generate HtmlText object.

        Returns:
            Generated object.
        """
        fake = Faker()
        uid = generate_uid()
        lang = fake.language_code()
        name = fake.first_name()
        author = fake.last_name()
        volpage = fake.license_plate()
        prev_uid = generate_uid()
        next_uid = generate_uid()
        mtime = randint(1e4, 1e6) / 100
        text = fake.text(max_nb_chars=2000, ext_word_list=None)
        return cls(uid, lang, name, author, volpage, prev_uid, next_uid, mtime, text)

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {
            'uid': self.uid,
            'lang': self.lang,
            'name': self.name,
            'author': self.author,
            'volpage': self.volpage,
            'prev_uid': self.prev_uid,
            'next_uid': self.next_uid,
            'mtime': self.mtime,
            'text': self.text
        }
        self._add_data(data)

        return data


class PoMarkup(Model):
    collection = 'po_markup'

    def __init__(self, uid, markup, *args, **kwargs):
        self.markup = markup
        self.uid = uid
        _key = f'{uid}_markup'
        _id = f'{self.collection}/{_key}'
        super().__init__(*args, _id=_id, _key=_key, **kwargs)

    def __str__(self) -> str:
        return self._id

    @classmethod
    def generate(cls) -> 'PoMarkup':
        """ Generate Blurb object.

        Returns:
            Generated object.
        """
        fake = Faker()
        markup = fake.paragraph(nb_sentences=3, variable_nb_sentences=True, ext_word_list=None)
        uid = generate_uid()
        return cls(uid, markup)

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {
            'uid': self.uid,
            'markup': self.markup
        }
        self._add_data(data)

        return data


class PoString(Model):
    collection = 'po_strings'

    def __init__(self, uid, markup_uid, lang, author, author_blurb, strings, *args, **kwargs):
        self.uid = uid
        self.markup_uid = markup_uid
        self.lang = lang
        self.author = author
        self.author_blurb = author_blurb
        self.strings = strings
        _key = f'{lang}_{uid}_{author}'
        _id = f'{self.collection}/{_key}'
        super().__init__(*args, _id=_id, _key=_key, **kwargs)

    def __str__(self) -> str:
        return f'{self.uid}: {self.author}'

    @classmethod
    def generate(cls) -> 'PoString':
        """ Generate Blurb object.

        Returns:
            Generated object.
        """
        fake = Faker()

        uid = generate_uid()
        markup_uid = generate_uid()
        lang = fake.language_code()
        author = fake.language_code()
        author_blurb = fake.last_name()
        strings = fake.paragraphs(nb=3, ext_word_list=None)

        return cls(uid, markup_uid, lang, author, author_blurb, strings)

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {
            'uid': self.uid,
            'markup_uid': self.markup_uid,
            'lang': self.lang,
            'author': self.author,
            'author_blurb': self.author_blurb,
            'strings': self.strings
        }
        self._add_data(data)

        return data


class Relationship(Model):
    collection = 'relationship'
    edge = True

    def __init__(self, _from, _to, from_, partial, to, _type, *args, **kwargs):
        self._from = _from
        self._to = _to
        self.from_part = from_
        self.partial = partial
        self.to = to
        self.type = _type
        super().__init__(*args, **kwargs)

    def __str__(self):
        return f'from: {self._from}, to: {self._to}'

    @classmethod
    def generate(cls, roots: List[Root]) -> 'ModelList':
        """ Generate Relationships objects for given list of roots.

        Returns:
            Generated objects.
        """
        edges = ModelList()
        _from = roots.pop(0)._id
        for root in roots:
            if random() > 0.5:
                from_ = f'{_from}#{randint(1,15)}'
                to = f'{root._id}#{randint(1,15)}'
            else:
                from_ = _from
                to = root._id
            partial = bool(round(random()))
            edge = cls(_from, root._id, from_, partial, to, 'full')
            edges.append(edge)
        return edges

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {
            'from': self.from_part,
            'partial': self.partial,
            'to': self.to,
            'type': self.type,
            '_from': self._from,
            '_to': self._to
        }
        self._add_data(data)

        return data


def generate_uid():
    fake = Faker()
    return f'{fake.language_code()}{randint(1, 100)}.{randint(1, 50)}'
