#!/usr/bin/env bash
echo "BUILDING FRONTEND FOR PRODUCTION"
npm install -g polymer-cli --unsafe-perm
polymer build
npm install
