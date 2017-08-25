#!/usr/bin/env bash

pip install -r requirements.txt
cd server
echo "Waiting 10 seconds to make sure db is up and running"
sleep 10
python manage.py migrate
cd ..
uwsgi --ini uwsgi.ini
