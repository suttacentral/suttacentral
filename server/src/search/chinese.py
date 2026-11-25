import re

from zhconv import convert as zhconv_convert


def is_chinese(uchar):
    return u'\u4e00' <= uchar <= u'\u9fa5'


def is_chinese_ex(query_conditions):
    keyword_list = []
    if 'or' in query_conditions:
        keyword_list = query_conditions['or']
    if 'and' in query_conditions:
        keyword_list = query_conditions['and']
    return any(is_chinese(keyword) for keyword in keyword_list)


def extend_chinese_keywords(keyword_list, query_conditions):
    keywords = []
    for keyword in query_conditions['or']:
        if is_chinese(keyword):
            keywords.extend([
                zhconv_convert(keyword, 'zh-hant'),
                zhconv_convert(keyword, 'zh-hans')
            ])
    keyword_list.extend(keywords)
    keyword_list = list(set(keyword_list))
    return keyword_list


def find_chinese_sentences_with_keyword(input_string, keyword):
    """
        Find natural chinese sentences containing the given keyword
        from a string.

        parameter:
        input_string: string, the sentence to find
        keyword: string, the keyword to find

        return value:
        A list of strings consisting of natural sentences
        containing the given keywords.
    """
    sentence_list = re.split(r'[。！？]+', input_string)
    return [
        f'{sentence.strip()}<br/>'
        for sentence in sentence_list
        if keyword in sentence
    ]
