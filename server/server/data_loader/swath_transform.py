import os
from pathlib import Path
from shlex import quote

from arango.database import Database
from tqdm import tqdm

from common.queries import GET_TEXTS_BY_LANG


def add_wbr_to_thai_texts(db: Database) -> None:
    thai_docs = db.aql.execute(GET_TEXTS_BY_LANG, bind_vars={'lang': 'th'})
    for doc in tqdm(thai_docs):
        file = Path(doc['file_path'])
        result_file = Path(os.path.join(file.parent, f'{file.stem}-wbr.html'))
        os.system(
            f'swath -f html -u u,u < { quote(str(file)) } > { quote(str(result_file)) }'
        )
        result_file.rename(file)
