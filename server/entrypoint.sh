#!/usr/bin/env bash
uv run scripts/wait_for_arango.py
uv run python -m sc_flask.manage migrate
touch /tmp/.done.info
uv run uwsgi --ini uwsgi.ini