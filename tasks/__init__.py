import sys
from invoke import Collection

ns = Collection.from_module(sys.modules[__name__])

collections = [
    'po'
]

for collection in collections:
    exec('from tasks import {} as module'.format(collection))
    ns.add_collection(module)
