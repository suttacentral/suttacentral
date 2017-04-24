#!/usr/bin/env python

import hashlib
import pathlib
import flask
from flask import render_template, session, request, send_from_directory, send_file

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
