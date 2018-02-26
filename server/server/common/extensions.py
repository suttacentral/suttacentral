from flask_caching import Cache
from flask import request
from flask_mail import Mail


cache = Cache()
mail = Mail()


def make_cache_key(*args, **kwargs):
    return request.url.encode('utf-8')
