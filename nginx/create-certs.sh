#!/usr/bin/env bash

echo "Creating self-signed certificate"
mkdir -p /opt/sc/certs
openssl req -x509 -nodes -days 50 -newkey rsa:2048 \
    -subj "/O=SuttaCentral" \
    -keyout  /opt/sc/certs/self-signed.key \
    -out /opt/sc/certs/self-signed.crt

