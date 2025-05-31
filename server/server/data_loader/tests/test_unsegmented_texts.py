import logging
from pathlib import Path

import pytest

from data_loader.unsegmented_texts import UnsegmentedText


class TestUnsegmentedText:
    def test_extracts_authors_long_name_from_content_attribute(self):
        html = "<html><meta name='author' content='Bhikkhu Bodhi'></html>"
        text = UnsegmentedText(file=Path('mn1.html'), html=html, lang_uid='en')
        assert text.authors_long_name() == 'Bhikkhu Bodhi'

    def test_extracts_authors_long_name_from_author_attribute(self):
        html = "<html><meta author='Bhikkhu Bodhi'></html>"
        text = UnsegmentedText(file=Path('mn1.html'), html=html, lang_uid='en')
        assert text.authors_long_name() == 'Bhikkhu Bodhi'

    def test_authors_long_name_is_none_when_missing(self):
        html = "<html></html>"
        text = UnsegmentedText(file=Path('mn1.html'), html=html, lang_uid='en')
        assert text.authors_long_name() is None

    def test_logs_missing_authors_long_name(self, caplog):
        html = "<html></html>"
        text = UnsegmentedText(file=Path('missing.html'), html=html, lang_uid="en")
        _ = text.authors_long_name()
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == "Author not found: missing.html"
