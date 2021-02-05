from common.arangodb import get_db
from common.queries import DICTIONARY_SEARCH_RESULT_FULL


def cleanly_truncate_html(html_string, length):
    # TODO: The function name is aspirational, at the moment it crudely
    # butchers the HTML. Need to discuss further before choosing implementation.
    content = html_string
    if len(content) >= length:
        return content[:length] + '…'
    else:
        return content


def search(word, language, truncate_length=1000):
    db = get_db()

    results = (db.aql.execute(DICTIONARY_SEARCH_RESULT_FULL, bind_vars={'word': word, 'language': language})).next()
    if not results:
        return

    exact_results = [r for r in results if r['word'] == word]
    if exact_results:
        # simply discard inexact results if exact results exist
        results = exact_results
    else:
        # We could have multiple inexact results i.e. pali would match both
        # pāli and palī. We'll just use the word with the most
        # written about it.
        word_to_use = sorted(results, key=lambda r: len(r['text']))[-1]['word']
        results = [r for r in results if r['word'] == word_to_use]

    # We can have multiple hit: one per dictionary. We want to summarize them.
    word = results[0]['word']
    best_result = None
    for result in results:
        if result['dictname'] == 'ncped':
            best_result = result
            break
        if not best_result:
            best_result = result

    content = cleanly_truncate_html(best_result['text'], truncate_length)

    return {
        'heading': {'division': best_result['dictname'], 'subhead': '', 'title': ''},
        'highlight': {'content': [content], 'detail': [best_result]},
        'url': f'/define/{word}',
        'category': 'dictionary',
    }
