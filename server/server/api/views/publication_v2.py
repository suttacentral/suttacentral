from flask_restful import Resource
from flask import request
from common.arangodb import get_db
from data_loader.util import json_load

from common.queries import EBOOK_DATA_QUERY

EDITIONS_QUERY = '''
FOR edition IN publication_editions
    RETURN {
        edition_id: edition.edition_id,
        publication_number: edition.publication_number
    }
'''

EDITION_QUERY = '''
LET edition = DOCUMENT('publication_editions', @edition_id)
LET publication = DOCUMENT('publications_v2', edition.publication_number)
RETURN UNSET_RECURSIVE({edition, publication}, '_id', '_key', '_rev')
'''

class Edition(Resource):
  def get(self, edition_id):
    db = get_db()
    result = list(db.aql.execute(EDITION_QUERY, bind_vars={'edition_id': edition_id}))
    if result:
      return result[0]
    else:
      # do better error handling
      return {}


class Editions(Resource):
  def get(self):
    """
    responses:
      200:
        type: array
        items:
          type: object  
          properties:
              edition_id:
                  type: string
              publication_number:
                  type: string
    """

    db = get_db()
    return list(db.aql.execute(EDITIONS_QUERY))


class EditionData(Resource):
    def get(self, uid):
        """
        example: ?uid=dn&translation_muids=translation-en-sujato&lang=en
                ---
        parameters:
           - in: query
             name: uid
             type: string
             required: true
           - in: query
             name: translation_muids
             type: string
             required: true
           - in: query
             name: lang
             type: string
             required: true

        responses:
            200:
                type: array
                items:
                    type: object
        """

        translation_muids = request.args.get('translation_muids')
        lang = request.args.get('lang')

        db = get_db()
        result = list(db.aql.execute(EBOOK_DATA_QUERY, bind_vars={'uid':uid, 'translation_muids':translation_muids, 'lang':lang}))
        for doc in result:
            if doc['files']:
                for k, file_path in list(doc['files'].items()):
                    if file_path:
                        doc['files'][k] = json_load(file_path)

        return result



