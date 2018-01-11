import sys

from pootle import generate_po_files, generate_json_files
import create_pre_pootle_files
import extract_static_strings


def to_pootle():
    extract_static_strings.run()
    create_pre_pootle_files.run()
    generate_po_files.run()


def from_pootle():
    generate_json_files.run()


def print_help():
    print('''
Available commands:')
*  to_pootle
*  from_pootle

example usage:
python localizer.py to_pootle''')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print_help()
        exit(0)

    argument = sys.argv[1]
    if argument == 'to_pootle':
        to_pootle()
    elif argument == 'from_pootle':
        from_pootle()
    else:
        print_help()
