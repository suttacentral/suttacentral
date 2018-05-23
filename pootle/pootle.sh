#!/bin/bash
if [ ! -f /home/pootle/.locks/.migrate ]; then
	sleep 20
fi

sleep 5

if [ ! -f /home/pootle/.locks/.migrate ]; then
    echo "run migrate"
    pootle migrate
    pootle initdb --no-projects
    echo "from django.contrib import auth; auth.get_user_model()._default_manager.db_manager(\"default\").create_superuser(\"$POOTLE_ADMIN_NAME\", \"$POOTLE_ADMIN_EMAIL\", \"$POOTLE_ADMIN_PASSWORD\")" | /usr/local/bin/pootle shell
    pootle verify_user "$POOTLE_ADMIN_NAME"
    touch /home/pootle/.locks/.migrate
fi

if [ ! -f /home/pootle/.locks/.assets ]; then
    echo "build assets"
    cd /usr/local/lib/python2.7/dist-packages/pootle/static/js && npm install
    pootle collectstatic --noinput
    pootle webpack
    pootle assets build
    touch /home/pootle/.locks/.assets
fi

if [ ! -f /home/pootle/.locks/.clonedAssets ]; then
    echo "cloning repository to build more assets"
    git clone https://github.com/suttacentral/pootle.git
    cd pootle
    make assets
    echo "assets built"
    touch /home/pootle/.locks/.clonedAssets
fi

mkdir log

pootle revision --restore
/usr/bin/supervisord -n
