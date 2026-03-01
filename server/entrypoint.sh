#!/usr/bin/env bash
cd server
echo "Waiting for arango to start"
uv run wait_for_arango.py
uv run manage.py migrate
cd ..
touch /tmp/.done.info
uv run uwsgi --ini uwsgi.ini