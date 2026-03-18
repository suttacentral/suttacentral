#!/usr/bin/env bash
uv run python -m sc_flask.manage migrate
touch /tmp/.done.info
uv run uwsgi --ini uwsgi.ini