from common.arangodb import get_db
from migrations.base import Migration

class SecondMigration(Migration):
    migration_id = 'add_instant_search_041'
    tasks = ['create_collections', 'create_analyzers', 'create_view']

    def create_collections(self):
        db = get_db()

        db.create_collection('text_contents', False)

    def create_analyzers(self):
        db = get_db()

        db.create_analyzer(
            "normalize",
            "norm",
            {
                "locale": "en.utf-8",
                "case": "lower",
                "accent": False,
                "stemming": False,
            },
            ["frequency", "norm", "position"],
        )

        db.create_analyzer(
            "common_text",
            "text",
            {
                "locale": "en.utf8-",
                "case": "lower",
                "accent": False,
                "stemming": False,
                "stopwords": []
            },
            ["frequency", "norm", "position"]
        )

        db.create_analyzer(
            "common_ngram",
            "ngram",
            {
                "min": 4,
                "max": 4,
                "preserveOriginal": True,
                "streamType": "utf8"
            },
            ["frequency", "norm", "position"],
        )

        db.create_analyzer(
            "cjk_ngram",
            "ngram",
            {
                "min": 1,
                "max": 5,
                "preserveOriginal": True,
                "streamType": "utf8"
            },
            ["frequency", "norm", "position"],
        )

        db.create_analyzer("splitter", "delimiter", {"delimiter": "-"})

    def create_view(self):
        common_fields = {
            "fields": {
                "uid": {
                    "analyzers": ["identity"]
                },
                "lang": {
                    "analyzers": ["identity"]
                },
                "name": {
                    "analyzers": ["normalize", "common_ngram", "common_text"]
                },
                "content": {
                    "analyzers": ["normalize", "common_ngram", "common_text"]
                }

            }
        }
        text_content_fields = {
            "fields": {
                "uid": {
                    "analyzers": ["identity"]
                },
                "lang": {
                    "analyzers": ["identity"]
                },
                "content": {
                    "analyzers": ["normalize", "common_ngram", "common_text"]
                },
            }
        }
        view = {
            "links": {
                "names": common_fields,
                "super_nav_details": common_fields,
                "text_contents": common_fields
            }
        }

        get_db().create_arangosearch_view("instant_search", view)
