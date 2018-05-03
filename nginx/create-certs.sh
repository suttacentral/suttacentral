#!/usr/bin/env bash


if [ ! -f /etc/nginx/configurations/certs/server.pem ]; then
    echo "Creating self-signed certificate"
    openssl req -x509 -nodes -days 50000 -newkey rsa:2048 \
        -subj "/O=SuttaCentral" \
        -keyout /etc/nginx/configurations/certs/server.pem \
        -out /etc/nginx/configurations/server.key
fi

