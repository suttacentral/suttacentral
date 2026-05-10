import json
from pathlib import Path

import pytest

from common.collections import database, Collection
from data_loader.paragraphs import load_paragraphs

CSSD = {
    "uid": "cscd",
    "acronym": "CSCD",
    "description": "Paragraph numbers in Chaṭṭha Saṅgāyana CD (tipitaka.org), Vipassana Research Institute, 2008"
}

ACIP_VP = {
    "uid": "acip-vp",
    "acronym": "Acip-vp",
    "description": "Asian Classics Input Project."
}

ADHIK_V = {
    "uid": "adh-v",
    "acronym": "Adhik-v",
    "description": "Paragraph numbers in Adhikaraṇavastu, Gnoli 1978."
}


@pytest.fixture
def one_record(tmp_path) -> Path:
    data = [CSSD]
    path = tmp_path / 'paragraphs.json'
    with path.open("w") as f:
        json.dump(data, f)

    return tmp_path


@pytest.fixture
def two_records(tmp_path) -> Path:
    data = [ACIP_VP, ADHIK_V]
    path = tmp_path / 'paragraphs.json'
    with path.open("w") as f:
        json.dump(data, f)

    return tmp_path


class TestLoadParagraphs:
    def test_populates_empty_collection(self, two_records):
        db = database()
        paragraphs = Collection('paragraphs')
        paragraphs.clear()
        load_paragraphs(db, two_records)
        assert sorted(["Acip-vp", "Adhik-v"]) == sorted(doc['acronym'] for doc in paragraphs.documents())

    def test_deletes_existing_records_before_populating(self, one_record, two_records):
        db = database()
        paragraphs = Collection('paragraphs')
        paragraphs.clear()
        load_paragraphs(db, one_record)
        load_paragraphs(db, two_records)
        assert sorted(["Acip-vp", "Adhik-v"]) == sorted(doc['acronym'] for doc in paragraphs.documents())
