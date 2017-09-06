from flask_restful import Resource

from common.arangodb import get_db
from common.queries import LANGUAGES


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
