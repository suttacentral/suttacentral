from data_loader.unsegmented_texts import UnsegmentedText


class TestUnsegmentedText:
    def test_extracts_authors_long_name_from_content_attribute(self):
        html = "<html><meta name='author' content='Bhikkhu Bodhi'></html>"
        text = UnsegmentedText(html=html, lang_uid='en')
        assert text.authors_long_name() == 'Bhikkhu Bodhi'

    def test_extracts_authors_long_name_from_author_attribute(self):
        html = "<html><meta author='Bhikkhu Bodhi'></html>"
        text = UnsegmentedText(html=html, lang_uid='en')
        assert text.authors_long_name() == 'Bhikkhu Bodhi'

    def test_authors_long_name_is_none_when_missing(self):
        html = "<html></html>"
        text = UnsegmentedText(html=html, lang_uid='en')
        assert text.authors_long_name() is None
