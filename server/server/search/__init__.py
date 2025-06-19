import logging
import os
from pathlib import Path


def set_constants():
    """Set runtime constants."""
    base_dir = Path(__file__).parent
    data_dir = base_dir / 'data'
    db_dir = base_dir / 'db'
    static_dir = base_dir / 'static'
    text_dir = base_dir.parent.parent / 'sc-data' / 'html_text'
    dict_db_path = db_dir / 'dictionaries.sqlite'
    dict_sources_dir = base_dir / 'dicts'
    exports_dir = static_dir / 'exports'

    webassets_manifest_path = db_dir / 'webassets' / 'manifest'
    webassets_cache_dir = db_dir / 'webassets' / 'cache'
    indexer_dir = base_dir / 'indexers'

    text_image_source_dir = base_dir / 'text_images'
    text_image_symlink_dir = static_dir / 'text_images'

    # Assign all constants to the module.
    globals().update(locals())


set_constants()
