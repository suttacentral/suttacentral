import csv
import logging
from collections import namedtuple

import search

logger = logging.getLogger(__name__)


class ScCsvDialect(csv.Dialect):
    """ Make it explicit. This happens to be exactly what LibreOffice calc
    outputs on my Ubuntu machine. """

    quoting = csv.QUOTE_MINIMAL
    delimiter = ','
    quotechar = '"'
    doublequote = True
    lineterminator = '\n'
    strict = True


def table_reader(tablename):
    """ Like csv.DictReader but returns named tuples (2x faster also) """
    with (search.table_dir / f'{tablename}.csv').open('r', encoding='utf-8', newline='') as f:
        reader = csv.reader(f, dialect=ScCsvDialect)
        field_names = next(reader)
        table_name_formatted = f'_{tablename.title()}'
        table_structure = namedtuple(table_name_formatted, field_names)
        globals()[table_name_formatted] = table_structure
        for lineno, row in enumerate(reader):
            if not any(row):  # Drop entirely blank lines
                continue
            if row[0].startswith('#'):
                continue
            try:
                yield table_structure._make(row)
            except TypeError as e:
                raise TypeError(f'Error on line {lineno} in table {tablename}, ({e})') from e


def load_table(tablename):
    return {row.uid: row for row in table_reader(tablename)}
