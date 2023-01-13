from common.arangodb import get_db
# import nltk
# nltk.download()
# import jieba

INSTANT_SEARCH_QUERY = '''
FOR doc IN instant_search
  SEARCH PHRASE(doc.name, @query, "common_text")
  OR PHRASE(doc.content, @query, "common_text")
  OR ANALYZER(STARTS_WITH(doc.name, @query), "normalize")
  OR NGRAM_MATCH(
        doc.name,
        @query,
        0.4,
        'common_ngram'
    )
  FILTER doc.root_lang OR @lang == NULL or doc.lang == @lang
  LET uid = doc.uid
  LET nav_doc = DOCUMENT('super_nav_details', doc.uid)
  LET lang_uid = doc.lang ? doc.lang : doc.root_lang
  FILTER nav_doc.type == 'leaf'

  COLLECT name = doc.name, lang = lang_uid INTO group KEEP uid

  LET score_division_boost_factor = {
    dn: 1.2,
    mn: 1.2,
    sn: 1.2,
    an: 1.15
  }

  LET score_map = (
    FOR uid IN group[*].uid
        LET div_uid = REGEX_REPLACE(uid, '[0-9.-]', '')
        LET subscore = MAX([1, score_division_boost_factor[div_uid]])
        SORT subscore DESC
        RETURN {uid, subscore}
  )

  LET norm_name = FIRST(TOKENS(name, "normalize"))
  LET norm_query = FIRST(TOKENS(@query, "normalize"))
  LET contains_score = CONTAINS(norm_name, norm_query) ? 1 : 0
  LET nps_score = NGRAM_POSITIONAL_SIMILARITY(name, @query, 3)
  LET starts_score = (STARTS_WITH(norm_name, norm_query) ? 2 : 0.5) * (STARTS_WITH(name, @query) ? 1 : 0.5)

  LET score = (starts_score + contains_score + nps_score) * MAX(score_map[*].subscore)

  SORT score DESC
  LIMIT 10
  RETURN {
    name: name,
    lang: lang,
    uid: FIRST(score_map).uid
  }

'''

INSTANT_SEARCH_QUERY2 = '''
FOR d IN instant_search
SEARCH (PHRASE(d.content, @query, "common_text")
OR PHRASE(d.name, @query, "common_text"))
AND (d.lang == @lang OR d.lang != '')
return {
    acronym: d.acronym,
    uid: d.uid,
    lang: d.lang,
    name: d.name,
    author: d.author,
    author_uid: d.author_uid,
    author_short: d.author_short,
    is_root: d.is_root,
    heading: d.heading,
    content: d.content,
}
'''


def instant_search_query(query, lang):
    cursor = get_db().aql.execute(INSTANT_SEARCH_QUERY2, bind_vars={'query': query, 'lang': lang})
    results = {'total': 0, 'hits': []}
    hits = list(cursor)
    for hit in hits:
        if 'content' in hit:
            if 'author_uid' in hit and hit['author_uid'] is not None:
                hit['url'] = f'/{hit["uid"]}/{hit["lang"]}/{hit["author_uid"]}'
            else:
                hit['url'] = f'/{hit["uid"]}'
            content = hit['content']
            if content is not None and query in content:
                highlight = content[content.index(query) - 50:content.index(query) + 50]
                highlight = highlight.replace(query, f'<strong class="highlight">{query}</strong>')
                hit['highlight'] = {'content': []}
                hit['highlight']['content'].append(highlight)
        else:
            hit['highlight'] = {'content': []}
            hit['highlight']['content'].append(hit['name'])
        del hit['content']
    return {'total': len(hits), 'hits': hits}
    # return list(cursor)
