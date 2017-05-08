from invoke import task
from pathlib import Path
import subprocess
import config
import polib
import json
import re
from server.util import humansortkey
from collections import OrderedDict


def remove_leading_zeros(string):
    return re.sub(r'([A-Za-z])0+', r'\1', string)

def clean_html(string):
    out = re.sub(r'<html>.*<body>', r'', string, flags=re.DOTALL).replace('\n', ' ')
    out = re.sub(r'>\s*VAR.*?<', '><', out)
    out = out.replace('</p>', '</p>\n')
    out = out.replace('</blockquote>', '</p>\n')
    return out
    

def download_po_files():
    in_dir = 'pootle@vps.suttacentral.net:/home/pootle/translations/*'
    out_dir = config.tmp_dir / 'po'
    subprocess.check_call('rsync -zarv  --prune-empty-dirs --include "*/"  --include="*.po" --exclude="*" {!s} {!s}'.format(in_dir, out_dir), shell=True)
    return out_dir

@task
def process_po_files(ctx=None):
    seg_dir = config.data_dir / 'segmented_texts'
    
    for entry in config.po_mappings:
        po_path = entry.get('po_path')
        msgstr_to = entry.get('msgstr_to')
        msgid_to = entry.get('msgid_to')
        markup_to = entry.get('markup_to')
        
        source_dir = config.po_dir / po_path
        if not source_dir.exists():
            continue
        
        po_files = sorted(source_dir.glob('**/*.po'), key=humansortkey)
        

        
        
        for po_file in po_files:
            print('\r' + str(po_file.relative_to(source_dir)) + '          ', end='')
            markup = []
            msgids = OrderedDict()
            msgstrs = OrderedDict()
            po = polib.pofile(po_file)
            
            for entry in po:
                ctx = entry.msgctxt
                
                markup.append(entry.comment + f'<sc-seg id="{entry.msgctxt}"></sc-seg>')
                if entry.msgid:
                    msgids[entry.msgctxt] = entry.msgid
                if entry.msgstr:
                    msgstrs[entry.msgctxt] = entry.msgstr
        
            markup_parent = seg_dir / markup_to / po_file.relative_to(source_dir).parent
            msgid_text_parent = seg_dir / msgid_to / po_file.relative_to(source_dir).parent
            msgstr_text_parent = seg_dir / msgstr_to / po_file.relative_to(source_dir).parent
            
            for d in (markup_parent, msgid_text_parent, msgstr_text_parent):
                if not d.exists():
                    d.mkdir(parents=True)
            
            stem = remove_leading_zeros(po_file.stem)
            
            with (markup_parent / (stem + '.html')).open('w') as f:
                f.write(clean_html(''.join(markup)))
            
            with (msgid_text_parent / (stem + '.json')).open('w') as f:
                json.dump(msgids, f, ensure_ascii=False, indent=2)
            
            with (msgstr_text_parent / (stem + '.json')).open('w') as f:
                json.dump(msgstrs, f, ensure_ascii=False, indent=2)
                
    
    print()

