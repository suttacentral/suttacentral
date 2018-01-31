#!/usr/bin/env bash
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install
npm install -g polymer-cli --unsafe-perm
polymer build --verbose
rm -rf ./build/default/node_modules/
cp -r ./node_modules ./build/default/
