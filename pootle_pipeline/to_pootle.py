import json
import shutil
from pathlib import Path

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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
        return json.loads(self.driver.find_element_by_tag_name('pre').text)

    def login(self):
        self.driver.get(f'{BASE_POOTLE_URL}/admin/projects/')
        self.driver.find_element_by_xpath('//*[@id="content"]/p[2]/a').click()

        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.ID, 'id_login')))

        self.driver.find_element_by_id('id_login').send_keys('admin')
        self.driver.find_element_by_id('id_password').send_keys('password', Keys.ENTER)
        WebDriverWait(self.driver, 10).until(EC.presence_of_element_located(
            (By.CSS_SELECTOR, '#admin-page > div > div > div.module.admin-content > div > div.hd > button')))

    def create_project(self, project_code, project_name):
        self.driver.get(f'{BASE_POOTLE_URL}/admin/projects')
        self.driver.find_element_by_css_selector(
            '#admin-page > div > div > div.module.admin-content > div > div.hd > button').click()
        self.driver.find_element_by_id('id_code').send_keys(project_code)
        self.driver.find_element_by_id('id_fullname').send_keys(project_name)

        # File types select po/pot
        self.driver.find_element_by_xpath('//*[@id="item-form"]/div[1]/div[4]/div/div').click()
        self.driver.find_element_by_xpath('//*[@id="item-form"]/div[1]/div[4]/div/div[2]/div/div[1]').click()
        self.driver.find_element_by_xpath('//*[@id="item-form"]/div[2]/input').click()

    def _init_selenium_driver(self):
        options = Options()
        options.add_argument('--headless')
        self.driver = webdriver.Chrome(executable_path='/home/kuba/temp/chromedriver', chrome_options=options)

    def run(self):
        options = Options()
        options.add_argument('--headless')
        self._init_selenium_driver()

        self.login()
        existing_projects = self.get_existing_projects()

        for project in self.projects:
            self.create_project(project, project.replace('_', ' '))

        self.driver.close()

        print(existing_projects)


def copy_pootle_files(dirs):
    for directory in dirs:
        shutil.copytree(directory, POOTLE_BASE_DIR)


def get_projects_names():
    return [str(d) for d in Path(POOTLE_BASE_DIR).glob('*') if d.is_dir()]


def run():
    dirs = [Path(f'{CLIENT_DIR}/localization/pootle/generatedPoFiles/'),
            Path(f'{SERVER_DIR}/server/internationalization/generatedPoFiles/')]
    copy_pootle_files(dirs)
    projects = get_projects_names()

    selenium_jobs = SeleniumJobs(projects)
    selenium_jobs.run()


if __name__ == '__main__':
    run()
