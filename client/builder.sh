#!/usr/bin/env bash
echo "BUILDING"
npm install
npm install -g polymer-cli --unsafe-perm
polymer build --preset es6-bundled
