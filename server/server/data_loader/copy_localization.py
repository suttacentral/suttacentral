import json
import shutil
from pathlib import Path
from collections import defaultdict

def copy_localization(sc_bilara_data_dir: Path, localized_elements_dir: Path) -> None:
    build_dir = localized_elements_dir / 'build'
    if build_dir.exists():
        shutil.rmtree(build_dir)
    build_dir.mkdir()

    mapping = defaultdict(dict)
    for file in sc_bilara_data_dir.glob('*/*/site/*.json'):
        domain, lang, _, name = file.relative_to(sc_bilara_data_dir).parts[:4]
        if domain not in {'translation', 'root'}:
            continue
        stem = file.name.split("_")[0]
        mapping[stem][lang] = file
    for stem, lang_mapping in mapping.items():
        for lang, file in lang_mapping.items():
            if lang != 'en' and stem != 'interface':
                with lang_mapping['en'].open() as f:
                    en_count = len(json.load(f))
                
                with file.open() as f:
                    lang_count = len(json.load(f))
                
                completion = lang_count / en_count
                if completion < 0.90:
                    print(f'Skipping {file.name} because completion is only {completion}')
                    continue
            
            new_file = build_dir / f'{stem}_{lang}.json'
            shutil.copy(file, new_file)
