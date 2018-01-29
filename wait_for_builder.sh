#!/usr/bin/env bash
# Wait until frontend has finished building

status=1
while [ ${status} != 0 ]; do
    echo `docker-compose ps | grep sc-frontend-builder`
    if `docker-compose ps | grep sc-frontend-builder | grep -q 'Exit 0'`; then
        status=0
    else
        sleep 0.5
    fi
done
