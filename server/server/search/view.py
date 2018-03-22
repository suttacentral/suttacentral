import json

from elasticsearch import ConnectionError
from flask import request, current_app
from flask_restful import Resource

from search import query as query_search
from search import dictionaries
from common.extensions import cache, make_cache_key
from common.arangodb import get_db
from common.queries import SUTTAPLEX_LIST


class Search(Resource):
    @cache.cached(timeout=600, key_prefix=make_cache_key)
    def get(self):
        """
        Search for given query in elasticsearch.
        ---
        parameters:
        - in: query
          name: query
          description: What to look for
          type: string
          required: true
        - in: query
          name: limit
          description: Limit number of results
          type: number
          required: false
        - in: query
          name: offset
          type: number
          required: false
        responses:
            '200':
              description: OK
              schema:
                id: Search result
                type: object
                properties:
                  total:
                    type: number
                  max_score:
                    type: number
                  suttaplex:
                    $ref: '#/definitions/Suttaplex'
                  hits:
                    type: array
                    uniqueItems: true
                    items:
                        properties:
                          uid:
                            type: string
                          heading:
                            type: object
                            properties:
                              division:
                                type: string
                              subhead:
                                type: array
                                items:
                                  type: string
                              title:
                                type: string
                          lang:
                            type: string
                          is_root:
                            type: boolean
                          highlight:
                            type: object
                            properties:
                              content:
                                type: array
                                items:
                                  type: string
        """
        limit = request.args.get('limit', 10)
        offset = request.args.get('offset', 0)
        query = request.args.get('query', None)
        restrict = request.args.get('restrict', None)
        if restrict == 'all':
            restrict = None
        language = request.args.get('language', current_app.config.get('DEFAULT_LANGUAGE'))

        if query is None:
            return json.dumps({'error': '\'query\' param is required'}), 422

        results = {'total': 0, 'hits': []}
        try:
            es_text_results = query_search.search(query, limit=limit, offset=offset, language=language,
                                                  restrict=restrict)
            if es_text_results:
                text_results = []

                for entry in es_text_results['hits']['hits']:
                    source = entry['_source']
                    uid = source['uid']
                    lang = source['lang']
                    author_uid = source['author_uid']
                    text_results.append({
                        'acronym': source['acronym'],
                        'uid': uid,
                        'lang': lang,
                        'author': source['author'],
                        'author_short': source['author_short'],
                        'heading': source['heading'],
                        'is_root': source['is_root'],
                        'highlight': entry['highlight'],
                        'url': f'/{uid}/{lang}/{author_uid}'
                    })

                results['total'] += es_text_results['hits']['total']
                results['hits'].extend(text_results)

        except ConnectionError:
            # Technically we don't have to return a 503 because we can
            # get DB results too: but probably best to fail for debugging
            return json.dumps({'error': 'Elasticsearch unavailable'}), 503

        if not restrict or restrict == 'dictionary':
            dictionary_result = dictionaries.search(query)
            if dictionary_result:
                if offset == 0 or restrict == 'dictionary':
                    # Yeah this is a hack in terms of offset and stuff
                    # but it works: if the client asks for 10 results
                    # it'll return 11. But it doesn't mess with 
                    # the elasticsearch offset and limit.
                    results['hits'].insert(0, dictionary_result)
                    results['total'] += 1

        db = get_db()
        query_lower = query.lower()
        possible_uids = [query_lower, query_lower.replace(' ', '.'), query_lower.replace('.', '.')]
        found = list(db.aql.execute('FOR r IN root FILTER r.uid IN @uids AND r.type == "text" LIMIT 1 RETURN r.uid',
                                    bind_vars={'uids': possible_uids}))
        if found:
            suttaplex = list(db.aql.execute(SUTTAPLEX_LIST, bind_vars={'uid': found[0], 'language': language}))[0]
            results['suttaplex'] = suttaplex

        return results
