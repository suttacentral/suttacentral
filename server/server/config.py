import os


class Config:
    """Parent configuration class"""
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET = os.getenv('SECRET')

    # ARANGO
    ARANGO_DB = os.getenv('ARANGO_DB_NAME')
    ARANGO_CLIENT = {
        'host': os.getenv('ARANGO_HOST'),
        'port': int(os.getenv('ARANGO_PORT')),
        'username': os.getenv('ARANGO_USER', None),
        'password': os.getenv('ARANGO_ROOT_PASSWORD', None)

    }


class DevelopmentConfig(Config):
    """Configuration for Development"""
    DEBUG = True


class TestingConfig(Config):
    """Configuration for Testing"""
    TESTING = True
    DEBUG = True


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
