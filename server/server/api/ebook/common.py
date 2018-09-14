
import pathlib

export_dir = pathlib.Path('/opt/sc/frontend/ebook/')
export_tmp_dir = export_dir / 'tmp'
export_cover_dir = export_dir / 'covers'

export_dir.mkdir(exist_ok=True, parents=True)
export_tmp_dir.mkdir(exist_ok=True)
export_cover_dir.mkdir(exist_ok=True)
