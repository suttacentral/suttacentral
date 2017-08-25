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
