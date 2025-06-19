# SuttaCentral server and client repository

SuttaCentral is a Python Flask server which serves a Progressive Web App (`client`) and its associated JSON API (`server`).

The API pulls its data in real time from an ArangoDB instance populated periodically with data from the `sc-data` repository.

# Deploying for production
1. `$ git clone git@github.com:suttacentral/suttacentral.git`
2. `$ cd suttacentral`
3. `$ git checkout production`
4. `$ make prepare-host`
5. `$ make run-production-env` -> Supply needed env variables, 
if you chose random you will be prompted back with generated values.
Remember them! You will use some of them to access admin services.
6. Done

## Or updating in individual steps

1. `cd /opt/suttacentral`
2. `git pull`
3. `make generate-env-variables` -> Supply needed env variables (only if env has been changed)
4. `make run-prod-no-logs` -> run docker containers
5. `make delete-database` -> OPTIONAL: Skip this if data hasn't seriously changed (do it, if texts have been deleted or renamed)
6. `make migrate` -> only needed for delete-database, but harmless to run anyway
7. `make load-data` -> load data into arangodb
8. `make index-arangosearch` -> index arangosearch
9. `make reload-uwsgi` -> make sure flask server is not serving cached stale data

### Minimally disruptive update

If no containers need to be rebuilt then this is all that needs to be run:

1. `cd /opt/suttacentral`
2. `git pull`
3. `make load-data`
4. `make reload-uwsgi`
5. `make index-arangosearch`
6. `make rebuild-frontend`

### Changing the branch(s) the server, or staging server, uses

1. `cd /opt/suttacentral`
2. `git checkout <code-branch>`
3. `cd server/sc-data`
4. `git checkout <data-branch>`

Then run the commands for updating, probably including the `make delete-database` step.

# Development
## 1. Server

### 1.0 Setting up the project and *first run*
0. Install [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/).
1. Clone the repo `git clone git@github.com:suttacentral/suttacentral.git`.
2. Cd into the repo `cd suttacentral`.
3. run `make prepare-host` in order to make some small adjustment on the host machine.
4. run `make run-preview-env` - Build images, load data, index-arangosearch and more. This will run the project for the first time.

### 1.1 Running the project

1. run `make run-dev`.

### 1.2 Loading the data
When changes are made on `bilara-data` and `sc-data`, they do not automatically get updated in `suttacentral`. During initial setup in step 1.0.4 above, the raw data from those repositories is brought into `suttacentral` and added to the database. So if you make changes in `bilara-data` and `sc-data` you must run the steps below to see them in the build.

0. ensure server is up and run `make load-data`.
1. To index arangosearch run `make index-arangosearch`.

### 1.3 Docs
API documentation is available at `suttacentral.net/api/docs`.

Swagger documentation is generated from doc strings in api methods. The docstring should use 
[OpenAPI specification 2.0](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operation-object) yaml format. 
This yaml docstring will be interpreted as OpenAPI's Operation Object. 

#### Development
In this mode server, nignx, client dirs are mounted in Docker's containers so that any local changes take place in the container as well.

In addition `Uwsgi+Flask` expose port `5001` on local host, arangodb port `8529`.

### 1.4 Makefile
There is a Makefile with following commands:
* `prepare-host` - Setup client git-hooks.
* `run-dev` - Run containers in development mode.
* `run-dev-no-logs` - Run containers in development mode without output to the console.
* `run-prod` - Run containers in production mode.
* `run-prod-no-logs` - Run containers in production mode without output to the console.
* `migrate` - Run migrations in flask container.
* `clean-all` - Remove all containers, volumes and built images
* `reload-nginx` - Reloads Nginx.
* `reload-uwsgi` - Reloads uWSGI+Flask.
* `prepare-tests` - Starts containers in test mode and wait for start-ups to finnish.
* `test` - Run tests inside containers.
* `test-client` - Run only frontend tests.
* `test-server` - Run only server test.
* `load-data` - Pulls most recent data from github and loads it from `server/sc-data` folder to the db.
* `delete-database` - Delete database from ArangoDB.
* `index-arangosearch` - Index ArangoSearch with data from the db.
* `run-preview-env` - Fully rebuild and run most recent development version.
* `run-preview-env-no-search` - Fully rebuild and run most recent development version but does not index ArangoSearch.
* `run-production-env` - Fully rebuild and run most recent production version. You will be prompted with questions regarding env variables.
* `generate-env-variables` - Runs env_variables_setup.py script and generate env variables for production version.

