from flask_restful import Resource
from common.arangodb import get_db


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
