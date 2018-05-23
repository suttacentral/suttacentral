#!/usr/bin/env bash
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install
npm install -g polymer-cli --unsafe-perm
npm install -g workbox-cli@2.1.3
polymer build "$@"

# Generate service worker with revision hashes for each file.
workbox inject:manifest

echo "FINISHED BUILDING FRONTEND"
