from config import TestingConfig

def test_normal_testing_database_name():
    config = TestingConfig()
    assert config.ARANGO_DB == "suttacentral_tests"

def test_data_load_testing_database_name():
    config = TestingConfig()
    assert config.ARANGO_DB_DATA_LOAD_TEST == "suttacentral_data_load_tests"
