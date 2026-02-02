# Working with the Python backend

I'm just getting this setup, but here's how we do it.

In the top suttacentral folder use docker to start up arangodb:

```commandline
docker compose up sc-arangodb -d
```

Use `uv` to run our app:

```commandline
uv run --env-file env/.base.env --env-file env/.dev.env
```