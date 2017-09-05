import json

from elasticsearch import ConnectionError

from app import app


@app.route('/search/', methods=['GET'])
def search(request):
    limit = request.args.get('limit', 10)
    offset = request.args.get('offset', 0)
    query = request.args.get('query')

    try:
        results = search.query.search(query, limit=limit, offset=offset)
        return results
    except ConnectionError:
        return json.dumps({'error': 'Elasticsearch unavailable'}), 503
