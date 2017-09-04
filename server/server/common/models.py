from typing import Dict, Union
from arango.exceptions import CollectionLoadError
from faker import Faker
from random import randint
from common.arangodb import get_db


class Model:
    collection: str = None

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
            collection = db.create_collection(self.collection)

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


class ModelList(list):
    """
    Extend standard list implementation with save method for bulk data importing to db.
    """
    def save(self):
        collection = self[0].collection
        db = get_db()
        collection = db.collection(collection)

        return collection.import_bulk([m.document for m in self])
