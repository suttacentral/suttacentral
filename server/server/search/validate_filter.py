import re


def validate_filter_commands(query):
    """
    Validate the filter command format entered by the user

    Args:
        query (str): The query string entered by the user

    Returns:
        dict: A dictionary containing the validation results
        {
            'is_valid': bool,
            'error_message': str,
            'error_type': str,
            'suggestions': list
        }
    """
    # Supported filter commands
    valid_filters = ['volpage', 'author', 'by', 'title', 'lang', 'ref', 'in']

    # Check for duplicate filters
    duplicate_errors = _check_duplicate_filters(query, valid_filters)
    if duplicate_errors['has_error']:
        return duplicate_errors

    # Check for invalid filter syntax
    syntax_errors = _check_filter_syntax(query, valid_filters)
    if syntax_errors['has_error']:
        return syntax_errors

    # Checking the validity of filter values
    value_errors = _check_filter_values(query, valid_filters)
    if value_errors['has_error']:
        return value_errors

    # Check the validity of the filter combination
    combination_errors = _check_filter_combinations(query)
    if combination_errors['has_error']:
        return combination_errors

    return {
        'is_valid': True,
        'error_message': '',
        'error_type': '',
        'suggestions': []
    }


def _check_duplicate_filters(query, valid_filters):
    for filter_cmd in valid_filters:
        pattern = rf'\b{filter_cmd}:'
        matches = re.findall(pattern, query, re.IGNORECASE)
        if len(matches) > 1:
            return {
                'has_error': True,
                'is_valid': False,
                'error_message': f'The filter "{filter_cmd}:" appears {len(matches)} times. Each filter can only be used once',
                'error_type': 'duplicate_filter',
                'suggestions': [
                    f'Please remove the duplicate "{filter_cmd}:" filter'
                ]
            }
    return {'has_error': False}


def _check_filter_syntax(query, valid_filters):
    """Check filter syntax errors"""
    # Check for consecutive colons（e.g. in:in:pli-tv-ab）
    consecutive_colon_pattern = r'(\w+):(\w+):'
    consecutive_matches = re.findall(consecutive_colon_pattern, query, re.IGNORECASE)
    if consecutive_matches:
        for match in consecutive_matches:
            first_filter, second_filter = match
            if first_filter.lower() in valid_filters and second_filter.lower() in valid_filters:
                return {
                    'has_error': True,
                    'is_valid': False,
                    'error_message': f'Wrong filter format detected:"{first_filter}:{second_filter}:"',
                    'error_type': 'syntax_error',
                    'suggestions': [
                        f'You probably want to use:{first_filter}:{second_filter}',
                        f'Or use separately: {first_filter}:value1 {second_filter}:value2',
                        'Please check if you accidentally entered an extra colon'
                    ]
                }
    # Checking for empty filter values
    empty_filter_pattern = r'(\w+):\s*(?=\s|$|[a-z]+:)'
    empty_matches = re.findall(empty_filter_pattern, query, re.IGNORECASE)
    if empty_matches:
        for filter_name in empty_matches:
            if filter_name.lower() in valid_filters:
                return {
                    'has_error': True,
                    'is_valid': False,
                    'error_message': f'filter "{filter_name}:" Missing Values',
                    'error_type': 'empty_value',
                    'suggestions': [
                        f'Please provide a value for "{filter_name}:" such as：{filter_name}:example_value',
                        "If you don't need this filter, remove it"
                    ]
                }
    # Check for unknown filters
    filter_pattern = r'(\w+):'
    all_filters = re.findall(filter_pattern, query, re.IGNORECASE)
    for filter_name in all_filters:
        if filter_name.lower() not in valid_filters:
            return {
                'has_error': True,
                'is_valid': False,
                'error_message': f'Unknown filter: "{filter_name}:"',
                'error_type': 'unknown_filter',
                'suggestions': [
                    f'Supported filters are：{", ".join([f"{f}:" for f in valid_filters])}',
                    _suggest_similar_filter(filter_name, valid_filters),
                    'Please check if the spelling is correct'
                ]
            }
    return {'has_error': False}


def _check_filter_values(query, valid_filters):
    """Check the validity of the filter value"""
    # Check language code format
    lang_pattern = r'lang:([a-zA-Z-]+)'
    lang_matches = re.findall(lang_pattern, query, re.IGNORECASE)
    for lang_value in lang_matches:
        if not _is_valid_language_code(lang_value):
            return {
                'has_error': True,
                'is_valid': False,
                'error_message': f'Invalid language code："{lang_value}"',
                'error_type': 'invalid_language',
                'suggestions': [
                    'The language code should be 2-3 letters, for example：en, pli, zh, de',
                    'Common language codes: en (English), pli (Pali), zh (Chinese), de (German)'
                ]
            }
    return {'has_error': False}


def _check_filter_combinations(query):
    """Check the validity of the filter combination"""
    # Check for conflicting filter combinations
    if 'author:' in query.lower() and 'by:' in query.lower():
        return {
            'has_error': True,
            'is_valid': False,
            'error_message': 'The author: and by: filters cannot be used at the same time, they are synonymous',
            'error_type': 'conflicting_filters',
            'suggestions': [
                'Please use only one of author: or by:',
                'author: and by: have the same function, both are used to filter by author'
            ]
        }
    return {'has_error': False}


def _suggest_similar_filter(input_filter, valid_filters):
    """Suggest similar filters"""
    input_lower = input_filter.lower()
    # Simple similarity matching
    suggestions = []
    for valid_filter in valid_filters:
        if input_lower in valid_filter or valid_filter in input_lower:
            suggestions.append(f'{valid_filter}:')
    # Common spelling mistakes map
    common_mistakes = {
        'autor': 'author',
        'auther': 'author',
        'authur': 'author',
        'tittle': 'title',
        'titel': 'title',
        'language': 'lang',
        'lng': 'lang',
        'reference': 'ref',
        'volume': 'volpage',
        'vol': 'volpage',
        'page': 'volpage'
    }
    if input_lower in common_mistakes:
        suggestions.append(f'{common_mistakes[input_lower]}:')
    return f'Did you mean to use: {", ".join(suggestions)}' if suggestions else 'Please check the filter name'


def _is_valid_language_code(lang_code):
    """Verify language code format"""
    # The language code should be 2-3 letters
    pattern = r'^[a-zA-Z]{2,3}$'
    return bool(re.match(pattern, lang_code))
