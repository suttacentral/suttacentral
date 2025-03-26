import json
import os
import re
from typing import List
from urllib.parse import urlparse

import stripe
from flask import current_app, request
from flask_restful import Resource

from sortedcontainers import SortedDict

from common.arangodb import get_db
from common.extensions import make_cache_key, cache

from common.queries import (
    CURRENCIES,
    LANGUAGES,
    MENU,
    SUBMENU,
    TIPITAKA_MENU,
    PARAGRAPHS,
    PARALLELS,
    PARALLELS_LITE,
    SUTTA_VIEW,
    SUTTAPLEX_LIST,
    FALLEN_LEAVES_SUTTAPLEX_LIST,
    IMAGES,
    EPIGRAPHS,
    WHY_WE_READ,
    EXPANSION,
    PWA,
    TRANSLATION_COUNT_BY_DIVISION,
    TRANSLATION_COUNT_BY_AUTHOR,
    TRANSLATION_COUNT_BY_LANGUAGE,
    SEGMENTED_SUTTA_VIEW,
    SEGMENTED_TRANSLATION_TEXT,
    SUTTA_NAME,
    SUTTA_SINGLE_PALI_TEXT,
    SUTTA_PATH,
    ALL_DOC_UID_BY_ROOT_UID,
    SUTTA_PALI_REFERENCE,
    SUTTA_PUBLICATION_INFO,
    PLI_SUTTA_PUBLICATION_INFO,
    AVAILABLE_VOICES,
    CANDIDATE_AUTHORS,
    VAGGA_CHILDREN,
    ABBREVIATION_SUPER_NAME_ACRONYM,
    NAVIGATION_QUERY
)

from common.utils import (
    flat_tree,
    language_sort,
    sort_parallels_key,
    sort_parallels_type_key,
    get_possible_parent_uid
)

from aksharamukha import transliterate

from data_loader.util import json_load

default_cache_timeout = 600
long_cache_timeout = 7200

DHP_PATH = '/dharmapadas/sutta/minor'


class Languages(Resource):
    """
    Languages API endpoint.
    """

    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        """
        Send list of available languages
        ---
        parameters:
           - in: query
             name: all
             type: boolean
        responses:
            200:
                description: List of available languages
                schema:
                    type: array
                    items:
                        schema:
                            id: language
                            type: object
                            properties:
                                uid:
                                    type: string
                                name:
                                    type: string
                                iso_code:
                                    type: string
                                is_root:
                                    type: boolean
                                localized:
                                    type: boolean
                                localized_percent:
                                    type: number
        """

        include_all = request.args.get('all', False)

        db = get_db()
        languages = list(db.aql.execute(LANGUAGES))

        if include_all:
            response = languages
        else:
            response = [l for l in languages if not l['is_root']]

        return response, 200


class TranslationCountByDivision(Resource):
    """
    Return a summary of translation count by division and author
    """

    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, iso_code):
        """

        ---
        responses:
            200:
                description: Summary of translation counts
                schema:
                    type: object
                    properties:
                        divisions:
                            type: array
                            items:
                                type: object
                                properties:
                                    uid:
                                        type: string
                                    name:
                                        type: string
                                    root_lang:
                                        type: string
                                    total:
                                        type: number
                        authors:
                            type: array
                            items:
                                schema:
                                    type: object
                                    properties:
                                        name:
                                            type: string
                                        total:
                                            type: number
        """

        db = get_db()

        if not db['language'][iso_code]:
            return {"error": f'language code not recognized "{iso_code}"'}, 422

        response = {
            'division': list(
                db.aql.execute(
                    TRANSLATION_COUNT_BY_DIVISION, bind_vars={'lang': iso_code}
                )
            ),
            'author': list(
                db.aql.execute(
                    TRANSLATION_COUNT_BY_AUTHOR, bind_vars={'lang': iso_code}
                )
            ),
        }
        return response, 200


