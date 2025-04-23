from pathlib import Path

import pytest

from data_loader.textdata import TextInfoModel


class TextInfoModelSpy(TextInfoModel):
    """
    TextInfoModel uses the template method design pattern giving us a
    handy way to interact with the TextInfoModel class without accessing
    the database.
    """
    def __init__(self):
        super().__init__()
        self.added_documents = []

    def get_author_by_name(self, name, file) -> dict:
        return {
            'Veruca Salt': {
                '_key': '123456',
                '_id': 'author_edition/123456',
                '_rev': 'randomjunk',
                'type': 'edition',
                'uid': 'salt',
                'short_name': 'Salt',
                'long_name': 'Veruca Salt'
            }
        }

    def add_document(self, doc):
        self.added_documents.append(doc)

    def update_code_points(self, lang_uid, unicode_points, force):
        pass


class TestTextInfoModel:
    def test_lang_dir_empty(self, tmp_path):
        model = TextInfoModelSpy()
        model.process_lang_dir(lang_dir=tmp_path)
        assert not model.added_documents

    def test_one_lang_dir(self, tmp_path):
        en = tmp_path / "en"
        en.mkdir()
        model = TextInfoModelSpy()
        model.process_lang_dir(tmp_path)
        assert not model.added_documents

    def test_one_html_file_and_no_data_dir(self, tmp_path):
        file_location = tmp_path / "en" / "pli" / "sutta" / "mn"
        file_location.mkdir(parents=True)
        html_file = file_location / "mn1.html"
        with html_file.open("w") as f:
            html_file.write_text(
                "<html/>"
            )

        model = TextInfoModelSpy()

        # Blows up when we call relative_to(data_dir)
        with pytest.raises(TypeError):
            model.process_lang_dir(tmp_path)
