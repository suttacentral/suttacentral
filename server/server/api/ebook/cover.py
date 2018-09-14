import pathlib
import subprocess
import tempfile
import requests
import regex
import base64

from jinja2 import Template
from flask import current_app
from .common import export_dir, export_tmp_dir, export_cover_dir

files_dir = pathlib.Path(__file__).parent / 'files'

def make_data_uris(css):
       
    def replace_url_with_data_uri(match):
        filepath = match[1]
        print(filepath)
        
        with (files_dir / filepath).open('rb') as f:
            data = base64.b64encode(f.read()).decode()
        return f'url(data:font/woff2;charset=utf-8;base64,{data})'
        
    css = regex.sub(r'''url\('./files(/.*?')\)''', replace_url_with_data_uri, css)
    
    return css
    
def make_img_data_uris(html):
    
    def replace_src_with_data_uri(match):
        filepath = match[1]
        with (files_dir / filepath).open('rb') as f:
            data = base64.b64encode(f.read()).decode()
        return f'src="data:image/png;base64,{data}"'
        
    html = regex.sub(r'src="/files/(.*?)"', replace_src_with_data_uri, html)
    return html

rendertron_url = 'http://rendertron.suttacentral.net/screenshot/{url}?width={width}&height={height}'


def make_cover_png(title, author, about, version='v1', debug=False):    
    cover_file = export_cover_dir / f'{title}_{author}_{version}.png'.replace(' ', '-')
    if not debug and cover_file.exists():
        with cover_file.open('rb') as f:
            return f.read()
    print('Debugging Cover')
    css = make_data_uris(css_template)
    
    html = make_img_data_uris(html_template.render(title=title, about=about, author=author, css=css))
    if debug:
        with (export_tmp_dir / 'last_cover.html').open('w') as f:
            f.write(html)
    with tempfile.NamedTemporaryFile(dir=export_tmp_dir, suffix='.html', mode="w") as f:
        f.write(html)
        
        filename = pathlib.Path(f.name).name
        url = f"https://{current_app.config['SERVER_ADDRESS']}/ebook/tmp/{filename}"
        if debug:
            print(f'Retrieving dummy file instead of {url}')
            r = requests.get('https://suttacentral.net/img/android-chrome-512x512.png')            
        else:
            r = requests.get(rendertron_url.format(url=url, width=1600, height=2400))
        print(r)
        if r.status_code != 200:
            print(r.status_code, r.content, r.url)
            raise Exception(f'Error connecting to Rendertron: {r.status_code}: {r.text}: {r.url}')
        cover_data = r.content
    
    with tempfile.TemporaryDirectory() as tmpdir:
        tmpdir = pathlib.Path(tmpdir)
        out_image = tmpdir / 'cover.png'
        out_image.open('wb').write(cover_data)
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
    font-family: "Skolar PE";
    src: url('/files/RaloksPE-Regular.woff2') format('woff2'),
    font-weight: normal;
    font-style: normal;
}


@font-face {
    font-family: "Skolar Sans Eb";
    src: url('/files/RaloksSansPE-Eb.woff2') format('woff2'),
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: "Skolar Sans Sb";
    src: url('/files/RaloksSansPE-Sb.woff2') format('woff2'),
    font-weight: bold;
    font-style: normal;
}

body{margin:100px}
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
font-family:"Skolar PE";
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
font-family:"Skolar Sans Eb";
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
font-family:"Skolar Sans Sb";
font-style: italic;
display:block;
}
author{
font-size:80px;
  font-family:"Skolar Sans Eb";
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
<supertitle><img class="suttacentral-logo" src="/files/suttacentral-logo.png"> SuttaCentral</supertitle>
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

