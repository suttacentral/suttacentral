from translate.storage.po import pofile
import lxml.html
import arango
import subprocess
import pathlib
import json
import regex

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
    return regex.sub(r'\d+\.?\d*\p{punct}*\d*', '', string).strip()

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
                acronym = doc.get('acronym')
                if acronym:
                    acronym = acronym + ': '
                else:
                    acronym = ""
                if doc['text']:
                    toc.append(f'<b><a href="./{doc["uid"]}.xhtml">{acronym}{doc["text"]["title"]}</a></b> <i>{doc["name"]}</i>')
                else:
                    toc.append(f'<b>{acronym}{doc["name"]}</b> <i>{doc["title"]}</i>')
                if doc['blurb'] and i > 0:
                    toc.append(f'<p>{doc["blurb"]}</p>')
                if i >= len(docs) - 1 or docs[i+1]['depth'] <= doc['depth']:
                    toc.append('</li>\n')
        last_depth = depth
        
    
    root = lxml.html.fromstring(''.join(toc))
    toc_string = lxml.html.tostring(root, encoding='unicode')
    
    toc_string = toc_string.replace(' <i>None</i>', '')
    
    return {
            'root_title': docs[0]['name'],
            'blurb': docs[0]['blurb'],
            'author': author,
            'toc': toc_string,
            'texts': texts}


class Deduplicator:
    
    def __init__(self):
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
    
    for text in texts:
        if 'strings_path' in text:
            html = convert_to_html(text['strings_path'], text['markup_path'])
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
        
        
        data['pages'].append({'title': text['title'], 'uid': text['uid'], 'html': html})
            
    data['title'] = division_title
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
    
    for e in root.iter('a', 'article'):
        e.drop_tag()
    root.tag = 'div'
    
    for p in root.iter('p', 'blockquote'):
        tc = p.text_content()
        if not tc or tc.isspace():
            p.drop_tree()
        elif p.text:
            p.text = regex.sub(r'^\s+', '', p.text)
    
    string = lxml.html.tostring(root, encoding='unicode')
    string = regex.sub(r'\s+</p>', '</p>', string)
    return string
