from flask_restful import Resource

from common.arangodb import get_db
from common.queries import LANGUAGES, MENU


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
                    next:
                        type: array
                        items:
                            type: MenuItem
        """
        db = get_db()
        results = db.aql.execute(MENU)

        data = {}
        edges = {}

        for x in results:
            if isinstance(x['from'], dict):
                uid = x['from']['uid']

                if uid not in data:
                    vertex = self._vertex(x['from']['name'], uid)
                    data[uid] = vertex
                    edges[uid] = vertex

                x['from'] = x['from']['uid']

            _from = x['from']
            _id = x['id']
            name = x['name']

            vertex = self._vertex(name, _id)
            edges[_from]['next'].append(vertex)
            edges[_id] = vertex

        return data, 200

    @staticmethod
    def _vertex(name, uid) -> dict:
        return {'name': name,
                'uid': uid,
                'next': []}
