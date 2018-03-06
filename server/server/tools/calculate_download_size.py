import requests
import os
import json
from pathlib import Path
from typing import List, Generator, Dict, Iterable

from tqdm import tqdm
from requests.models import Response
from arango.database import Database

from common.arangodb import get_db


MEAN_DIFFERENCE = 240
BASE_URL = 'http://sc-nginx/api'


def get_size(response: Response) -> int:
    return len(response.raw.read())


def get_lang_collection_url(lang: str, root=False) -> str:
    if root:
        return f'{BASE_URL}/pwa/collection/sutta?root_lang=true'
    else:
        return f'{BASE_URL}/pwa/collection/sutta?languages={lang}&root_lang=false'


def get_menu_url(uid: str, lang: str) -> str:
    return f'{BASE_URL}/menu/{uid}?language={lang}'


def get_suttaplex_url(uid: str, lang: str) -> str:
    return f'{BASE_URL}/suttaplex/{uid}?language={lang}'


def get_text_url(uid: str, author: str, lang: str) -> str:
    return f'{BASE_URL}/suttas/{uid}/{author}?lang={lang}'


def get_parallel_url(uid: str) -> str:
    return f'{BASE_URL}/parallels/{uid}'


def make_request(url: str, stream=True) -> Response:
    return requests.get(url, stream=stream)


def get_non_root_languages(db: Database) -> List[str]:
    return list(db.aql.execute('FOR l IN language FILTER l.is_root == false RETURN l.iso_code'))


def generate_menu_urls(menu_uids: Iterable[str], lang: str) -> Generator[str, None, None]:
    for menu_uid in menu_uids:
        yield get_menu_url(menu_uid, lang)


def generate_suttaplex_urls(suttaplex_uids: Iterable[str], lang: str) -> Generator[str, None, None]:
    for suttaplex_uid in suttaplex_uids:
        yield get_suttaplex_url(suttaplex_uid, lang)


def generate_text_urls(text_data: List[dict]) -> Generator[str, None, None]:
    for text in text_data:
        uid = text['uid']
        for translation in text['translations']:
            lang = translation['lang']
            for author in translation['authors']:
                yield get_text_url(uid, author, lang)


def generate_parallel_urls(uids: Iterable[str]) -> Generator[str, None, None]:
        for uid in uids:
            yield get_parallel_url(uid)


def generate_urls(lang: str, root=False) -> Generator[str, None, None]:
        res = make_request(get_lang_collection_url(lang, root), stream=False)
        res_data = json.loads(res.content)

        if not root:
            yield from generate_menu_urls(res_data['menu'], lang)

            yield from generate_suttaplex_urls(res_data['suttaplex'], lang)

        yield from generate_text_urls(res_data['texts'])

        yield 'parallels'

        yield from generate_parallel_urls((t['uid'] for t in res_data['texts']))


def check_language(lang: str, root=False) -> Dict[str, int]:
    data_type = 'base'
    sizes = {'base': 0,
             'parallels': 0}

    for url in tqdm(generate_urls(lang, root=root)):
        if url == 'parallels':
            data_type = 'parallels'
            continue
        res = make_request(url)
        size = get_size(res)
        sizes[data_type] += size + MEAN_DIFFERENCE

    return sizes


def get_root_size() -> Dict[str, int]:
    return check_language('', root=True)


def save_results(data: dict):
    transformed_data = [{'lang': k, **v} for k, v in data.items()]
    with (Path(os.path.dirname(os.path.abspath(__file__))) / 'pwa_sizes.json').open('w') as f:
        json.dump(transformed_data, f, ensure_ascii=False, indent=2)


def run():
    languages = get_non_root_languages(get_db())
    data = {}
    for lang in tqdm(languages):
        size = check_language(lang)
        data[lang] = size
    data['root'] = get_root_size()
    save_results(data)


if __name__ == '__main__':
    run()
