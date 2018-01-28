#!/usr/bin/env bash
set -e
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install -g polymer-cli --unsafe-perm
npm install
polymer build --verbose
echo "\033[1;32mFRONTEND BUILT SUCCESSFULLY!"
exit 0
