from flask_restful import Resource

from common.arangodb import get_db


class HelloWorld(Resource):
    def get(self):
        db = get_db()

        try:
            db.create_collection('students')
        except:
            pass

        students = db.collection('students')
        students.all()

        return {'hello': 'Hello world!'}