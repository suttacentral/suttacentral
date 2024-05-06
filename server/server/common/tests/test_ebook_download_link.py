import requests

download_links_of_collections = [
  'https://github.com/suttacentral/editions/raw/main/en/sujato/dn/epub/Long-Discourses-sujato-2024-05-06.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/dn/paperback/Long-Discourses-sujato-2024-05-06.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/dn/html/Long-Discourses-sujato-2024-05-06.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/dn/paperback/Long-Discourses-sujato-2024-05-06-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/mn/epub/Middle-Discourses-sujato-2024-05-06.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/mn/paperback/Middle-Discourses-sujato-2023-10-30.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/mn/html/Middle-Discourses-sujato-2024-05-06.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/mn/paperback/Middle-Discourses-sujato-2023-10-30-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/sn/epub/Linked-Discourses-sujato-2024-05-06.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/sn/paperback/Linked-Discourses-sujato-2024-05-06.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/sn/html/Linked-Discourses-sujato-2024-05-06.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/sn/paperback/Linked-Discourses-sujato-2024-05-06-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/an/epub/Numbered-Discourses-sujato-2024-05-06.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/an/paperback/Numbered-Discourses-sujato-2024-05-06.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/an/html/Numbered-Discourses-sujato-2024-05-06.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/an/paperback/Numbered-Discourses-sujato-2024-05-06-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/dhp/epub/Sayings-of-the-Dhamma-sujato-2024-04-15.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/dhp/paperback/Sayings-of-the-Dhamma-sujato-2024-04-15.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/dhp/html/Sayings-of-the-Dhamma-sujato-2024-04-15.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/dhp/paperback/Sayings-of-the-Dhamma-sujato-2024-04-15-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/ud/epub/Heartfelt-Sayings-sujato-2024-05-06.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/ud/paperback/Heartfelt-Sayings-sujato-2024-05-06.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/ud/html/Heartfelt-Sayings-sujato-2024-05-06.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/ud/paperback/Heartfelt-Sayings-sujato-2024-05-06-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/iti/epub/So-It-Was-Said-sujato-2024-05-06.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/iti/paperback/So-It-Was-Said-sujato-2024-05-06.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/iti/html/So-It-Was-Said-sujato-2024-05-06.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/iti/paperback/So-It-Was-Said-sujato-2024-05-06-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/snp/epub/Anthology-of-Discourses-sujato-2024-05-06.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/snp/paperback/Anthology-of-Discourses-sujato-2023-10-30.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/snp/html/Anthology-of-Discourses-sujato-2024-05-06.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/snp/paperback/Anthology-of-Discourses-sujato-2023-10-30-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/thag/epub/Verses-of-the-Senior-Monks-sujato-2024-04-15.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/thag/paperback/Verses-of-the-Senior-Monks-sujato-2024-04-15.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/thag/html/Verses-of-the-Senior-Monks-sujato-2024-04-15.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/thag/paperback/Verses-of-the-Senior-Monks-sujato-2024-04-15-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/sujato/thig/epub/Verses-of-the-Senior-Nuns-sujato-2024-04-15.epub',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/thig/paperback/Verses-of-the-Senior-Nuns-sujato-2024-04-15.zip',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/thig/html/Verses-of-the-Senior-Nuns-sujato-2024-04-15.html',
  'https://github.com/suttacentral/editions/raw/main/en/sujato/thig/paperback/Verses-of-the-Senior-Nuns-sujato-2024-04-15-tex.zip',

  'https://github.com/suttacentral/editions/raw/main/en/brahmali/pli-tv-vi/epub/Therav%C4%81da-Collection-on-Monastic-Law-brahmali-2023-12-11.epub',
  'https://github.com/suttacentral/editions/raw/main/en/brahmali/pli-tv-vi/paperback/Therav%C4%81da-Collection-on-Monastic-Law-brahmali-2023-12-11.zip',
  'https://github.com/suttacentral/editions/raw/main/en/brahmali/pli-tv-vi/html/Therav%C4%81da-Collection-on-Monastic-Law-brahmali-2023-12-11.html',
  'https://github.com/suttacentral/editions/raw/main/en/brahmali/pli-tv-vi/paperback/Therav%C4%81da-Collection-on-Monastic-Law-brahmali-2023-12-11-tex.zip',
]


def test_link():
  for link in download_links_of_collections:
    print(f'Testing {link}...')
    response = requests.head(link)
    assert response.status_code < 400

