import json
from pathlib import Path


def load_sizes(containing_dir: Path, db):
    print('LOADING PWA_SIZES')
    with (containing_dir / 'pwa_sizes.json').open() as f:
        data = json.load(f)

    db.collection('pwa_sizes').import_bulk(data, overwrite=True)
    print('DONE')


