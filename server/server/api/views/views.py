import json
import os
from typing import List
from urllib.parse import urlparse

import stripe
from flask import current_app, request
from flask_restful import Resource

from sortedcontainers import SortedDict

from common.arangodb import get_db
from common.extensions import make_cache_key, cache

from common.queries import (
    CURRENCIES,
    LANGUAGES,
    MENU,
    SUBMENU,
    TIPITAKA_MENU,
    PARAGRAPHS,
    PARALLELS,
    PARALLELS_LITE,
    SUTTA_VIEW,
    SUTTAPLEX_LIST,
    IMAGES,
    EPIGRAPHS,
    WHY_WE_READ,
    EXPANSION,
    PWA,
    TRANSLATION_COUNT_BY_DIVISION,
    TRANSLATION_COUNT_BY_AUTHOR,
    TRANSLATION_COUNT_BY_LANGUAGE,
    SEGMENTED_SUTTA_VIEW,
    SUTTA_NAME,
    SUTTA_SINGLE_PALI_TEXT,
    SUTTA_PATH,
    ALL_DOC_UID_BY_ROOT_UID,
    SUTTA_PALI_REFERENCE,
    SUTTA_PUBLICATION_INFO,
    AVAILABLE_VOICES,
    CANDIDATE_AUTHORS,
    VAGGA_CHILDREN
)

from common.utils import (
    flat_tree,
    language_sort,
    sort_parallels_key,
    sort_parallels_type_key,
)

from aksharamukha import transliterate

from data_loader.util import json_load

default_cache_timeout = 600
long_cache_timeout = 7200


class Languages(Resource):
    """
    Languages API endpoint.
    """

    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        """
        Send list of available languages
        ---
        parameters:
           - in: query
             name: all
             type: boolean
        responses:
            200:
                description: List of available languages
                schema:
                    type: array
                    items:
                        schema:
                            id: language
                            type: object
                            properties:
                                uid:
                                    type: string
                                name:
                                    type: string
                                iso_code:
                                    type: string
                                is_root:
                                    type: boolean
                                localized:
                                    type: boolean
                                localized_percent:
                                    type: number
        """

        include_all = request.args.get('all', False)

        db = get_db()
        languages = list(db.aql.execute(LANGUAGES))

        if include_all:
            response = languages
        else:
            response = [l for l in languages if not l['is_root']]

        return response, 200


class TranslationCountByDivision(Resource):
    """
    Return a summary of translation count by division and author
    """

    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, iso_code):
        """

        ---
        responses:
            200:
                description: Summary of translation counts
                schema:
                    type: object
                    properties:
                        divisions:
                            type: array
                            items:
                                type: object
                                properties:
                                    uid:
                                        type: string
                                    name:
                                        type: string
                                    root_lang:
                                        type: string
                                    total:
                                        type: number
                        authors:
                            type: array
                            items:
                                schema:
                                    type: object
                                    properties:
                                        name:
                                            type: string
                                        total:
                                            type: number
        """

        db = get_db()

        if not db['language'][iso_code]:
            return {"error": f'language code not recognized "{iso_code}"'}, 422

        response = {
            'division': list(
                db.aql.execute(
                    TRANSLATION_COUNT_BY_DIVISION, bind_vars={'lang': iso_code}
                )
            ),
            'author': list(
                db.aql.execute(
                    TRANSLATION_COUNT_BY_AUTHOR, bind_vars={'lang': iso_code}
                )
            ),
        }
        return response, 200


class TranslationCountByLanguage(Resource):
    """
    return a summary of translation counts by language
    """

    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        '''
        responses:
            200:
                description: Summary of translation counts by language
                schema:
                    type: object
                    properties:
                        modern:
                            type: array
                            items:
                                $ref: '#/definitions/TranslationCount'
                        ancient:
                            type: array
                            items:
                                $ref: '#/definitions/TranslationCount'
        definitions:
            TranslationCount:
                type: object
                properties:
                    iso_code:
                        type: string
                    name:
                        type: string
                    total:
                        type: number
        '''

        db = get_db()

        response = next(db.aql.execute(TRANSLATION_COUNT_BY_LANGUAGE))
        return response, 200


