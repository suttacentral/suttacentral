from flask import request, current_app
from flask_restful import Resource

from common.extensions import cache, make_cache_key
from search.instant_search import instant_search_query
from search.immediate_search import fetch_possible_result, fulltext_search
import json


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

        matchpartial = request.args.get('matchpartial', 'false')
        default_languages = '["en", "pli"]'
        selected_languages = request.args.get(
            'selectedLanguages',
            default_languages
        )

        try:
            selected_languages = json.loads(selected_languages)
        except json.JSONDecodeError as e:
            logging.error(f"JSONDecodeError for selected_languages: {e}; falling back to default_languages.")
            selected_languages = json.loads(default_languages)

        if query is None:
            return json.dumps({'error': '\'query\' param is required'}), 422

        return instant_search_query(
            query,
            lang,
            restrict,
            limit,
            offset,
            matchpartial,
            selected_languages
        )

    def post(self):
        lang = request.args.get('language')
        limit = request.args.get('limit', 10)
        offset = request.args.get('offset', 0)
        query = request.args.get('query', None)
        restrict = request.args.get('restrict', None)
        if restrict == 'all':
            restrict = None

        matchpartial = request.args.get('matchpartial', 'false')
        selected_languages = request.get_json()

        if query is None:
            return json.dumps({'error': '\'query\' param is required'}), 422

        return instant_search_query(
            query,
            lang,
            restrict,
            limit,
            offset,
            matchpartial,
            selected_languages
        )


class FetchPossibleNames(Resource):
    @cache.cached(timeout=600, key_prefix=make_cache_key)
    def get(self, lang):
        return fetch_possible_result(lang)


class FulltextSearch(Resource):
    @cache.cached(timeout=600, key_prefix=make_cache_key)
    def get(self, query):
        return fulltext_search(query)
