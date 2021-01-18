from flask_restful import Resource

from common.arangodb import get_db
from common.extensions import cache, make_cache_key
from .views import default_cache_timeout


class Glossary(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('dictionaries_glossary').all()
        return list(data), 200
