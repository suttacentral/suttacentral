DBNAME=$(arangosh --server.database $ARANGO_BASE_DB_NAME \
  --server.username $ARANGO_USER \
  --server.password $ARANGO_ROOT_PASSWORD \
  --javascript.execute-string "print(db._name())");

if [ $DBNAME = $ARANGO_BASE_DB_NAME ]; then
  return 0;
else
  return 1;
fi
