import json

from elasticsearch import ConnectionError

from flask_restful import Resource
from flask import request
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
                  took:
                    type: number
                  timed_out:
                    type: boolean
                  _shards:
                    type: object
                    properties:
                      total:
                        type: number
                      successful:
                        type: number
                      failed:
                        type: number
                  hits:
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
                            _index:
                              type: string
                            _type:
                              type: string
                            _id:
                              type: string
                            _score:
                              type: number
                            _source:
                              type: object
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
        query = request.args.get('query')

        try:
            results = query_search.search(query, limit=limit, offset=offset)
            return results
        except ConnectionError:
            return json.dumps({'error': 'Elasticsearch unavailable'}), 503
