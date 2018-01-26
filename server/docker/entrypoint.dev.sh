#!/usr/bin/env bash
cd server
echo "Waiting for arango to start"
python wait_for_arango.py
python manage.py migrate
cd ..
touch /tmp/.done.info
uwsgi --ini uwsgi.ini
