#!/usr/bin/env bash
echo "Waiting for arango to start"
uv run server/wait_for_arango.py
uv run server/manage.py migrate
touch /tmp/.done.info
uv run uwsgi --ini uwsgi.ini