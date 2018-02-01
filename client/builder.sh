#!/usr/bin/env bash
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install
npm install -g polymer-cli --unsafe-perm
polymer build --verbose
