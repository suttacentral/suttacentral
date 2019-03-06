import argparse
import pathlib
import sys
import hashlib

from tempfile import NamedTemporaryFile, TemporaryDirectory
from shutil import copy
import logging
import fontTools.subset

from flask import current_app

def get_font_file_by_name(name):
    fonts_dir = current_app.config.get('BASE_DIR').resolve() / 'frontend/files/fonts'
    font_files = {file.name: file for file in fonts_dir.glob('*.woff')}

    assert len(font_files) > 0

    matches = [filename for filename in font_files if name in filename]
    if matches:
        # Returning the matching font with the shortest name
        return font_files[sorted(matches, key=len)[0]]
    else:
        return None

def get_font_files_by_names(names):
    name_mapping = {}
    for name in names:
        name_mapping[name] = get_font_file_by_name(name)
    return name_mapping

def subset_files_by_names(names, text='', flavor=None, out_dir=None, suffix='subset'):
    name_file_mapping = get_font_files_by_names(names)
    details = subset_files(name_file_mapping, text=text, flavor=flavor, out_dir=out_dir, suffix=suffix)
    return details

class FontCache:
    def __init__(self):
        self.temp_dir = TemporaryDirectory()
        self.dir = pathlib.Path(self.temp_dir.name)

    @staticmethod
    def make_key(*args):
        return hashlib.md5(str(args).encode()).hexdigest()
    
    def fetch_from_cache(self, key):
        file = self.dir / key
        if file.exists():
            return file
        return None
    
    def add_to_cache(self, key, file):
        copy(file, self.dir / key)
    
_cache = FontCache()


def subset_files(name_file_mapping, text='', flavor=None, out_dir=None, suffix='subset'):
    extra_options = ['--layout-features+=liga,dlig,smcp,c2sc,onum']

    subset_mapping = {}

    text = text + ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
    text = ''.join(sorted(set(text)))

    with NamedTemporaryFile('w+t') as subset_text_file:
        subset_text_file.write(text)
        subset_text_file.flush()

        for name, file in name_file_mapping.items():
            if suffix in file.name:
                continue
            outfile = f'{file.stem}-{suffix}{"." + flavor if flavor else file.suffix}'
            if out_dir:
                outfile = out_dir / outfile
            
            cache_key = _cache.make_key(name, outfile, text)

            cached_file = _cache.fetch_from_cache(cache_key)
            if cached_file:
                copy(cached_file, outfile)
            else:
                fontTools.subset.main(args=[
                    str(file),
                    f'--output-file={str(outfile)}',
                    f'--text-file={subset_text_file.name}'
                ] + extra_options)
                _cache.add_to_cache(cache_key, outfile)

            subset_mapping[name] = outfile
    return subset_mapping