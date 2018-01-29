#!/usr/bin/env bash
# Wait until frontend has finished building

exit_status=1
while [ ${exit_status} != 0 ]; do
    docker exec sc-frontend-builder cat /tmp/.done.info 2> /dev/null
    exit_status=$?
    echo ${exit_status}
    if [ ${exit_status} != 0 ]; then
        sleep 0.5
    fi
done
