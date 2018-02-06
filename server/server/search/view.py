import json

from elasticsearch import ConnectionError
from flask import request, current_app
from flask_restful import Resource

from search import query as query_search

class Search(Resource):
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
        language = request.args.get('language', current_app.config.get('DEFAULT_LANGUAGE'))

        if query is None:
            return json.dumps({'error': '\'query\' param is required'}), 422

        try:
            es_text_results = query_search.search(query, limit=limit, offset=offset, language=language)
            text_results = []

            for entry in es_text_results['hits']['hits']:
                source = entry['_source']
                uid = source['uid']
                lang = source['lang']
                author_uid = source['author_uid']
                text_results.append({
                    'uid': uid,
                    'lang': lang,
                    'author': source['author'],
                    'author_short': source['author_short'],
                    'heading': source['heading'],
                    'is_root': source['is_root'],
                    'highlight': entry['highlight'],
                    'url': f'/{uid}/{lang}/{author_uid}'
                })
            results = {
                'total': len(text_results),
                'hits': text_results
                
            }
            return results
        except ConnectionError:
            return json.dumps({'error': 'Elasticsearch unavailable'}), 503
