#!/usr/bin/env bash
bash entry-point.sh
ln -sfn /etc/nginx/configurations/prod.nginx.conf /etc/nginx/conf.d/
nginx -g 'daemon off;'
