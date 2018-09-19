from pathlib import Path
from .util import json_load

def load_biblios(db, additional_info_dir: Path):
    print('Loading biblio data')

    biblio_collection = db['biblios']
    data = json_load(additional_info_dir / 'biblio.json')

    biblio_collection.import_bulk(data, overwrite=True)
