from pathlib import Path

from .util import json_load

from collections import Counter

import logging
def update_languages(db, localized_elements_dir):
    num_strings_by_lang = Counter()
    for element_dir in localized_elements_dir.glob('*'):
        if not element_dir.is_dir():
            continue
        
        en_file = element_dir / 'en.json'
        if not en_file.exists():
            logging.warning(f'{element_dir} does not contain en.json')
            continue
        
        en_keys = set(json_load(en_file)['en'].keys())
        num_strings_by_lang['en'] += len(en_keys)
        for file in element_dir.glob('*.json'):
            if file.stem == 'en':
                continue
            
            lang_keys = set(json_load(file)[file.stem].keys())
            num_strings_by_lang[file.stem] += len(lang_keys.intersection(en_keys))
    
    updates = []
    num_en = num_strings_by_lang['en']

    for iso_code, count in num_strings_by_lang.items():
        
        updates.append({
            '_key': iso_code,
            'localized': True,
            'localized_percent': int(100 * count / num_en)            
        })
    
    db['language'].import_bulk(updates, on_duplicate='update')