from typing import List

import pytest
from arango import ArangoClient
from flask import Flask

from common.utils import app_context, empty_arango
from data_loader import arangoload


def test_print_once(capsys):
    was = set()
    msgs = ['test', 'test2', 'test2', 'test3']
    expected = set(msgs)
    for msg in msgs:
        arangoload.print_once(msg, was)
    out, err = capsys.readouterr()
    assert set(out.split()) == expected
