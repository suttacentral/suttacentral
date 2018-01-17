import pytest
import itertools

from common import arangodb
from common.utils import app_context
from common.uid_matcher import UidMatcher



decompose_test_data = [
    (uid, {'uid': uid, 'prefix': prefix, 'num_start': num_start, 'num_end': num_end})
    for uid, prefix, num_start, num_end
    in [('sn', 'sn', None, None),
        ('sn1', 'sn', 1, 1),
        ('sn1.1', 'sn1', 1, 1),
        ('an1.1-10', 'an1', 1, 10),
        ('an1.1-an1.10', 'an1', 1, 10),
        ('mil3.7.12', 'mil3.7', 12, 12),
        ('mil3.7.12-mil3.7.13', 'mil3.7', 12, 13),
        ('sa-2', 'sa-2', None, None),
        ('sa-2.100', 'sa-2', 100, 100),
        ('sa-2.100-102', 'sa-2', 100, 102),
        ('pi-tv-bu-vb', 'pi-tv-bu-vb', None, None),
        ('pi-tv-bu-vb-pj4', 'pi-tv-bu-vb-pj', 4, 4),
        ('pi-tv-bu-vb-sk1-10', 'pi-tv-bu-vb-sk', 1, 10),
        ('pi-tv-bu-vb-sk1-pi-tv-bu-vb-sk10', 'pi-tv-bu-vb-sk', 1, 10),
        # The below are malformed, just check nothing crazy happens
        ('1df4', '1df4', None, None),
        ('42', '42', None, None),
    ]
]

uids = list(itertools.chain(
            (f'dn', 'an', 'sa', 'sa-2'),
            (f'dn{i}' for i in range(1, 35)),
            (f'an{i}' for i in range(1,12)),
            (f'an1.{i*10+1}-{i*10+10}' for i in range(0,10)),
            (f'sa{i}' for i in range(1,100)),
            (f'sa-2.{i}' for i in range(1,100))
        ))

match_test_data = [
    ('dn', ['dn']),
    ('dn4', ['dn4']),
    ('dn4-5', ['dn4', 'dn5']),
    ('an1.1-10', ['an1.1-10']),
    ('an1.5', ['an1.1-10']),
    ('an1.1-5', ['an1.1-10']),
    ('an1.1-20', ['an1.1-10', 'an1.11-20']),
    ('an1.5-15', ['an1.1-10', 'an1.11-20']),
    
    ('sa', ['sa']),
    ('sa2', ['sa2']),
    ('sa-2', ['sa-2']),
    ('sa-2.1', ['sa-2.1']),
    ('sa-2.1-5', ['sa-2.1', 'sa-2.2', 'sa-2.3', 'sa-2.4', 'sa-2.5']),
    ('sa-2.4-sa-2.5', ['sa-2.4', 'sa-2.5']),
    
    ('dn1.1', ['dn1']),
    ('sa-2.10.2', ['sa-2.10']),
    
    ('not-a-uid', []),
]

class TestUidMatcher:
    @pytest.fixture
    @app_context
    def uid_matcher(self, app):
        db = arangodb.get_db()
        return UidMatcher(db=db)
    
    @pytest.mark.parametrize("uid,expected",  decompose_test_data)
    def test_decompose(self, uid_matcher, uid, expected):
        assert uid_matcher.decompose(uid) == expected
    
    def test_populate(self, uid_matcher):
        uid_matcher.populate(uids)
        # smoke test
    
    @pytest.mark.parametrize("uid,expected", match_test_data)
    def test_get_matching_uids(self, uid_matcher, uid, expected):
        assert uid_matcher.get_matching_uids(uid) == expected
