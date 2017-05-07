from pathlib import Path

base_dir = Path('.').resolve()
tmp_dir = base_dir / 'tmp'
data_dir = base_dir / 'data'
raw_dir = base_dir / 'raw'
po_dir = tmp_dir / 'po'


po_mappings = [
    {
        'po_path': 'dn/en',
        'msgstr_to': 'en/sujato/dn',
        'msgid_to': 'pi/dn',
        'markup_to': 'markup/dn'
    },
    {
        'po_path': 'mn/en',
        'msgstr_to': 'en/sujato/mn',
        'msgid_to': 'pi/mn',
        'markup_to': 'markup/mn'
    },
    {
        'po_path': 'sn/en',
        'msgstr_to': 'en/sujato/sn',
        'msgid_to': 'pi/sn',
        'markup_to': 'markup/sn'
    },
    {
        'po_path': 'an/en',
        'msgstr_to': 'en/sujato/an',
        'msgid_to': 'pi/an',
        'markup_to': 'markup/an'
    }
]
