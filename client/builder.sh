#!/usr/bin/env bash

echo "BUILDING FRONTEND FOR PRODUCTION"

npx polymer build "$@"

# Generate service worker with revision hashes for each file.
npx workbox inject:manifest

echo "FINISHED BUILDING FRONTEND"
