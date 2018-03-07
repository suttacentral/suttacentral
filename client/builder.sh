#!/usr/bin/env bash
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install
npm install -g polymer-cli --unsafe-perm
npm install -g workbox-cli
polymer build --verbose

# Generate service worker with revision hashes for each file.
workbox inject:manifest

echo "FINISHED BUILDING FRONTEND"
