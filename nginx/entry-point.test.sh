#!/usr/bin/env bash
bash entry-point.sh

cp /etc/nginx/configurations/prod.nginx.conf /etc/nginx/conf.d/

nginx -g 'daemon off;'