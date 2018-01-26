#!/usr/bin/env bash
set -e
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install -g polymer-cli --unsafe-perm
polymer build --verbose
npm install
echo "\033[1;32mFRONTEND BUILT SUCCESSFULLY!"
