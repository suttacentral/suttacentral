import sys
from invoke import Collection

ns = Collection.from_module(sys.modules[__name__])

collections = [
    'po'
]

for collection in collections:
    try:
        exec('from tasks import {} as module'.format(collection))
    except ImportError as e:
        print(e.msg)
        print('Maybe try running "pip install -r python-requirements.txt"')
        exit(1)
        
    ns.add_collection(module)
