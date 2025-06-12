from data_loader import sc_html
from data_loader.unsegmented_texts import extract_details, find_title_tag


class TestExtractDetails:
    def test_extracts_authors_long_name_from_content_attribute(self):
        html = "<html><meta name='author' content='Bhikkhu Bodhi'></html>"
        details = extract_details(html)
        assert details.authors_long_name == 'Bhikkhu Bodhi'

    def test_extracts_authors_long_name_from_author_attribute(self):
        html = "<html><meta author='Bhikkhu Bodhi'></html>"
        details = extract_details(html)
        assert details.authors_long_name == 'Bhikkhu Bodhi'

    def test_authors_long_name_is_none_when_missing(self):
        html = "<html></html>"
        details = extract_details(html)
        assert details.authors_long_name is None

    def test_extracts_title(self):
        html = "<html><body><header><h1>1. The Root of All Things</h1></header></body></html>"
        details = extract_details(html)
        assert details.title == 'The Root of All Things'

    def test_extracts_chinese_title(self):
        html = ("<html><body><header><h1 class='mirror-row'>"
                "<span class='mirror-left latin'>43. No Need for Thought</span>"
                "<span class='mirror-right'>（四三）不思經</span>"
                "</h1></header></body></html>")

        details = extract_details(html, is_chinese_root=True)

        assert details.title == '（四三）不思經 (43. No Need for Thought)'

    def test_chinese_title_only_has_right_hand_side(self):
        html = ("<html><body><header><h1 class='mirror-row'>"
                "<span class='mirror-right'>（四三）不思經</span></h1>"
                "</header></body></html>")

        details = extract_details(html, is_chinese_root=True)

        assert details.title == '（四三）不思經'

    def test_chinese_title_only_has_left_hand_side(self):
        html = ("<html><body><header><h1 class='mirror-row'>"
                "<span class='mirror-left latin'>43. No Need for Thought</span>"
                "</h1></header></body></html>")

        details = extract_details(html, is_chinese_root=True)

        assert details.title == 'No Need for Thought'

    def test_title_is_empty_due_to_regex(self):
        html = "<html><body><header><h1>11.358–405</h1></header></body></html>"
        details = extract_details(html)
        assert details.title == ''

    def test_has_title_tags_true_when_present(self):
        html = '<html><header><h1>1. The Root of All Things</h1></header></html>'
        details = extract_details(html)
        assert details.has_title_tags is True

    def test_has_title_tags_false_if_h1_tag_missing(self):
        html = "<html><body><header></header><body></html>"
        details = extract_details(html)
        assert details.has_title_tags is False

    def test_has_title_tags_false_if_header_tag_missing(self):
        html = "<html><body><body></html>"
        details = extract_details(html)
        assert details.has_title_tags is False

    def test_extracts_publication_date(self):
        html = "<html><body><span class='publication-date'>1962</span></body></html>"
        details = extract_details(html)
        assert details.publication_date == '1962'

    def test_publication_date_is_none_when_missing(self):
        html = '<html/>'
        details = extract_details(html)
        assert details.publication_date is None

    def test_extracts_volpage_from_chinese_root(self):
        html = ("<html><head><meta name='author' content='Taishō Tripiṭaka'></head><body><header>"
                "<a class='ref t' id='t0485b21' href='#t0485b21'>T 0485b21</a>"
                "</h1></header></body></html>")

        details = extract_details(html, is_chinese_root=True)
        assert details.volume_page == 'T 0485b21'

    def test_volpage_is_none_when_not_chinese_root(self):
        html = "<html><head><meta author='Bhikkhu Bodhi'></head></html>"
        details = extract_details(html)
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