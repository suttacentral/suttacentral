from data_loader import arangoload


class FakeCollection:
    def __init__(self):
        self.documents = []

    def truncate(self):
        self.documents = []

    def insert(self, document):
        self.documents.append(document)


class FakeAQL:
    def execute(self, query):
        return ['pdhp1-13', 'dhp4-5']


class FakeDb:
    def __init__(self):
        self.aql = FakeAQL()
        self.collections = {'expanded_sutta_uids': FakeCollection()}

    def __getitem__(self, name):
        return self.collections[name]


def test_generate_sutta_uid_list_from_range_sutta_uid_includes_pdhp(
    monkeypatch,
):
    fake_db = FakeDb()

    monkeypatch.setattr(arangoload.arangodb, 'get_db', lambda: fake_db)

    arangoload.generate_sutta_uid_list_from_range_sutta_uid()

    assert {
        'range_uid': 'pdhp1-13',
        'expanded_uids': [f'pdhp{i}' for i in range(1, 14)],
    } in fake_db['expanded_sutta_uids'].documents
