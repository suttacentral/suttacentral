#!/usr/bin/python3

import bottle
from bottle import request, response, post


from threading import Thread

import os
import sys
import signal
import atexit
import time

import subprocess
from argparse import ArgumentParser

import logging
import requests


class Builder(Thread):
    def __init__(self):
        super().__init__()
        self.terminated = False
        self.process = None

    def run(self):
        commands = [
            'sudo git pull',
            'docker-compose build',
            'docker-compose build',
            'make rebuild-frontend',
            'make run-prod-no-logs',
            'make load-data',
            'make index-elasticsearch',
            'make reload-uwsgi'
        ]

        for command in commands:
            if self.terminated:
                print('Terminated')
                return
            else:
                print('=== {command} ==='.format(command=command))
                self.process = subprocess.Popen(command.split(), stdout=sys.stdout, stderr=sys.stderr)
                self.process.wait()
    
    def terminate(self):
        self.terminated = True
        if self.process:
            self.process.wait()


builder = None

def terminate_builder():
    if builder:
        builder.terminate()
        builder.join()

@post('/<path>')
def handler(path):
    global builder
    print(path)

    if path != args.token:
        response.status = 401
        return

    data = request.json

    if data.get('ref') == 'refs/heads/master':
        head_commit_id = data['head_commit']['id']
        print('Building @ commit {head_commit_id}'.format(head_commit_id=head_commit_id))
        terminate_builder()
        builder = Builder()
        builder.start()
    response.status = 200

def get_parser():
    parser = ArgumentParser()

    parser.add_argument('token', help='Auth Token')
    parser.add_argument('--port', type=int, default=8555)
    parser.add_argument('--addr', default='0.0.0.0')

    return parser

if __name__ == '__main__':
    parser = get_parser()
    args = parser.parse_args()

    app = bottle.default_app()
    if __name__ == '__main__':
        bottle.run(addr=args.addr, port=args.port)