LANGUAGES = '''FOR l in language
                RETURN {"_rev": l._rev, "uid": l.uid, "name": l.name, "iso_code": l.iso_code}'''