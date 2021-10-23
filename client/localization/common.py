import re
import logging
from pathlib import Path

static_elements_dir = Path('../elements/static/')
localization_data_dir = Path('./elements')
templates_dir = Path('./templates')


def get_locale_data_file(element_file: Path) -> Path:
    with element_file.open(encoding='utf8') as f:
        string = f.read()
    m = re.search(r"this\.localizedStringsPath = '/localization/elements/(.*?)'", string)
    if not m:
        raise ValueError(f'Could not find localizedStringPath in {element_file}')
    
    name = m[1]
    filename = f'{name}_en.json'
    return name, localization_data_dir / filename
    
