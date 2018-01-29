#!/usr/bin/env bash
# Wait until frontend has finished building

exit_status=1
while [ ${exit_status} != 0 ]; do
    exit_status=`docker inspect sc-frontend-builder --format='{{.State.ExitCode}}'`
    if [ ${exit_status} != 0 ]; then
        sleep 0.5
    fi
done
