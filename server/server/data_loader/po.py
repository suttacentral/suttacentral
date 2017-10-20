import logging
import re
from typing import List

import polib
import regex
from arango.database import Database
from arango.exceptions import DocumentInsertError

from .util import iter_sub_dirs


def remove_leading_zeros(string):
    return regex.sub(r'([A-Za-z])0+', r'\1', string)


def clean_html(string):
    out = regex.sub(r'<html>.*<body>', r'', string, flags=regex.DOTALL).replace('\n', ' ')
    out = regex.sub(r'>\s*VAR.*?<', '><', out)
    out = out.replace('</p>', '</p>\n')
    out = out.replace('</blockquote>', '</p>\n')
    return out


def load_info(po_file):
    """Info files contain metadata about the project"""
    po = polib.pofile(po_file)

    data = {entry.msgid: entry.msgstr for entry in po}

    return {
        "author": data['translation_author_uid'],
        "author_blurb": data['translation_author_blurb'],
        "root_author": data['root_author_uid'],
        "root_author_blurb": data['root_author_blurb'],
    }


def extract_strings_from_po_file(po_file):
    markup = []
    msgids = []
    msgstrs = []

    po = polib.pofile(po_file)

    for entry in po:
        markup.append(entry.comment + f'<sc-seg id="{entry.msgctxt}"></sc-seg>')
        if entry.msgid:
            msgids.append((entry.msgctxt, entry.msgid))
        if entry.msgstr:
            msgstrs.append((entry.msgctxt, entry.msgstr))

    markup = clean_html(''.join(markup))

    return {
        "markup": markup,
        "msgids": msgids,
        "msgstrs": msgstrs
    }


def process_dir(change_tracker, po_dir, info):
    """Process po files in folder
    
    Note that this function operates recursively, a file called "info.po"
    will apply data to all files in the same folder, or in subfolders,
    but not of course parent or sibling folders.
    
    """

    info_file = next(po_dir.glob('info.po'), None)

    # don't modify passed object
    info = info.copy()

    if info_file:
        local_info = load_info(info_file)
        info.update(local_info)

    po_files = (f for f in po_dir.glob('*.po') if f.stem != 'info')
    for po_file in po_files:
        if change_tracker and not change_tracker.is_file_new_or_changed(po_file):
            continue

        data = extract_strings_from_po_file(po_file)
        uid = remove_leading_zeros(po_file.stem)

        # This doc is for root strings
        yield {
            "uid": uid,
            "markup_uid": uid,
            "lang": info['root_lang'],
            "author": info['root_author'],
            "author_blurb": {
                info['tr_lang']: info['root_author_blurb']
                # Note there might be blurbs in other languages
                # also root language blurb probably wont exist
                # because that would be i.e. in pali!
            },
            "strings": data['msgids']
        }

        # This doc is for the translated strings
        yield {
            "uid": uid,
            "markup_uid": uid,
            "lang": info['tr_lang'],
            "author": info['author'],
            "author_blurb": {
                info['tr_lang']: info['author_blurb']
            },
            "strings": data['msgstrs']
        }

        # this doc is for the markup
        yield {
            "uid": uid,
            "markup": data['markup']
        }

    for sub_folder in po_dir.glob('*/'):
        yield from process_dir(change_tracker, sub_folder, info=info)


def insert_or_update(collection, doc):
    try:
        collection.insert(doc)
    except DocumentInsertError as e:
        collection.update(doc)


def load_po_texts(change_tracker, po_dir, db):
    """ Load strings and markup from po files into database
    
    each strings entry looks like this:

    {
        "path": "en/dn2/sujato",
        "lang": "en",
        "uid": "dn2",
        "author": "sujato",
        "author_blurb": {
            "en": "Awesome translation by Sujato"
        },
        "markup" "dn2",
        "strings": [...]
    }
    
    while a markup entry looks like this:
    
    {
        "uid": "dn2",
        "markup": "..."
    }
    """

    print('Loading PO texts')

    # It's a little hard to properly manage deleted po files,
    # as it happens deletion is really rare: so if a deletion 
    # does occur we just nuke and rebuild.

    deleted_po = [f for f in change_tracker.deleted if f.endswith('.po')]
    if deleted_po:
        change_tracker = None
        db['po_markup'].truncate()
        db['po_strings'].truncate()

    # an example path to a po file might be:
    # /dn/en/dn01 or /an/en/an01/an01.001.po

    # We expect the project dir name to be the division name
    for division_dir in iter_sub_dirs(po_dir):
        root_lang = db['root'][division_dir.stem]['language']

        if not root_lang:
            logging.error(f'Division {division_dir.stem} not recognized')
            continue

        for tr_lang_dir in iter_sub_dirs(division_dir):
            tr_lang = tr_lang_dir.stem

            docs = process_dir(
                change_tracker,
                tr_lang_dir,
                info={
                    'tr_lang': tr_lang,
                    'root_lang': root_lang
                })

            for i, doc in enumerate(docs):
                if 'markup' in doc:
                    doc['_key'] = f"{doc['uid']}_markup"
                    collection = db.collection('po_markup')
                    insert_or_update(collection, doc)

                else:
                    doc['_key'] = f'{doc["lang"]}_{doc["uid"]}_{doc["author"]}'
                    collection = db.collection('po_strings')
                    insert_or_update(collection, doc)

    generate_htmls(db)


def generate_html(markup: str, translation: List[List[str]]) -> str:
    """ Take HTML markup and insert translated string between sc-seg tags with id matching text uid.
    '<sc-seg id="[uid]"></sc-seg>'

    Args:
        markup: Html Pootle markup
        translation: List of pairs, [uid, string]

    Returns:
        HTML generated from markup and string list

    Examples:
        >>> markup = '<p class="division"><sc-seg id="dn28:1.1"></sc-seg></p>'
        >>> translation = [['dn28:1.1', 'translated text']]
        >>> generate_html(markup, translation)
        '<p class="division"><sc-seg id="dn28:1.1">translated text</sc-seg></p>'
    """
    translator = {string[0]: string[1] for string in translation}

    pattern = re.compile('|'.join(re.escape(f'{key}">') for key in translator.keys()))
    html = pattern.sub(lambda x: x.group() + translator[x.group()[:-2]], markup)
    return html


def generate_htmls(db: Database):
    markups = db['po_markup']
    texts = db['po_strings']
    po_htmls = db['po_htmls']
    docs = []

    markups = markups.all()
    for markup in markups:
        html_markup = markup['markup'].replace('\\"', '"')
        for translation in texts.find({'uid': markup['uid']}):
            html = generate_html(html_markup, translation['strings'])
            docs.append({
                'uid': markup['uid'],
                'lang': translation['lang'],
                'author': translation['author'],
                'html': html
            })
    po_htmls.import_bulk(docs)
