from flask import request, current_app
from flask_restful import Resource

from common.arangodb import get_db
from common.extensions import cache, make_cache_key
from common.queries import DICTIONARY_SIMILAR, DICTIONARY_ADJACENT
from data_loader.textfunctions import asciify_roman as asciify
from .views import default_cache_timeout


class DictionaryFull(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, word=None):
        db = get_db()
        data = list(db.collection('dictionaries_complex').find({'word': word}))
        return list(data), 200


class LookupDictionaries(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        to_lang = request.args.get('to', current_app.config.get('DEFAULT_LANGUAGE'))
        from_lang = request.args.get('from', None)

        if from_lang is None:
            return {'message': 'from not specified'}, 422

        db = get_db()
        data = list(
            db.collection('dictionaries_simple').find({'to': to_lang, 'from': from_lang})
        )
        return data


class DictionaryAdjacent(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, word=None):
        db = get_db()
        data = db.aql.execute(DICTIONARY_ADJACENT, bind_vars={'word': word})
        return list(data), 200


class DictionarySimilar(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, word=None):
        db = get_db()
        data = db.aql.execute(
            DICTIONARY_SIMILAR, bind_vars={'word': word, 'word_ascii': asciify(word)}
        )
        return list(data), 200
