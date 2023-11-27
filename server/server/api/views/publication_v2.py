from pathlib import Path
from flask_restful import Resource
from flask import request, jsonify
from common.arangodb import get_db
from data_loader.util import json_load
from base64 import b64encode

from common.queries import EBOOK_DATA_QUERY

EDITIONS_QUERY = '''
FOR edition IN publication_editions
    FILTER edition.edition_id NOT LIKE '%pli-tv-vi%'
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

EDITION_MAINMATTER_QUERY = '''
LET edition = DOCUMENT('publication_editions', @edition_id)
LET publication = DOCUMENT('publications_v2', edition.publication_number)

LET sources = edition.sources
LET lang = publication.translation_lang_iso

FOR doc, edge, path IN 0..10 OUTBOUND CONCAT('super_nav_details/', @uid) super_nav_details_edges OPTIONS {order: 'dfs'}
    FILTER doc.uid
    LET uid = doc.uid
    LET name = FIRST(FOR name_doc IN names FILTER name_doc.uid == doc.uid AND name_doc.lang == lang RETURN name_doc.name)

    LET root_name = (
        FOR rootName IN names
            FILTER rootName.uid == uid AND rootName.is_root == true
            LIMIT 1
            RETURN rootName.name
    )[0]

    LET blurb = FIRST(
        FOR blurb_doc in blurbs
        FILTER blurb_doc.uid == uid
        FILTER blurb_doc.lang == lang
        RETURN blurb_doc
    )

    LET edition_details = (
        FOR pub_ed IN publication_editions
            FILTER pub_ed.text_uid == doc.uid
            RETURN {
                text_uid: pub_ed.text_uid,
                publication_type: pub_ed.publication_type,
                volumes: pub_ed.volumes
            }
    )

    LET mainmatter = MERGE(
        FOR file_doc IN sc_bilara_texts
            FILTER file_doc.uid == uid
            FOR key IN ATTRIBUTES(sources)
                LET value = SPLIT(sources[key], '-')
                FILTER file_doc.muids ALL IN value
                RETURN {[key]: file_doc.file_path}
    )

    RETURN {
        uid,
        type: doc.type,
        name: name,
        root_name: root_name,
        blurb: blurb.blurb,
        acronym: doc.acronym,
        editionDetails: edition_details,
        mainmatter
    }
'''

EDITION_BLURBS = '''
FOR doc IN blurbs
    FILTER doc.uid IN ['dn', 'mn', 'sn', 'an', 'dhp', 'ud', 'iti', 'snp', 'thag', 'thig', 'pli-tv-vi']
        AND doc.lang == @lang
    RETURN {
        uid: doc.uid,
        blurb: doc.blurb
    }
'''


class Edition(Resource):
    def get(self, edition_id):
        db = get_db()
        if (
            result := list(
                db.aql.execute(
                    EDITION_QUERY,
                    bind_vars={'edition_id': edition_id}
                )
            )
        ):
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


class EditionFiles(Resource):
    def get(self, edition_id):
        db = get_db()

        edition = db['publication_editions'].get({'_key': edition_id})
        working_dir = Path(edition['working_dir'])

        possible_files = []
        result = {}

        def recurse(thing):
            if isinstance(thing, str):
                if self.might_be_file(thing):
                    possible_files.append(thing)
            elif isinstance(thing, list):
                for v in thing:
                    recurse(v)
            elif isinstance(thing, dict):
                for v in thing.values():
                    recurse(v)

        recurse(edition)

        for file_str in possible_files:
            data = self.file_data(working_dir, file_str)
            result[file_str] = data

        return result

    @staticmethod
    def might_be_file(value):
        # this is not very good, but probably good enough
        return bool(value.endswith(('.jpg', '.png', '.html')))

    @staticmethod
    def file_data(working_dir, file_str):
        file = working_dir / file_str
        if not file.exists():
            return None
        suffix = file.suffix.lower()
        if suffix in {'.jpg', '.png'}:
            with file.open('rb') as f:
                bin_data = f.read()
                return b64encode(bin_data).decode('ascii')
        elif suffix in {'.html'}:
            with file.open('r') as f:
                return f.read()
        return None


class EditionMainmatter(Resource):
    def get(self, edition_id, uid):
        db = get_db()
        result = list(
            db.aql.execute(
                EDITION_MAINMATTER_QUERY,
                bind_vars={
                    'edition_id': edition_id,
                    'uid': uid
                }
            )
        )
        for doc in result:
            if doc['mainmatter']:
                for k, file_path in list(doc['mainmatter'].items()):
                    if file_path:
                        doc['mainmatter'][k] = json_load(file_path)
        return jsonify(result)


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
        result = list(
            db.aql.execute(
                EBOOK_DATA_QUERY,
                bind_vars={
                    'uid': uid,
                    'translation_muids': translation_muids,
                    'lang': lang
                }
            )
        )
        for doc in result:
            if doc['files']:
                for k, file_path in list(doc['files'].items()):
                    if file_path:
                        doc['files'][k] = json_load(file_path)

        return result


class EditionBlurbs(Resource):
    def get(self, lang):
        db = get_db()
        if result := list(db.aql.execute(EDITION_BLURBS, bind_vars={'lang': lang})):
            return result
        else:
            return {}
