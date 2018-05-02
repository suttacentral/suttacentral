#!/bin/bash

if [ $1 ] 
then FILENAME=$1
else
FILENAME=./sql_backups/pootledb_`date '+%Y-%m-%d_%H:%M:%S'`.sql.xz
find ./sql_backups/ -type f -name '*.sql.xz' -mtime +14 -delete
fi

export MYSQL_PWD=$MYSQL_PASSWORD

if [[ $1 == "-" ]]
then mysqldump -u $MYSQL_USER $MYSQL_DATABASE
else mysqldump -u $MYSQL_USER $MYSQL_DATABASE | xz -c -3 > $FILENAME
fi
