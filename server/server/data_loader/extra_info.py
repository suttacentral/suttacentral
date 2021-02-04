from pathlib import Path
from typing import Dict

from data_loader.util import json_load


def process_extra_info_file(extra_info_file: Path) -> Dict[str, Dict[str, str]]:
    """
    Method to process super_extra_info.json and text_extra_info.json files

    Args:
        extra_info_file - path to the file
    """
    info = json_load(extra_info_file)
    data = {item['uid']: item for item in info}
    return data
