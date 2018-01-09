import os
import json
import pathlib

import tqdm


def process_file(element_name, file):
    file_data = json.load(file)
    pathlib.Path('pootle/prePootleFiles').mkdir(parents=True, exist_ok=True)
    output_file = open('pootle/prePootleFiles/{}.json'.format(element_name), 'w')
    output_data = json.dumps(file_data['en'], indent=4)
    output_file.write(output_data)


if __name__ == '__main__':
    for directory in tqdm.tqdm(os.listdir('elements')):
        process_file(directory, open('elements/{}/en.json'.format(directory), 'r'))
