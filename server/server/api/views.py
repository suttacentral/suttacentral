import json
import os
import re

import stripe
from flask import current_app, request
from flask_restful import Resource
from sortedcontainers import SortedListWithKey, SortedDict

from common.arangodb import get_db
from common.queries import CURRENCIES, DICTIONARIES, LANGUAGES, MENU, PARAGRAPHS, PARALLELS, SUTTA_VIEW, SUTTAPLEX_LIST, \
    IMAGES
from common.utils import flat_tree, language_sort, recursive_sort, uid_sort_key, sort_parallels_key, \
    sort_parallels_type_key, groupby_unsorted


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
                    depth:
                        type: number
        """
        db = get_db()
        divisions = db.aql.execute(MENU)

        data = self.groupby_parents(divisions, ['pitaka'])

        for pitaka in data:
            uid = pitaka['uid']
            children = pitaka.pop('children')
            if uid == 'pitaka/su':
                pitaka['children'] = self.groupby_parents(children, ['grouping'])
            else:
                pitaka['children'] = self.groupby_parents(children, ['sect', 'language'])

        self.recursive_cleanup(data, depth=-1, mapping={})

        return data, 200

    @staticmethod
    def num_sort_key(entry):
        return entry.get('num') or -1

    @staticmethod
    def groupby_parent_property(entries, prop):
        return ((json.loads(key), list(group))
                for key, group
                in groupby_unsorted(entries, lambda d: json.dumps(d['parents'].get(prop), sort_keys=True))
                )

    def groupby_parents(self, entries, props):
        out = []
        prop = props[0]
        remaining_props = props[1:]
        for parent, children in self.groupby_parent_property(entries, prop):
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
                parent['children'] = self.groupby_parents(children, remaining_props)
            else:
                parent['children'] = children
        return sorted(out, key=self.num_sort_key)

    def recursive_cleanup(self, menu_entries, depth, mapping):
        menu_entries.sort(key=self.num_sort_key)
        for menu_entry in menu_entries:
            menu_entry['depth'] = depth + 1
            mapping[menu_entry['uid']] = menu_entry
            if 'descendents' in menu_entry:
                descendents = menu_entry.pop('descendents')
                mapping.update({d['uid']: d for d in descendents})
                for descendent in descendents:
                    parent = mapping[descendent.pop('from')]
                    if not 'children' in parent:
                        parent['children'] = []
                    parent['children'].append(descendent)
            if 'parents' in menu_entry:
                del menu_entry['parents']
            if 'type' in menu_entry and menu_entry['type'] in ('div', 'division'):
                if 'children' in menu_entry:
                    del menu_entry['children']
            if 'children' in menu_entry:
                children = menu_entry['children']
                self.recursive_cleanup(children, depth=depth + 1, mapping=mapping)


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
                            type: array
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
    def get(self, uid, author=''):
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

        author = author.lower()

        db = get_db()

        results = db.aql.execute(SUTTA_VIEW,
                                 bind_vars={'uid': uid, 'language': lang, 'author': author})
        data: dict = results.next()

        r = re.compile(r'^[a-z\-]+')
        original_prefix = r.match(uid)[0]

        ordering: dict = data['neighbours']
        for key, items in ordering.items():
            for item in items:
                if r.match(item['uid'])[0] == original_prefix:
                    ordering[key] = item
                    break
            else:
                ordering[key] = None

        return data, 200


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
                    items:
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
            'source': stripe_data['id']
        }

        if email:
            customer_data['email'] = email

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

        return 'Subscribed' if monthly_donation else 'Donated', 200

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


class Images(Resource):
    def get(self, division, vol):
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

        data = db.aql.execute(IMAGES, bind_vars={'division': division, 'vol': vol})

        return data.batch(), 200