class Menu(Resource):

    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self, submenu_id: str = None):
        """
        Send Menu structure
        ---
        responses:
            200:
                description: Menu structure
                schema:
                    id: Menu
                    type: array
                    items:
                        $ref: '#/definitions/MenuItem'
        definitions:
            MenuItem:
                type: object
                properties:
                    uid:
                        type: string
                    root_name:
                        type: string
                    translated_name:
                        type: string
                    node_type:
                        type: string
                    blurb:
                        type: string
                    acronym:
                        type: string
                    root_lang_iso:
                        type: string
                    root_lang_name:
                        type: string
                    child_range:
                        type: string
                    yellow_brick_road:
                        type: boolean
                    children:
                        type: array
                        items:
                            type: MenuItem
        """
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        return self.get_data(submenu_id, language=language), 200

    def get_data(self, submenu_id: str = None, language: str = None) -> List[dict]:
        db = get_db()

        bind_vars = {'language': language}

        if submenu_id:
            bind_vars['submenu_id'] = submenu_id
            data = list(db.aql.execute(SUBMENU, bind_vars=bind_vars))
        else:
            data = list(db.aql.execute(MENU, bind_vars=bind_vars))

        return data


class TipitakaMenu(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        db = get_db()
        data = db.aql.execute(
            TIPITAKA_MENU, bind_vars={'language': language}
        )
        return list(data), 200


class SuttaplexList(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        """
        Send suttaplex for given uid. It is represented in flat list structure where order matters.
        [vagga, vagga, text, text] represents:
        vagga
            vagga
                text
                text
        ---
        parameters:
           - in: path
             name: uid
             type: string
             required: true
        responses:
            200:
                description: Suttaplex list
                schema:
                    id: suttaplex-list
                    type: array
                    items:
                        $ref: '#/definitions/Suttaplex'
        definitions:
            Suttaplex:
                type: object
                properties:
                    uid:
                        type: string
                    blurb:
                        type: string
                    difficulty:
                        required: false
                        type: number
                    original_title:
                        type: string
                    type:
                        type: string
                    translations:
                        type: array
                        items:
                            $ref: '#/definitions/Translation'
            Translation:
                type: object
                properties:
                    author:
                        type: string
                    id:
                        type: string
                    lang:
                        type: string
                    title:
                        type: string
        """
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        uid = uid.replace('/', '-').strip('-')

        db = get_db()
        results = db.aql.execute(
            SUTTAPLEX_LIST, bind_vars={'language': language, 'uid': uid}
        )

        difficulties = {3: 'advanced', 2: 'intermediate', 1: 'beginner'}

        data = []
        edges = {}
        for result in results:
            _from = result.pop('from')
            if result['difficulty']:
                result['difficulty'] = {
                    'name': difficulties[result['difficulty']],
                    'level': result['difficulty'],
                }
            parent = None
            try:
                parent = edges[_from]
            except KeyError:
                data.append(result)
            _id = f'super_nav_details/{result["uid"]}'
            edges[_id] = result
            result['translations'] = sorted(
                result['translations'], key=language_sort(result['root_lang'])
            )

            if parent:
                try:
                    parent['children'].append(result)
                except KeyError:
                    parent['children'] = [result]

        data = flat_tree(data)

        return data, 200


class Parallels(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout / 10)
    def get(self, uid):
        """
        Send parallel information for given sutta.
        ---
        parameters:
           - in: path
             name: uid
             type: string
             required: true
        responses:
            200:
                description: Suttaplex list
                schema:
                    id: suttaplex-parallels
                    type: object
                    properties:
                        first_key:
                            description: "first key is the id of first parallel, second of the second and so on."
                            type: array
                            items:
                                $ref: '#/definitions/Parallel'

        definitions:
            Parallel:
                type object:
                properties:
                    type:
                        type: string
                    partial:
                        type: boolean
                    to:
                        type: array
                        items:
                            $ref: '#/definitions/Suttaplex-parallel'
            Suttaplex-parallel:
                type: object
                properties:
                    uid:
                        type: string
                    difficulty:
                        required: false
                        type: number
                    original_title:
                        type: string
                    type:
                        type: string
                    translations:
                        type: array
                        items:
                            $ref: '#/definitions/Translation'
        """
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        uid = uid.replace('/', '-').strip('-')

        db = get_db()
        results = db.aql.execute(
            PARALLELS, bind_vars={'language': language, 'uid': uid}
        )

        data = SortedDict(sort_parallels_key)
        for result in results:
            if result['to'].get('uid') == 'orphan':
                for k in ('original_title', 'translated_title'):
                    result['to'][k] = ''
                result['to']['acronym'] = result['to']['to'].split('#')[0]
            _from = result.pop('from')
            try:
                data[_from].append(result)
            except KeyError:
                data[_from] = [result]
            result['to']['translations'] = sorted(
                result['to']['translations'],
                key=language_sort(result['to']['root_lang']),
            )
        for entry in data:
            data[entry] = sorted(data[entry], key=sort_parallels_type_key)

        return data, 200

class ParallelsLite(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        db = get_db()
        uid = uid.replace('/', '-').strip('-')
        data = db.aql.execute(PARALLELS_LITE, bind_vars={'uid': uid})
        return list(data), 200

class Sutta(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, author_uid=''):
        """
        Send Complete information set for sutta-view for given uid.
        ---
        parameters:
           - in: path
             name: author
             type: string
           - in: path
             name: uid
             type: string
           - in: query
             name: lang
             type: string
        responses:
            200:
                description: Complete information set for sutta-view
                schema:
                    id: sutta
                    type:  object
                    properties:
                        root_text:
                            type: object
                            properties:
                                uid:
                                    type: string
                                lang:
                                    type: string
                                is_root:
                                    type: boolean
                                title:
                                    type: string
                                author:
                                    type: string
                                author_uid:
                                    type: string
                                text:
                                    type: string
                        translation:
                            type: object
                            properties:
                                uid:
                                    type: string
                                lang:
                                    type: string
                                title:
                                    type: string
                                author:
                                    type: string
                                text:
                                    type: string
                        suttaplex:
                            $ref: '#/definitions/Suttaplex'
                        neighbours:
                            type: object
                            properties:
                                next:
                                    type: object
                                    properties:
                                        author:
                                            type: string
                                        title:
                                            type: string
                                        uid:
                                            type: string
                                previous:
                                    type: object
                                    properties:
                                        author:
                                            type: string
                                        title:
                                            type: string
                                        uid:
                                            type: string

        """
        lang = request.args.get('lang', 'en')
        siteLang = request.args.get('siteLanguage', 'en')

        db = get_db()

        results = db.aql.execute(
            SUTTA_VIEW,
            bind_vars={'uid': uid, 'language': lang, 'author_uid': author_uid},
        )

        result = results.next()

        if result['root_text'] is None and result['translation'] is None and uid.count('.') == 1:
            firstPart = uid[:uid.find('.')]
            secondPart = uid[uid.find('.') + 1:]
            vaggaChildren = list(db.aql.execute(VAGGA_CHILDREN, bind_vars={'uid': firstPart}))
            for child in vaggaChildren:
                if child.count('-'):
                    childRange = child[child.find('.')+1:]
                    range_begin = childRange[:childRange.find('-')]
                    range_end = childRange[childRange.find('-')+1:]
                    if range(int(range_begin), int(range_end)).count(int(secondPart)):
                        results = db.aql.execute(
                            SUTTA_VIEW,
                            bind_vars={'uid': child, 'language': lang, 'author_uid': author_uid},
                        )
                        result = results.next()
                        result['range_uid'] = child
                        if result['range_uid'] is not None:
                            results = db.aql.execute(
                                SUTTA_VIEW,
                                bind_vars={'uid': result['range_uid'], 'language': lang, 'author_uid': author_uid},
                            )
                            result = results.next()

        self.convert_paths_to_content(result)
        for k in ('root_text', 'translation'):
            doc = result[k]
            if doc:
                self.convert_paths_to_content(doc)
                self.calculate_sutta_neighbors(uid, doc, k, siteLang)

        self.get_candidate_authors(uid, author_uid, siteLang, result)
        return result, 200

    @staticmethod
    def convert_paths_to_content(doc):
        conversions = (
            ('file_path', 'text', lambda f: f.read()),
            ('markup_path', 'markup', lambda f: f.read()),
            ('strings_path', 'strings', json.load),
        )

        for from_prop, to_prop, load_func in conversions:
            if (to_prop not in doc) and (from_prop in doc):
                file_path = doc.pop(from_prop)
                if file_path is None:
                    doc[to_prop] = None
                else:
                    with open(file_path) as f:
                        doc[to_prop] = load_func(f)

    @staticmethod
    def calculate_sutta_neighbors(uid, doc, textType, siteLang):
        db = get_db()
        sutta_prev_next = {'prev_uid': '', 'next_uid': ''}

        all_doc_uid = list(db.aql.execute(ALL_DOC_UID_BY_ROOT_UID, bind_vars={'uid': uid}))
        if uid in all_doc_uid:
            uid_index = all_doc_uid.index(uid)
            if uid_index != 0:
                sutta_prev_next['prev_uid'] = all_doc_uid[uid_index - 1]
            if uid_index != len(all_doc_uid) - 1:
                sutta_prev_next['next_uid'] = all_doc_uid[uid_index + 1]

        if doc['previous']:
            doc['previous']['uid'] = sutta_prev_next.get('prev_uid', '')
        if doc['next']:
            doc['next']['uid'] = sutta_prev_next.get('next_uid', '')

        for k, v in sutta_prev_next.items():
            name_result = list(db.aql.execute(SUTTA_NAME, bind_vars={'uid': v, 'lang': siteLang}))
            if k == 'next_uid' and doc['next']:
                doc['next']['name'] = name_result[0]
            elif k == 'prev_uid' and doc['previous']:
                doc['previous']['name'] = name_result[0]

    @staticmethod
    def get_candidate_authors(uid, author_uid, lang, doc):
        db = get_db()
        candidate_authors = db.aql.execute(
            CANDIDATE_AUTHORS,
            bind_vars={'uid': uid, 'lang': lang, 'author_uid': author_uid}
        ).next()
        doc['candidate_authors'] = candidate_authors


class SegmentedSutta(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, author_uid=''):
        db = get_db()
        results = db.aql.execute(
            SEGMENTED_SUTTA_VIEW,
            bind_vars={'uid': uid, 'author_uid': author_uid}
        )
        result = next(results)
        if not result:
            return {'msg': 'Not Found'}, 200

        data = {k: json_load(v) for k, v in result.items()}
        data.update({
            'keys_order': list(data['html_text'].keys())
        })

        return data, 200


class Currencies(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send list of available currencies.
        ---
        responses:
            200:
                schema:
                    type: object
                    properties:
                        default_currency_index:
                            type: number
                        currencies:
                            type: array
                            items:
                                $ref: '#/definitions/currency'
        definitions:
            currency:
                type: object
                properties:
                    american_express:
                        type: boolean
                    name:
                        type: string
                    symbol:
                        type: string
        """
        db = get_db()

        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )

        data = db.aql.execute(CURRENCIES, bind_vars={'language': language})

        currencies = []
        default_currency_index: int = None

        DEFAULT_CURRENCY = 'USD'

        for i, x in enumerate(data):
            currencies.append(x)
            if x['symbol'] == DEFAULT_CURRENCY:
                default_currency_index = i

        response_data = {
            'default_currency_index': default_currency_index,
            'currencies': currencies,
        }

        return response_data, 200


class Paragraphs(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send list of textual information paragraphs for the sutta view
        ---
        responses:
            200:
                schema:
                    id: paragraphs
                    type: array
                    items:
                        $ref: '#/definitions/paragraph'

        definitions:
            paragraph:
                type: object
                properties:
                    uid:
                        type: string
                    description:
                        type: string
        """
        db = get_db()

        data = db.aql.execute(PARAGRAPHS)

        return list(data), 200


class Donations(Resource):
    def post(self):
        body = request.get_json()
        if body is not None and all(item in list(body.keys()) for item in ['currency', 'amount', 'frequency']):
            currency = body['currency']
            amount = body['amount']
            frequency = body['frequency']

            stripe.api_key = os.environ.get('STRIPE_SECRET')

            incoming_uri = urlparse(request.url)
            cancel_url = '{uri.scheme}://{uri.netloc}/donate-now'.format(uri=incoming_uri)
            success_url = '{uri.scheme}://{uri.netloc}/donation-success'.format(uri=incoming_uri)

            if frequency == 'oneTime':
                session = stripe.checkout.Session.create(
                    success_url=success_url,
                    cancel_url=cancel_url,
                    payment_method_types=['card'],
                    line_items=[{
                        'price_data': {
                            'currency': currency,
                            'unit_amount': amount,
                            'product_data': {
                                'name': 'Donation'
                            },
                        },
                        'quantity': 1,
                    }],
                    mode='payment',
                )
            elif frequency == 'monthly':
                session = stripe.checkout.Session.create(
                    success_url=success_url,
                    cancel_url=cancel_url,
                    payment_method_types=['card'],
                    line_items=[{
                        'price_data': {
                            'currency': currency,
                            'unit_amount': amount,
                            'product_data': {
                                'name': 'Monthly Donation'
                            },
                            'recurring': {
                                'interval': 'month'
                            }
                        },
                        'quantity': 1,
                    }],
                    mode='subscription',
                )
            else:
                return {'err_message': 'Select either one time or monthly'}, 400
            return {'id': session.id}, 200
        return {'err_message': 'Provide mandatory property such as currency, amount and frequency'}, 400


class Images(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, division, vol, page):
        """
        Send list of images for given division.
        ---
        responses:
            200:
                schema:
                    id: images
                    type: array
                    items:
                        type: object
                        properties:
                            name:
                                type: string
                            page:
                                type: number
        """
        db = get_db()

        data = db.aql.execute(
            IMAGES, bind_vars={'division': division, 'vol': vol, 'page': page}
        )

        return list(data), 200


class Epigraphs(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        """
        Send list of random epigraphs
        ---
        responses:
            200:
                schema:
                    id: epigraphs
                    type: array
                    items:
                        type: object
                        properties:
                            uid:
                                type: string
                            epigraph:
                                type: string
        """
        db = get_db()

        try:
            limit = int(request.args.get('limit', '10'))
        except ValueError:
            limit = 10

        data = db.aql.execute(EPIGRAPHS, bind_vars={'number': limit})

        return list(data), 200


class WhyWeRead(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send list of random why_we_read quotes.
        ---
        responses:
            200:
                schema:
                    id: why_we_read
                    type: array
                    items:
                        type: string
        """
        db = get_db()

        try:
            limit = int(request.args.get('limit', '10'))
        except ValueError:
            limit = 10

        data = db.aql.execute(WHY_WE_READ, bind_vars={'number': limit})

        return list(data), 200


class Expansion(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        """
        Send list of uid expansion results to suttaplex view
        ---
        responses:
            expansion:
                type: array
                items:
                    type: object
                    properties:
                        <expansion_name>:
                            type: array
                            items:
                                type: string
        """
        db = get_db()

        data = db.aql.execute(EXPANSION)

        return list(data), 200


class CollectionUrlList(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, collection=None):
        """
        Accept list of languages in format `?languages=lang1,lang2,...`
        ---
        parameters:
           - in: query
             name: languages
             type: string
             required: true
           - in: query
             name: include_root
             type: boolean
             required: false

        responses:
            200:
                type: object
                properties:
                    menu:
                        type: array
                        items:
                            type: string
                    suttaplex:
                        type: array
                        items:
                            type: string
                    texts:
                        type: array
                        items:
                            type: object
                            properties:
                                uid:
                                    type: string
                                translations:
                                    type: array
                                    items:
                                        type: object
                                        properties:
                                            lang:
                                                type: string
                                            authors:
                                                type: array
                                                items:
                                                    type: string
        """
        languages = request.args.get('languages', '')
        root_lang = request.args.get('root_lang', 'false').lower()
        root_lang = {'true': True, 'false': False}[root_lang]
        if not languages and not root_lang:
            return 'Language not specified', 404

        languages = languages.split(',') if languages else []

        db = get_db()
        return next(
            db.aql.execute(
                PWA.MENU, bind_vars={'languages': languages, 'include_root': root_lang}
            )
        )


class StripePublicKey(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        key = os.environ.get('PUBLISHABLE_KEY')
        if key:
            return {"public_key": key}, 200
        else:
            return 'Key not found', 404


class PWASizes(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        try:
            data = list(db.aql.execute(PWA.SIZES))[0]
            return data, 200
        except IndexError:
            return 'Language not found', 404


class Redirect(Resource):
    def get(self, url):
        print(url)
        db = get_db()
        parts = url.split('/')
        if len(parts) == 2:
            lang, uid = parts
            if lang == 'pi':
                lang = 'pli'
            languages = db.collection('language')
            if lang in languages:
                hits = db.aql.execute(
                    '''
                    LET modern = (FOR text IN sc_bilara_texts
                        FILTER text.lang == @lang
                        FILTER text.uid == @uid
                        RETURN {author_uid: text.muids[2], legacy: false})

                    LET legacy = (FOR text IN html_text
                        FILTER text.lang == @lang
                        FILTER text.uid == @uid
                        RETURN {author_uid: text.author_uid, legacy: true})

                    RETURN APPEND(modern, legacy)
                ''',
                    bind_vars={"lang": lang, "uid": uid},
                ).next()
                if hits:
                    author_uid = hits[0]['author_uid']
                    return "Redirect", 301, {'Location': f'/{uid}/{lang}/{author_uid}'}
                else:
                    nav_docs = db.collection('super_nav_details')
                    if uid in nav_docs:
                        return "Redirect", 301, {'Location': f'/{uid}'}

        return "Not found", 403


class Transliterate(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, target, text):
        return transliterate.process('ISO', target, text)


class TransliteratedSutta(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, target):
        db = get_db()

        results = db.aql.execute(SUTTA_SINGLE_PALI_TEXT, bind_vars={'uid': uid})
        result = next(results)
        if not result:
            return {'error': 'Not Found'}, 404

        sutta_texts = {k: json_load(v) for k, v in result.items()}
        for key, value in sutta_texts[uid].items():
            sutta_texts[uid][key] = transliterate.process('ISO', target, value.replace(
                'o', 'ō').replace('e', 'ē').replace('O', 'Ō').replace('E', 'Ē'))

        return sutta_texts[uid]


class SuttaFullPath(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        db = get_db()
        full_path = db.aql.execute(SUTTA_PATH, bind_vars={'uid': uid}).next()
        if full_path['full_path'].count('/sutta/minor') > 1:
            if full_path['full_path'].count('dharmapadas') > 0 and full_path['full_path'].count('kn/dhp') > 0:
                full_path['full_path'] = full_path['full_path'].replace('/dharmapadas/sutta/minor', '')
            if uid == 'dhp' and full_path['full_path'].count('dharmapadas') > 0 and full_path['full_path'].count('/kn') > 0:
                full_path['full_path'] = full_path['full_path'].replace('/dharmapadas/sutta/minor', '')
        return full_path


class PaliReferenceEdition(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        pali_references = list(db.aql.execute(SUTTA_PALI_REFERENCE))
        if not pali_references:
            return {'error': 'Not Found'}, 404
        return pali_references


class PublicationInfo(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, lang):
        db = get_db()
        publication_info = list(db.aql.execute(SUTTA_PUBLICATION_INFO, bind_vars={'uid': uid, 'lang': lang}))
        if not publication_info:
            return {'error': 'Not Found'}, 404
        return publication_info

class AvailableVoices(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        db = get_db()
        data = list(db.aql.execute(AVAILABLE_VOICES, bind_vars={'uid': uid}))
        return data, 200

class RootEdition(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('root_edition').all()
        return list(data), 200

class Guides(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('guides').all()
        return list(data), 200

class Shortcuts(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = list(db.aql.execute('FOR s IN shortcuts RETURN s.shortcuts'))[0]
        return data, 200
