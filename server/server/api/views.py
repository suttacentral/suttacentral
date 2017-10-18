import os
import json
from collections import defaultdict

import stripe
from flask import request, current_app
from flask_restful import Resource
from sortedcontainers import SortedListWithKey

from common.arangodb import get_db
from common.queries import LANGUAGES, MENU, SUTTAPLEX_LIST, PARALLELS, DICTIONARIES, SUTTA_VIEW, CURRENCIES, PARAGRAPHS
from common.utils import recursive_sort, uid_sort_key, flat_tree, language_sort


class Languages(Resource):
    """
    Languages API endpoint.
    """

    def get(self):
        """
        Send list of available languages
        ---
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
                                _rev:
                                    type: string
                                uid:
                                    type: string
                                name:
                                    type: string
                                iso_code:
                                    type: string
        """
        db = get_db()
        languages = db.aql.execute(LANGUAGES)
        return list(languages), 200


class Menu(Resource):
    def get(self):
        """
        Send Menu structure
        ---
        responses:
            200:
                description: Menu structure
                schema:
                    id: Menu
                    type: object
                    properties:
                        <uid_1>:
                            $ref: '#/definitions/MenuItem'
                        <uid_2...x>:
                            $ref: '#/definitions/MenuItem'
        definitions:
            MenuItem:
                type: object
                properties:
                    name:
                        type: string
                    uid:
                        type: string
                    children:
                        type: array
                        items:
                            type: MenuItem
        """
        db = get_db()
        results = db.aql.execute(MENU)

        data = []
        root_uids = []
        edges = {}

        for x in results:
            if isinstance(x['from'], dict):
                uid = x['from']['uid']

                if uid not in root_uids:
                    vertex = self._vertex(x['from']['name'], uid, x['num'])
                    data.append(vertex)
                    root_uids.append(uid)
                    edges[uid] = vertex

                x['from'] = x['from']['uid']

            _from = x['from']
            _id = x['id']
            name = x['name']

            vertex = self._vertex(name, _id, x['num'])

            try:
                try:
                    edges[_from]['children'].add(vertex)
                except AttributeError:
                    edges[_from]['children'].append(vertex)

            except KeyError:
                if vertex['uid'].startswith('root'):
                    edges[_from]['children'] = SortedListWithKey([vertex], key=lambda z: z['num'])
                else:
                    edges[_from]['children'] = [vertex]

            edges[_id] = vertex

        for edge in edges:
            if 'children' in edges[edge]:
                edges[edge]['children'] = list(edges[edge]['children'])

        return data, 200

    @staticmethod
    def _vertex(name, uid, num) -> dict:
        return {'name': name,
                'uid': uid,
                'num': num}


class SuttaplexList(Resource):
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
        uid = f'root/{uid}'

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

        recursive_sort(data, 'uid', key=uid_sort_key)  # Sorts data inplace

        data = flat_tree(data)

        return data, 200


class Parallels(Resource):
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

        data = defaultdict(list)
        for result in results:
            _from = result.pop('from')
            data[_from].append(result)
            result['to']['translations'] = sorted(result['to']['translations'],
                                                  key=language_sort(result['to']['root_lang']))

        return data, 200


class LookupDictionaries(Resource):
    def get(self):
        """
        Send parallel information for given sutta.
        ---
        parameters:
           - in: path
             name: from
             type: string
             required: true
           - in: path
             name: to
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
                            type: array
                            items:
                                type: array
                                items:
                                    type: string
        """
        to_lang = request.args.get('to', current_app.config.get('DEFAULT_LANGUAGE'))
        from_lang = request.args.get('from', None)

        if from_lang is None:
            return 'from not specified', 422

        db = get_db()

        result = db.aql.execute(DICTIONARIES,
                                bind_vars={'from': from_lang, 'to': to_lang})

        try:
            return result.next(), 200
        except StopIteration:
            return 'Dictionary not found', 404


class Sutta(Resource):
    def get(self, uid, author: str=''):
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

        """
        lang = request.args.get('lang', 'en')

        author = author.lower()

        db = get_db()

        results = db.aql.execute(SUTTA_VIEW,
                                 bind_vars={'uid': uid, 'language': lang, 'author': author})
        return results.next(), 200


class Currencies(Resource):
    def get(self):
        """
        Send list of available currencies.
        ---
        responses:
            200:
                schema:
                    id: currencies
                    type: array
                    item:
                        $ref '#/definitions/currency'
        definitions:
            currency:
                type: object
                properties:
                    american_express:
                        type: bool
                    name:
                        type: string
                    symbol:
                        type: string
        """
        db = get_db()

        data = db.aql.execute(CURRENCIES)

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
    def get(self):
        """
        Send list of textual information paragraphs for the sutta view
        ---
        responses:
            200:
                schema:
                    id: paragraphs
                    type: object
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

        return data.batch(), 200


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
        amount = data.get('amount')
        one_time_donation = data.get('oneTimeDonation')
        monthly_donation = data.get('monthlyDonation')
        stripe_data = data.get('stripe')
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        secret_key = os.environ.get('STRIPE_SECRET')

        stripe.api_key = secret_key
        db = get_db()
        try:
            currency = list(db['currencies'].find({'symbol': currency}))[0]
        except IndexError:
            return 'No such currency', 400

        if currency['decimal']:
            amount = amount * 100
        amount = int(amount)

        customer_data = {
            'source': stripe_data['token']['id']
        }

        if email:
            customer_data['email'] = email
        customer = stripe.Customer.create(**customer_data)

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
                plan = get_plan(amount, currency['symbol'])
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

            elif '999,999.99' in str(e) or 'Invalid integer' in str(e):
                code = 2

            return {'err_code': code}, 400

        return 'Subscribed' if monthly_donation else 'Donated', 200


def get_plan(amount, currency):
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
