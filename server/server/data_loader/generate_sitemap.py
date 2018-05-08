import jinja2
from collections import defaultdict

def sort_key(doc):
    lang = doc['lang']
    uid = doc['uid']
    if lang == 'en':
        return ('a', uid)
    else:
        return lang, uid
        
        
url_template = jinja2.Template('''
<url>
    <loc>{{ create_url(text) }}</loc>
    {%- for oth_text in other_texts %}
        <xhtml:link
            rel="alternate"
            hreflang="{{ text.lang }}"
            href="{{ create_url(oth_text) }}" />'
    {% endfor -%}
</url>
''')
    
alt_url_template = jinja2.Template('''
{%- for url in urls -%}
<url>
    <loc>{{ url }}</loc>
</url>
{% endfor -%}
''')

main_template = jinja2.Template('''
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    {%- for entry in entries -%}
        {{entry}}
    {%- endfor -%}
</urlset>''')

def create_url(text):
    return f"https://suttacentral.net/{text['uid']}/{text['lang']}/{text['author_uid']}"

def generate_sitemap(db):
    
    po_texts = list(db.aql.execute('''
        FOR doc IN po_strings
            RETURN {
                _key: doc._key,
                uid: doc.uid,
                lang: doc.lang,
                author_uid: doc.author_uid,
                name: doc.title,
                segmented: true
            }
    '''))
    
    html_texts = list(db.aql.execute('''
        FOR doc IN html_text
            RETURN {
                _key: doc._key,
                uid: doc.uid,
                lang: doc.lang,
                author_uid: doc.author_uid,
                name: doc.name,
                segmented: false
            }
    '''))
    
    texts_by_uid = defaultdict(dict)
    entries = [alt_url_template.render(urls=['https://suttacentral.net/'])]
    
    for text in sorted(po_texts, key=sort_key) + sorted(html_texts, key=sort_key):
        texts_by_uid[text['uid']][text['lang']] = text
    
    for uid, texts_by_lang in sorted(texts_by_uid.items()):
        non_en_texts = [text for text in texts_by_lang.values() if text['uid'] != 'en']
        if 'en' in texts_by_lang:
            entries.append(url_template.render(text=texts_by_lang['en'], other_texts=non_en_texts, create_url=create_url))
        else:
            entries.append(alt_url_template.render(urls=[create_url(text) for text in non_en_texts]))
    
    return main_template.render(entries=entries)
                
        
    
