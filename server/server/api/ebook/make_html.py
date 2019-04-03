from translate.storage.po import pofile
import lxml.html
import arango
import subprocess
import pathlib
import json
import regex

from search.uid_expansion import uid_to_acro

from collections import Counter

from common.arangodb import get_db

QUERY = '''
FOR doc, edge, path IN 0..10 OUTBOUND CONCAT('root/', @uid) root_edges OPTIONS {bfs: False}
    LET path_nums = path.vertices[*].num
    SORT path_nums
    LET blurb = FIRST(
        FOR blurb IN blurbs
            FILTER blurb.uid == doc.uid
            FILTER blurb.lang == @language
            RETURN blurb.blurb
        )
    LET text = KEEP(DOCUMENT(CONCAT('po_strings/', @language, '_', doc.uid, '_', @author)), 'uid', 'name', 'strings_path', 'title', 'division_title', 'author', 'author_blurb', 'markup_uid')
    LET markup_path = text ? DOCUMENT(CONCAT('po_markup/', text.markup_uid, '_markup')).markup_path : null
    
    LET legacy_text = KEEP(DOCUMENT(CONCAT('html_text/',  @language, '_', doc.uid, '_', @author)), 'uid', 'name', 'file_path', 'title', 'division_title', 'author')
    
    RETURN {uid: doc.uid, acronym: doc.acronym, depth: LENGTH(path.edges), name: doc.name, title: doc.title, type: doc.type, blurb: blurb, text: text ? MERGE(text, {markup_path:markup_path}) : legacy_text}
'''

def sanitize_div_name(string):
    name = regex.sub(r'\d+\.?\d*\p{punct}*\d*', '', string).strip()
    if name:
        return name
    return string

def get_acronym(doc):
    acronym = doc.get('acronym')
    if acronym:
        acronym = acronym.split('//')[0]
    else:
        acronym = uid_to_acro(doc['uid'])
    return acronym

def fix_main_title(title, uid):
    if regex.search(r'[0-9]', uid):
        return title
    else:
        return regex.sub(r'\s*[0-9]+(?:–(\d+))?\s*$', '', title)

def retrieve_data(division_uid, language, author):
    db = get_db()
    docs = list(db.aql.execute(QUERY, bind_vars={'uid': division_uid, 'author': author, 'language': language}))
    docs = [doc for doc in docs if doc['type'] != 'text' or doc['text']]
    texts = [doc['text'] for doc in docs if doc['text']]
    author = texts[0]['author']
    
    for text in texts:
        if 'name' in text:
            text['title'] = text.pop('name')
    
    toc = ['<div><h1>Guide</h1>']
    last_depth = -1
    for i, doc in enumerate(docs):
        depth = doc['depth']
        if depth < 7:
            if depth > last_depth:
                toc.append('<ul>\n')
            elif depth < last_depth:
                toc.append('</ul>\n' * (last_depth - depth))
            if doc['name']:
                toc.append('<li>\n')
                acronym = get_acronym(doc)
                if doc['text']:
                    doc['text']['acronym'] = acronym
                    title = doc["text"]["title"]
                    long_title = f'{acronym}{": " if title else ""}{title}'
                    toc.append(f'<b><a href="./{doc["uid"]}.xhtml">{long_title}</a></b>')
                    if doc.get('name'):
                        toc.append(f'<br><i>{doc["name"]}</i>')
                    doc['text']['long_title'] = long_title
                else:
                    toc.append(f'<b>{doc["name"]}</b>')
                    if doc.get('title'):
                        toc.append(f'<br><i>{doc["title"]}</i>')
                if doc['blurb'] and i > 0:
                    toc.append(f'<br>{doc["blurb"]}')
                if i >= len(docs) - 1 or docs[i+1]['depth'] <= doc['depth']:
                    toc.append('</li>\n')
        last_depth = depth
    
    root = lxml.html.fromstring(''.join(toc))
    toc_string = lxml.html.tostring(root, encoding='unicode')

    return {
            'root_title': fix_main_title(docs[0]['name'], division_uid),
            'blurb': docs[0]['blurb'],
            'author': author,
            'toc': toc_string,
            'texts': texts}


class Deduplicator:
    
    def __init__(self):
        self.clear()

    def clear(self):
        self.seen = set()
    
    def __call__(self, m):
        if m[0] in self.seen:
            return ''
        self.seen.add(m[0])
        return m[0]



