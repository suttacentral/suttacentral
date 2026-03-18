# Health check script to be used in conjuction with docker compose.

# Whilst in the container, run the `arangosh` command and obtain the
# name of the database
DBNAME=$(arangosh --server.database $ARANGO_BASE_DB_NAME \
  --server.username $ARANGO_USER \
  --server.password $ARANGO_ROOT_PASSWORD \
  --javascript.execute-string "print(db._name())");

# The exit code is 0 if the database name returned is
# the same as specified in the environment variable
if [ $DBNAME = $ARANGO_BASE_DB_NAME ]; then
  return 0;
else
  return 1;
fi
