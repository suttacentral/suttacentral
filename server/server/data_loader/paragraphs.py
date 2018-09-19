from pathlib import Path
from .util import json_load

def load_paragraphs(db, additional_info_dir: Path):
    print('Loading paragraphs')

    paragraphs_collection = db['paragraphs']
    data = json_load(additional_info_dir / 'paragraphs.json')
    paragraphs_collection.import_bulk(data, overwrite=True)
