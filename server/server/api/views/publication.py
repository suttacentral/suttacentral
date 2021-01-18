from flask import request
from flask_restful import Resource

from common.arangodb import get_db
from common.extensions import cache, make_cache_key
from .views import long_cache_timeout


class Publication(Resource):
    """
    Publication API endpoint
    """

    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        query = {}
        text_uid = request.args.get('text_uid')
        author_uid = request.args.get('author_uid')
        if text_uid:
            query['text_uid'] = text_uid
        if author_uid:
            query['author_uid'] = author_uid

        db = get_db()
        collection = db.collection('publications')
        publications = list(
            collection.find(query) if query else collection.all()
        )
        return publications, 200
