import subprocess
import langid
import tempfile
import random
import pathlib
import lxml.html

def create_model(html_text_path, model_file, sample_size=20*1000*1000):
    print('Creating langid model')
    
    with tempfile.TemporaryDirectory() as working_dir:    
        corpus_dir = pathlib.Path(working_dir) / 'corpus'
        domain_dir = corpus_dir / 'domain'
        domain_dir.mkdir(parents=True)
        
        for lang_dir in html_text_path.glob('*'):
            if not lang_dir.is_dir():
                continue
            lang_uid = lang_dir.name
            if lang_uid == 'zz':
                continue
            domain_lang_dir = domain_dir / lang_uid
            domain_lang_dir.mkdir()
            files = sorted(lang_dir.glob('**/*.html'))
            rand = random.Random(42)
            rand.shuffle(files)
            
            data_read = 0
            
            for html_file in files:
                with html_file.open('r') as f:
                    string = f.read()
                root = lxml.html.fromstring(string)
                for e in root.cssselect('#metaarea, .hgroup'):
                    e.drop_tree()
                for e in root.cssselect('[lang]'):
                    if e.get('lang') != lang_uid:
                        e.drop_tree()
                text = root.text_content()
                
                with (domain_lang_dir / (html_file.stem + '.txt')).open('w') as f:
                    f.write(text)
                
                data_read += len(text)
                if data_read >= sample_size:
                    break
    
        # train.py can't be imported
        train_dir = pathlib.Path(langid.__path__[0]) / 'train'
        
        commands = [
            ['index.py', './corpus'],
            ['tokenize.py', 'corpus.model'],
            ['DFfeatureselect.py', 'corpus.model'],
            ['IGweight.py', '-d', 'corpus.model'],
            ['IGweight.py', '-lb', 'corpus.model'],
            ['LDfeatureselect.py', 'corpus.model'],
            ['scanner.py', 'corpus.model'],
            ['NBtrain.py', 'corpus.model']
        ]

        # also altough langid is python3, the training tools are python2, good times...
        for command in commands:
            command[0] = str(train_dir / command[0])
            print(f'running {command}')
            subprocess.run(['python2'] + command, cwd=working_dir)
        
        
        (corpus_dir / 'corpus.model' / 'model').replace(model_file.absolute())
        print(list(model_dir.glob('*')))
        (model_dir / 'model').replace(model_file.absolute())
        print('Done')
                
    
                
