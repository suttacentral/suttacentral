from random import randint
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
        if self._rev:
            data['_rev'] = self._rev
        if self._id:
            data['_id'] = self._id

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
        uid = f'{fake.language_code()}{randint(1, 100)}.{randint(1, 50)}'
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
        if self._rev:
            data['_rev'] = self._rev

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
        if self._rev:
            data['_rev'] = self._rev
        if self._id:
            data['_id'] = self._id
        if self._key:
            data['_key'] = self._key

        return data


class ModelList(list):
    """
    Extend standard list implementation with save method for bulk data importing to db.
    """
    def save(self):
        collection = self[0].collection
        db = get_db()
        collection = db.collection(collection)

        return collection.import_bulk([m.document for m in self])
