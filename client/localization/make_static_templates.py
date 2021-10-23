#!/usr/bin/env python3

import re
import json
import logging
from textwrap import TextWrapper
from common import static_elements_dir, localization_data_dir, templates_dir, get_locale_data_file

template_regex = re.compile(r"^(.*?)(\$\{(?:unsafeHTML\()?this.localize\('(.+?:(?:\d+))'\)\)?\})", re.MULTILINE)

wrapper = TextWrapper(break_long_words=False, break_on_hyphens=False, drop_whitespace=True, width=100) 

def main():
    for file in static_elements_dir.glob('*.js'):
        locale_name, locale_file = get_locale_data_file(file)
        if locale_name == 'interface':
            logging.warning(f'Not to be used with interface! {file.name}')
            continue

        with locale_file.open('r', encoding='utf8') as f:
            locale_data = json.load(f)
        
        with file.open('r', encoding='utf8') as f:
            string = f.read()

        def sub_fn(m):
            prefix = m[1]
            segment_id = m[3]

            if segment_id not in locale_data:
                logging.warn(f'segment_id {segment_id} not found in {locale_file.name}')
                return m[0]

            depth = len(prefix) + 4
            segment = locale_data[segment_id]
            if len(segment) <= 80 or depth > 40:
                result = f'{prefix}${{t`{segment}`}}'
            else:
                
                wrapper.initial_indent = ' ' * depth
                wrapper.subsequent_indent = ' ' * depth
                parts = wrapper.wrap(segment)
                parts[0] = parts[0][depth:]
                segment = '\n'.join(parts)
                result = f'{prefix}${{t`{segment}`}}'

            return result
        
        new_string = template_regex.sub(sub_fn, string)

        with (templates_dir / file.name).open('w', encoding='utf8') as f:
            f.write(new_string)

if __name__ == '__main__':
    main()
        


