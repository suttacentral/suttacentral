#!/usr/bin/env bash
cd server
echo "Waiting for arango to start"
python wait_for_arango.py
python manage.py migrate
pip install debugpy
cd ..
touch /tmp/.done.info
python server/wsgi.py # eventually I want this to start a debugpy server
