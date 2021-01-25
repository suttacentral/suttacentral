def load_segmented_data(db, change_tracker, segmented_data_dir):
    docs = []
    files = []
    for file in segmented_data_dir.glob('**/*.json'):        
        if file.name.startswith('_'):
            continue
        if '_' not in file.name:
            continue
        files.append(file)
        
    #if change_tracker.is_any_file_new_or_changed(files):
    for file in files:
        uid, muids = file.stem.split('_')
        docs.append({
            '_key': file.stem,
            'uid': uid,
            'muids': muids.split('-'),
            'filepath': str(file.relative_to(segmented_data_dir))
        })
    
    print(f'{len(docs)} files added or updated')
    db['segmented_data'].truncate()
    db['segmented_data'].import_bulk_logged(docs)