class TranslationCountByLanguage(Resource):
    """
    return a summary of translation counts by language
    """

    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        responses:
            200:
                description: Summary of translation counts by language
                schema:
                    type: object
                    properties:
                        modern:
                            type: array
                            items:
                                $ref: '#/definitions/TranslationCount'
                        ancient:
                            type: array
                            items:
                                $ref: '#/definitions/TranslationCount'
        definitions:
            TranslationCount:
                type: object
                properties:
                    iso_code:
                        type: string
                    name:
                        type: string
                    total:
                        type: number
        """

        db = get_db()

        response = next(db.aql.execute(TRANSLATION_COUNT_BY_LANGUAGE))
        return response, 200


class Menu(Resource):

    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self, submenu_id: str = None):
        """
        Send Menu structure
        ---
        responses:
            200:
                description: Menu structure
                schema:
                    id: Menu
                    type: array
                    items:
                        $ref: '#/definitions/MenuItem'
        definitions:
            MenuItem:
                type: object
                properties:
                    uid:
                        type: string
                    root_name:
                        type: string
                    translated_name:
                        type: string
                    node_type:
                        type: string
                    blurb:
                        type: string
                    acronym:
                        type: string
                    root_lang_iso:
                        type: string
                    root_lang_name:
                        type: string
                    child_range:
                        type: string
                    yellow_brick_road:
                        type: boolean
                    children:
                        type: array
                        items:
                            type: MenuItem
        """
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        return self.get_data(submenu_id, language=language), 200

    def get_data(self, submenu_id: str = None, language: str = None) -> List[dict]:
        db = get_db()

        bind_vars = {'language': language}

        if submenu_id:
            bind_vars['submenu_id'] = submenu_id
            return list(db.aql.execute(SUBMENU, bind_vars=bind_vars))
        else:
            return list(db.aql.execute(MENU, bind_vars=bind_vars))


class TipitakaMenu(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        db = get_db()
        data = db.aql.execute(
            TIPITAKA_MENU, bind_vars={'language': language}
        )
        tipitaka_menu = list(data)
        sorted_menu = sorted(tipitaka_menu, key=self.custom_sort)
        return sorted_menu, 200

    def custom_sort(self, item):
        order = ['sutta', 'vinaya', 'abhidhamma']
        return order.index(item['uid'])


class SuttaplexList(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        """
        Send suttaplex for given uid. It is represented in flat list structure where order matters.
        [vagga, vagga, text, text] represents:
        vagga
            vagga
                text
                text
        ---
        parameters:
           - in: path
             name: uid
             type: string
             required: true
        responses:
            200:
                description: Suttaplex list
                schema:
                    id: suttaplex-list
                    type: array
                    items:
                        $ref: '#/definitions/Suttaplex'
        definitions:
            Suttaplex:
                type: object
                properties:
                    uid:
                        type: string
                    blurb:
                        type: string
                    difficulty:
                        required: false
                        type: number
                    original_title:
                        type: string
                    type:
                        type: string
                    translations:
                        type: array
                        items:
                            $ref: '#/definitions/Translation'
            Translation:
                type: object
                properties:
                    author:
                        type: string
                    id:
                        type: string
                    lang:
                        type: string
                    title:
                        type: string
        """
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        uid = uid.replace('/', '-').strip('-')

        db = get_db()
        results = db.aql.execute(
            SUTTAPLEX_LIST, bind_vars={'language': language, 'uid': uid}, count=True
        )

        difficulties = {3: 'advanced', 2: 'intermediate', 1: 'beginner'}

        data = []
        edges = {}
        for result in results:
            _from = result.pop('from')
            if result['difficulty']:
                result['difficulty'] = {
                    'name': difficulties[result['difficulty']],
                    'level': result['difficulty'],
                }
            parent = None
            try:
                parent = edges[_from]
            except KeyError:
                data.append(result)
            _id = f'super_nav_details/{result["uid"]}'
            edges[_id] = result
            result['translations'] = sorted(
                result['translations'], key=language_sort(result['root_lang'])
            )
            if parent:
                try:
                    parent['children'].append(result)
                except KeyError:
                    parent['children'] = [result]

            self.fetch_alternative_translated_title_if_empty(db, language, result)
            result['verseNo'] = self.compute_verse_no(result['uid'], result['verseNo'])
            if len(results) == 1:
                self.calculate_neighbors(result['uid'], result, language, db)

        fallen_leaves = self.try_to_load_fallen_leaves(uid, language, db, data)
        data = flat_tree(data)
        self.add_acronym_to_fallen_leaves(uid, data, fallen_leaves)
        data = self.sort_suttaplex_items(uid, data, fallen_leaves)

        return data, 200

    def fetch_alternative_translated_title_if_empty(self, db, language, result):
        translation_text_file = db.aql.execute(
            SEGMENTED_TRANSLATION_TEXT,
            bind_vars={'uid': result['uid'], 'language': language}
        )
        if translation_text_file is not None:
            file_result = next(translation_text_file)
            if (
                    file_result is not None
                    and 'translation_text' in file_result
            ):
                translation_text = json_load(file_result['translation_text'])
                uid_key = self.get_max_key_with_zero_prefix(translation_text)
                if translation_text and uid_key in translation_text and (result['translated_title'] is None or result['translated_title'] == ''):
                    result['translated_title'] = translation_text[uid_key]

    def get_max_key_with_zero_prefix(self, data):
        pattern = re.compile(r'^[^:]+:(0\.\d+)')
        max_key = None
        max_value = -1

        for key in data.keys():
            if match := pattern.match(key):
                value = float(match[1])
                if value > max_value:
                    max_value = value
                    max_key = key

        return max_key

    def add_acronym_to_fallen_leaves(self, uid, data, fallen_leaves):
        if fallen_leaves:
            first_acronym = next((item['acronym'] for item in data if item['acronym']), '')
            parent_acronym = first_acronym[:first_acronym.rfind(' ')] if ' ' in first_acronym else uid
            for leave in fallen_leaves:
                leave['acronym'] = f'{parent_acronym} ' + leave['uid'].replace(uid, '')

    def try_to_load_fallen_leaves(self, uid, language, db, data):
        fallen_leaves_results = db.aql.execute(
            FALLEN_LEAVES_SUTTAPLEX_LIST, bind_vars={'language': language, 'uid': uid}
        )
        fallen_leaves = list(fallen_leaves_results)
        data.extend(fallen_leaves)
        return fallen_leaves

    def sort_suttaplex_items(self, uid, data, fallen_leaves):
        if fallen_leaves:
            data = list(filter(lambda x: x['uid'] is not None, data))
            for item in data:
                item['hasFallenLeaves'] = True
                if index := item['uid'].replace(uid, ''):
                    split_index = index.split('-')
                    item['index'] = (
                        split_index[0]
                        if '-' in index
                        and len(split_index) > 1
                        and split_index[0].isdigit()
                        else index
                    )
                else:
                    item['index'] = 0
            data = sorted(data, key=lambda x: int(x['index']))
        return data

    def compute_verse_no(self, uid, verses):
        if verses is not None and verses != '' and 'dhp' not in uid:
            all_verse = verses.split(',')
            all_verse = list(filter(lambda x: 'vns' in x, all_verse))
            return (
                f'Verse {all_verse[0].replace("vns", "")}–{all_verse[-1].replace("vns", "").strip()}'
                if len(all_verse) > 1
                else ' '.join(all_verse).replace('vns', 'Verse ')
            )

    def calculate_neighbors(self, uid, doc, site_lang, db):
        sutta_prev_next = {'prev_uid': '', 'next_uid': ''}
        possible_parent_uid = get_possible_parent_uid(uid)
        all_doc_uid = list(
            db.aql.execute(
                ALL_DOC_UID_BY_ROOT_UID,
                bind_vars={
                    'uid': uid,
                    'possibleParentUid': possible_parent_uid
                }
            )
        )

        if uid in all_doc_uid:
            uid_index = all_doc_uid.index(uid)
            if uid_index != 0:
                sutta_prev_next['prev_uid'] = all_doc_uid[uid_index - 1]
            if uid_index != len(all_doc_uid) - 1:
                sutta_prev_next['next_uid'] = all_doc_uid[uid_index + 1]

        if doc['previous']:
            doc['previous']['uid'] = sutta_prev_next.get('prev_uid', '')
        if doc['next']:
            doc['next']['uid'] = sutta_prev_next.get('next_uid', '')

        for k, v in sutta_prev_next.items():
            name_result = list(
                db.aql.execute(
                    SUTTA_NAME,
                    bind_vars={'uid': v, 'lang': site_lang}
                )
            )
            if k == 'next_uid' and doc['next']:
                doc['next']['name'] = name_result[0]
            elif k == 'prev_uid' and doc['previous']:
                doc['previous']['name'] = name_result[0]


class RangeSuttaplexList(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        """
        Send suttaplex for given uid. It is represented in flat list structure where order matters.
        [vagga, vagga, text, text] represents:
        vagga
            vagga
                text
                text
        ---
        parameters:
           - in: path
             name: uid
             type: string
             required: true
        responses:
            200:
                description: Suttaplex list
                schema:
                    id: suttaplex-list
                    type: array
                    items:
                        $ref: '#/definitions/Suttaplex'
        definitions:
            Suttaplex:
                type: object
                properties:
                    uid:
                        type: string
                    blurb:
                        type: string
                    difficulty:
                        required: false
                        type: number
                    original_title:
                        type: string
                    type:
                        type: string
                    translations:
                        type: array
                        items:
                            $ref: '#/definitions/Translation'
            Translation:
                type: object
                properties:
                    author:
                        type: string
                    id:
                        type: string
                    lang:
                        type: string
                    title:
                        type: string
        """
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        uid = uid.replace('/', '-').strip('-')
        db = get_db()
        results = self.get_suttaplex_list_by_uid(db, language, uid)

        difficulties = {3: 'advanced', 2: 'intermediate', 1: 'beginner'}

        data = []
        edges = {}
        for result in results:
            _from = result.pop('from')
            if result['difficulty']:
                result['difficulty'] = {
                    'name': difficulties[result['difficulty']],
                    'level': result['difficulty'],
                }
            parent = None
            try:
                parent = edges[_from]
            except KeyError:
                data.append(result)
            _id = f'super_nav_details/{result["uid"]}'
            edges[_id] = result
            result['translations'] = sorted(
                result['translations'], key=language_sort(result['root_lang'])
            )
            if uid[:3].lower() == 'dhp':
                result['title'] = uid.replace('dhp', 'Dhammapada ')
            else:
                result['title'] = uid

            if parent:
                try:
                    parent['children'].append(result)
                except KeyError:
                    parent['children'] = [result]

        data = flat_tree(data)

        return data, 200

    def get_suttaplex_list_by_uid(self, db, language, uid):
        results = {}
        if uid[:3].lower() == 'dhp' and uid.count('-') == 0:
            vagga_children_uids = list(
                db.aql.execute(
                    VAGGA_CHILDREN,
                    bind_vars={'uid': 'dhp'}
                )
            )
            for child_uid in vagga_children_uids:
                if child_uid.count('-'):
                    sutta_number = uid.strip('dhp')
                    child_range = child_uid.strip('dhp')
                    range_begin = child_range[:child_range.find('-')]
                    range_end = child_range[child_range.find('-') + 1:]
                    if int(range_begin) <= int(sutta_number) <= int(range_end):
                        results = db.aql.execute(
                            SUTTAPLEX_LIST,
                            bind_vars={
                                'language': language,
                                'uid': child_uid
                            }
                        )
        elif uid.count('.') == 1 and uid.count('-') == 0:
            vagga_uid = uid[:uid.find('.')]
            sutta_number = uid[uid.find('.') + 1:]
            vagga_children_uids = list(
                db.aql.execute(
                    VAGGA_CHILDREN,
                    bind_vars={'uid': vagga_uid}
                )
            )
            for child_uid in vagga_children_uids:
                if child_uid.count('-'):
                    child_range = child_uid[child_uid.find('.') + 1:]
                    range_begin = child_range[:child_range.find('-')]
                    range_end = child_range[child_range.find('-') + 1:]
                    if int(range_begin) <= int(sutta_number) <= int(range_end):
                        results = db.aql.execute(
                            SUTTAPLEX_LIST, bind_vars={'language': language, 'uid': child_uid}
                        )
        elif uid != 'pli-tv-bi-vb-sk1-75' and uid[:15] == 'pli-tv-bi-vb-sk':
            results = db.aql.execute(
                SUTTAPLEX_LIST,
                bind_vars={
                    'language': language,
                    'uid': 'pli-tv-bi-vb-sk1-75'
                }
            )
        else:
            results = db.aql.execute(
                SUTTAPLEX_LIST, bind_vars={'language': language, 'uid': uid}
            )
        return results


class FallenLeavesSuttaplexList(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        uid = uid.replace('/', '-').strip('-')

        db = get_db()
        results = db.aql.execute(
            FALLEN_LEAVES_SUTTAPLEX_LIST, bind_vars={'language': language, 'uid': uid}
        )
        result = list(results)
        return result, 200


class Parallels(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout / 10)
    def get(self, uid):
        """
        Send parallel information for given sutta.
        ---
        parameters:
           - in: path
             name: uid
             type: string
             required: true
        responses:
            200:
                description: Suttaplex list
                schema:
                    id: suttaplex-parallels
                    type: object
                    properties:
                        first_key:
                            description: "first key is the id of first parallel, second of the second and so on."
                            type: array
                            items:
                                $ref: '#/definitions/Parallel'

        definitions:
            Parallel:
                type object:
                properties:
                    type:
                        type: string
                    partial:
                        type: boolean
                    to:
                        type: array
                        items:
                            $ref: '#/definitions/Suttaplex-parallel'
            Suttaplex-parallel:
                type: object
                properties:
                    uid:
                        type: string
                    difficulty:
                        required: false
                        type: number
                    original_title:
                        type: string
                    type:
                        type: string
                    translations:
                        type: array
                        items:
                            $ref: '#/definitions/Translation'
        """
        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )
        uid = uid.replace('/', '-').strip('-')

        db = get_db()
        results = db.aql.execute(
            PARALLELS, bind_vars={'language': language, 'uid': uid}
        )

        data = SortedDict(sort_parallels_key)
        for result in results:
            if result['to'].get('uid') == 'orphan':
                for k in ('original_title', 'translated_title'):
                    result['to'][k] = ''
                result['to']['acronym'] = result['to']['to'].split('#')[0]
            _from = result.pop('from')
            try:
                data[_from].append(result)
            except KeyError:
                data[_from] = [result]
            result['to']['translations'] = sorted(
                result['to']['translations'],
                key=language_sort(result['to']['root_lang']),
            )
        for entry in data:
            data[entry] = sorted(data[entry], key=sort_parallels_type_key)

        if self.is_vinaya(uid):
            for entry in data:
                data[entry] = sorted(data[entry], key=self.sort_by_root_lang)

        return data, 200

    def sort_by_root_lang(self, item):
        return 0 if item['to']['root_lang'] == 'pli' else 1

    def is_vinaya(self, uid):
        db = get_db()
        uid = re.sub(r'\d+$', '', uid)
        full_path = db.aql.execute(SUTTA_PATH, bind_vars={'uid': uid}).next()
        return '/pitaka/vinaya' in full_path['full_path']


class ParallelsLite(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        db = get_db()
        uid = uid.replace('/', '-').strip('-')
        data = db.aql.execute(PARALLELS_LITE, bind_vars={'uid': uid})
        return list(data), 200


class Sutta(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, author_uid=''):
        """
        Send Complete information set for sutta-view for given uid.
        ---
        parameters:
           - in: path
             name: author
             type: string
           - in: path
             name: uid
             type: string
           - in: query
             name: lang
             type: string
        responses:
            200:
                description: Complete information set for sutta-view
                schema:
                    id: sutta
                    type:  object
                    properties:
                        root_text:
                            type: object
                            properties:
                                uid:
                                    type: string
                                lang:
                                    type: string
                                is_root:
                                    type: boolean
                                title:
                                    type: string
                                author:
                                    type: string
                                author_uid:
                                    type: string
                                text:
                                    type: string
                        translation:
                            type: object
                            properties:
                                uid:
                                    type: string
                                lang:
                                    type: string
                                title:
                                    type: string
                                author:
                                    type: string
                                text:
                                    type: string
                        suttaplex:
                            $ref: '#/definitions/Suttaplex'
                        neighbours:
                            type: object
                            properties:
                                next:
                                    type: object
                                    properties:
                                        author:
                                            type: string
                                        title:
                                            type: string
                                        uid:
                                            type: string
                                previous:
                                    type: object
                                    properties:
                                        author:
                                            type: string
                                        title:
                                            type: string
                                        uid:
                                            type: string

        """
        lang = request.args.get('lang', 'en')
        site_lang = request.args.get('siteLanguage', 'en')

        db = get_db()

        results = db.aql.execute(
            SUTTA_VIEW,
            bind_vars={'uid': uid, 'language': lang, 'author_uid': author_uid},
        )

        result = results.next()

        if (
            result['root_text'] is None
            and result['translation'] is None
            and uid.count('.') == 1
        ):
            vagga_uid = uid[:uid.find('.')]
            sutta_number = uid[uid.find('.') + 1:]
            vagga_children_uids = list(
                db.aql.execute(
                    VAGGA_CHILDREN,
                    bind_vars={'uid': vagga_uid}
                )
            )
            for child_uid in vagga_children_uids:
                if child_uid.count('-'):
                    child_range = child_uid[child_uid.find('.')+1:]
                    result = self.get_sutta_view(
                        author_uid,
                        child_range,
                        child_uid,
                        db,
                        lang,
                        result,
                        sutta_number,
                        vagga_children_uids
                    )

        if (
            result['root_text'] is None
            and result['translation'] is None
            and uid[:3].lower() == 'dhp'
        ):
            sutta_number = uid.strip('dhp')
            vagga_children_uids = list(
                db.aql.execute(
                    VAGGA_CHILDREN,
                    bind_vars={'uid': 'dhp'}
                )
            )
            for child_uid in vagga_children_uids:
                if child_uid.count('-'):
                    child_range = child_uid.strip('dhp')
                    result = self.get_sutta_view(
                        author_uid,
                        child_range,
                        child_uid,
                        db,
                        lang,
                        result,
                        sutta_number,
                        vagga_children_uids
                    )

        self.convert_paths_to_content(result)
        for k in ('root_text', 'translation'):
            if doc := result[k]:
                self.convert_paths_to_content(doc)
                self.calculate_sutta_neighbors(uid, doc, k, site_lang)

        self.get_candidate_authors(uid, author_uid, site_lang, result)
        return result, 200

    def get_sutta_view(
        self,
        author_uid,
        child_range,
        child_uid,
        db,
        lang,
        result,
        sutta_number,
        vagga_children_uids
    ):
        parsed_sutta_number = sutta_number
        range_begin = child_range[:child_range.find('-')]
        range_end = child_range[child_range.find('-') + 1:]
        if '-' in parsed_sutta_number:
            parsed_sutta_number = parsed_sutta_number.split('-')[1]
        if int(range_begin) <= int(parsed_sutta_number) <= int(range_end):
            results = db.aql.execute(
                SUTTA_VIEW,
                bind_vars={
                    'uid': child_uid,
                    'language': lang,
                    'author_uid': author_uid
                }
            )
            result = results.next()
            result['range_uid'] = child_uid
            result['vaggaBegin'] = vagga_children_uids[0]
            result['vaggaEnd'] = vagga_children_uids[-1]
        return result

    @staticmethod
    def convert_paths_to_content(doc):
        conversions = (
            ('file_path', 'text', lambda f: f.read()),
            ('markup_path', 'markup', lambda f: f.read()),
            ('strings_path', 'strings', json.load),
        )

        for from_prop, to_prop, load_func in conversions:
            if (to_prop not in doc) and (from_prop in doc):
                file_path = doc.pop(from_prop)
                if file_path is None:
                    doc[to_prop] = None
                else:
                    with open(file_path) as f:
                        doc[to_prop] = load_func(f)

    @staticmethod
    def calculate_sutta_neighbors(uid, doc, text_type, site_lang):
        db = get_db()
        sutta_prev_next = {'prev_uid': '', 'next_uid': ''}
        possible_parent_uid = get_possible_parent_uid(uid)
        all_doc_uid = list(
            db.aql.execute(
                ALL_DOC_UID_BY_ROOT_UID,
                bind_vars={
                    'uid': uid,
                    'possibleParentUid': possible_parent_uid
                }
            )
        )
        if uid in all_doc_uid:
            uid_index = all_doc_uid.index(uid)
            if uid_index != 0:
                sutta_prev_next['prev_uid'] = all_doc_uid[uid_index - 1]
            if uid_index != len(all_doc_uid) - 1:
                sutta_prev_next['next_uid'] = all_doc_uid[uid_index + 1]

        if doc['previous']:
            doc['previous']['uid'] = sutta_prev_next.get('prev_uid', '')
        if doc['next']:
            doc['next']['uid'] = sutta_prev_next.get('next_uid', '')

        for k, v in sutta_prev_next.items():
            name_result = list(
                db.aql.execute(
                    SUTTA_NAME,
                    bind_vars={'uid': v, 'lang': site_lang}
                )
            )
            if k == 'next_uid' and doc['next']:
                doc['next']['name'] = name_result[0]
            elif k == 'prev_uid' and doc['previous']:
                doc['previous']['name'] = name_result[0]

    @staticmethod
    def get_candidate_authors(uid, author_uid, lang, doc):
        db = get_db()
        candidate_authors = db.aql.execute(
            CANDIDATE_AUTHORS,
            bind_vars={'uid': uid, 'lang': lang, 'author_uid': author_uid}
        ).next()
        doc['candidate_authors'] = candidate_authors


class SegmentedSutta(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, author_uid=''):
        db = get_db()
        lang = request.args.get('lang', 'en')
        results = db.aql.execute(
            SEGMENTED_SUTTA_VIEW,
            bind_vars={'uid': uid, 'author_uid': author_uid, 'lang': lang}
        )
        result = next(results)
        if not result:
            return {'msg': 'Not Found'}, 200

        data = {k: json_load(v) for k, v in result.items()}
        data['keys_order'] = list(data['html_text'].keys())

        return data, 200


class ExtractSuttaFromRangeSutta(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, author_uid=''):
        db = get_db()
        results = db.aql.execute(
            "FOR n IN expanded_sutta_uids filter @uid in n.expanded_uids return n.range_uid",
            bind_vars={'uid': uid}
        )
        result = list(results)
        range_uid = ''
        if not result:
            return {'msg': 'Not Found'}, 200
        else:
            range_uid = result[0]

        if not range_uid:
            return {'msg': 'Not Found'}, 200

        lang = request.args.get('lang', 'en')
        range_sutta_result = db.aql.execute(
            SEGMENTED_SUTTA_VIEW,
            bind_vars={'uid': range_uid, 'author_uid': author_uid, 'lang': lang}
        )
        range_sutta = next(range_sutta_result)
        data = {k: json_load(v) for k, v in range_sutta.items()}

        text_keys = ['html_text', 'root_text', 'translation_text', 'variant_text', 'reference_text']
        for text_key in text_keys:
            if text_key in data:
                data[text_key] = {k: v for k, v in data[text_key].items() if k.split(':')[0] == uid}

        data['keys_order'] = list(data['html_text'].keys())

        return data, 200


class Currencies(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send list of available currencies.
        ---
        responses:
            200:
                schema:
                    type: object
                    properties:
                        default_currency_index:
                            type: number
                        currencies:
                            type: array
                            items:
                                $ref: '#/definitions/currency'
        definitions:
            currency:
                type: object
                properties:
                    american_express:
                        type: boolean
                    name:
                        type: string
                    symbol:
                        type: string
        """
        db = get_db()

        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )

        data = db.aql.execute(CURRENCIES, bind_vars={'language': language})

        currencies = []
        default_currency_index: int = None

        DEFAULT_CURRENCY = 'USD'

        for i, x in enumerate(data):
            currencies.append(x)
            if x['symbol'] == DEFAULT_CURRENCY:
                default_currency_index = i

        response_data = {
            'default_currency_index': default_currency_index,
            'currencies': currencies,
        }

        return response_data, 200


