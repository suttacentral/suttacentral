import os
import sys

dir_path = os.path.dirname(os.path.realpath(__file__))
sys.path.append(dir_path)

from app import app  # isort:skip


if __name__ == '__main__':
    app.run(debug=True)