def get_html_data(division_uid, language, author):
    data = retrieve_data(division_uid, language, author)
    
    texts = data.pop('texts')
    
    data['pages'] = []

    if len(texts) == 1:
        division_title = texts[0]['title']
    elif 'division_title' in texts[0]:
        division_title = texts[0]['division_title']
    else:
        division_title = None
    
    if 'author_blurb' in texts[0]:
        try:
            author_blurb = texts[0]['author_blurb'][language]
        except KeyError:
            author_blurb = texts[0]['author_blurb']['en']
    else:
        author_blurb = None
    
    
    deduplicator = Deduplicator()
    def repl(m):
        return regex.sub('<p.*?>.*?</p>', deduplicator, m[0])
    
    last_uid_parts = None
    for text in texts:
        uid_parts = text['uid'].split('.')
        if len(uid_parts) > 1:
            if last_uid_parts:
                if uid_parts[0] != last_uid_parts[0]:
                    deduplicator.clear()
            last_uid_parts = uid_parts

        def acroize_heading(m):
            acro = text.get('acronym')
            if not acro:
                return m[0]
            heading = m[2]
            if not heading:
                return acro
            m2 = regex.match(r'(\d+(?:–(\d+))?)(?:\.)?\s*(.*)$', heading)
            if not m2:
                h_text = heading
            else:
                h_num = m2[1]
                h_text = m2[3]

                m3 = regex.match(r'(.*?)(\d+(?:–(\d+))?)$', text['acronym'])
                acro_prefix = m3[1]
                acro_num = m3[2]

                if acro_num == h_num:
                    heading = h_text
                elif '–' in acro_num and h_num:
                    acro = acro_prefix + h_num
                    heading = h_text
                
                

            new_heading = f'<span class="acro">{acro}</span>{": " if h_text else ""}{h_text}'
            return f'{m[1]}{new_heading}'

        if 'strings_path' in text:
            html = convert_to_html(text['strings_path'], text['markup_path'])
            html = regex.sub(r'(<h1.*?>)(.*?)</h1>', acroize_heading, html)
        else:
            html = open(text['file_path']).read()
            html = clean_html(html)
            
            if division_title is None:
                m = regex.search(r'<p class="division">(.*?)</p>', html)
                if m:
                    division_title = m[1]
            if author_blurb is None:
                m = regex.search('(?s)<aside id="metaarea">(.*?)</aside>', html)
                if m:
                    author_blurb = m[1]
            
        html = regex.sub(r'(?s)<div class="hgroup">.*?</div>', repl, html)
        
        title = text.get('long_title') or text['title']
        if not title:
            title = None
        
        data['pages'].append({'title': title, 'uid': text['uid'], 'html': html, 'acronym': get_acronym(text)})
            
    data['title'] = fix_main_title(division_title, division_uid)
    data['author_blurb'] = author_blurb
    
    if len(texts) > 1:
        toc = data.pop('toc')
        data['pages'].insert(0, {'title': 'Guide to Contents', 'uid': 'guide', 'html': toc})
    
    
    return data

def convert_to_html(strings_path, markup_path):

    markup_string = open(markup_path).read()
    strings = json.load(open(strings_path))

    def repl_fn(m):
        s = strings.get(m[1], '')
        if s:
            return s + ' '
        return s

    markup_string = regex.sub(r'<sc-seg id="([^"]+)"></sc-seg>', repl_fn, markup_string)
    markup_string = regex.sub(r' *\n *', r'\n', markup_string)
    markup_string = regex.sub(r' +', ' ', markup_string)

    return clean_html(markup_string)

def clean_html(html_string):
    root = lxml.html.fromstring(html_string)

    for p in list(root.iter('p')) + list(root.iter('blockquote')):
        tc = p.text_content()
        if not tc or tc.isspace():
            p.drop_tree()
        else:
            if p.text:
                p.text = regex.sub(r'^\s+', '', p.text)

    for e in root.iter('a', 'article'):
        e.drop_tag()

    root.tag = 'div'
    
    string = lxml.html.tostring(root, encoding='unicode')
    string = regex.sub(r'(<p\b.*?>)\s+', r'\1', string)
    string = regex.sub(r'\s+</p>', '</p>', string)

    return string
