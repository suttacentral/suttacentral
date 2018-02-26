from string import ascii_letters, digits, punctuation
from secrets import choice
from pathlib import Path
from typing import Dict

FILES = [('server/env/.prod.base.env', 'server/env/.prod.env'),
         ('pootle/environment_prod.base.yml', 'pootle/environment_prod.yml')]
GENERATED_LEN = 32
RANDOM_WORDS_NUMBER = 3


def intro():
    print('''
Welcome in SuttaCentral environment setup script!
You are going to be prompted for a bunch of information.
If you want to set the value to the random one enter 'R', if you would like XKCD style value (randomMergedWords) use RW.
You will be prompted back with the generated value. eg.
< RW
> AmbassadorMagnesium'sRelics

< R
> Xu@+$;*ed3||,zfuP7kw%e0!c<`e^PLC
By default
If you want to leave current value just leave the answer blank.

    ''')


def read_variables(source_file: Path) -> Dict[str, str]:
    with source_file.open(encoding='utf-8') as f:
        data = [x.strip() for x in f.readlines() if x.strip()]
    final_data = {}
    for var in data:
        variable, value = var.split('=')
        final_data[variable] = value
    return final_data


def generate_random(generated_len=GENERATED_LEN) -> str:
    """
    Generate random string with at least:
      1 uppercase letter
      1 lowercase letter
      1 digit
      1 special character
    """
    characters = ascii_letters + digits + punctuation
    while True:
        password = ''.join(choice(characters) for _ in range(generated_len))
        if (any(c for c in password if (c.isalpha() and c.islower()))
                and any(c for c in password if (c.isalpha() and c.isupper()))
                and any(c.isnumeric() for c in password)
                and any(c for c in password if c in punctuation)):
            break
    return password


def generate_xkcd_style() -> str:
    """
    Generate random password made of couple of random words.
    """
    with open('/usr/share/dict/words') as f:
        words = [word.strip() for word in f]
        password = ''.join(choice(words).capitalize() for _ in range(RANDOM_WORDS_NUMBER))
    return password


def collect_new_values(env_variables: Dict[str, str]):
    for var, value in env_variables.items():
        print(var)
        if value != 'not_set':
            print('* Current value:', value)
        new_value = ''
        while not new_value:
            new_value = input('* New value (empty to keep old value, R for random): ')
            if not new_value:
                if value == 'not_set':
                    print('Please provide correct value')
                else:
                    new_value = value

            if new_value == 'R':
                new_value = generate_random()
                print('Generated value: ', new_value)
            elif new_value == 'RW':
                new_value = generate_xkcd_style()
                print('Generated value: ', new_value)
        env_variables[var] = new_value


def save_new_values(target_file: Path, data: Dict[str, str]):
    data = '\n'.join(f'{key}={value}' for key, value in data.items())
    with target_file.open(mode='w', encoding='utf-8') as f:
        f.write(data)


def process_file(source_file: Path, target_file: Path):
    env_variables = read_variables(source_file)
    collect_new_values(env_variables)
    save_new_values(target_file, env_variables)


def process_files():
    for source_file, target_file in FILES:
        process_file(Path(source_file), Path(target_file))


def run():
    intro()
    process_files()


if __name__ == '__main__':
    run()
