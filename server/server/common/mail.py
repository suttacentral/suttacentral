import requests
from flask import current_app

BASE_URL = 'https://api.mailgun.net/v3'


class Mailgun:
    def __init__(self):
        self.domain = current_app.config.get('MAILGUN_DOMAIN')
        self.api_key = current_app.config.get('MAILGUN_API_KEY')
        self.api_url = f'{BASE_URL}/{self.domain}'
        self.auth = ('api', self.api_key)
    
    def send(self, from_email, to_email, subject, html):
        data = {
            'from': from_email,
            'to': to_email,
            'subject': subject,
            'html': html
        }
        
        requests.post(self.api_url + '/messages', auth=self.auth, data=data)

def send_email(from_email, to_email, subject, html):
    Mailgun().send(from_email, to_email, subject, html)
