import os
from pathlib import Path


class Config:
    def __init__(self):
        self.DEBUG = False
        self.TESTING = False
        self.CSRF_ENABLED = True
        self.SECRET = os.getenv('SECRET')
        self.ENVIRONMENT = os.getenv('ENVIRONMENT')

        # ARANGO
        self.ARANGO_BASE_DB = self.ARANGO_DB = os.getenv('ARANGO_BASE_DB_NAME')
        try:
            self.ARANGO_DB = os.environ['ARANGO_DB_NAME']
        except KeyError:
            pass

        self.ARANGO_CLIENT = {
            'host': os.getenv('ARANGO_HOST'),
            'port': int(os.getenv('ARANGO_PORT')),
            'username': os.getenv('ARANGO_USER', None),
            'password': os.getenv('ARANGO_ROOT_PASSWORD', None),
        }

        self.BASE_DIR = Path('/opt/sc/sc-flask/')
        self.STORAGE_DIR = Path('/opt/sc/storage/')
        self.ASSETS_DIR = Path('/opt/sc/frontend/')
        self.DATA_REP_DIR = Path('/opt/sc/sc-flask/sc-data')
        self.DATA_REPO = 'https://github.com/suttacentral/sc-data.git'

        self.DEFAULT_LANGUAGE = 'en'

        self.SERVER_ADDRESS = os.environ['SERVER_ADDRESS']


class DevelopmentConfig(Config):
    def __init__(self):
        super().__init__()
        self.DEBUG = True


class TestingConfig(Config):
    def __init__(self):
        super().__init__()
        self.TESTING = True
        self.DEBUG = True
        self.ARANGO_DB = os.getenv('ARANGO_BASE_DB_NAME') + '_tests'


class ProductionConfig(Config):
    def __init__(self):
        super().__init__()


def app_config() -> Config:
    environment = os.getenv('ENVIRONMENT')
    configs = {
        'development': DevelopmentConfig(),
        'testing': TestingConfig(),
        'production': ProductionConfig(),
    }
    return configs[environment]


# https://github.com/rochacbruno/flasgger
swagger_config = {
    "headers": [],
    "specs": [{"endpoint": 'swagger', "route": '/spec'}],
    "swagger_ui": False,
    "specs_route": "/swagger/",
}

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "SuttaCentral's API",
        "description": "API for SuttaCentral",
        "contact": {
            "responsibleDeveloper": "Hong Da",
            "email": "paccakkha@yahoo.com",
        },
        "version": "1.1.0",
    },
    "basePath": "/api",  # base bash for blueprint registration
    "schemes": ["http", "https"],
    "operationId": "GetData",
}
