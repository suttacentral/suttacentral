#!/usr/bin/env python3
import os
from typing import Tuple

from flasgger import Swagger
from flask import Blueprint, Flask, make_response, json
from flask_cors import CORS
from flask_restful import Api

from api.ebook.ebook import EBook
from api.views import (
    Currencies,
    Donations,
    Languages,
    LookupDictionaries,
    Menu,
    Paragraphs,
    Parallels,
    Sutta,
    SuttaplexList,
    Images,
    Epigraphs,
    WhyWeRead,
    DictionaryFull,
    Glossary,
    DictionaryAdjacent,
    DictionarySimilar,
    Expansion,
    CollectionUrlList,
    StripePublicKey,
    PWASizes,
    Redirect,
    TranslationCountByDivision,
    TranslationCountByLanguage,
    SegmentedSutta,
    Transliterate,
    Publication,
    TransliteratedSutta,
)
from common.arangodb import ArangoDB
from common.extensions import cache
from config import app_config, swagger_config, swagger_template
from search.view import Search


def app_factory() -> Tuple[Api, Flask]:
    """app factory. Handles app object creation for better readability"""
    app = Flask(__name__)
    app.config.from_object(app_config[os.getenv('ENVIRONMENT')])
    api_bp = Blueprint('api', __name__)
    api = Api(api_bp)

    @api.representation('application/json')
    def output_json(data, code, headers=None):
        resp = make_response(json.dumps(data, ensure_ascii=False), code)
        resp.headers.extend(headers or {})
        return resp

    api.add_resource(Languages, '/languages')
    api.add_resource(TranslationCountByDivision, '/translation_count/<string:iso_code>')
    api.add_resource(TranslationCountByLanguage, '/translation_count')
    api.add_resource(Search, '/search')
    api.add_resource(DictionaryFull, '/dictionary_full/<string:word>')
    api.add_resource(Menu, '/menu', '/menu/<path:submenu_id>')
    api.add_resource(SuttaplexList, '/suttaplex/<path:uid>')
    api.add_resource(Parallels, '/parallels/<path:uid>')
    api.add_resource(
        Sutta, '/suttas/<string:uid>/<string:author_uid>', '/suttas/<string:uid>'
    )
    api.add_resource(LookupDictionaries, '/dictionaries/lookup')
    api.add_resource(Currencies, '/currencies')
    api.add_resource(Donations, '/donate')
    api.add_resource(Paragraphs, '/paragraphs')
    api.add_resource(Images, '/images/<string:division>/<int:vol>/<int:page>')
    api.add_resource(Epigraphs, '/epigraphs')
    api.add_resource(WhyWeRead, '/whyweread')
    api.add_resource(Glossary, '/glossary')
    api.add_resource(DictionaryAdjacent, '/dictionary_full/adjacent/<string:word>')
    api.add_resource(DictionarySimilar, '/dictionary_full/similar/<string:word>')
    api.add_resource(Expansion, '/expansion')
    api.add_resource(StripePublicKey, '/stripe_public_key')
    api.add_resource(CollectionUrlList, '/pwa/collection/<string:collection>')
    api.add_resource(PWASizes, '/pwa/sizes')
    api.add_resource(Redirect, '/redirect/<path:url>')
    api.add_resource(EBook, '/ebook/<string:name>')
    api.add_resource(
        SegmentedSutta, '/bilarasuttas/<string:uid>/<string:author_uid>', '/bilarasuttas/<string:uid>'
    )
    api.add_resource(
        Transliterate, '/transliterate/<string:target>/<string:text>'
    )
    api.add_resource(
        TransliteratedSutta, '/transliterated_sutta/<string:uid>/<string:target>'
    )
    api.add_resource(Publication, '/publication')
    app.register_blueprint(api_bp)
    register_extensions(app)

    return api, app


def register_extensions(app):
    cache.init_app(app, config={'CACHE_TYPE': 'simple'})


api, app = app_factory()
arango = ArangoDB(app)
swagger = Swagger(app, config=swagger_config, template=swagger_template)
CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
