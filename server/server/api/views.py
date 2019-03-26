import json
import os
import re
import datetime
from collections import defaultdict

import stripe
from flask import current_app, request, redirect
from flask_restful import Resource

from sortedcontainers import SortedDict

from common.arangodb import get_db
from common.extensions import make_cache_key, cache
from common.mail import send_email

from common.queries import (CURRENCIES, DICTIONARIES, LANGUAGES, MENU, SUBMENU, PARAGRAPHS, PARALLELS,
                            SUTTA_VIEW, SUTTAPLEX_LIST, IMAGES, EPIGRAPHS, WHY_WE_READ, DICTIONARYFULL, GLOSSARY,
                            DICTIONARY_ADJACENT, DICTIONARY_SIMILAR, EXPANSION, PWA, AVAILABLE_TRANSLATIONS_LIST,
                            TRANSLATION_COUNT_BY_DIVISION, TRANSLATION_COUNT_BY_AUTHOR, TRANSLATION_COUNT_BY_LANGUAGE)

from common.utils import (flat_tree, language_sort, recursive_sort, sort_parallels_key, sort_parallels_type_key,
                          groupby_unsorted)

from data_loader.textfunctions import asciify_roman as asciify

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
            'division': list(db.aql.execute(TRANSLATION_COUNT_BY_DIVISION, bind_vars={'lang': iso_code})),
            'author': list(db.aql.execute(TRANSLATION_COUNT_BY_AUTHOR, bind_vars={'lang': iso_code}))
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


def has_translated_descendent(uid, lang, _cache={}):
    if lang not in _cache:
        db = get_db()
        uids = next(db.aql.execute(AVAILABLE_TRANSLATIONS_LIST, bind_vars={'lang': lang}))
        _cache[lang] = set(uids)
    
    lang_mapping = _cache[lang]
    return uid in lang_mapping