In addition, the following rebuilds the front end. 

* `docker-compose build sc-frontend`
* then `make run-dev`

### 1.5 Working with ArangoDB
Our project is using [ArangoDB](https://www.arangodb.com/) on the back-end. In the development mode it exposes port 8529 on the localhost.
You can access its web interface on <http://127.0.0.1:8529>.

In the code that is running in the docker containers you can access the database on the address `sc-arangodb` on the same port.

In the development mode:
    
**Login**: `root`

**password**: `test`

In order to change password you have to change `ARANGO_ROOT_PASSWORD` in env's `.env` fiel eg. If you want to change it in development env you have to edit `.dev.env` file.

### 1.6 Nginx proxy
Our project is using nginx as a HTTP reverse proxy. It is responsible for serving static files and passing `/api/*` endpoints to the uwsgi+flask server.

### 1.7 Flask + uWSGI
Flask is hidden behind uWSGI. uWsgi communicate with nignx with unix socket. The socket file (`uwsgi.sock`) is in `socket-volume` shared between `nginx` and `flask+uwsgi`

#### Creating db migrations
In order to create database migration in out app you have to follow those simple steps:
1. in `server/server/migrations/migrations` folder create file with name `<migration_name>_<id of the last migration + 1>.py`.
2. Add this line at the top of the file: `from ._base import Migration`.
3. Create class that inherits from `Migration` class.
4. Set `migration_id` class attribute to match the file name.
5. create some tasks. Each task should be separate method accepting only `self` as a parameter.
6. Set tasks = `['first_task', 'second_task', ...]` in class attributes.
7. You are good to go just remember to never change the 'migration_id'.
otherwise your migrations might fail.
 
For example:
```python
from common.arangodb import get_db
from migrations.base import Migration


class InitialMigration(Migration):
    migration_id = 'initial_migration_001'
    tasks = ['create_collections']

    def create_collections(self):
        """
        Creates collections of suttas and collection of edges between them.
        """
        db = get_db()
        graph = db.create_graph('suttas_graph')
        suttas = graph.create_vertex_collection('suttas')
        parallels = graph.create_edge_definition(
            name='parallels',
            from_collections=['suttas'],
            to_collections=['suttas']
        )
```

#### Flask manage tasks
1. `python manage.py migrate` - Run migrations.
2. `python manage.py list_routes` - Lists all available routes/URLs.

### 1.10 Style guidelines
* Follow [PEP8](https://www.python.org/dev/peps/pep-0008/) for Python code.

* Try to keep line width under 120 characters.

* Use [formatted string literals](https://www.python.org/dev/peps/pep-0498/) for string formatting.

* Use [Type Hints](https://www.python.org/dev/peps/pep-0484/) whenever possible.

* In views methods (get, post, etc.) Use YAML [OpenAPI 2.0 object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operation-object) format in docstrings.

* For the rest of docstrings use [google style docstring](http://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html).

* Code for the API endpoints should be places in `api` folder, except of the `search` endpoint.

* Names, variables, docstring, comments, etc. should be written in english.

* Test files should be placed in `tests` dir in directory where tested file is.

## 2. Client

### 2.1 Style guidelines

- Based on the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for JS code...

#### General considerations:

- Use [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).

- Use [ES6 fat arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

- Use [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) (`class MyElement extends Polymer.Element`) instead of the old `Polymer({...})` syntax when declaring an element inside your \<script> tags.

- Use `const`/`let` instead of `var` when declaring a variable.

- Use `===` and `!==` instead of `==` and `!=` when comparing values to avoid [type coercion](http://webreflection.blogspot.com/2010/10/javascript-coercion-demystified.html).

- Comments explaining a function's purpose should be written on the line directly above the function declaration.

- Internal HTML imports should come after external ones (from bower_components) and be separated by a newline.

- When commenting Components at the top-level (above `<dom-module>`), keep HTML comment tags (`\<!--` & `-->`) on their own separate lines.

- Try to keep line width under 120 characters.
