from flask import request, current_app
from flask_restful import Resource

from common.extensions import cache, make_cache_key
from search.instant_search import instant_search_query


class InstantSearch(Resource):
    @cache.cached(timeout=600, key_prefix=make_cache_key)
    def get(self):
        """
        Search for the given query in arangodb, very fast
        """
        lang = request.args.get('language')
        limit = request.args.get('limit', 10)
        offset = request.args.get('offset', 0)
        query = request.args.get('query', None)
        restrict = request.args.get('restrict', None)
        if restrict == 'all':
            restrict = None
        return instant_search_query(query, lang, restrict, limit, offset)
