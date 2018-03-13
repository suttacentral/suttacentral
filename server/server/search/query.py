import logging
from inspect import currentframe, getargvalues

import regex

from search import es, util, language_id
from .util import get_root_language_uids

logger = logging.getLogger(__name__)


def text_search(query, lang=None, **kwargs):
    import langid
    lang_guess = langid.identifier
    if lang is None:
        lang = lang_guess
    query = make_text_search_query(query, lang=lang, lang_guess=lang_guess, **kwargs)


def make_text_search_query(query, lang, root_lang=None, author=None, uid=None, search_title=None,
                           search_body=None):
    query = query.trim()
    m = regex.match(r'^"(.*)"$', query)
    if m:
        query = m[0]
        phrase_search = True
    else:
        phrase_search = False

    query_params = {k: v for k, v in getargvalues(currentframe()) if v is not None}

    filters = []
    if root_lang:
        filters.append({
            "term": {
                "root_lang": root_lang
            }
        })
    if author:
        filters.append({
            "term": {
                "author": author
            }
        })
    if division:
        filters.append({
            "or": [
                {
                    "term": {
                        "subdivision": division
                    }
                },
                {
                    "term": {
                        "division": division
                    }
                }
            ]
        })
    if uid:
        filters.append({
            "query": {
                "wildcard": {
                    "uid": uid
                }
            }
        })

    if not search_title and not search_body:
        search_title = True
        search_body = True

    fields = []

    if search_title:
        fields.extend(["heading.title^0.5",
                       "heading.title.plain^0.5",
                       "heading.title.shingle^0.5"])

    if search_body:
        fields.extend(["content", "content.*^0.5"])

    body = {
        "from": offset,
        "size": limit,
        "_source": ["uid", "lang", "name", "volpage", "gloss", "term", "heading", "is_root"],
        "timeout": "15s",
        "query": {
            "function_score": {
                "multi_match": {
                    "query": query,
                    "fields": fields,
                    "type": "phrase" if phrase_search else "best_fields"
                }
            }
        }
    }


lang_bias = {'en': 1.4, 'pli': 1.2}


def guess_language(string):
    return rank_language(string)[0][0]


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
        "_source": ["uid", "lang", "name", "volpage", "gloss", "term", "heading", "is_root", "author", "author_uid", "author_short"],
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

    # print('searching index: {}'.format(index_string))
    # print(json.dumps(body, indent=2))

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
