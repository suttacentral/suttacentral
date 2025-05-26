import logging
from pathlib import Path

import pytest

from data_loader.unsegmented_texts import UnsegmentedText


class TestUnsegmentedText:
    @pytest.mark.parametrize(
    "html,author_long_name",
        [
            ("<html><meta name='author' content='Bhikkhu Bodhi'></html>", 'Bhikkhu Bodhi'),
            ("<html><meta author='Bhikkhu Bodhi'></html>", 'Bhikkhu Bodhi'),
            ("<html></html>", None),
        ]
    )
    def test_extracts_author_long_name_from_html(self, html, author_long_name):
        text = UnsegmentedText(file=Path('/'), html=html, lang_uid="en")
        assert text.authors_long_name() == author_long_name

    def test_logs_author_not_found(self, caplog):
        html = "<html></html>"
        text = UnsegmentedText(file=Path('missing.html'), html=html, lang_uid="en")
        _ = text.authors_long_name()
        assert caplog.records[0].levelno == logging.CRITICAL
        assert caplog.records[0].message == "Author not found: missing.html"
