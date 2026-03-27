import subprocess
from pathlib import Path

def run_migrate():
    print("Running migrate")
    # There is surely a way to invoke this directly in python,
    # but for now, just imitate the previous entrypoint.sh script.
    subprocess.run(["uv", "run", "python", "-m", "sc_flask.manage", "migrate"])

def notify_wait_for_flask_is_done():
    Path('/tmp/.done.info').touch()
    print("Flask is ready")

def start_uwsgi():
    print("Starting uwsgi")
    # We can run this with the pyuwsgi package like so:
    # pyuwsgi.run(["--ini", "uwsgi.ini"])
    # To avoid a merge conflict with pyproject.toml and uv.lock
    # we'll do it this way for now.
    subprocess.run(["uv", "run", "uwsgi", "--ini", "uwsgi.ini"])

def entrypoint():
    run_migrate()
    # Flask is not actually ready, but this is the point
    # at which entrypoint.sh would indicate that it is.
    notify_wait_for_flask_is_done()
    start_uwsgi()

if __name__ == "__main__":
    entrypoint()