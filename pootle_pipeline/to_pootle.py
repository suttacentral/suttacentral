import slumber


def new_project():
    api = slumber.API('http://next.suttacentral.net:2052/api/v1/', auth=('admin', 'password'))
    print(api.projects.get())


def run():
    new_project()


if __name__ == '__main__':
    run()
