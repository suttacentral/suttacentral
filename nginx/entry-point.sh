#!/usr/bin/env bash
# Prepare log files and start outputting logs to stdout
touch /opt/sc/logs/nginx/nginx-access.log
touch /opt/sc/logs/nginx/nginx-error.log
tail -n 0 -f /opt/sc/logs/nginx/*.log &
