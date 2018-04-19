import logging
from inspect import currentframe, getargvalues

import regex

from search import es, util, language_id
from .util import get_root_language_uids

logger = logging.getLogger(__name__)

def get_available_indexes(indexes, _cache=util.TimedCache(lifetime=30)):
    key = tuple(indexes)

    try:
        return _cache[key]
    except KeyError:
        pass

    available = []
    for index in indexes:
        try:
            if es.cluster.health(index, timeout='100ms')['status'] in {'green', 'yellow'}:
                available.append(index)
        except Exception as e:
            logger.debug(
                'An exception occured while checking cluster health for index: {}'.format(
                    index))
            logger.exception(index)
            pass
    _cache[key] = available
    return available


def search(query: str, highlight=True, offset=0, limit=10,
           language=None, restrict=None):
    query.strip()
       
    root_indexes = list(get_root_language_uids())
    tr_indexes = [language]
    
    extra_langs = language_id.smart_rank(query)
    for iso_code in extra_langs:
        if iso_code != language and iso_code not in root_indexes:
            tr_indexes.append(iso_code)
    
    if restrict == 'root-text':
        indexes = root_indexes
    elif restrict == 'translation':
        indexes = tr_indexes
    elif restrict is None:
        indexes = root_indexes + tr_indexes
    else:
        return None

    index_string = ','.join(get_available_indexes(indexes))

    fields = ["content", "content.*^0.5",
              "term^1.5", "term.*^0.5",
              "gloss^1.5",
              "lang^0.5",
              "author^0.5",
              "uid", "uid.division^0.7",
              "name^1.25", "name.*^0.75",
              "heading.title^0.5",
              "heading.title.plain^0.5",
              "heading.title.shingle^0.5"]

    if regex.search(r'[:"~*]', query) or regex.search(r'AND|OR|NOT', query):
        query = query.replace('define:', 'term:')
        inner_query = {
            "query_string": {
                "fields": fields,
                "query": query,
                "use_dis_max": True
            }
        }
    else:
        inner_query = {
            "multi_match": {
                "type": "best_fields",
                "tie_breaker": 0.3,
                "fields": fields,
                "query": query
            }
        }

    body = {
        "from": offset,
        "size": limit,
        "_source": ["uid", "lang", "name", "volpage", "gloss", "term", "heading", "is_root", "author", "author_uid", "author_short", "acronym"],
        "timeout": "15s",
        "query": {
            "function_score": {
                "query": inner_query,
                "functions": [
                    {
                        "weight": "1.5",
                        "filter": {
                            "term": {
                                "lang": language
                            }
                        }
                    },
                    {
                        "field_value_factor": {
                            "field": "boost",
                            "factor": 1.0,
                            "missing": 1.0
                        }
                    },
                    {
                        "weight": "0.25",
                        "filter": {
                            "type": {
                                "value": "definition"
                            }
                        }
                    },
                    {
                        "weight": "2",
                        "filter": {
                            "term": {
                                "uid": query.replace(' ', '').lower()
                            }
                        }
                    },
                    {
                        "weight": "1.0",
                        "filter": {
                            "term": {
                                "is_root": True
                            }
                        }
                    }
                ],
                "score_mode": "multiply"
            }
        }
    }

    if highlight:
        body["highlight"] = {
            "pre_tags": ["<strong class=\"highlight\">"],
            "post_tags": ["</strong>"],
            "order": "score",
            "require_field_match": False,
            "fields": {
                "content": {
                    "matched_fields": ["content", "content.folded", "content.stemmed"],
                    "type": "fvh",
                    "fragment_size": 100,
                    "number_of_fragments": 3,
                    "no_match_size": 250
                }
            }
        }
    
    return es.search(index=index_string, body=body)
