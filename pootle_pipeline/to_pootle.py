
import slumber

# Change the following to match your Pootle URL, your username and password.
API_URL = "http://127.0.0.1:8000/api/v1/"
AUTH=('admin', 'admin')

api = slumber.API('http://sc-pootle:8000/api/v1/', auth=('admin', 'password'))

# Get all languages data.
lang_data = api.languages.get()

for lang in lang_data["objects"]:
    print(lang["code"])