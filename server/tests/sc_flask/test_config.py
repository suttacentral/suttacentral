import os
from pathlib import Path

import flask
import pytest

from sc_flask.config import app_config


class TestDevelopmentConfig:
    @pytest.mark.parametrize(
        'setting,value', [
            ('DEBUG', True),
            ('TESTING', False),
            ('CSRF_ENABLED', True),
            ('ENVIRONMENT', 'development'),
            ('ARANGO_BASE_DB', 'base_db_name'),
            ('ARANGO_DB', 'db_name'),
            ('ARANGO_CLIENT', {'host': 'example.net', 'password': 'passzzz', 'port': 1234, 'username': 'userxxx'}),
            ('BASE_DIR', Path('/opt/sc/sc-flask/')),
            ('STORAGE_DIR', Path('/opt/sc/storage/')),
            ('ASSETS_DIR', Path('/opt/sc/frontend/')),
            ('DATA_REP_DIR', Path('/opt/sc/sc-flask/sc-data')),
            ('DATA_REPO', 'https://github.com/suttacentral/sc-data.git'),
            ('DEFAULT_LANGUAGE', 'en'),
            ('SERVER_ADDRESS', 'http://example.net'),
            ('SECRET', 'abc123')
        ]
    )
    def test_settings(self, monkeypatch, setting, value):
        with monkeypatch.context() as m:
            m.setenv('SECRET', 'abc123')
            m.setenv('ENVIRONMENT', 'development')
            m.setenv('ARANGO_BASE_DB_NAME', 'base_db_name')
            m.setenv('ARANGO_DB_NAME', 'db_name')
            m.setenv('ARANGO_HOST', 'example.net')
            m.setenv('ARANGO_PORT', '1234')
            m.setenv('ARANGO_USER', 'userxxx')
            m.setenv('ARANGO_ROOT_PASSWORD', 'passzzz')
            m.setenv('SERVER_ADDRESS', 'http://example.net')

            config = flask.Config(root_path='')
            config.from_object(app_config())

            assert os.getenv('ARANGO_USER') == 'userxxx'
            assert os.getenv('SECRET') == 'abc123'
            assert config[setting] == value


class TestTestingConfig:
    @pytest.mark.parametrize(
        'setting,value', [
            ('DEBUG', True),
            ('TESTING', True),
            ('CSRF_ENABLED', True),
            ('ENVIRONMENT', 'testing'),
            ('ARANGO_BASE_DB', 'base_db_name'),
            ('ARANGO_DB', 'base_db_name_tests'),
            ('ARANGO_CLIENT', {'host': 'example.net', 'password': 'passzzz', 'port': 1234, 'username': 'userxxx'}),
            ('BASE_DIR', Path('/opt/sc/sc-flask/')),
            ('STORAGE_DIR', Path('/opt/sc/storage/')),
            ('ASSETS_DIR', Path('/opt/sc/frontend/')),
            ('DATA_REP_DIR', Path('/opt/sc/sc-flask/sc-data')),
            ('DATA_REPO', 'https://github.com/suttacentral/sc-data.git'),
            ('DEFAULT_LANGUAGE', 'en'),
            ('SERVER_ADDRESS', 'http://example.net'),
            ('SECRET', 'abc123')
        ]
    )
    def test_settings(self, monkeypatch, setting, value):
        with monkeypatch.context() as m:
            m.setenv('SECRET', 'abc123')
            m.setenv('ENVIRONMENT', 'testing')
            m.setenv('ARANGO_BASE_DB_NAME', 'base_db_name')
            m.setenv('ARANGO_DB_NAME', 'db_name')
            m.setenv('ARANGO_HOST', 'example.net')
            m.setenv('ARANGO_PORT', '1234')
            m.setenv('ARANGO_USER', 'userxxx')
            m.setenv('ARANGO_ROOT_PASSWORD', 'passzzz')
            m.setenv('SERVER_ADDRESS', 'http://example.net')

            config = flask.Config(root_path='')
            config.from_object(app_config())

            assert os.getenv('ARANGO_USER') == 'userxxx'
            assert os.getenv('SECRET') == 'abc123'
            assert config[setting] == value


class TestProductionConfig:
    @pytest.mark.parametrize(
        'setting,value', [
            ('DEBUG', False),
            ('TESTING', False),
            ('CSRF_ENABLED', True),
            ('ENVIRONMENT', 'production'),
            ('ARANGO_BASE_DB', 'base_db_name'),
            ('ARANGO_DB', 'db_name'),
            ('ARANGO_CLIENT', {'host': 'example.net', 'password': 'passzzz', 'port': 1234, 'username': 'userxxx'}),
            ('BASE_DIR', Path('/opt/sc/sc-flask/')),
            ('STORAGE_DIR', Path('/opt/sc/storage/')),
            ('ASSETS_DIR', Path('/opt/sc/frontend/')),
            ('DATA_REP_DIR', Path('/opt/sc/sc-flask/sc-data')),
            ('DATA_REPO', 'https://github.com/suttacentral/sc-data.git'),
            ('DEFAULT_LANGUAGE', 'en'),
            ('SERVER_ADDRESS', 'http://example.net'),
            ('SECRET', 'abc123')
        ]
    )
    def test_settings(self, monkeypatch, setting, value):
        with monkeypatch.context() as m:
            m.setenv('SECRET', 'abc123')
            m.setenv('ENVIRONMENT', 'production')
            m.setenv('ARANGO_BASE_DB_NAME', 'base_db_name')
            m.setenv('ARANGO_DB_NAME', 'db_name')
            m.setenv('ARANGO_HOST', 'example.net')
            m.setenv('ARANGO_PORT', '1234')
            m.setenv('ARANGO_USER', 'userxxx')
            m.setenv('ARANGO_ROOT_PASSWORD', 'passzzz')
            m.setenv('SERVER_ADDRESS', 'http://example.net')

            config = flask.Config(root_path='')
            config.from_object(app_config())

            assert os.getenv('ARANGO_USER') == 'userxxx'
            assert os.getenv('SECRET') == 'abc123'
            assert config[setting] == value
