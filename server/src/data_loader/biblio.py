from pathlib import Path

from common.collections import Collection
from .util import json_load


def load_biblios(db, additional_info_dir: Path):
    print('Loading biblio data')
    data = json_load(additional_info_dir / 'biblio.json')
    Collection('biblios').recreate(data)
