import csv
import sys
from pathlib import Path

from arango import ArangoClient

file_name = sys.argv[1]

client = ArangoClient()
db = client.db('suttacentral', username='root', password='test')
cursor = db.aql.execute(
    """
    FOR doc IN relationship
    SORT doc._from, doc._to, doc.from, doc.to, doc.number, doc.remark, doc.resembling, doc.type
    RETURN UNSET(doc, "_key", "_id", "_rev")
    """)

with Path(file_name).open('w', newline='') as file:
    writer = csv.writer(file)
    for doc in cursor:
        writer.writerow(
            [
                doc['_from'],
                doc['_to'],
                doc['from'],
                doc['to'],
                doc['number'],
                doc['remark'],
                doc['resembling'],
                doc['type'],
            ]
        )
