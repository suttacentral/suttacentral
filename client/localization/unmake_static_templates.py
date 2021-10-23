#!/usr/bin/env python3

from os import stat
import re
import json
import logging
from common import static_elements_dir, localization_data_dir, templates_dir, get_locale_data_file



template_regex = re.compile(r'(\$\{t`)([^`]+?)(`\})')

for file in sorted(templates_dir.glob('*.js')):
    with file.open(encoding='utf8') as f:
        string = f.read()
    
    locale_name, locale_data_file = get_locale_data_file(file)
    if locale_name == 'interface':
        logging.warning(f'Not to be used with interface! {file.name}')
        continue


    locale_data = {}
    
    def sub_fn(m):
        segment = re.sub(r'\s+', ' ', m[2])
        segment_id = f'{locale_name}:{len(locale_data) + 1}'
        locale_data[segment_id] = segment

        fun = ''
        # Is this a segment with inline tags?
        if re.search(r'\*.+\*|\_.+\_|\<.+\>', segment):
            fun = f"unsafeHTML(this.localize('{segment_id}'))"
        else:
            fun = f"this.localize('{segment_id}')"

        return f"${{{fun}}}"
    
    new_string = template_regex.sub(sub_fn, string)

    with locale_data_file.open('r', encoding='utf8') as f:
        old_locale_data = json.load(f)
    
    for k,v in old_locale_data.items():
        if not k.split(':')[1].isdigit():
            locale_data[k] = v

    with locale_data_file.open('w', encoding='utf8') as f:
        json.dump(locale_data, f, ensure_ascii=False, indent=2)
    
    with (static_elements_dir / file.name).open('w', encoding='utf8') as f:
        f.write(new_string)
