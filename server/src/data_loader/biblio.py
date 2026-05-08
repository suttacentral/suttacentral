from pathlib import Path

from common.collections import Collection
from data_loader.util import json_load


def load_biblios(additional_info_dir: Path):
    data = json_load(additional_info_dir / 'biblio.json')
    Collection('biblios').recreate(data)
