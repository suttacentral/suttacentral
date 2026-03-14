# SuttaCentral Flask Server

This part of the project contains the various files needed to create the `sc-flask` docker image.
Our Python code is managed by `uv` and implements the backend API for the main [SuttaCentral.net](SuttaCentral.net) website.
There are also some administrative tools and the ETL system that loads data into the ArangoDB server.

## Python Packaging

There are several Python packages contained in the `src/` directory.
These are installed into a virtual environment via `uv` and the `Dockerfile-flask` script.
Unit and integration tests can be found in `tests/`.
Our virtual environment is made available on `PATH` and is automatically activated within the container.

## Native Development Outside the Container

Our application can be run outside the container and this is often the best place for development.   

Within the `server/` directory, we can create a new virtual environment:

```bash
uv sync
```

This is fast, and even faster once the dependencies are cached.

We only rely on the `sc-arangodb` container to be available. This can be run by itself:

```bash
make run-dev-arangodb-only 
```

Back in `server/`, we can run our application locally. Running the database migrations for instance:

```bash
uv run --env-file env/.local.dev.env python -m sc_flask.manage migrate
```

Note that the `ARANGO_HOST` environment variable will need to point to `localhost` outside the container.

Debugging and unit test integration is now available with your IDE of choice. 

## Working with Docker

The image can be rebuilt while the stack is running, or before bringing it up:

```bash
make run-dev-rebuild
```

Alternatively, Docker Compose's `watch` mode can be activated by bringing up the stack normally

```bash
make run-dev
```

and then pressing `w` to activate and deactivate watch mode. 

This will cause the `sc-flask` image to  be rebuilt and restarted.

## Working with UV

If we need to add, update, or remove packages, we can do so using `uv`:

```bash
$ uv add pycowsay
Resolved 96 packages in 927ms
      Built sc-flask @ file:///home/jr/Code/suttacentral/server
Prepared 2 packages in 188ms
Uninstalled 1 package in 0.22ms
Installed 2 packages in 1ms
 + pycowsay==0.0.0.2
 ~ sc-flask==0.1.0 (from file:///home/jr/Code/suttacentral/server)
```

Then to try out our changes locally:

```bash
$ uv run pycowsay "Anumodana!"

  ----------
< Anumodana! >
  ----------
   \   ^__^
    \  (oo)\_______
       (__)\       )\/\
           ||----w |
           ||     ||
```

If we're happy with the changes, we can update the lock file:

```bash
$ uv lock
Resolved 96 packages in 0.57ms
```

Rebuild the docker image:

```bash
make run-dev-rebuild
```

Confirm that our changes are now live:

```bash
$ docker exec -t sc-flask uv run pycowsay "Anumodana!"
Bytecode compiled 3937 files in 103ms

  ----------
< Anumodana! >
  ----------
   \   ^__^
    \  (oo)\_______
       (__)\       )\/\
           ||----w |
           ||     ||
```

At this point we can commit our changes.
Or roll them back, re-sync, and rebuild.

## Note on `sc_flask` package

Due to some difficulties with the `uv` build backend, it is difficult to have modules in `src/` that aren't in a package. The modules in `sc_flask` should be at the top level of `src/`. The problem might be solved by removing the editable installation. See issue #3583.