# SuttaCentral server and client repositry

## Running the project
0. Install [docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/)
1. Clone the repo `git clone git@github.com:suttacentral/next-sc.git`
2. Cd into the repo `cd next-sc`
3. Checkout to the development branch `git checkout development`
4. run `make prepare-host` in order to make some small adjustment on the host machine so that we can run elasticsearch
5. run `make build-all` in order to build all images
6. run `make run-dev` to start our services in the development mode.

## Docker modes
There are different modes avaiable for our project. All of them can be run with command `make run-<env name>`


#### Development
In this mode server, nignx, client dirs are mounted in Docker's containers so that any local changes take place in the container as well.

In addition `Uwsgi+Flask` expose port `5000` on local host, arangodb port `8529` and elasticsearch ports `9200` and `9300`.

## Makefile
There is a Makefile with following commands:
* `prepare-host` - Set `vm.max_map_count` to `262144` because otherwise EalsticSearch won't work
* `build-all` - Run all build commands:
    * `build-flask` - Builds flask's conatiner.
    * `build-arangodb` - Builds arangoDB's conatiner.
    * `build-nginx` - Builds nginx's conatiner.
    * `build-elasticsearch` - Builds ElasticSearch's conatiner.
* `rebuild-all` - Remove all containers and volumes and rebuilds them.
* `build-all` - Build all containers:
    * `build-flask`
    * `build-arangodb`
    * `build-nginx`
    * `build-elasticsearch`
* `run-dev` - Run containers in development mode
* `run-dev-no-logs` - Run containers in development mode without output to the console
* `stop` - Stops all contianers:
    * `stop-arangodb`
    * `stop-flask`
    * `stop-nginx`
    * `stop-elasticsearch`
* `rm` - Remove all containers:
    * `rm-arangodb`
    * `rm-flask`
    * `rm-nginx`
    * `rm-elasticsearch`
* `rm-all-volumes` - Remove all volumes:
    * `rm-db-volume`
    * `rm-elasticsearch-volume`
    * `rm-nginx-volume`
    * `rm-socket-volume`
* `clean-all` - Remove all containers and volumes:
    * `clean-arangodb`
    * `clean-flask`
    * `clean-nignx`
    * `clean-elasticsearch`
* `shell-arangodb` - Opens Bash shell in arangodb container
* `shell-flask` - Opens Bash shell in flask container
* `shell-nginx` - Opens Bash shell in nginx container
* `shell-elasticsearch` - Opens Bash shell in elasticsearch container
* `logs` - Output all logs to the terminal.:
    * `logs-flask`
    * `logs-arangodb`
    * `logs-nginx`
    * `logs-elasticsearch`
* `reload-nginx` - Reloads nginx
* `reload-uwsgi` - Reloads uWSGI+Flask


## Working with ArangoDB
Our project is using [ArangoDB](https://www.arangodb.com/) on the back-end. In the development mode it exposes port 8529 on the localhost.
You can access it's web interface on <http://127.0.0.1:8529>.

In the code that is running in the docker containers you can access the database on the adress `sc-arangodb` on the same port.

In the development mode:
    
**Login**: `root`

**password**: `test`

In order to change password you have to change `ARANGO_ROOT_PASSWORD` in env's `.env` fiel eg. If you want to change it in development env you have to edit `.dev.env` file.

## Nginx proxy
Our project is using nginx as a HTTP reverse proxy. It is responsible for serving static files and passing `/api/*` endpoints to the uwsgi+flask server.

## Working with elasticsearch
Expose ports `9200` and `9300`.

## Flask + uWSGI
Flask is hidden behind uWSGI. uWsgi communicate with nignx with unix socket. The socket file (`uwsgi.sock`) is in `socket-volume` shared beetwen `nginx` and `flask+uwsgi`

### Creating db migrations
In order to create database migration in out app you have to follow those simple steps:
1. in `server/server/migrations` folder create file with name `<migration_name>_<id of the last migration + 1>.py`
2. Add this line at the top of the file: `from ._base import Migration`
3. Create class that inherits from `Migration` class
4. Set `migration_id` class atribute to match the file name
5. create some tasks. Each task should be separate method accepting only `self` as a parameter.
6. Set tasks = `['first_task', 'second_task', ...]` in class attributes.
7. You are good to go just remember to never change the 'migration_id'
otherwise your migrations might fail.
 
For example:
```python
from common.arangodb import get_db
from ._base import Migration


class InitialMigration(Migration):
    migration_id = 'inital_migration_001'
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