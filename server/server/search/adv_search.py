import logging

from search import es

logger = logging.getLogger('search.adv_search')


def sutta_search(**kwargs):
    mode = kwargs.get("mode") or "wildcard"
    fields = {
        "name": {"mode": mode},
        "volpage": {"mode": mode, "fields": ["volpage", "volpage_extra"]},
        "acronym": {"mode": mode, "field": "uid"},
        "division": {"mode": mode, "fields": ["division", "subdivision"]},
        "lang": {"mode": "term"}
    }
    if "acronym" in kwargs:
        kwargs["acronym"] = kwargs["acronym"].lower().replace(' ', '')

    queries = []

    for field, params in fields.items():
        value = kwargs.get(field)
        if not value:
            continue
        if "fields" in params:
            sub_query = {
                "bool": {
                    "should": [
                        {
                            params["mode"]: {
                                sub_field: {
                                    "value": value.lower()
                                }
                            }
                        }
                        for sub_field in params["fields"]
                    ]
                }
            }
            queries.append(sub_query)

        else:
            queries.append(
                {
                    params["mode"]: {
                        params.get("field", field): {
                            "value": value.lower()
                        }
                    }
                }
            )

    if not queries:
        return None

    body = {
        "size": int(kwargs.get("limit", 25)),
        "from": int(kwargs.get("offset", 0)),
        "query": {
            "bool": {
                "must": queries
            }
        },
        "sort": [
            {"_score": {"order": "desc"}},
            {"ordering": {"order": "asc"}}
        ]
    }

    return es.search(index="suttas", body=body)
