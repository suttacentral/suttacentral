#!/usr/bin/env bash

if hash inotifywait 2>/dev/null; then
    inotifywait -e close_write,move -m -r . --exclude '(.git|.idea|node_modules|nextdata|__pycache__|.cache)'|
    while read -r directory events filename; do
        if [[ "$directory" = ./nginx/* && "$events" = "CLOSE_WRITE,CLOSE" ]]; then
            echo "Reloading Nginx"
            make reload-nginx &
        elif [[ "$directory" = ./server/server/* && "$events" = "CLOSE_WRITE,CLOSE" ]]; then
            echo "Reloading Flask"
            make reload-uwsgi &
        fi
        if [[ "$filename" = "requirements.txt" && ("$events" = "MOVED_TO" || "$events" = "CLOSE_WRITE,CLOSE") ]]; then
            echo "Installing new requirements"
            make install-requirements &
        fi
    done
else
    echo -e "\033[0;31mPlease run 'sudo apt install inotify-tools' first!"
    exit 1
fi
