from flask import request
from flask_caching import Cache

cache = Cache(config={'CACHE_TYPE': 'simple'})


def make_cache_key(*args, **kwargs):
    return request.url.encode('utf-8')
