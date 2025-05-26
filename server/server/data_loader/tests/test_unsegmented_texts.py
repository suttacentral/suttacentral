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