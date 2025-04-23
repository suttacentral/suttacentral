from data_loader.textdata import TextInfoModel


class InMemoryTextInfoModel(TextInfoModel):
    """
    TextInfoModel uses the template method design pattern giving us a
    handy way to interact with the TextInfoModel class without accessing
    the database.
    """
    def __init__(self):
        super().__init__()

    def get_author_by_name(self, name, file):
        pass

    def add_document(self, doc):
        pass

    def update_code_points(self, lang_uid, unicode_points, force):
        pass


class TestTextInfoModel:
    def test_can_create_in_memory_subclass(self):
        model = InMemoryTextInfoModel()