import json
import shutil
import subprocess
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tqdm import tqdm

BASE_POOTLE_URL = 'http://sc-pootle:8000'
SERVER_DIR = '/opt/sc/server/'
CLIENT_DIR = '/opt/sc/frontend/'
POOTLE_BASE_DIR = '/srv/pootle/po/'


class SeleniumJobs:
    def __init__(self, projects):
        self.projects = projects
        self.driver = None

    def get_existing_projects(self):
        self.driver.get(f'{BASE_POOTLE_URL}/xhr/admin/projects/')
        data = json.loads(self.driver.find_element_by_tag_name('pre').text)['models']
        return {entry['code'] for entry in data}

    def login(self):
        print(' * logging')
        self.driver.get(f'{BASE_POOTLE_URL}/admin/projects/')
        self.driver.find_element_by_xpath('//*[@id="content"]/p[2]/a').click()

        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'id_login')))

        self.driver.find_element_by_id('id_login').send_keys('admin')
        self.driver.find_element_by_id('id_password').send_keys('password', Keys.ENTER)
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, '#admin-page > div > div > div.module.admin-content > div > div.hd > button')))
        print(' ✓ logged')

    def create_project(self, project_code, project_name):
        if project_code == '.tmp':
            return
        print('CREATING', project_code)
        self.driver.get(f'{BASE_POOTLE_URL}/admin/projects')
        self.driver.find_element_by_css_selector(
            '#admin-page > div > div > div.module.admin-content > div > div.hd > button').click()
        self.driver.find_element_by_id('id_code').send_keys(project_code)
        self.driver.find_element_by_id('id_fullname').send_keys(project_name)

        # File types select po/pot
        self.driver.find_element_by_xpath('//*[@id="item-form"]/div[1]/div[4]/div/div').click()
        # Click select po/pot
        self.driver.find_element_by_xpath('//*[@id="item-form"]/div[1]/div[4]/div/div[2]/div/div[1]').click()
        # Click
        self.driver.find_element_by_xpath('//*[@id="item-form"]/div[2]/input').click()

    def _init_selenium_driver(self):
        print(' * Initiating selenium chrome driver')
        options = Options()
        options.add_argument('--headless')
        options.add_argument('--no-sandbox')
        self.driver = webdriver.Chrome(executable_path='/usr/local/bin/chromedriver', chrome_options=options)
        print(' ✓ Selenium driver initiated')

    def run(self):
        print('RUNNING SELENIUM JOBS')
        self._init_selenium_driver()

        self.login()
        existing_projects = self.get_existing_projects()

        print(' * Creating projects')
        for project in tqdm(self.projects ^ existing_projects):
            self.create_project(project, project.replace('_', ' '))
        print(' ✓ Projects created')

        self.driver.close()

        print('✓ DONE')


def copy_pootle_files(dirs):
    print('COPING PO FILES')
    for directory in dirs:
        copytree(directory, Path(POOTLE_BASE_DIR))
    print('✓ DONE')


def copytree(src, dst):
    for file in tqdm(x for x in src.rglob('*') if x.is_file()):
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
    subprocess.call('pipenv run python /opt/sc/frontend/localization/localizer.py to_pootle', shell=True)
    change_po_file_permissions('/opt/sc/frontend/localization')
    print('✓ DONE')


def run():
    generate_client_po_files()

    dirs = [Path(f'{CLIENT_DIR}/localization/pootle/generatedPoFiles/'),
            Path(f'{SERVER_DIR}/internationalization/generatedPoFiles/')]
    copy_pootle_files(dirs)
    projects = get_projects_names()

    selenium_jobs = SeleniumJobs(projects)
    selenium_jobs.run()


if __name__ == '__main__':
    run()
