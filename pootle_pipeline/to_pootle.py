import shutil
import subprocess
from pathlib import Path

BASE_POOTLE_URL = 'http://sc-pootle:8000'
SERVER_DIR = '/opt/sc/server/'
CLIENT_DIR = '/opt/sc/frontend/'
POOTLE_BASE_DIR = '/srv/pootle/po/'


def copy_pootle_files(dirs):
    print('COPYING PO FILES')
    for directory in dirs:
        copytree(directory, Path(POOTLE_BASE_DIR))
    print('✓ DONE')


def copytree(src, dst):
    for file in (x for x in src.rglob('*') if x.is_file()):
        dst_file = dst / Path(str(file)[len(str(src)) + 1:])
        if dst_file.parent.parts[-1] == '.tmp':
            continue
        dst_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file, dst_file)


def get_projects_names():
    print('GETTING PROJECT NAMES')
    names = {d.parts[-1] for d in Path(POOTLE_BASE_DIR).glob('*') if d.is_dir()}
    print('✓ DONE')
    return names


def change_po_file_permissions(path):
    subprocess.run(['chmod', '-R', 'a+rwX', str(path)])


def generate_client_po_files():
    print('GENERATING SERVER PO FILES')
    subprocess.call('python3 /opt/sc/frontend/localization/localizer.py to_pootle', shell=True)
    change_po_file_permissions('/opt/sc/frontend/localization')
    print('✓ DONE')


def run():
    generate_client_po_files()

    dirs = [Path(f'{CLIENT_DIR}/localization/pootle/generatedPoFiles/'),
            Path(f'{SERVER_DIR}/internationalization/generatedPoFiles/')]
    copy_pootle_files(dirs)


if __name__ == '__main__':
    run()
