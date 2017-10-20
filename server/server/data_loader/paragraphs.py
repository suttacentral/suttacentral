import json
from pathlib import Path


def load_paragraphs(db, additional_info_dir: Path):
    print('Loading paragraphs')

    paragraphs_collection = db['paragraphs']
    with open(f'{additional_info_dir}/paragraphs.json') as f:
        data = json.load(f)
    paragraphs_collection.import_bulk(data)
