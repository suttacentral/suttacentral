import json
import regex
import subprocess
from collections import OrderedDict

import polib

from .util import humansortkey

def remove_leading_zeros(string):
    return re.sub(r'([A-Za-z])0+', r'\1', string)

def clean_html(string):
    out = regex.sub(r'<html>.*<body>', r'', string, flags=regex.DOTALL).replace('\n', ' ')
    out = regex.sub(r'>\s*VAR.*?<', '><', out)
    out = out.replace('</p>', '</p>\n')
    out = out.replace('</blockquote>', '</p>\n')
    return out
    

def extract_strings_from_po_file(po_file):
    markup = []
    msgids = []
    msgstrs = []
    
    po = polib.pofile(po_file)
    
    for entry in po:
        ctx = entry.msgctxt
        
        markup.append(entry.comment + f'<sc-seg id="{entry.msgctxt}"></sc-seg>')
        if entry.msgid:
            msgids.append( (entry.msgctxt, entry.msgid) )
        if entry.msgstr:
            msgstrs.append( (entry.msgctxt, entry.msgstr) )
            
    markup = clean_html(''.join(markup))
    
    yield {
        "uid": po_file.stem,
        "markup": markup,
        "msgids": msgids,
        "msgstrs": msgstrs
    }

def load_po_texts(change_tracker, po_dir, db):
    print('Loading PO texts')
    
    # Handle deleted po files
    for po_file in change_tracker.deleted:
        if po_file.suffix != '.po':
            continue
        author_uid, tr_language, root_language = po_file.relative_to(po_dir).parts[:3]
        uid = po_file.stem
        
        self.db.aql.execute('''
            FOR entry IN po_text
                FILTER entry.uid == @uid
                FILTER entry.tr_language == @tr_language
                FILTER entry.root_language == @root_language
                FILTER entry.author == @author_uid
                REMOVE entry FROM po_text
            ''', bind_vars={
                    "author_uid": author_uid,
                    "tr_language": tr_language,
                    "root_language": root_language,
                    "uid": uid
                }
            )
    
    # Add new or changed po files
    for author_dir in po_dir.iterdir():
        if not author_dir.is_dir():
            continue
        
        for tr_language_dir in author_dir.iterdir():
            if not tr_language_dir.is_dir():
                continue
        
            for root_language_dir in tr_language_dir.iterdir():
                if not root_language_dir.is_dir():
                    continue
                
                params = {
                    "author_uid": author_dir.stem,
                    "tr_language": tr_language_dir.stem,
                    "root_language": root_language_dir.stem,
                }
                
                po_data = []
                
                po_files = sorted(source_dir.glob('**/*.po'), key=humansortkey)
                
                for po_file in po_files:
                    if not change_tracker.is_file_new_or_changed(po_file):
                        continue
                    doc = extract_strings_from_po_file(po_file)
                    doc.update(params)
                    po_data.append(doc)
                
                self.db['po_text'].import_bulk(po_data, on_duplicate="replace")
                
