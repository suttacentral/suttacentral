#!/usr/bin/env bash


if [ ! -f ./conf.d/certs/server.pem ]; then
    echo "Creating self-signed certificate"
    openssl req -x509 -nodes -days 50000 -newkey rsa:2048 \
        -subj "/O=SuttaCentral" \
        -keyout ./conf.d/certs/server.key \
        -out ./conf.d/certs/server.pem
fi

