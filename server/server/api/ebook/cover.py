import pathlib
import subprocess
import tempfile
import requests
import regex
import base64


from jinja2 import Template
from flask import current_app
from .common import export_dir, export_cover_dir

from common.render import render_html_to_png

files_dir = pathlib.Path(__file__).parent / 'files'

def make_data_uris(css):
       
    def replace_url_with_data_uri(match):
        filepath = match[1]
        print(filepath)
        
        with (files_dir / filepath).open('rb') as f:
            data = base64.b64encode(f.read()).decode()
        return f'url(data:font/woff2;charset=utf-8;base64,{data})'
        
    css = regex.sub(r'''url\('/files/(.*?)'\)''', replace_url_with_data_uri, css)
    
    return css
    
def make_img_data_uris(html):
    
    def replace_src_with_data_uri(match):
        filepath = match[1]
        with (files_dir / filepath).open('rb') as f:
            data = base64.b64encode(f.read()).decode()
        return f'src="data:image/png;base64,{data}"'
        
    html = regex.sub(r'src="/files/(.*?)"', replace_src_with_data_uri, html)
    return html

def make_cover_png(title, author, about, version='v2', debug=False):    
    cover_file = export_cover_dir / f'{title}_{author}_{version}.png'.replace(' ', '-')
    if not debug and cover_file.exists():
        with cover_file.open('rb') as f:
            return f.read()
    
    css = make_data_uris(css_template)
    html = make_img_data_uris(html_template.render(title=title, about=about, author=author, css=css))
    if debug:
        with (pathlib.Path(__file__).parent / 'last_cover.html').open('w') as f:
            f.write(html)
    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = pathlib.Path(tmpdir)
        out_image = tmpdir / 'cover.png'
        render_html_to_png(html, out_image)
        subprocess.run(['pngnq', '-f', '-n', '32', 'cover.png'], cwd=tmpdir)
        result_file = tmpdir / 'cover-nq8.png'
        with result_file.open('rb') as f:
            image_data = f.read()
    if not debug:
        with cover_file.open('wb') as f:
            f.write(image_data)
    
    return image_data

css_template = '''
@font-face {
    font-family: "Raloks PE";
    src: url('/files/RaloksPE-Regular.woff2') format('woff2');
}


@font-face {
    font-family: "Raloks Sans Eb";
    src: url('/files/RaloksSansPE-Eb.woff2') format('woff2');
}

@font-face {
    font-family: "Raloks Sans Sb";
    src: url('/files/RaloksSansPE-SbIt.woff2') format('woff2');
    font-style: italic;
}
@page {
margin: 0;
padding: 0;
height: 2400px;
width: 1600px;
}
body{margin:0px}
main{
background:#CE8400;
color:white;
display:flex;
flex-direction: column;
align-items: center;
margin:0 auto;
height:2400px;
width:1600px;
}
top-group{
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height:33%;
width:100%;
border-bottom: 4px solid #f6b735;
}
bottom-group{
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
height:66%;
}
supertitle{
font-size:60px;
font-family:"Raloks PE";
letter-spacing: 0.02em;
font-variant-caps: small-caps;
display:block;
}
.suttacentral-logo{
width:80px;
position:absolute;
margin-left:-83px;
margin-top:-8px;
}
h1{
font-size:100px;
font-family:"Raloks Sans Eb";
letter-spacing: 0.02em;
font-variant-caps: small-caps;
text-transform:lowercase;
margin-top: 48px;
}
.bird{
dislay:block;
width:400px;
margin-bottom:300px
}
about{
font-size:60px;
font-family:"Raloks Sans Sb";
font-style: italic;
display:block;
}
author{
font-size:80px;
  font-family:"Raloks Sans Eb";
  letter-spacing: 0.02em;
  font-variant-caps: small-caps;
  text-transform:lowercase;
}
'''

html_template = Template('''
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<style>
{{css}}
</style>
</head>
<body>
<main>
<top-group>
<supertitle><img class="suttacentral-logo" src="/files/suttacentral-logo.png">SuttaCentral</supertitle>
<h1>{{title}}</h1>
</top-group>
<bottom-group>
<img class="bird" src="/files/bird.png">
{% if about %}<about>{{about}}</about>{% endif %}
<author>{{author}}</author>
</bottom-group>
</main>
</body>
</html>
''')

