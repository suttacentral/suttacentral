from data_loader import sc_html
from data_loader.unsegmented_texts import extract_details, find_title_tag


class TestExtractDetails:
    def test_extracts_authors_long_name_from_content_attribute(self):
        html = "<html><meta name='author' content='Bhikkhu Bodhi'></html>"
        details = extract_details(html, language='en')
        assert details.authors_long_name == 'Bhikkhu Bodhi'

    def test_extracts_authors_long_name_from_author_attribute(self):
        html = "<html><meta author='Bhikkhu Bodhi'></html>"
        details = extract_details(html, language='en')
        assert details.authors_long_name == 'Bhikkhu Bodhi'

    def test_authors_long_name_is_none_when_missing(self):
        html = "<html></html>"
        details = extract_details(html, language='en')
        assert details.authors_long_name is None

    def test_extracts_title(self):
        html = "<html><body><header><h1>Don't Think</h1></header></body></html>"
        details = extract_details(html, language='en')
        assert details.title == "Don't Think"

    def test_title_is_empty_due_to_regex(self):
        html = "<html><body><header><h1>11.358–405</h1></header></body></html>"
        details = extract_details(html, language='en')
        assert details.title == ''

    def test_has_title_tags_true_when_present(self):
        html = '<html><header><h1>1. The Root of All Things</h1></header></html>'
        details = extract_details(html, language='en')
        assert details.has_title_tags is True

    def test_has_title_tags_false_if_h1_tag_missing(self):
        html = "<html><body><header></header><body></html>"
        details = extract_details(html, language='en')
        assert details.has_title_tags is False

    def test_has_title_tags_false_if_header_tag_missing(self):
        html = "<html><body><body></html>"
        details = extract_details(html, language='en')
        assert details.has_title_tags is False

    def test_extracts_publication_date(self):
        html = ("<html>"
                "<head><meta author='Bhikkhu Bodhi'></head>"
                "<body><span class='publication-date'>1962</span></body>"
                "</html>")

        details = extract_details(html, language='en')
        assert details.publication_date == '1962'

    def test_extracts_volpage_from_chinese_root(self):
        html = ("<html><head><meta name='author' content='Taishō Tripiṭaka'></head><body><header>"
                "<a class='ref t' id='t0485b21' href='#t0485b21'>T 0485b21</a>"
                "</h1></header></body></html>")

        details = extract_details(html, language='lzh')
        assert details.volume_page == 'T 0485b21'

    def test_volpage_is_none_when_not_chinese_root(self):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        details = extract_details(html, language='en')
        assert details.volume_page is None


class TestFindTitleTag:
    def test_find_title_tag(self):
        html = '<html><header><h1>1. The Root of All Things</h1></header></html>'
        root = sc_html.fromstring(html)
        tag = find_title_tag(root)
        assert tag.text == '1. The Root of All Things'

    def test_return_none_when_there_is_no_header_tag(self):
        html = '<html/>'
        root = sc_html.fromstring(html)
        tag = find_title_tag(root)
        assert tag is None

    def test_return_none_when_there_is_no_h1_tag(self):
        html = '<html><body><header></header></body></html>'
        root = sc_html.fromstring(html)
        tag = find_title_tag(root)
        assert tag is None