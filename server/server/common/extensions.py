from flask_caching import Cache
from flask import request

cache = Cache()

def make_cache_key(*args, **kwargs):
    return request.url.encode('utf-8')
