from common.arangodb import get_db
from migrations.base import Migration


class SecondMigration(Migration):
    migration_id = 'add_instant_search_041'
    tasks = ['create_collections', 'create_analyzers', 'create_view']

    def create_collections(self):
        db = get_db()

        db.create_collection('text_contents', False)
        db.create_collection('text_references', False)
        db.create_collection('segmented_text_contents', False)

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
                "locale": "en.utf-8",
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

        db.create_analyzer(
            "text_pali",
            "text",
            {
                "locale": "pli",
                "case": "lower",
                "accent": False,
                "stemming": False,
            },
            ["frequency", "norm"],
        )

        db.create_analyzer("splitter", "delimiter", {"delimiter": "-"})

    def create_view(self):
        common_fields = {
            "fields": {
                "uid": {
                    "analyzers": ["identity"]
                },
                "root_uid": {
                    "analyzers": ["identity"]
                },
                "full_path": {
                    "analyzers": ["identity"]
                },
                "lang": {
                    "analyzers": ["identity"]
                },
                "segmented_text": {
                    "analyzers": ["identity", "normalize"]
                },
                "name": {
                    "analyzers": [
                        "normalize",
                        "common_ngram",
                        "common_text",
                        "identity"
                    ]
                },
                "acronym": {
                    "analyzers": ["identity"]
                },
                "heading": {
                    "fields": {
                        "title": {
                            "analyzers": [
                                "normalize",
                                "common_ngram",
                                "common_text",
                                "identity"
                            ]
                        }
                    }
                },
                "author": {
                    "analyzers": ["identity"]
                },
                "author_uid": {
                    "analyzers": ["identity"]
                },
                "volpage": {
                    "analyzers": [
                        "normalize",
                        "common_ngram",
                        "common_text",
                        "identity"
                    ]
                },
                "content": {
                    "analyzers": [
                        "common_text",
                        "text_zh",
                        "text_pali"
                    ]
                }
            },
        }

        volpage_fields = {
            "fields": {
                "uid": {
                    "analyzers": ["identity"]
                },
                "volpage": {
                    "analyzers": [
                        "normalize",
                        "common_ngram",
                        "common_text",
                        "identity"
                    ]
                },
                "alt_volpage": {
                    "analyzers": [
                        "normalize",
                        "common_ngram",
                        "common_text",
                        "identity"
                    ]
                },
            },
        }

        segmented_text_content_fields = {
            "fields": {
                "segmented_text": {
                    "analyzers": ["identity", "normalize"]
                },
            },
        }

        view = {
            "links": {
                "names": common_fields,
                "super_nav_details": common_fields,
                "text_contents": common_fields,
                "segmented_text_contents": common_fields
            },
            "primarySort": [
                {"field": "uid", "direction": "asc"},
                {"field": "lang", "direction": "asc"}
            ],
            "storedValues": [
                {
                    "fields": [
                        "uid",
                        "lang",
                        'acronym',
                        'volpage',
                        'author_uid'
                    ],
                    "compression": "lz4"
                }
            ],
            "conditionOptimization": "auto",
            "countApproximate": "cost"
        }

        volpage_view = {
            "links": {
                "super_nav_details": volpage_fields,
                "text_extra_info": volpage_fields,
                "text_references": volpage_fields
            },
            "primarySort": [
                {"field": "uid", "direction": "asc"},
            ],
            "storedValues": [
                {
                    "fields": [
                        "uid",
                        "volpage",
                        "alt_volpage"
                    ],
                    "compression": "lz4"
                }
            ],
            "conditionOptimization": "auto",
            "countApproximate": "cost"
        }

        segmented_text_content_view = {
            "links": {
                "segmented_text_contents": segmented_text_content_fields
            },
            "primarySort": [
                {"field": "uid", "direction": "asc"},
                {"field": "lang", "direction": "asc"}
            ],
            "storedValues": [
                {
                    "fields": [
                        "uid",
                        "lang",
                        'acronym',
                        'volpage',
                        'author_uid'
                    ],
                    "compression": "lz4"
                }
            ],
            "conditionOptimization": "auto",
            "countApproximate": "cost"
        }

        get_db().create_arangosearch_view("instant_search", view)
        get_db().create_arangosearch_view(
            "segmented_text_instant_search",
            segmented_text_content_view
        )
        get_db().create_arangosearch_view(
            "instant_volpage_search",
            volpage_view
        )
