import json
from pathlib import Path


def load_epigraphs(db, additional_info_dir: Path):
    print('Loading epigraphs')
    division_dir = additional_info_dir

    epigraphs = division_dir / 'epigraphs.json'
    epigraphs_collection = db['epigraphs']

    with epigraphs.open() as f:
        epigraphs_collection.import_bulk(json.load(f))


def load_why_we_read(db, additional_info_dir: Path):
    print('Loading whyweread')
    division_dir = additional_info_dir

    why_we_read = division_dir / 'whyweread.json'

    why_we_read_collection = db['why_we_read']

    with why_we_read.open() as f:
        why_we_read_collection.import_bulk([{'text': x} for x in json.load(f)])
