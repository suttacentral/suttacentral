#!/usr/bin/env bash
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install
npm install -g polymer-cli --unsafe-perm
npm install -g workbox-cli
polymer build --verbose

# This is a workaround for polymer build incuding babelHelpers in the workbox-sw library.
# The babelHelpers object is global and normally works, but workbox-sw is used in a service worker which doesn't have
# access to the babelHelpers object. This makes the service worker fail on installation attempt.
#cp -rf ./node_modules/workbox-sw/ ./build/default/node_modules/workbox-sw/

# Generate service worker with revision hashes for each file.
workbox inject:manifest

echo "FINISHED BUILDING FRONTEND"
