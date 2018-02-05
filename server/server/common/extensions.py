from flask_caching import Cache
from flask import request


cache = Cache()


def make_cache_key(*args, **kwargs):
    return request.url.encode('utf-8')


def my_cache(*args, **kwargs):
    if 'key_prefix' not in kwargs:
        kwargs['key_prefix'] = make_cache_key
    if 'timeout' not in kwargs:
        kwargs['timeout'] = 600
    return cache.cached(*args, **kwargs)
