#!/bin/bash
if [ ! -f /root/.pootle/.migrate ]; then
	sleep 20
fi

echo "start rqworker"
/usr/local/bin/pootle rqworker &

sleep 5

echo "build assets"
cd /usr/local/lib/python2.7/dist-packages/pootle/static/js && npm install
cd ../../..
pootle webpack
pootle collectstatic --noinput
pootle assets build

if [ ! -f /root/.pootle/.migrate ]; then
    echo "run migrate"
    pootle migrate
    pootle initdb --no-projects
    echo "from django.contrib import auth; auth.get_user_model()._default_manager.db_manager(\"default\").create_superuser(\"$POOTLE_ADMIN_NAME\", \"$POOTLE_ADMIN_EMAIL\", \"$POOTLE_ADMIN_PASSWORD\")" | /usr/local/bin/pootle shell
    pootle verify_user "$POOTLE_ADMIN_NAME"
    touch /root/.pootle/.migrate
fi

echo "start pootle"
pootle runserver --insecure 0.0.0.0:8000