import pytest

from app import app_factory


@pytest.fixture
def app():
    app = app_factory()
    return app
