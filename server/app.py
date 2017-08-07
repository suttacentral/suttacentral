#!/usr/bin/env python
try:

    import json
    import hashlib
    import pathlib
    import logging
    import lxml.html
    from urllib.parse import urlparse

    import flask
    from flask import render_template, session, request, send_from_directory, send_file

    import sys
    sys.path.insert(0, str(pathlib.Path('.').absolute()))

    from settings import config

except ModuleNotFoundError as e:
    print('ModuleNotFoundError: ', e.msg)
    print('Maybe try running "pip install -r python-requirements.txt"')
    exit(1)

app = flask.Flask('suttacentral')

global api

def init():
    import forest
    api = forest.api


root_path = pathlib.Path(__file__).resolve().parents[1]
#init()


@app.route('/<any(bower_components,elements,styles,img):subfolder>/<path:path>')
def serve_static(subfolder, path):
    return send_from_directory(root_path / subfolder, path)

@app.route('/data/<path:path>')
def data(path):
    # return from API first!
    # broken right now
    
    # return forest.api.uids(*path.split('/'))
    
    # as fallback return from data folder (ready to consume json)
    return send_from_directory(root_path / 'data', path)

@app.route('/')
def home():
    return send_file(str(root_path / 'index.html'))

@app.route('/debug')
def debug():
    if not app.debug:
        abort(403)
    session['foo'] = session.get('foo', 0) + 1
    return 'The approot is {}\n The session is {}\n The root path is {}\n'.format(app.root_path, dict(session), root_path)

@app.route('/<path:path>')
def generic(path):
    
    path = pathlib.Path(path)
    
    if path.parts[0] in {'pi', 'en'}:
        
        strings_parent = (config.seg_dir / path).parent
        print(f'looking for a file at {strings_parent} named {path.name}.json')
        if strings_parent.exists():
            strings_files = sorted(strings_parent.glob(f'**/{path.name}.json'))
            print(strings_files)
            if strings_files:
                strings_file = strings_files[0]
                with strings_file.open('r', encoding='utf8') as f:
                    strings_data = json.load(f)
                markup_file = config.seg_dir / strings_data['_markup_path']
                with markup_file.open('r', encoding='utf8') as f:
                    string = '<main>{}</main>'.format(f.read())
                    tree = lxml.html.fromstring(string)
                
                for e in tree.iter('sc-seg'):
                    text = strings_data[e.get('id')]
                    if text:
                        child = lxml.html.fromstring(f'<span>{text}</span>')
                        e.append(child)
                        child.drop_tag()
                
                extras = {k.lstrip('_'):v for k,v in strings_data.items() if k.startswith('_')}
                json_element = lxml.html.Element('script', id="segmentation_metadata", type="application/json")
                json_element.text = str(extras)
                
                tree.append(json_element)
                
                return lxml.html.tostring(tree, method='html', encoding='unicode')
    try:
        return send_file(root_path / path)
    except Exception as e:
        pass
    
    return home()
    #if debug:
    #    
    #    return f'<p>{path} : {path.parts} : {request.args}<p>But no page was found at this address</p>'
    #abort(404)
    
    
def get_secret_key():
    machine_id = pathlib.Path('/etc/machine-id')
    if machine_id.exists():
        with machine_id.open() as f:
            seed = f.read()
    else:
        seed = '0'
    seed *= 64
    return hashlib.sha256(seed.encode()).hexdigest()
    

app.secret_key = get_secret_key()

if __name__ == '__main__':
    app.run(debug=True)