class Menu(Resource):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.num_regex = re.compile(r'^[^\d]*?([\d]+)$')

    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self, submenu_id=None):
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
                    name:
                        type: string
                    num:
                        type: number
                    uid:
                        required: false
                        type: string
                    lang_iso:
                        type: string
                    lang_name:
                        type: string
                    id:
                        required: false
                        type: string
                    children:
                        type: array
                        items:
                            type: MenuItem
                    has_children:
                        required: false
                        type: boolean
                    type:
                        type: string
        """
        language = request.args.get('language', current_app.config.get('DEFAULT_LANGUAGE'))
        return self.get_data(submenu_id, language=language), 200

    def get_data(self, submenu_id=None, menu_query=MENU, submenu_query=SUBMENU, language=None, bind_vars=None):
        db = get_db()

        if bind_vars is None:
            bind_vars = {'language': language}
        

        if submenu_id:
            bind_vars['submenu_id'] = submenu_id
            divisions = list(db.aql.execute(submenu_query, bind_vars=bind_vars))
        else:
            divisions = list(db.aql.execute(menu_query, bind_vars=bind_vars))

        if submenu_id:
            data = divisions
        else:
            data = self.group_by_parents(divisions, ['pitaka'])
        
        for pitaka in data:
            if 'children' in pitaka:
                children = pitaka.pop('children')
                if pitaka['uid'] == 'pitaka/sutta':
                    pitaka['children'] = self.group_by_parents(children, ['grouping'])
                else:
                    pitaka['children'] = self.group_by_parents(children, ['sect'])
                    self.group_by_language(pitaka, exclude={'sect/other'})

        self.recursive_cleanup(data, language=language, mapping={})
        self.make_yellow_brick_road(data, language)
        return data

    @staticmethod
    def num_sort_key(entry):
        return entry.get('num') or -1

    @staticmethod
    def group_by_parent_property(entries, prop):
        return ((json.loads(key), list(group))
                for key, group
                in groupby_unsorted(entries, lambda d: json.dumps(d['parents'].get(prop), sort_keys=True))
                )

    def group_by_parents(self, entries, props):
        out = []
        prop = props[0]
        remaining_props = props[1:]
        for parent, children in self.group_by_parent_property(entries, prop):
            if parent is None:
                # This intentionally looks as bad as possible in the menu
                # it's a "hey classify me!"
                parent = {
                    'uid': f'{prop}/none',
                    'name': f'None {prop}',
                    'num': 84000
                }
            out.append(parent)
            if remaining_props:
                parent['children'] = self.group_by_parents(children, remaining_props)
            else:
                parent['children'] = children
        return sorted(out, key=self.num_sort_key)

    @classmethod
    def group_by_language(cls, pitaka, exclude=None):
        i = 0
        while i < len(pitaka['children']):
            child = pitaka['children'][i]
            if exclude and child['uid'] in exclude:
                i += 1
                continue
            new_data = defaultdict(list)
            for sub_child in child['children']:
                iso = sub_child.pop('lang_iso', None)
                new_data[iso].append(sub_child)
            child.pop('children')
            new_data = [{**child, **cls.get_additional_data_from_child(iso, children),'children': children} for
                        iso, children in new_data.items()]
            for data_item in new_data:
                for child in data_item['children']:
                    try:
                        del child['lang_name']
                    except KeyError:
                        pass
            pitaka['children'] = pitaka['children'][:i] + new_data + pitaka['children'][i + 1:]
            i += len(new_data)

    @staticmethod
    def get_additional_data_from_child(iso, children):
        data = {}
        if iso:
            data['lang_iso'] = iso
        try:
            data['lang_name'] = children[0]['lang_name']
        except KeyError:
            pass
        return data

    def update_display_num(self, menu_entry):
        display_num = menu_entry.get('display_num')
        if 'id' in menu_entry and display_num is None:
            m = self.num_regex.match(menu_entry['id'])
            if m:
                entry_name = menu_entry.get('name', '')
                if entry_name and m[1] not in entry_name:
                    display_num = m[1]
        if display_num:
            menu_entry['display_num'] = display_num.replace('-', '–\u2060')

    def recursive_cleanup(self, menu_entries, language, mapping):
        menu_entries.sort(key=self.num_sort_key)
        for menu_entry in menu_entries:
            mapping[menu_entry['uid']] = menu_entry
            self.update_display_num(menu_entry)            
            if 'descendents' in menu_entry:
                descendents = menu_entry.pop('descendents')
                mapping.update({d['uid']: d for d in descendents})
                del menu_entry['uid']
                for descendent in descendents:
                    parent = mapping[descendent.pop('from')]
                    if 'children' not in parent:
                        parent['children'] = []
                    parent['children'].append(descendent)
            if 'type' in menu_entry:
                if menu_entry['type'] in ('div', 'division'):
                    del menu_entry['uid']
            if 'parents' in menu_entry:
                del menu_entry['parents']
            if 'children' in menu_entry:
                children = menu_entry['children']
                self.recursive_cleanup(children, language=language, mapping=mapping)

    def make_yellow_brick_road(self, menu_entries, language):
        is_submenu_yellow_brick_road = False
        for entry in menu_entries:
            if 'uid' in entry:
                uid = entry['uid'].split('/', 1)[1]
            else:
                uid = entry['id']
            
            is_entry_yellow_brick = has_translated_descendent(uid, language)
            if 'children' in entry:
                is_entry_yellow_brick += self.make_yellow_brick_road(entry['children'], language)
            entry['yellow_brick_road'] = bool(is_entry_yellow_brick)
            is_submenu_yellow_brick_road += is_entry_yellow_brick
        return is_submenu_yellow_brick_road

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
        language = request.args.get('language', current_app.config.get('DEFAULT_LANGUAGE'))
        uid = uid.replace('/', '-').strip('-')

        db = get_db()
        results = db.aql.execute(SUTTAPLEX_LIST,
                                 bind_vars={'language': language, 'uid': uid})

        difficulties = {
            3: 'advanced',
            2: 'intermediate',
            1: 'beginner'
        }

        data = []
        edges = {}
        for result in results:
            _from = result.pop('from')
            if result['difficulty']:
                result['difficulty'] = {'name': difficulties[result['difficulty']],
                                        'level': result['difficulty']}
            parent = None
            try:
                parent = edges[_from]
            except KeyError:
                data.append(result)
            _id = f'root/{result["uid"]}'
            edges[_id] = result
            result['translations'] = sorted(result['translations'], key=language_sort(result['root_lang']))

            if parent:
                try:
                    parent['children'].append(result)
                except KeyError:
                    parent['children'] = [result]

        recursive_sort(data, 'num')  # Sorts data inplace

        data = flat_tree(data)

        return data, 200


class Parallels(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout/10)
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
        language = request.args.get('language', current_app.config.get('DEFAULT_LANGUAGE'))
        uid = uid.replace('/', '-').strip('-')
        uid = f'root/{uid}'

        db = get_db()
        results = db.aql.execute(PARALLELS,
                                 bind_vars={'language': language, 'uid': uid})

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
            result['to']['translations'] = sorted(result['to']['translations'],
                                                  key=language_sort(result['to']['root_lang']))
        for entry in data:
            data[entry] = sorted(data[entry], key=sort_parallels_type_key)

        return data, 200


class LookupDictionaries(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send parallel information for given sutta.
        ---
        parameters:
           - in: query
             name: from
             type: string
             required: true
           - in: query
             name: to
             type: string
           - in: query
             name: fallback
             type: string
        responses:
            200:
                schema:
                    id: dictionary
                    type: object
                    properties:
                        from:
                            type: string
                        to:
                            type: string
                        dictionary:
                            type: object
                            items:
                                type: array
                                items:
                                    type: string
        """
        to_lang = request.args.get('to', current_app.config.get('DEFAULT_LANGUAGE'))
        from_lang = request.args.get('from', None)

        fallback = request.args.get('fallback', 'false')
        main_dict = False if fallback == 'true' else True

        if from_lang is None:
            return 'from not specified', 422

        db = get_db()

        result = db.aql.execute(DICTIONARIES,
                                bind_vars={'from': from_lang, 'to': to_lang, 'main': main_dict})

        try:
            return result.next(), 200
        except StopIteration:
            return 'Dictionary not found', 404


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

        db = get_db()

        results = db.aql.execute(SUTTA_VIEW,
                                 bind_vars={'uid': uid, 'language': lang, 'author_uid': author_uid})

        result = results.next()
        self.convert_paths_to_content(result)
        for k in ('root_text', 'translation'):
            doc = result[k]
            if doc:
                self.convert_paths_to_content(doc)
        
        return result, 200
        
    @staticmethod
    def convert_paths_to_content(doc):
        conversions = (
            ('file_path', 'text', lambda f: f.read() ),
            ('markup_path', 'markup', lambda f: f.read() ),
            ('strings_path', 'strings', json.load ),
        )
        
        for from_prop, to_prop, load_func in conversions:
            if (to_prop not in doc) and (from_prop in doc):
                file_path = doc.pop(from_prop)
                if file_path is None:
                    doc[to_prop] = None
                else:
                    with open(file_path) as f:
                        doc[to_prop] = load_func(f)


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

        language = request.args.get('language', current_app.config.get('DEFAULT_LANGUAGE'))

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
            'currencies': currencies
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


