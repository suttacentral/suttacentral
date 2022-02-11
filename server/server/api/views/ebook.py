from flask_restful import Resource
from flask import request
from common.arangodb import get_db
from data_loader.util import json_load

from common.queries import EBOOK_DATA_QUERY

class EBookData(Resource):
    def get(self):
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

        uid = request.args.get('uid')
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



