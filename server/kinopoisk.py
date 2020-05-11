import requests
from lxml import html


def get_film_url_kinopoisk(name):
    headers = {
        "Host": "mc.yandex.ru",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:75.0) Gecko/20100101 Firefox/75.0",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate, br",
        "Origin": "https://www.kinopoisk.ru",
        "Connection": "keep-alive",
        "TE": "Trailers",
        "Upgrade-Insecure-Request": "1",
    }
    data = 'site-info=%7B%22auth%22%3A%7B%22logged-in%22%3A%22no%22%7D%7D'
    url = "https://www.kinopoisk.ru/index.php?kp_query="
    base = "https://www.kinopoisk.ru/film/"
    req = '+'.join(name.split())
    url += req
    headers["Referer"] = url

    with open("popular.txt", "wb") as fout:
        ans = requests.get(url)
        if ans.status_code == 200:
            fout.write(ans.text.encode("utf-8"))

    with open("popular.txt", 'rb') as fin:
        page = fin.read()
        page = page.decode("utf-8")
    try:
        tree = html.fromstring(page)
        div_node = tree.find_class("element most_wanted")[0].find_class("pic")[0]
        link = div_node.xpath('.//a/@data-id')[0]
        finish_url = base + link
    except Exception as e:
        finish_url = "https://www.kinopoisk.ru/series/10421811111/"
    return finish_url
