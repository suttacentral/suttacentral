LANGUAGES = '''FOR l in language
                RETURN {"_rev": l._rev, "uid": l.uid, "name": l.name, "iso_code": l.iso_code}'''

TEXTS_BY_LANG = '''
    FOR text IN html_text
        FILTER text.lang == @lang
        RETURN {text: text.text, uid: text.uid, mtime: text.mtime}
'''