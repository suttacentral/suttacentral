#!/bin/bash
if [ ! -f /root/.pootle/.migrate ]; then
	sleep 20
fi

sleep 5

if [ ! -f /root/.pootle/.migrate ]; then
    echo "run migrate"
    pootle migrate
    pootle initdb --no-projects
    echo "from django.contrib import auth; auth.get_user_model()._default_manager.db_manager(\"default\").create_superuser(\"$POOTLE_ADMIN_NAME\", \"$POOTLE_ADMIN_EMAIL\", \"$POOTLE_ADMIN_PASSWORD\")" | /usr/local/bin/pootle shell
    pootle verify_user "$POOTLE_ADMIN_NAME"
    touch /root/.pootle/.migrate
fi

if [ ! -f /root/.pootle/.assets ]; then
    echo "build assets"
    cd /usr/local/lib/python2.7/dist-packages/pootle/static/js && npm install
    pootle collectstatic --noinput
    pootle webpack
    pootle assets build
    touch /root/.pootle/.assets
fi

if [ ! -f /root/.pootle/.clonedAssets ]; then
    echo "cloning repository to build more assets"
    git clone https://github.com/suttacentral/pootle.git
    cd pootle
    make assets
    echo "assets built"
    touch /root/.pootle/.clonedAssets
fi

mkdir log

pootle revision --restore
/usr/bin/supervisord -n
