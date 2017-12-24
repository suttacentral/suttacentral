import json
from pathlib import Path


def load_glossary(db, additional_info_dir: Path):
    print('Loading glossary')

    glossary_collection = db['glossary']
    with open(f'{additional_info_dir}/gloss.json') as f:
        data = json.load(f)
    glossary_collection.import_bulk(data)
