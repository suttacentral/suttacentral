from flask_caching import Cache
from flask import request

cache = Cache(config={'CACHE_TYPE': 'simple'})

def make_cache_key(*args, **kwargs):
    return request.url.encode('utf-8')
