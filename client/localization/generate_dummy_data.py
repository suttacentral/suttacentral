import json
import os
from typing import Iterable
from pathlib import Path

from faker import Faker
from tqdm import tqdm

CURRENT_FILE_DIR = Path(os.path.dirname(os.path.realpath(__file__)))
ELEMENTS_DIR = CURRENT_FILE_DIR / Path('elements')

LANGUAGES = {'de': 'de_DE', 'fr': 'fr_FR'}  # list of available languages: https://github.com/joke2k/faker

FORCE = False  # set to True to overwrite existing translations.


def generate_language(base_data: dict, folder: Path, faker: Faker, lang):
    new_data = {}
    for k, v in base_data.items():
        new_data[k] = faker.text()
        while len(new_data[k]) < len(v) * 0.9:
            if len(new_data[k]) > len(v) * 1.1:
                new_data[k] = new_data[k][:len(v)]
            new_data[k] += faker.text()

    with (folder / f'{lang}.json').open('w') as f:
        json.dump({lang: new_data}, f, indent=4, ensure_ascii=False)


def generate_languages(folder: Path):
    files = list(folder.glob('*.json'))
    current_languages = [x.stem for x in files]
    with files[0].open() as f:
        base_data = json.load(f)
        base_lang = current_languages[0]

    for lang in LANGUAGES:
        if FORCE or lang not in current_languages:
            generate_language(base_data[base_lang], folder, Faker(LANGUAGES[lang]), lang)


def run():
    for folder in tqdm(elements_folders_generator(ELEMENTS_DIR)):
        generate_languages(folder)


def elements_folders_generator(path: Path) -> Iterable[Path]:
    dir_content = list(path.iterdir())
    if all(x.suffix == '.json' for x in dir_content):
        yield path
    else:
        for folder in (x for x in dir_content if x.is_dir()):
            yield from elements_folders_generator(folder)


if __name__ == '__main__':
    run()
