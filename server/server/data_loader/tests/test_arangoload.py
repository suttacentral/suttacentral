from config import TestingConfig

def test_normal_testing_database_name():
    config = TestingConfig()
    assert config.ARANGO_DB == "suttacentral_tests"
