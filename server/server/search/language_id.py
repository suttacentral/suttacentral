from langid import langid
from flask import current_app
from flask import request
identifier = None

def load_model():
    global identifier
    data_dir = current_app.config.get('BASE_DIR') / 'sc-data'
    if not data_dir.exists():
        data_dir = current_app.config.get('BASE_DIR') / 'sc-flask/sc-data'
    langid_model_file = data_dir / 'langid' / 'model'
    
    # langid is frightfully hacky in general
    identifier = langid.LanguageIdentifier.from_modelpath(langid_model_file, norm_probs=True)

def rank(text):
    if not identifier:
        load_model()        
    
    return identifier.rank(text.casefold())
    
def smart_rank(text):
    """ Return probable iso_codes fudged by Accept-Language header
    
    langid is bad at distinguishing between say english and french
    for a shared word like concentration it just has no way to know.
    
    In this kind of case the langid rank will conclude that "concentration"
    is probably french but could be english. "fr" will only be returned 
    if it also appears in the Accept-Language header, in other words
    this function will try and not return a language code that the user
    browser doesn't accept if it can reasonably return one that is accepted.
    
    However if langid makes an unambigious identification, like it's a
    trillion times more confident the text is French than English, then
    fr will be returned anyway.
    """
    
    results = rank(text)
    
    # these codes get special privelage
    special_codes = {'en', 'pli'}
    # if there are other codes in the Accept-Language header we
    # also give those codes special privelage
    special_codes.update(get_accept_languages())
        
    good_matches = []
    
    # this comparison might seem extreme, but it's how langid works
    # a bad match is like a quadzillion times smaller than a good match
    # a mildly bad match can be like 5.5e-21
    for iso_code, prob in results:
        if iso_code in special_codes and prob > 0.00001:
            good_matches.append(iso_code)
    if good_matches:
        return good_matches
    else:
        # We only indiscriminately return the best result if there
        # is no good alternative
        return [results[0][0]]
    
    
    
def get_accept_languages():
    results = {}
    
    for pair in request.headers.get('Accept-Language').split(','):
        if ';' in pair:
            iso_code, rank = pair.strip().split(';')
        else:
            iso_code, rank = pair.strip(), 1.0
        short_code = iso_code.split('-')[0]
        if short_code not in results and short_code.isalpha():
            results[short_code] = rank
    return results
            
    
    
