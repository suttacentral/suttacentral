#!/usr/bin/env bash
echo "BUILFING"
npm install
npm install -g polymer-cli --unsafe-perm
polymer build --preset es6-bundled
