from collections import defaultdict

from flask import request, current_app
from flask_restful import Resource

from common.arangodb import get_db
from common.queries import LANGUAGES, MENU, SUTTAPLEX_LIST, PARALLELS, DICTIONARIES, SUTTA_VIEW
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
                    vertex = self._vertex(x['from']['name'], uid)
                    data.append(vertex)
                    root_uids.append(uid)
                    edges[uid] = vertex

                x['from'] = x['from']['uid']

            _from = x['from']
            _id = x['id']
            name = x['name']

            vertex = self._vertex(name, _id)

            try:
                edges[_from]['children'].append(vertex)
            except KeyError:
                edges[_from]['children'] = [vertex]

            edges[_id] = vertex

        return data, 200

    @staticmethod
    def _vertex(name, uid) -> dict:
        return {'name': name,
                'uid': uid}


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
    def get(self, uid, lang):
        """
        Send Complete information set for sutta-view for given uid.
        ---
        parameters:
           - in: path
             name: author
             type: string
        responses:
            200:
                description: Complete information set for sutta-view
                schema:
                    id: sutta
                    type: object
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
        author = request.args.get('author', 'root')

        db = get_db()

        results = db.aql.execute(SUTTA_VIEW,
                                 bind_vars={'uid': uid, 'language': lang, 'author': author})
        return results.next(), 200
