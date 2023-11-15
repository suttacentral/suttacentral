from common.arangodb import get_db
from common.queries import DICTIONARY_SEARCH_RESULT_FULL, DICTIONARY_FUZZY_SEARCH_RESULT_FULL


def cleanly_truncate_html(html_string, length):
    # TODO: The function name is aspirational, at the moment it crudely
    # butchers the HTML. Need to discuss further before choosing implementation.
    content = html_string
    return f'{content[:length]}…' if len(content) >= length else content


def search(word, language, truncate_length=1000):
    db = get_db()

    results = (
        db.aql.execute(
            DICTIONARY_SEARCH_RESULT_FULL,
            bind_vars={'word': word, 'language': language}
        )
    ).next()
    if (not results or len(results) == 0) and language != 'en':
        results = (
            db.aql.execute(
                DICTIONARY_SEARCH_RESULT_FULL,
                bind_vars={'word': word, 'language': 'en'}
            )
        ).next()

    if not results:
        return

    if exact_results := [r for r in results if r['word'] == word]:
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


def fuzzy_search(word, language, truncate_length=1000):
    db = get_db()

    results = (
        db.aql.execute(
            DICTIONARY_FUZZY_SEARCH_RESULT_FULL,
            bind_vars={'fuzzy_word': f"%{word}%", 'language': language}
        )
    ).next()
    if (not results or len(results) == 0) and language != 'en':
        results = (
            db.aql.execute(
                DICTIONARY_FUZZY_SEARCH_RESULT_FULL,
                bind_vars={'fuzzy_word': f"%{word}%", 'language': 'en'}
            )
        ).next()

    if not results:
        return

    matching_entries = []
    for result in results:
        word = result['word']
        content = (
            cleanly_truncate_html(result['text'], truncate_length)
            or result['definition']
        )
        matching_entries.append({
            'heading': {'division': result['dictname'], 'subhead': '', 'title': ''},
            'highlight': {'content': [content], 'detail': [result]},
            'url': f'/define/{word}',
            'category': 'dictionary',
        })

    return matching_entries
