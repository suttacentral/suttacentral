import requests
import asyncio
from pyppeteer import connect


_ws_url = None

def get_ws_url(force=False):
    global _ws_url
    if force or not _ws_url:
        # Note we need to use a hack to work around a Chrome security thing
        # that refuses to serve if the host header is not localhost or a IP
        response = requests.get('http://sc-chrome-headless:9222/json/version', headers={'host': ''})
        if response.status_code == 200:
            json_data = response.json()
            _ws_url = json_data['webSocketDebuggerUrl'].replace('ws:///', 'ws://sc-chrome-headless:9222/')
        else:
            print(response.status_code, response.text)
            raise ConnectionError('Could not connect to Chrome Headless')
    return _ws_url


async def render_html_async(html_data, filename, ws_url):
    browser = await connect(browserWSEndpoint=ws_url)
    page = await browser.newPage()
    await page.setContent(html_data)
    await page.screenshot(path=str(filename), fullPage=True)
    await page.close()


def render_html_to_png(html_data, filename):
    ws_url = get_ws_url()
    for i in range(0, 2):
        if i == 1:
            ws_url = get_ws_url(force=True)
        try:
            asyncio.run(render_html_async(html_data, filename, ws_url=ws_url))
            return
        except:
            if i > 0:
                raise
        
