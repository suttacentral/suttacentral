#!/bin/bash

if [[ $1 ]]
then FILENAME=$1
else FILENAME="/dev/stdin"
fi

export MYSQL_PWD=$MYSQL_PASSWORD

mysql -u $MYSQL_USER $MYSQL_DATABASE <$FILENAME