class Paragraphs(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send list of textual information paragraphs for the sutta view
        ---
        responses:
            200:
                schema:
                    id: paragraphs
                    type: array
                    items:
                        $ref: '#/definitions/paragraph'

        definitions:
            paragraph:
                type: object
                properties:
                    uid:
                        type: string
                    description:
                        type: string
        """
        db = get_db()

        data = db.aql.execute(PARAGRAPHS)

        return list(data), 200


class Donations(Resource):
    def post(self):
        body = request.get_json()
        if body is not None and all(item in list(body.keys()) for item in ['currency', 'amount', 'frequency']):
            currency = body['currency']
            amount = body['amount']
            frequency = body['frequency']

            stripe.api_key = os.environ.get('STRIPE_SECRET')

            incoming_uri = urlparse(request.url)
            cancel_url = '{uri.scheme}://{uri.netloc}/donate-now'.format(uri=incoming_uri)
            success_url = '{uri.scheme}://{uri.netloc}/donation-success'.format(uri=incoming_uri)

            if frequency == 'oneTime':
                session = stripe.checkout.Session.create(
                    success_url=success_url,
                    cancel_url=cancel_url,
                    payment_method_types=['card'],
                    line_items=[{
                        'price_data': {
                            'currency': currency,
                            'unit_amount': amount,
                            'product_data': {
                                'name': 'Donation'
                            },
                        },
                        'quantity': 1,
                    }],
                    mode='payment',
                )
            elif frequency == 'monthly':
                session = stripe.checkout.Session.create(
                    success_url=success_url,
                    cancel_url=cancel_url,
                    payment_method_types=['card'],
                    line_items=[{
                        'price_data': {
                            'currency': currency,
                            'unit_amount': amount,
                            'product_data': {
                                'name': 'Monthly Donation'
                            },
                            'recurring': {
                                'interval': 'month'
                            }
                        },
                        'quantity': 1,
                    }],
                    mode='subscription',
                )
            else:
                return {'err_message': 'Select either one time or monthly'}, 400
            return {'id': session.id}, 200
        return {'err_message': 'Provide mandatory property such as currency, amount and frequency'}, 400


class Images(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, division, vol, page):
        """
        Send list of images for given division.
        ---
        responses:
            200:
                schema:
                    id: images
                    type: array
                    items:
                        type: object
                        properties:
                            name:
                                type: string
                            page:
                                type: number
        """
        db = get_db()

        data = db.aql.execute(
            IMAGES, bind_vars={'division': division, 'vol': vol, 'page': page}
        )

        return list(data), 200


class Epigraphs(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        """
        Send list of random epigraphs
        ---
        responses:
            200:
                schema:
                    id: epigraphs
                    type: array
                    items:
                        type: object
                        properties:
                            uid:
                                type: string
                            epigraph:
                                type: string
        """
        db = get_db()

        try:
            limit = int(request.args.get('limit', '10'))
        except ValueError:
            limit = 10

        data = db.aql.execute(EPIGRAPHS, bind_vars={'number': limit, 'lang': 'en'})

        return list(data), 200


class WhyWeRead(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        """
        Send list of random why_we_read quotes.
        ---
        responses:
            200:
                schema:
                    id: why_we_read
                    type: array
                    items:
                        type: string
        """
        db = get_db()

        try:
            limit = int(request.args.get('limit', '10'))
        except ValueError:
            limit = 10

        data = db.aql.execute(WHY_WE_READ, bind_vars={'number': limit, 'lang': 'en'})

        return list(data), 200


class DataForHomepage(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        db = get_db()

        try:
            limit = int(request.args.get('limit', '10'))
        except ValueError:
            limit = 10

        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )

        epigraphs_data = list(
            db.aql.execute(
                EPIGRAPHS,
                bind_vars={'number': limit, 'lang': language}
            )
        )

        if not epigraphs_data and language != 'en':
            epigraphs_data = list(
                db.aql.execute(
                    EPIGRAPHS,
                    bind_vars={'number': limit, 'lang': 'en'}
                )
            )

        why_we_read_data = list(
            db.aql.execute(
                WHY_WE_READ,
                bind_vars={'number': limit, 'lang': language}
            )
        )

        if not why_we_read_data and language != 'en':
            why_we_read_data = list(
                db.aql.execute(
                    WHY_WE_READ,
                    bind_vars={'number': limit, 'lang': 'en'}
                )
            )

        tipitaka_menu_data = list(db.aql.execute(
            TIPITAKA_MENU, bind_vars={'language': language})
        )

        return {
            'epigraphs': epigraphs_data,
            'whyweread': why_we_read_data,
            'tipitaka': tipitaka_menu_data
        }, 200


class Expansion(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=long_cache_timeout)
    def get(self):
        """
        Send list of uid expansion results to suttaplex view
        ---
        responses:
            expansion:
                type: array
                items:
                    type: object
                    properties:
                        <expansion_name>:
                            type: array
                            items:
                                type: string
        """
        db = get_db()

        data = db.aql.execute(EXPANSION)

        return list(data), 200


class CollectionUrlList(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, collection=None):
        """
        Accept list of languages in format `?languages=lang1,lang2,...`
        ---
        parameters:
           - in: query
             name: languages
             type: string
             required: true
           - in: query
             name: include_root
             type: boolean
             required: false

        responses:
            200:
                type: object
                properties:
                    menu:
                        type: array
                        items:
                            type: string
                    suttaplex:
                        type: array
                        items:
                            type: string
                    texts:
                        type: array
                        items:
                            type: object
                            properties:
                                uid:
                                    type: string
                                translations:
                                    type: array
                                    items:
                                        type: object
                                        properties:
                                            lang:
                                                type: string
                                            authors:
                                                type: array
                                                items:
                                                    type: string
        """
        languages = request.args.get('languages', '')
        root_lang = request.args.get('root_lang', 'false').lower()
        root_lang = {'true': True, 'false': False}[root_lang]
        if not languages and not root_lang:
            return 'Language not specified', 404

        languages = languages.split(',') if languages else []

        db = get_db()
        return next(
            db.aql.execute(
                PWA.MENU, bind_vars={'languages': languages, 'include_root': root_lang}
            )
        )


class StripePublicKey(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        key = os.environ.get('PUBLISHABLE_KEY')
        if key:
            return {"public_key": key}, 200
        else:
            return 'Key not found', 404


class PWASizes(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        try:
            data = list(db.aql.execute(PWA.SIZES))[0]
            return data, 200
        except IndexError:
            return 'Language not found', 404


class Redirect(Resource):
    def get(self, url):
        print(url)
        db = get_db()
        parts = url.split('/')
        if len(parts) == 2:
            lang, uid = parts
            if lang == 'pi':
                lang = 'pli'
            languages = db.collection('language')
            if lang in languages:
                hits = db.aql.execute(
                    '''
                    LET modern = (FOR text IN sc_bilara_texts
                        FILTER text.lang == @lang
                        FILTER text.uid == @uid
                        RETURN {author_uid: text.muids[2], legacy: false})

                    LET legacy = (FOR text IN html_text
                        FILTER text.lang == @lang
                        FILTER text.uid == @uid
                        RETURN {author_uid: text.author_uid, legacy: true})

                    RETURN APPEND(modern, legacy)
                ''',
                    bind_vars={"lang": lang, "uid": uid},
                ).next()
                if hits:
                    author_uid = hits[0]['author_uid']
                    return "Redirect", 301, {'Location': f'/{uid}/{lang}/{author_uid}'}
                else:
                    nav_docs = db.collection('super_nav_details')
                    if uid in nav_docs:
                        return "Redirect", 301, {'Location': f'/{uid}'}

        return "Not found", 403


class Transliterate(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, target, text):
        return transliterate.process('ISOPali', target, text)


class TransliteratedSutta(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, target):
        db = get_db()

        results = db.aql.execute(SUTTA_SINGLE_PALI_TEXT, bind_vars={'uid': uid})
        result = next(results)
        if not result:
            return {'error': 'Not Found'}, 404

        sutta_texts = {k: json_load(v) for k, v in result.items()}
        for key, value in sutta_texts[uid].items():
            sutta_texts[uid][key] = transliterate.process(
                'ISOPali',
                target,
                value,
            )

        return sutta_texts[uid]


class SuttaFullPath(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        db = get_db()
        full_path = db.aql.execute(SUTTA_PATH, bind_vars={'uid': uid}).next()
        if full_path['full_path'].count('/sutta/minor') > 1:
            if (
                full_path['full_path'].count('dharmapadas') > 0
                and full_path['full_path'].count('kn/dhp') > 0
            ):
                full_path['full_path'] = full_path['full_path'].replace(DHP_PATH, '')
            if (
                uid == 'dhp'
                and full_path['full_path'].count('dharmapadas') > 0
                and full_path['full_path'].count('/kn') > 0
            ):
                full_path['full_path'] = full_path['full_path'].replace(DHP_PATH, '')
        return full_path


class PaliReferenceEdition(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        pali_references = list(db.aql.execute(SUTTA_PALI_REFERENCE))
        return pali_references or ({'error': 'Not Found'}, 404)


class PublicationInfo(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid, lang, author_uid):
        db = get_db()
        publication_info = None
        if lang == 'pli':
            publication_info = list(db.aql.execute(PLI_SUTTA_PUBLICATION_INFO))
        else:
            publication_info = list(
                db.aql.execute(
                    SUTTA_PUBLICATION_INFO,
                    bind_vars={
                        'uid': uid,
                        'lang': lang,
                        'authorUid': author_uid
                    }
                )
            )
        return publication_info or ({'error': 'Not Found'}, 404)


class AvailableVoices(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        db = get_db()
        data = list(db.aql.execute(AVAILABLE_VOICES, bind_vars={'uid': uid}))
        return data, 200


class RootEdition(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('root_edition').all()
        return list(data), 200


class Guides(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('guides').all()
        return list(data), 200


class Shortcuts(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('shortcuts').all()
        return list(data), 200


class CreatorBio(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('creator_bio').all()
        return list(data), 200


class AbbreviationTexts(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = list(db.aql.execute(ABBREVIATION_SUPER_NAME_ACRONYM))
        return data, 200


class AbbreviationEditions(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('uid_expansion_edition').all()
        return list(data), 200


class AbbreviationSchools(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('uid_expansion_school').all()
        return list(data), 200


class FallenLeaves(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('fallen_leaves').all()
        return list(data), 200


class MapData(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self):
        db = get_db()
        data = db.collection('map_data').all()
        return list(data), 200


class NavigationData(Resource):
    @cache.cached(key_prefix=make_cache_key, timeout=default_cache_timeout)
    def get(self, uid):
        db = get_db()

        full_path = self.fetch_full_path_by_uid(db, uid)
        full_path_list = full_path['full_path'].split('/')
        full_path_list.append(uid)

        language = request.args.get(
            'language', current_app.config.get('DEFAULT_LANGUAGE')
        )

        bind_vars = {'language': language, 'uids': full_path_list}
        menu_data_list = list(db.aql.execute(NAVIGATION_QUERY, bind_vars=bind_vars))
        menu_data_dict = {data['uid']: data for data in menu_data_list}

        navigation_data = []
        current_url = '/pitaka'
        full_path_list = [item for item in full_path_list if item not in ['', 'pitaka']]
        for navigation_index, uid in enumerate(full_path_list, start=1):
            bind_vars['submenu_id'] = uid
            if menu_data := menu_data_dict.get(uid):
                has_children = (
                        len(menu_data) > 0 and
                        isinstance(menu_data.get('children'), list) and
                        any(child.get('node_type') == 'branch' for child in menu_data['children'])
                )

                current_url += f'/{uid}'
                if not has_children or self.is_patimokkha(menu_data['uid']):
                    current_url = f'/{uid}'

                if menu_data['node_type'] != 'leaf' and all(
                    item['uid'] != uid for item in navigation_data
                ):
                    navigation_item = {
                        'uid': uid,
                        'title': (
                            menu_data['acronym']
                            or menu_data['root_name']
                            or menu_data['translated_name']
                        ),
                        'url': current_url,
                        'type': 'navigation',
                        'index': navigation_index,
                    }
                    navigation_data.append(navigation_item)

        return navigation_data, 200

    def fetch_full_path_by_uid(self, db, uid):
        full_path = db.aql.execute(SUTTA_PATH, bind_vars={'uid': uid}).next()
        if full_path['full_path'].count('/sutta/minor') > 1:
            if (
                full_path['full_path'].count('dharmapadas') > 0
                and full_path['full_path'].count('kn/dhp') > 0
            ):
                full_path['full_path'] = full_path['full_path'].replace(DHP_PATH, '')
            if (
                uid == 'dhp'
                and full_path['full_path'].count('dharmapadas') > 0
                and full_path['full_path'].count('/kn') > 0
            ):
                full_path['full_path'] = full_path['full_path'].replace(DHP_PATH, '')
        return full_path

    def is_patimokkha(self, uid):
        return uid.find('-pm') > -1
