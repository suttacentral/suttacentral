from flask_restful import Resource

from common.arangodb import get_db
from common.queries import LANGUAGES


class HelloWorld(Resource):
    """
    Sample API endpoint.
    """

    def get(self, name):
        """
          Send greeting
          ---
          parameters:
            - in: path
              name: name
              type: string
              required: true
          responses:
            200:
              description: A greeting item
              schema:
                id: hello
                properties:
                  hello:
                    type: string
                    description: Our greeting
        """
        db = get_db()

        try:
            db.create_collection('students')
        except:
            pass

        students = db.collection('students')
        students.all()
        return {'hello': f'Hello {name if name else "World"}!'}


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
