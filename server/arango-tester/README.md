# Test ArangoDB is healthy

This is a simple test for adding a health check to the `sc-arangodb` docker compose configuration.

Run from the project base directory with:

```
docker compose -f docker-compose.yml -f server/arango-tester/docker-compose.yml up sc-arangodb sc-arango-tester --build
```

Running a second time without the `--build` flag will ensure the build time doesn't interfere with the test.

The tester will wait for the `sc-arangodb` container to become healthy before starting. You can see that the output  of the `sc-arangodb` and `sc-arango-tester` are not interleaved:

```
...
sc-arangodb  | 2026-03-19T10:45:12Z [1] INFO [cf3f4] {general} ArangoDB (version 3.11.3 [linux]) is ready for business. Have fun!
Container sc-arangodb Healthy 
sc-arango-tester  | ============================= test session starts ==============================
sc-arango-tester  | platform linux -- Python 3.14.3, pytest-9.0.2, pluggy-1.6.0
sc-arango-tester  | rootdir: /
sc-arango-tester  | configfile: pyproject.toml
sc-arango-tester  | testpaths: tests
sc-arango-tester  | collected 1 item
sc-arango-tester  | 
sc-arango-tester  | tests/test_arango_healthcheck.py .                                       [100%]
sc-arango-tester  | 
sc-arango-tester  | ============================== 1 passed in 0.07s ===============================
```