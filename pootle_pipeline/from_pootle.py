import subprocess


def change_po_file_permissions(path):
    subprocess.run(['chmod', '-R', 'a+rwX', str(path)])


def load_client_po_files():
    print('GENERATING CLIENT JSON FILES')
    subprocess.call('pipenv run python /opt/sc/frontend/localization/localizer.py from_pootle /srv/pootle/po',
                    shell=True)
    change_po_file_permissions('/opt/sc/frontend/localization/')
    print('✓ DONE')


def run():
    load_client_po_files()


if __name__ == '__main__':
    run()
