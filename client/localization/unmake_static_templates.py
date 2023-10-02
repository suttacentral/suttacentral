#!/usr/bin/env python3

from os import stat
import re
import json
import logging
from common import static_elements_dir, localization_data_dir, templates_dir, get_locale_data_file



generic_template_regex = re.compile(r'(\$\{t`)([^`]+?)(`\})')

for file in sorted(templates_dir.glob('*.js')):
    with file.open(encoding='utf8') as f:
        string = f.read()

    locale_name, locale_data_file = get_locale_data_file(file)
    if locale_name == 'interface':
        logging.warning(f'Not to be used with interface! {file.name}')
        continue


    locale_data = {}
    counter = 0
    def tag_sub_fn(m):
        global counter
        counter += 1
        pos = m.start(0)

        segment_id = f'{locale_name}:{counter}'
        segment_string = re.sub(r'\s+', ' ', m[2])
        locale_data[segment_id] = segment_string

        lookbehind = string[pos-20:pos]

        if re.search(r'>\s*$', lookbehind):
            return f"${{unsafeHTML(this.localize('{segment_id}'))}}"
        print(lookbehind)
        return f"${{this.localize('{segment_id}')}}"

    new_string = generic_template_regex.sub(tag_sub_fn, string)

    with locale_data_file.open('r', encoding='utf8') as f:
        old_locale_data = json.load(f)

    for k,v in old_locale_data.items():
        if not k.split(':')[1].isdigit():
            locale_data[k] = v

    with locale_data_file.open('w', encoding='utf8') as f:
        json.dump(locale_data, f, ensure_ascii=False, indent=2)

    with (static_elements_dir / file.name).open('w', encoding='utf8') as f:
        f.write(new_string)

