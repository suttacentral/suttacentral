from collections.abc import Sequence, Iterator
from typing import Any

from arango.collection import StandardCollection
from arango.database import StandardDatabase

from common.arangodb import get_db
from common.utils import current_app


def database() -> StandardDatabase:
    app = current_app()
    with app.app_context():
        return get_db()  # type: ignore


class Collection:
    """ SuttaCentral wrapper class for ArangoDB's collection API.
    Exposes required functionality whilst hiding the rest.
    """
    def __init__(self, name: str):
        self._collection: StandardCollection = database()[name]

    @property
    def name(self) -> str:
        return self._collection.name

    def recreate(self, documents: Sequence[dict[str, Any]]) -> None:
        self._collection.import_bulk_logged(documents, wipe=True)

    def __len__(self) -> int:
        return len(self._collection)

    def keys(self) -> Iterator[str]:
        yield from (str(key) for key in self._collection.keys())

    def documents(self) -> Iterator[Any]:
        yield from (doc for doc in self._collection.all())
