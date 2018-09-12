import os
from pathlib import Path


class Config:
    """Parent configuration class"""
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET = os.getenv('SECRET')
    ENVIRONMENT = os.getenv('ENVIRONMENT')

    # ARANGO
    ARANGO_BASE_DB = ARANGO_DB = os.getenv('ARANGO_BASE_DB_NAME')
    try:
        ARANGO_DB = os.environ['ARANGO_DB_NAME']
    except KeyError:
        pass

    ARANGO_CLIENT = {
        'host': os.getenv('ARANGO_HOST'),
        'port': int(os.getenv('ARANGO_PORT')),
        'username': os.getenv('ARANGO_USER', None),
        'password': os.getenv('ARANGO_ROOT_PASSWORD', None)

    }

    BASE_DIR = Path('../')
    STORAGE_DIR = Path('/opt/sc/storage/')
    ASSETS_DIR = Path('/opt/sc/frontend/')
    DATA_REPO = 'https://github.com/suttacentral/sc-data.git'

    DEFAULT_LANGUAGE = 'en'
    
    SERVER_ADDRESS = os.environ['SERVER_ADDRESS']

    MAILGUN_DOMAIN = os.environ['MAILGUN_DOMAIN']
    MAILGUN_API_KEY = os.environ['MAILGUN_API_KEY']
    MAIL_DONATIONS_SENDER = os.environ['MAIL_DONATIONS_SENDER']
    MAIL_DEFAULT_SENDER = os.environ['MAIL_DEFAULT_SENDER']


class DevelopmentConfig(Config):
    """Configuration for Development"""
    DEBUG = True


class TestingConfig(Config):
    """Configuration for Testing"""
    TESTING = True
    DEBUG = True
    ARANGO_DB = os.getenv('ARANGO_BASE_DB_NAME') + '_tests'


class ProductionConfig(Config):
    """Configuration for Production"""
    pass


app_config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
}


# https://github.com/rochacbruno/flasgger
swagger_config = {
    "headers": [
    ],
    "specs": [
        {
            "endpoint": 'swagger',
            "route": '/swagger.json',
        }
    ],
    "swagger_ui": False,
    "specs_route": "/swagger/"
}

swagger_template = {
    "swagger": "3.0",
    "info": {
        "title": "SuttaCentral's API",
        "description": "API for SuttaCentral",
        "contact": {
            "responsibleDeveloper": "Jakub Semik",
            "email": "jakub.semik@stxnext.pl",
        },
        "version": "0.0.1"
    },
    "basePath": "/api",  # base bash for blueprint registration
    "schemes": [
        "http",
        "https"
    ],
    "operationId": "GetData"
}
