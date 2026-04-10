from api.views.views import RangeSuttaplexList, Sutta
from common.queries import SUTTA_VIEW, SUTTAPLEX_LIST, VAGGA_CHILDREN
from sc_flask.app import app


class FakeCursor:
    def __init__(self, items):
        self.items = list(items)
        self.index = 0

    def __iter__(self):
        return iter(self.items)

    def next(self):
        item = self.items[self.index]
        self.index += 1
        return item


class FakeAQL:
    def __init__(self, handlers):
        self.handlers = handlers
        self.calls = []

    def execute(self, query, bind_vars=None, **kwargs):
        self.calls.append(
            {'query': query, 'bind_vars': bind_vars, 'kwargs': kwargs}
        )
        return self.handlers[query](bind_vars or {})


class FakeDb:
    def __init__(self, handlers):
        self.aql = FakeAQL(handlers)


def test_range_suttaplex_list_resolves_pdhp_uid(monkeypatch):
    fake_db = FakeDb(
        {
            VAGGA_CHILDREN: lambda bind_vars: FakeCursor(
                ['pdhp1-13', 'pdhp14-33']
            ),
            SUTTAPLEX_LIST: lambda bind_vars: FakeCursor(
                [
                    {
                        'from': 'root',
                        'difficulty': 1,
                        'uid': bind_vars['uid'],
                        'translations': [
                            {'lang': 'en', 'segmented': False},
                            {'lang': 'pli', 'segmented': True},
                        ],
                        'root_lang': 'pli',
                    }
                ]
            ),
        }
    )

    monkeypatch.setattr('api.views.views.get_db', lambda: fake_db)

    with app.test_request_context('/range_suttaplex/pdhp1?language=en'):
        data, status = RangeSuttaplexList().get('pdhp1')

    assert status == 200
    assert data[0]['uid'] == 'pdhp1-13'
    assert data[0]['title'] == 'Patna Dhammapada 1'
    assert fake_db.aql.calls[0]['bind_vars'] == {'uid': 'pdhp'}
    assert fake_db.aql.calls[1]['bind_vars'] == {
        'language': 'en',
        'uid': 'pdhp1-13',
    }


def test_sutta_view_falls_back_to_pdhp_range(monkeypatch):
    fake_db = FakeDb(
        {
            SUTTA_VIEW: lambda bind_vars: FakeCursor(
                [
                    {
                        'root_text': None,
                        'translation': None,
                        'previous': None,
                        'next': None,
                    }
                ]
            ),
            VAGGA_CHILDREN: lambda bind_vars: FakeCursor(
                ['pdhp1-13', 'pdhp14-33']
            ),
        }
    )

    monkeypatch.setattr('api.views.views.get_db', lambda: fake_db)
    monkeypatch.setattr(
        Sutta,
        'convert_paths_to_content',
        staticmethod(lambda doc: None),
    )
    monkeypatch.setattr(
        Sutta,
        'get_candidate_authors',
        lambda self, uid, author_uid, site_lang, result: None,
    )

    with app.test_request_context('/sutta/pdhp1?lang=en&siteLanguage=en'):
        data, status = Sutta().get('pdhp1')

    assert status == 200
    assert data['range_uid'] == 'pdhp1-13'
    assert data['vaggaBegin'] == 'pdhp1-13'
    assert data['vaggaEnd'] == 'pdhp14-33'
    assert fake_db.aql.calls[1]['bind_vars'] == {'uid': 'pdhp'}
    assert fake_db.aql.calls[2]['bind_vars']['uid'] == 'pdhp1-13'