class Glossary(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send list of glossary results for related terms in dictionary view
        ---
        responses:
            glossary:
                type: array
                items:
                    type: object
                    properties:
                        <word>:
                            type: string
        """
        db = get_db()

        data = db.aql.execute(GLOSSARY)

        return list(data), 200


class DictionaryAdjacent(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, word=None):
        """
        Send list of adjacent terms to dictionary search word
        ---
        responses:
            glossary:
                type: array
                items:
                    type: string
        """
        db = get_db()

        data = db.aql.execute(DICTIONARY_ADJACENT, bind_vars={'word': word})

        return list(data), 200


class DictionarySimilar(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, word=None):
        """
        Send list of similar terms to dictionary search word
        ---
        responses:
            glossary:
                type: array
                items:
                    type: string
        """
        db = get_db()

        data = db.aql.execute(DICTIONARY_SIMILAR, bind_vars={'word': word, 'word_ascii': asciify(word)})

        return list(data), 200


class DictionaryFull(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, word=None):
        """
        Sends list of dictionary entries to dictionary view
        ---
        responses:
            dictionary_full:
                type: array
                items:
                    type: object
                    properties:
                        dictname:
                            type: string
                        text:
                            type: string

        """
        if word is not None:
            word = word.lower()

        db = get_db()

        data = db.aql.execute(DICTIONARYFULL, bind_vars={'word': word})

        return list(data), 200


class Donations(Resource):
    def post(self):
        """
        Process the payment
        ---
        responses:
            all:
                description: Information massage.
                type: string
        """
        data = json.loads(list(request.form.keys())[0])
        currency = data.get('currency')
        inputted_amount = data.get('amount')
        one_time_donation = data.get('oneTimeDonation')
        monthly_donation = data.get('monthlyDonation')
        stripe_data = data.get('stripe')
        name = data.get('name')
        email_address = data.get('email')
        message = data.get('message')

        secret_key = os.environ.get('STRIPE_SECRET')

        stripe.api_key = secret_key
        db = get_db()
        try:
            currency = list(db['currencies'].find({'symbol': currency}))[0]
        except IndexError:
            return 'No such currency', 400

        if currency['decimal']:
            amount = inputted_amount * 100
        else:
            amount = inputted_amount

        customer_data = {
            'source': stripe_data['id']
        }

        if email_address:
            customer_data['email'] = email_address

        try:
            customer = stripe.Customer.create(**customer_data)
        except stripe.CardError:
            return {'err_code': 3}, 400
        try:
            if one_time_donation:
                charge = stripe.Charge.create(
                    customer=customer.id,
                    amount=amount,
                    currency=currency['symbol'],
                    metadata={"name": name, "message": message},
                    description=f'''Donation by {name if name else ""}, 
                                message {message if message else ""}'''
                )

            elif monthly_donation:
                plan = self._get_plan(amount, currency['symbol'])
                subscription = stripe.Subscription.create(
                    customer=customer.id,
                    items=[{"plan": plan.stripe_id}]
                )

            else:
                return {'err_message': 'Select either one time or monthly'}, 400

        except stripe.InvalidRequestError as e:
            code = 0
            if 'Amount must convert to at least 50 cents' in str(e):
                code = 1

            elif any(x in str(e) for x in ['99999999', '999,999.99', 'Invalid integer']):
                code = 2

            return {'err_code': code}, 400

        data = {
            'name': name,
            'amount': inputted_amount,
            'currency': currency['symbol'],
            'dateTime': datetime.datetime.now().strftime('%d-%m-%y %H:%M'),
            'subscription': monthly_donation
        }

        if email_address:
            self.send_email(data, email_address)

        return data, 200

    @staticmethod
    def _get_plan(amount, currency):
        plan_id = f'monthly_{amount}_{currency}'
        try:
            plan = stripe.Plan.retrieve(plan_id)
        except stripe.error.InvalidRequestError:
            plan = stripe.Plan.create(
                amount=amount,
                interval='month',
                name='Monthly Donation to SuttaCentral',
                currency=currency,
                statement_descriptor='SuttaCentralDonation',
                id=plan_id)
        return plan

    @staticmethod
    def send_email(data, email_address):
        msg = {'subject': 'Payment confirmation',
               'from_email': current_app.config.get('MAIL_DONATIONS_SENDER'),
               'to_email': email_address,
               'html': f'''
        <div>We gratefully acknowledge your donation to support SuttaCentral.</div><br>
        <div>Here are the transaction details for your records. 
        If you have entered your email address, a copy of these details will be sent there too.</div><br>
        {f"<div>Donor: <b>{data['name']}</b></div>" if data['name'] else ''}
        <div>Donation: 
            <b>{data['amount']} {data['currency']}</b>
        </div>
        <div>Paid to: <b>SuttaCentral Development Trust</b></div>
        <div>Payment service: <b>Stripe</b></div>
        <div>Time of payment: <b>{data['dateTime']}</b></div>
        <div>Type of payment: 
            <b>{'Subscription' if data['subscription'] else 'One time donation'}</b>
        </div><br>
        <div>For further inquiries, please contact SuttaCentral Development Trust’s financial officer Deepika Weerakoon 
            at <a href="mailto:suttacentraldevelopmenttrust@gmail.com" target="_top"> 
                suttacentraldevelopmenttrust@gmail.com
            </a>.
        </div><br>
        <div>
            SuttaCentral Development Trust is a charitable trust registered in Australia. 
            Your donation will be used for the development of SuttaCentral.
        </div><br>
        <div class="cursive">Sadhu! Sadhu! Sadhu!</div>
'''}
        try:
            send_email(**msg)
        except Exception:
            logger.error('Failed to send email')
            logger.exception()
            pass


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

        data = db.aql.execute(IMAGES, bind_vars={'division': division, 'vol': vol, 'page': page})

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
        return next(db.aql.execute(PWA.MENU, bind_vars={'languages': languages, 'include_root': root_lang}))


class StripePublicKey(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        key = os.environ.get('PUBLISHABLE_KEY')
        if key:
            return key, 200
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
                hits = db.aql.execute('''
                    LET modern = (FOR text IN po_strings
                        FILTER text.lang == @lang
                        FILTER text.uid == @uid
                        RETURN {author_uid: text.author_uid, legacy: false})

                    LET legacy = (FOR text IN html_text
                        FILTER text.lang == @lang
                        FILTER text.uid == @uid
                        RETURN {author_uid: text.author_uid, legacy: true})

                    RETURN APPEND(modern, legacy)
                ''', bind_vars={"lang": lang, "uid": uid}).next()
                if hits:
                    author_uid = hits[0]['author_uid']
                    return "Redirect", 301, {'Location': f'/{uid}/{lang}/{author_uid}'}
                else:
                    root = db.collection('root')
                    if uid in root:
                        return "Redirect", 301, {'Location': f'/{uid}'}
                    
        
        return "Not found", 403
