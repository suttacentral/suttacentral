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

        return collection.import_bulk_logged([m.document for m in self])


class Language(Model):
    collection = 'language'  # this is constant

    def __init__(
            self,
            uid: str,
            name: str,
            is_root: bool,
            iso_code: str,
            *args,
            **kwargs,
    ):
        super().__init__(*args, **kwargs)
        self.uid = uid
        self.name = name
        self.is_root = is_root
        self.iso_code = iso_code

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
        name = (
            fake.color_name()
        )  # Faker has no language name generator, use color instead.
        is_root = bool(randint(0, 1))
        return cls(uid, name, is_root, iso_code, _key=_key)

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
            '_key': self._key,
        }
        self._add_data(data)

        return data


class NavigationDetailDoc(Model):
    collection = 'super_nav_details'

    def __init__(self, name: str, uid: str, root_lang: str, *args, **kwargs):
        self.name = name
        self.uid = uid
        self.root_lang = root_lang
        _id = f'super_nav_details/{uid}'
        super().__init__(*args, _id=_id, _key=uid, **kwargs)

    def __str__(self):
        return self._id

    @classmethod
    def generate(cls) -> 'NavigationDetailDoc':
        """ Generate random navigation object.

        Returns:
            Generated object.
        """
        fake = Faker()
        uid = generate_uid()
        name = fake.first_name()
        root_lang = fake.language_code()
        return cls(name, uid, root_lang)

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
            '_id': self._id,
            '_key': self._key,
        }
        self._add_data(data)

        return data


class SuperNavigationEdge(Model):
    collection = 'super_nav_details_edges'
    edge = True

    def __init__(self, _from, _to, *args, **kwargs):
        self._from = _from
        self._to = _to
        super().__init__(*args, **kwargs)

    def __str__(self):
        return f'from: {self._from}, to: {self._to}'

    @classmethod
    def generate(cls, roots: List[NavigationDetailDoc]) -> 'ModelList':
        """ Generate NavigationDetailDoc objects for given list of roots.

        Returns:
            Generated objects.
        """
        edges = ModelList()
        sep = randint(1, len(roots))
        roots = [roots[:sep], roots[sep:]]

        for submenu in roots:
            for i, menu_element in enumerate(submenu):
                try:
                    _from = submenu[i - 1]._id
                except IndexError:
                    _from = None
                _to = menu_element._id
                edges.append(cls(_from=_from, _to=_to))
        return edges

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {'_from': self._from, '_to': self._to}
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
        blurb = fake.paragraph(
            nb_sentences=3, variable_nb_sentences=True, ext_word_list=None
        )
        lang = fake.language_code()
        uid = generate_uid()
        return cls(blurb, lang, uid)

    @property
    def document(self) -> Dict[str, Union[str, int]]:
        """
        Returns:
            Arango document representation
        """
        data = {'blurb': self.blurb, 'uid': self.uid, 'lang': self.lang}
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
        data = {'difficulty': self.difficulty, 'uid': self.uid}
        self._add_data(data)

        return data


class HtmlText(Model):
    collection = 'html_text'

    def __init__(
            self,
            uid,
            lang,
            name,
            author,
            volpage,
            prev_uid,
            next_uid,
            mtime,
            text,
            *args,
            **kwargs,
    ):
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
            'text': self.text,
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
    def generate(cls, nav_docs: List[NavigationDetailDoc]) -> 'ModelList':
        """ Generate Relationships objects for given list of roots.

        Returns:
            Generated objects.
        """
        edges = ModelList()
        _from = nav_docs.pop(0)._id
        for nav_doc in nav_docs:
            if random() > 0.5:
                from_ = f'{_from}#{randint(1, 15)}'
                to = f'{nav_doc._id}#{randint(1, 15)}'
            else:
                from_ = _from
                to = nav_doc._id
            partial = bool(round(random()))
            edge = cls(_from, nav_doc._id, from_, partial, to, 'full')
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
            '_to': self._to,
        }
        self._add_data(data)

        return data


def generate_uid():
    fake = Faker()
    return f'{fake.language_code()}{randint(1, 100)}.{randint(1, 50)}'
