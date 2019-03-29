import pathlib
import subprocess

project_dir = pathlib.Path('./po/site-localization')

exclude_langs = {'en'}

templates_dir = project_dir / 'templates'

#template_files = list(templates_dir.glob('*.pot'))

#templates_map = {file.stem: file for file in template_files}

for lang_dir in project_dir.glob('*'):
    if not lang_dir.is_dir() or lang_dir == templates_dir or lang_dir.stem in exclude_langs:
        continue
    print(lang_dir)
    
    subprocess.call(['pot2po', '-t', str(lang_dir), str(templates_dir), str(lang_dir)])
    
    # seen = set()
    
    # for template_file in template_files:
        # lang_file = (lang_dir / template_file.stem).with_suffix('.po')
        # command = ['pot2po']
        # if lang_file.exists():
            # print('Using {lang_file} as template'.format(lang_file=lang_file))
            # seen.add(lang_file)
            # command.extend(['-t', str(lang_file)])
        
        # command.extend([str(template_file), str(lang_file)])
        
        # print('Would run {cmd}'.format(cmd=command))
    
    # for file in lang_dir.glob('*.po'):
        # if file not in seen:
            # print('{file} not seen'.format(file=file))
        
