import subprocess
from pathlib import Path
from typing import Generator


def _run_command(command):
    """
    To get the output of the command use:
        proc = _run_command(<command>)
        output = proc.stdout.read()
    """
    return subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)


def update_project(name: str):
    _run_command('pootle fs fetch {name}'.format(name=name))
    _run_command('pootle fs resolve --overwrite --pootle-wins {name}'.format(name=name))
    _run_command('pootle fs sync {name}'.format(name=name))


def get_projects() -> Generator[Path, None, None]:
    path = Path('/srv/pootle/po')
    yield from (x for x in path.glob('*') if x.is_dir() and x.stem != '.tmp')


def run():
    for project in get_projects():
        print('processing:', project.stem)
        update_project(project.stem)
    print('DONE')


if __name__ == '__main__':
    run()
