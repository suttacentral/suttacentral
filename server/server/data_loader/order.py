import os
from concurrent.futures import ThreadPoolExecutor, as_completed, ProcessPoolExecutor

import tqdm

from data_loader.po import correct_related_uuid
from data_loader.util import numericsortkey, TwoWayDict
from common import arangodb


def fit_given_uid(db, uid, lang, author_uid):
    neighbour_po = list(db.aql.execute(
        f'''FOR po IN po_strings 
        FILTER po.lang == "{lang}" AND po.uid == "{uid}" 
        RETURN KEEP(po, ["uid", "lang", "author_uid"])'''))

    neighbour_text = list(db.aql.execute(
        f'''FOR text IN html_text 
        FILTER text.lang == "{lang}" AND text.uid == "{uid}" 
        RETURN KEEP(text, ["uid", "lang", "author_uid"])'''))

    neighbour_po.extend(neighbour_text)

    if len(neighbour_po):
        for text in neighbour_po:
            if text['author_uid'] == author_uid:
                break
        else:
            text = neighbour_po[0]

        return {'uid': uid, 'author_uid': text['author_uid'], 'lang': text['lang']}


def set_neighbour(po, uids, neighbour_name, modifier, db):
    current_neighbour_uid = po['uid']
    while True:
        neighbour_uid = uids[uids[current_neighbour_uid] + modifier]
        neighbour_uid = correct_related_uuid(current_neighbour_uid, neighbour_uid)

        if neighbour_uid is None:
            break

        fitted_text = fit_given_uid(db, current_neighbour_uid, po['lang'], po['author_uid'])
        if fitted_text:
            po[neighbour_name]= fitted_text
            return True
        current_neighbour_uid = neighbour_uid
    return False


def process_html_text(db, text):
    for field_name in ['next_uid', 'prev_uid']:
        text[field_name] = fit_given_uid(db, text[field_name], text['lang'], text['author_uid'])


def thread_pool_executor(html_texts):
    futures = []
    db = arangodb.get_db()
    with ThreadPoolExecutor(10) as executor:
        for text in html_texts:
            futures.append(executor.submit(process_html_text, db, text))

        for _ in tqdm.tqdm(as_completed(futures), total=len(futures)):
            pass
    db['html_text'].update_many(html_texts)


def add_order(db):
    print('* ADDING ORDER')
    all_uids = sorted(list(db.aql.execute('FOR r IN root RETURN r.uid')), key=numericsortkey)
    uids = TwoWayDict()
    for i, uid in enumerate(all_uids):
        uids[i] = uid
    del all_uids

    po_texts_query = db.aql.execute('FOR p IN po_strings RETURN KEEP(p, ["uid", "lang", "author_uid", "_key"])')
    for po in tqdm.tqdm(list(po_texts_query)):
        is_next = set_neighbour(po, uids, 'next', 1, db)
        is_prev = set_neighbour(po, uids, 'prev', -1, db)
        if is_next or is_prev:
            db['po_strings'].update(po)

    html_texts = list(db.aql.execute('''
    FOR text IN html_text 
        RETURN KEEP(text, ["uid", "lang", "author_uid", "next_uid", "prev_uid", "_key"])
    '''))
    n_cores = os.cpu_count()
    futures = []
    # welcome in async hell :)
    with ProcessPoolExecutor(max_workers=n_cores) as executor:
        for chunk in chunks(html_texts, n_cores):
            futures.append(executor.submit(thread_pool_executor, chunk))

        for _ in tqdm.tqdm(as_completed(futures), total=len(futures)):
            pass


def chunks(seq, num):
    avg = len(seq) / float(num)
    out = []
    last = 0.0

    while last < len(seq):
        out.append(seq[int(last):int(last + avg)])
        last += avg

    return out
