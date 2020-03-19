import json
from .util import json_load
import regex
from common import arangodb
import os
import glob

def createBilaraCollections(db):
    if not db.has_collection('bilara_root'):
        db.create_collection('bilara_root')

    if not db.has_collection('bilara_translation'):
        db.create_collection('bilara_translation')

    if not db.has_collection('bilara_reference'):
        db.create_collection('bilara_reference')

    if not db.has_collection('bilara_variant'):
        db.create_collection('bilara_variant')

    if not db.has_collection('bilara_html'):
        db.create_collection('bilara_html')

    if not db.has_collection('bilara_comment'):
        db.create_collection('bilara_comment')

def load_root(db, root_dir):
    print('Loading bilara root')
    bilara_root_collection = db['bilara_root']
    docs = []
    g = os.walk(root_dir)
    for path,dir_list,file_list in g:
        for file_name in file_list:
            if file_name.endswith('.json'):
                docs.append(
                    {
                        #'_key': getLang(path) + '_' + file_name[0:file_name.find('_')],
                        'muids': getRootMuids(path),
                        'uid': file_name[0:file_name.find('_')],
                        'lang': getRootLang(path),
                        'strings': json_load(os.path.join(path, file_name))
                    }
                )

    bilara_root_collection.import_bulk_logged(docs, wipe=True)

def getRootLang(path):
    if path.find('/root/pli/ms') != -1:
        return 'pli'
    elif path.find('/root/en') != -1:
        return 'en'
    elif path.find('/root/de') != -1:
        return 'de'
        
def getRootMuids(path):        
    if path.find('/root/pli/ms') != -1:
        return 'root-pli-ms'
    elif path.find('/root/en') != -1:
        return 'root-en'
    elif path.find('/root/de') != -1:
        return 'root-de'
        
def load_translation(db, translation_dir):
    print('Loading bilara translation')
    bilara_translation_collection = db['bilara_translation']
    docs = []
    g = os.walk(translation_dir)
    for path,dir_list,file_list in g:
        for file_name in file_list:
            if file_name.endswith('.json'):
                docs.append(
                    {
                        #'_key': getLang(path) + '_' + file_name[0:file_name.find('_')],
                        'muids': getTranslationMuids(path),
                        'uid': file_name[0:file_name.find('_')],
                        'lang': getTranslationLang(path),
                        'author': getTranslationAuthor(path),
                        'strings': json_load(os.path.join(path, file_name))
                    }
                )

    bilara_translation_collection.import_bulk_logged(docs, wipe=True)
    
def getTranslationMuids(path):
    if path.find('/translation/jpn') != -1:
        return 'translation-jpn'
    elif path.find('/translation/en') != -1:
        return 'translation-en'
    elif path.find('/translation/de') != -1:
        return 'translation-de'

def getTranslationLang(path):
    if path.find('/translation/jpn') != -1:
        return 'jpn'
    elif path.find('/translation/en') != -1:
        return 'en'
    elif path.find('/translation/de') != -1:
        return 'de'
        
def getTranslationAuthor(path):
    if path.find('sabbamitta') != -1:
        return 'sabbamitta'
    elif path.find('brahmali') != -1:
        return 'brahmali'
    elif path.find('sujato') != -1:
        return 'sujato'
    elif path.find('kaz') != -1:
        return 'kaz'
    else:
        return 'unknown'
        
def load_comment(db, comment_dir):
    print('Loading bilara comment')
    bilara_comment_collection = db['bilara_comment']
    docs = []
    g = os.walk(comment_dir)
    for path,dir_list,file_list in g:
        for file_name in file_list:
            if file_name.endswith('.json'):
                docs.append(
                    {
                        #'_key': getLang(path) + '_' + file_name[0:file_name.find('_')],
                        'muids': getCommentMuids(path),
                        'uid': file_name[0:file_name.find('_')],
                        'lang': getCommentLang(path),
                        'author': getCommentAuthor(path),
                        'strings': json_load(os.path.join(path, file_name))
                    }
                )

    bilara_comment_collection.import_bulk_logged(docs, wipe=True)

def getCommentLang(path):
    if path.find('/comment/en') != -1:
        return 'en'

def getCommentMuids(path):
    if path.find('/comment/en') != -1:
        return 'comment-en'
        
def getCommentAuthor(path):
    if path.find('brahmali') != -1:
        return 'brahmali'
    elif path.find('sujato') != -1:
        return 'sujato'

def load_variant(db, comment_dir):
    print('Loading bilara variant')
    bilara_variant_collection = db['bilara_variant']
    docs = []
    g = os.walk(comment_dir)
    for path,dir_list,file_list in g:
        for file_name in file_list:
            if file_name.endswith('.json'):
                docs.append(
                    {
                        #'_key': getLang(path) + '_' + file_name[0:file_name.find('_')],
                        'muids': 'variant-pli',
                        'uid': file_name[0:file_name.find('_')],
                        'lang': 'pli',
                        'author': '',
                        'strings': json_load(os.path.join(path, file_name))
                    }
                )

    bilara_variant_collection.import_bulk_logged(docs, wipe=True)

def load_reference(db, reference_dir):
    print('Loading bilara reference')
    bilara_reference_collection = db['bilara_reference']
    docs = []
    g = os.walk(reference_dir)
    for path,dir_list,file_list in g:
        for file_name in file_list:
            if file_name.endswith('.json'):
                docs.append(
                    {
                        #'_key': getLang(path) + '_' + file_name[0:file_name.find('_')],
                        'muids': 'reference-pli-ms',
                        'uid': file_name[0:file_name.find('_')],
                        'lang': 'pli',
                        'author': '',
                        'strings': json_load(os.path.join(path, file_name))
                    }
                )

    bilara_reference_collection.import_bulk_logged(docs, wipe=True)

def load_html(db, html_dir):
    print('Loading bilara html')
    bilara_html_collection = db['bilara_html']
    docs = []
    g = os.walk(html_dir)
    for path,dir_list,file_list in g:
        for file_name in file_list:
            if file_name.endswith('.json'):
                docs.append(
                    {
                        #'_key': getLang(path) + '_' + file_name[0:file_name.find('_')],
                        'muids': 'html-pli-ms',
                        'uid': file_name[0:file_name.find('_')],
                        'lang': 'pli',
                        'author': '',
                        'strings': json_load(os.path.join(path, file_name))
                    }
                )

    bilara_html_collection.import_bulk_logged(docs, wipe=True)
