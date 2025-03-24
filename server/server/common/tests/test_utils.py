from common.utils import get_possible_parent_uid


def test_get_possible_parent_uid():
    test_uids = [
      'mn12',
      'dn22',
      'sn12.3',
      'mil3.1.1',
      'pli-tv-bu-vb-pj1',
      'an1.1-10', 'up1.041',
      'arv1',
      'avs2',
      'bv1',
      'cnd6',
      'cp3',
      'd34',
      't13',
      'da3',
      'dhp100-115',
      'divy13',
      'ea-2.7',
      'sa-3.13',
      'thi-ap5',
      'dhp123'
    ]

    expected_results = [
      'mn',
      'dn',
      'sn',
      'mil',
      'pli-tv-bu-vb-pj',
      'an',
      'up',
      'arv',
      'avs',
      'bv',
      'cnd',
      'cp',
      'd',
      't',
      'da',
      'dhp',
      'divy',
      'ea',
      'sa',
      'thi-ap',
      'dhp'
    ]

    for i, uid in enumerate(test_uids):
        assert get_possible_parent_uid(uid) == expected_results[i]
