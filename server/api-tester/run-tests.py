import requests
import jmespath
import os

from termcolor import colored

urls = [
{'url': '/api/expansion', 'size': 10000},
{'url': '/api/paragraphs', 'size': 10000},
{'url': '/api/menu?language=en', 'size': 10000},
{'url': '/api/menu/dn?language=en', 'size': 1000},
{'url': '/api/suttaplex/dn?language=en', 'size': 10000},
{'url': '/api/parallels/dn1', 'size': 10000},
{'url': '/api/suttas/mn1/bodhi?lang=en', 'size': 10000},
{'url': '/api/suttas/mn1/sujato?lang=en', 'selectors': ['translation', 'markup'], 'size': 10000},
]

def run_tests(base_url):
    passed = 0
    failed = 0
    
    for obj in urls:
        fails = False
        msg = []
        url = obj['url']
        r = requests.get(base_url + url)
        data = r.json()
        if 'selectors' in obj:
            for selector in obj['selectors']:
                expression = jmespath.compile(selector)
                result = expression.search(data)
                if not result:
                    fails = True
                    msg += [f'.{selector}={str(result)}']
        
        size = len(r.content)
        if 'size' in obj:
            if size < obj['size']:
                fails = True
                msg += ['"Too small"']
        
        if not fails:
            if not data:
                fails = True
                msg += ['Empty Object']
        
        if fails:
            print(colored(f'✖ {url} {size} Why: {", ".join(msg)}', 'red'))
            failed += 1
        else:
            print(f'{colored("✔", "green")} {url} {size}')
            passed += 1
    
    print()
    if passed > 0:
        print(f'{passed} calls succeeded')
    if failed > 0:
        print(colored(f'{failed} calls failed', 'red'))
    
    if failed == 0:
        exit(0)
    else:
        exit(1)
        
    
if __name__ == '__main__':
    base_url = os.environ.get('API_TESTER_URL', 'http://localhost')
    run_tests(base_url)
