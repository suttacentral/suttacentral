import json
from pathlib import Path


def load_biblios(db, additional_info_dir: Path):
    print('Loading biblio data')

    biblio_collection = db['biblios']
    with open(f'{additional_info_dir}/biblio_volpage.json') as f:
        data = json.load(f)

    biblio_collection.import_bulk(data)
