import requests
import re

from tqdm import tqdm


def load_images_links(db):
    print('Loading image links')
    data = get_data()
    entries = []

    pts_re = re.compile(
        r'''^pts(?P<vol_number_pts>\d?)-(?P<division>[a-z\-A-Z]+)(?:-|\.)(?:vol\.(?P<vol_number>\d+)(?:-|\.))?pg.(?P<page_number>\d+)\.(?:png|jpg)$''')

    for entry in tqdm(data):
        if 'pg' not in entry:
            continue
        if entry.startswith('pts'):
            re_data = pts_re.match(entry)
            vol_number = re_data['vol_number'] if re_data['vol_number'] else re_data['vol_number_pts']
            if not vol_number:
                vol_number = 1
            entries.append({
                'name': entry,
                'division': re_data['division'],
                'vol': int(vol_number),
                'page_number': int(re_data['page_number'])
            })

    collection = db['images']
    collection.import_bulk(entries, overwrite=True)


def get_data():
    print('   * getting data from the server')
    URL = 'https://legacy.suttacentral.net/text_images/contents.txt'

    response = requests.get(URL)

    data = response.content

    print('   * done')
    return [name.decode('utf-8') for name in data.split()]
