import os

from flask import Flask, Blueprint
from flask_restful import Api

from common.arangodb import ArangoDB
from config import app_config

from suttas.views import HelloWorld


def app_factory() -> Flask:
    """app factory. Handles app object creation for better readability"""
    app = Flask(__name__)
    app.config.from_object(app_config[os.getenv('ENVIRONMENT')])

    return app


app = app_factory()
arango = ArangoDB(app)
api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(HelloWorld, '/hello/')

app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
