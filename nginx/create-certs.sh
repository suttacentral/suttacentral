#!/usr/bin/env bash

PEM_FILE=/etc/nginx/configurations/certs/server.pem
KEY_FILE=/etc/nginx/configurations/certs/server.key

if [ ! -f $PEM_FILE ]; then
    echo "Creating self-signed certificate"
    openssl req -x509 -nodes -days 50000 -newkey rsa:2048 \
        -subj "/O=SuttaCentral" \
        -keyout $KEYFILE \
        -out $PEM_FILE
fi

