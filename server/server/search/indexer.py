import json
import hashlib
import logging
import itertools
import elasticsearch
from elasticsearch.helpers import bulk
from math import log
import search
from search import uid_expansion
from search.util import recursive_merge

import os

logger = logging.getLogger(__name__)
logger.setLevel('DEBUG')

es = elasticsearch.Elasticsearch([f'{os.getenv("ES_HOST")}:{os.getenv("ES_PORT")}'],
                                 http_auth=('elastic', 'changeme'))

from elasticsearch.exceptions import NotFoundError, RequestError


def is_available():
    return es.ping()


# Silence Elasticsearch spammy logging.
logging.getLogger('elasticsearch').setLevel('ERROR')
logging.getLogger('elasticsearch.trace').setLevel('ERROR')


class IndexCreationFailure(Exception):
    pass


class ElasticIndexer:
    """ Indexer for loading data into an ElasticSearch index.

    Instances should be transient, each time it is nessecary to load
    data into an index, a new instance should be created.

    This base class will automatically create a new index whenever
    the index settings/mapping changes. It will also automatically
    update the aliases.

    There are two basic approaches a subclass can take to keeping
    the index syncronized. The first is to completely rebuild the index
    whenever any data changes. In this case, get_extra_state should
    return the state of the source data (i.e. file mtimes), a change
    to the data will then result in a new index being generated.

    The second approach, for large datasets

    """

    es = es
    version = 1
    suppress_elasticsearch_errors = False
    non_aliased_indexes = {'pi2en-glossary', 'translations', 'pali-lookup'}

    @property
    def doc_type(self):
        raise NotImplementedError

    def __init__(self, config_name, index_alias=None, index_prefix=None):
        if index_alias is None:
            index_alias = config_name
        if index_prefix is None:
            index_prefix = index_alias + '_'
        self.index_alias = index_alias
        self.index_prefix = index_prefix
        self.config_name = config_name
        self.index_config = self.load_index_config(config_name)
        self.index_name = self.get_index_name()

    def update_data(self, force=False):
        """ This is the main method for subclasses to implement """
        raise NotImplementedError

    def is_update_needed(self):
        """ Override this if there is shortcut logic which determines
        all data is already indexed. """
        return True

    def get_extra_state(self):
        """ Override this is there is extra state beyond the index config

        An example would be indexing extra fields in the python, which
        is relying on Elasticsearch's automatic mapping generation.

        The return value should be an object which can be consistently
        serialized by json.dumps with sort_keys=True (i.e. dictionaries
        are okay, but a list where the contents appear in a randomized
        order should be pre-sorted before returning).

        """
        return None

    def get_index_name(self):
        """ The index name consists of the index prefix plus a hash

        suttas_df442af011

        That index should be aliased to a name which is actually
        used when searching.

        """

        # First we generate a hash based on the config
        md5 = hashlib.md5()
        md5.update(json.dumps(self.index_config, sort_keys=True).encode())

        # A subclass may define extra state which determines
        # when a new index needs to be generated.
        extra_state = self.get_extra_state()
        md5.update(json.dumps(extra_state, sort_keys=True).encode())
        md5.update(str(self.version).encode())
        index_hash = md5.hexdigest()[:10]

        return self.index_prefix + index_hash

    def index_exists(self):
        return self.es.indices.exists(self.index_name)

    def alias_exists(self):
        return self.es.indices.exists(self.index_alias)

    def delete_index(self):
        try:
            self.es.indices.delete(index_name)
        except:
            pass

    def create_index(self):
        logger.info('Creating index named {}, alias {}'.format(self.index_name, self.index_alias))
        try:
            self.es.indices.create(self.index_name, self.index_config)
        except RequestError as e:
            msg = 'Failure to create index "{}" from config "{}"'.format(self.index_alias,
                                                                         self.config_name)
            msg += '\n' + json.dumps(e.info, indent=2)
            raise IndexCreationFailure(msg) from e

    def update_aliases(self):
        try:
            indexes_to_alias = list(self.es.indices.get_alias(self.index_alias))
        except NotFoundError:
            indexes_to_alias = {}
        alias_actions = []
        obsolete_indexes = []

        for index in indexes_to_alias:
            if index != self.index_name:
                alias_actions.append({
                    "remove": {
                        "index": index,
                        "alias": self.index_alias
                    }
                })
                obsolete_indexes.append(index)

        if self.index_name not in indexes_to_alias:
            alias_actions.append({
                "add": {
                    "index": self.index_name,
                    "alias": self.index_alias
                }
            })

        if alias_actions:
            self.es.indices.update_aliases({"actions": alias_actions})

    def get_alias_to_index_mapping(self, exclude_prefix=''):
        mapping = {}
        r = self.es.indices.get_aliases('_all')
        for k, v in r.items():
            if k.startswith('.'):
                continue
            if exclude_prefix and k.startswith(exclude_prefix):
                continue
            # alias names are returned as keys in a dictionary
            # (i.e. a JSON 'set')
            try:
                index_name = next(iter(v['aliases']))
                mapping[index_name] = k
            except StopIteration:
                if k not in self.non_aliased_indexes:
                    logger.error('Oops {}, {}'.format(k, v))

        return mapping

    def delete_obsolete_indices(self):
        for index in self.es.indices.stats()['indices']:
            if not index.startswith(self.index_prefix):
                continue
            if index in self.es.indices.get_alias(self.index_alias):
                continue
            self.es.indices.delete(index)

    def wait_for_index(self, timeout='20s'):
        """ Returns True if index is ready, False if it times out """
        r = es.cluster.health(self.index_name)
        if r['status'] in {'green', 'yellow'}:
            return True
        else:
            logger.info('Index "{}" is not ready, waiting...'.format(self.index_name))
            r = es.cluster.health(self.index_name, wait_for_status='yellow', timeout=timeout)
            if r['timed_out'] == False:
                logger.info('Index "{}" became ready, with status {}'.format(
                    self.index_name, r['status']))
                return True
            else:
                logger.error('Index "{}" timed out after waiting for {}'.format(
                    self.index_name, timeout))
                return False

    def update(self, force=False):
        logging.info('Updating index {} with config {}'.format(self.index_alias, self.config_name))
        update_needed = False
        if force:
            self.delete_index()
        if not self.index_exists():
            logger.info('Creating index {} because index does not exists'.format(self.index_name))
            self.create_index()
            # Update is always needed when index is freshly created.
            update_needed = True
        else:
            logger.info('Index {} exists'.format(self.index_name))

        if update_needed or self.is_update_needed():
            if self.wait_for_index():
                self.update_data()
            else:
                logger.error('Failed to update index "{}"'.format(self.index_name))

        self.update_aliases()
        self.delete_obsolete_indices()

    def process_actions(self, actions, size=500):
        def chunk_actions():
            while True:
                chunk = list(itertools.islice(actions, size))
                if not chunk:
                    raise StopIteration
                yield chunk

        self.process_chunks(chunk_actions())

    def process_chunks(self, chunks):
        for chunk in chunks:
            if not chunk:
                continue
            try:
                res = bulk(self.es,
                           index=self.index_name,
                           doc_type=self.doc_type,
                           actions=(t for t in chunk if t is not None),
                           raise_on_exception=not self.suppress_elasticsearch_errors)
            except elasticsearch.helpers.BulkIndexError:
                pass

    def length_boost(self, length, midpoint=250):
        if length < midpoint:
            boost = length / midpoint
        else:
            boost = 0.5 + 1 / (1 + abs(log(length / (10 * midpoint), 10)))
        return boost

    @staticmethod
    def load_index_config(name, _seen=None, _first_run=[True]):
        if _first_run:
            _make_extra_filters()
            _first_run.clear()
        if _seen is None:
            _seen = set()

        if name in _seen:
            logger.Error("Inherited file {} already encountered, skipping".format(name))
            return out
        _seen.add(name)

        file = (search.indexer_dir / name).with_suffix('.json')

        out = {}

        with file.open('r', encoding='utf8') as f:
            try:
                config = json.load(f)
            except ValueError:
                logger.error('An error occured while parsing {!s}'.format(file))
                raise

        for filename in config.get("inherits", []):
            inherited_config = ElasticIndexer.load_index_config(filename, _seen)
            recursive_merge(out, inherited_config)
        recursive_merge(out, config.get("index", {}))
        return out


def _make_acro_to_name_and_uid_filter():
    mapping = []
    for uid in sorted(uid_expansion._uid_to_acro_map):
        syns = [uid]
        acro = uid_expansion._uid_to_acro_map[uid]
        name = uid_expansion._uid_to_name_map[uid]
        if acro.lower() != uid:
            syns.append(acro)
        syns.append(name)
        mapping.append(','.join(syns))

    return {
        "index": {
            "settings": {
                "analysis": {
                    "filter": {
                        "acro_and_name_to_uid": {
                            "type": "synonym",
                            "synonyms": mapping
                        }
                    }
                }
            }
        }
    }


def _make_coded_name_filter():
    code_map = {
        "邠": "bin1 ", "次": "ci4 ", "麤": "cu1 ", "圓": "yuan2 ", "海": "hai3 ", "禮": "li3 ",
        "侍": "shi4 ", "鬱": "yu4 ", "嚴": "yan2 ", "岸": "an4 ", "殺": "sha1 ", "固": "gu4 ",
        "熾": "chi4 ", "持": "chi2 ", "垂": "chui2 ", "七": "qi1 ", "脅": "xie2 ", "疑": "yi2 ",
        "有": "you3 ", "莊": "zhuang1 ", "憎": "zeng1 ", "災": "zai1 ", "梨": "li2 ", "徒": "tu2 ",
        "五": "wu3 ", "讚": "zan4 ", "娛": "yu2 ", "攝": "she4 ", "歡": "huan1 ", "入": "ru4 ",
        "橫": "heng2 ", "息": "xi1 ", "蟲": "chong2 ", "平": "ping2 ", "極": "ji2 ", "多": "duo1 ",
        "避": "bi4 ", "十": "shi2 ", "雄": "xiong2 ", "鄙": "bi3 ", "賈": "jia3 ", "佉": "qu1 ",
        "及": "ji2 ", "手": "shou3 ", "嫌": "xian2 ", "野": "ye3 ", "顏": "yan2 ", "卑": "bei1 ",
        "習": "xi2 ", "著": "zhuo2 ", "牛": "niu2 ", "益": "yi4 ", "漢": "han4 ", "叵": "po3 ",
        "冥": "ming2 ", "鴦": "yang1 ", "貧": "pin2 ", "義": "yi4 ", "劫": "jie2 ", "般": "ban1 ",
        "奢": "she1 ", "央": "yang1 ", "露": "lu4 ", "尸": "shi1 ", "畏": "wei4 ", "施": "shi1 ",
        "燃": "ran2 ", "退": "tui4 ", "漂": "piao1 ", "合": "he2 ", "邏": "luo2 ", "園": "yuan2 ",
        "柔": "rou2 ", "鬚": "xu1 ", "力": "li4 ", "遠": "yuan3 ", "鏡": "jing4 ", "形": "xing2 ",
        "廣": "guang3 ", "除": "chu2 ", "臥": "wo4 ", "給": "ji3 ", "糧": "liang2 ", "周": "zhou1 ",
        "婬": "yin2 ", "灰": "hui1 ", "布": "bu4 ", "年": "nian2 ", "當": "dang1 ", "捺": "na4 ",
        "髻": "ji4 ", "血": "xie3 ", "跡": "ji1 ", "黃": "huang2 ", "商": "shang1 ", "深": "shen1 ",
        "回": "hui2 ", "半": "ban4 ", "請": "qing3 ", "闍": "she2 ", "烏": "wu1 ", "恐": "kong3 ",
        "青": "qing1 ", "駕": "jia4 ", "魚": "yu2 ", "栴": "zhan1 ", "神": "shen2 ", "惟": "wei2 ",
        "群": "qun2 ", "說": "shuo1 ", "墮": "duo4 ", "稱": "cheng1 ", "男": "nan2 ", "小": "xiao3 ",
        "亂": "luan4 ", "會": "hui4 ", "者": "zhe3 ", "三": "san1 ", "名": "ming2 ", "意": "yi4 ",
        "我": "wo3 ", "損": "sun3 ", "弓": "gong1 ", "耕": "geng1 ", "喘": "chuan3 ", "軟": "ruan3 ",
        "增": "zeng1 ", "離": "li2 ", "罣": "gua4 ", "瓦": "wa3 ", "淨": "jing4 ", "癩": "lai4 ",
        "孫": "sun1 ", "雲": "yun2 ", "塵": "chen2 ", "長": "zhang3 ", "鹹": "xian2 ", "死": "si3 ",
        "波": "bo1 ", "命": "ming4 ", "西": "xi1 ", "觀": "guan1 ", "縛": "fu4 ", "哆": "duo1 ",
        "蛇": "she2 ", "富": "fu4 ", "胎": "tai1 ", "返": "fan3 ", "恕": "shu4 ", "洲": "zhou1 ",
        "鍛": "duan4 ", "汝": "ru3 ", "壞": "huai4 ", "慧": "hui4 ", "行": "xing2 ", "爪": "zhao3 ",
        "嶷": "yi2 ", "第": "di4 ", "醯": "xi1 ", "焰": "yan4 ", "花": "hua1 ", "梵": "fan4 ",
        "鐶": "huan2 ", "斷": "duan4 ", "刺": "ci4 ", "去": "qu4 ", "莫": "mo4 ", "酥": "su1 ",
        "犁": "li2 ", "肅": "su4 ", "文": "wen2 ", "檀": "tan2 ", "舊": "jiu4 ", "王": "wang2 ",
        "饒": "rao4 ", "福": "fu2 ", "磨": "mo2 ", "賓": "bin1 ", "演": "yan3 ", "搖": "yao2 ",
        "甘": "gan1 ", "稚": "zhi4 ", "貝": "bei4 ", "頞": "e4 ", "祠": "ci2 ", "幢": "chuang2 ",
        "潤": "run4 ", "譬": "pi4 ", "娑": "suo1 ", "遮": "zhe1 ", "六": "liu4 ", "干": "gan1 ",
        "翳": "yi4 ", "學": "xue2 ", "數": "shu4 ", "空": "kong1 ", "荼": "tu2 ", "祀": "si4 ",
        "時": "shi2 ", "心": "xin1 ", "順": "shun4 ", "豆": "dou4 ", "闇": "an4 ", "犍": "jian1 ",
        "散": "san4 ", "歌": "ge1 ", "過": "guo4 ", "量": "liang4 ", "穢": "hui4 ", "染": "ran3 ",
        "仙": "xian1 ", "驚": "jing1 ", "毛": "mao2 ", "卜": "bu3 ", "上": "shang4 ", "類": "lei4 ",
        "無": "wu2 ", "律": "lyu4 ", "鬥": "dou4 ", "昧": "mei4 ", "隨": "sui2 ", "崩": "beng1 ",
        "禪": "chan2 ", "倫": "lun2 ", "失": "shi1 ", "網": "wang3 ", "縷": "lyu3 ", "洹": "huan2 ",
        "覺": "jue2 ", "頻": "pin2 ", "缽": "bo1 ", "犀": "xi1 ", "慈": "ci2 ", "來": "lai2 ",
        "膊": "fu3 ", "訟": "song4 ", "章": "zhang1 ", "巢": "chao2 ", "夫": "fu1 ", "賤": "jian4 ",
        "步": "bu4 ", "迦": "jia1 ", "雨": "yu3 ", "自": "zi4 ", "火": "huo3 ", "蘭": "lan2 ",
        "已": "yi3 ", "味": "wei4 ", "賴": "lai4 ", "獵": "lie4 ", "相": "xiang4 ", "出": "chu1 ",
        "罽": "ji4 ", "現": "xian4 ", "真": "zhen1 ", "獅": "shi1 ", "就": "jiu4 ", "狐": "hu2 ",
        "擔": "dan4 ", "捕": "bu3 ", "轉": "zhuan3 ", "默": "mo4 ", "教": "jiao4 ", "衛": "wei4 ",
        "補": "bu3 ", "牟": "mou2 ", "索": "suo3 ", "座": "zuo4 ", "薩": "sa4 ", "優": "you1 ",
        "鞭": "bian1 ", "戰": "zhan4 ", "熱": "re4 ", "甲": "jia3 ", "口": "kou3 ", "水": "shui3 ",
        "丸": "wan2 ", "方": "fang1 ", "鳥": "niao3 ", "言": "yan2 ", "要": "yao4 ", "各": "ge4 ",
        "先": "xian1 ", "丈": "zhang4 ", "養": "yang3 ", "泉": "quan2 ", "龍": "long2 ", "成": "cheng2 ",
        "貓": "mao1 ", "算": "suan4 ", "帝": "di4 ", "丘": "qiu1 ", "愚": "yu2 ", "猿": "yuan2 ",
        "功": "gong1 ", "賣": "mai4 ", "句": "ju4 ", "盧": "lu2 ", "器": "qi4 ", "士": "shi4 ",
        "端": "duan1 ", "堅": "jian1 ", "揵": "qian2 ", "雷": "lei2 ", "善": "shan4 ", "祺": "qi2 ",
        "塼": "zhuan1 ", "所": "suo3 ", "私": "si1 ", "終": "zhong1 ", "剛": "gang1 ", "鑄": "zhu4 ",
        "曇": "tan2 ", "盜": "dao4 ", "灌": "guan4 ", "忍": "ren3 ", "金": "jin1 ", "石": "shi2 ",
        "杖": "zhang4 ", "乘": "cheng2 ", "慚": "can2 ", "別": "bie2 ", "度": "du4 ", "澡": "zao3 ",
        "御": "yu4 ", "邪": "xie2 ", "脫": "tuo1 ", "馬": "ma3 ", "中": "zhong1 ", "窮": "qiong2 ",
        "兒": "er2 ", "報": "bao4 ", "申": "shen1 ", "強": "qiang2 ", "吹": "chui1 ", "為": "wei2 ",
        "伏": "fu2 ", "匿": "ni4 ", "老": "lao3 ", "薄": "bo2 ", "舅": "jiu4 ", "皆": "jie1 ",
        "少": "shao3 ", "邊": "bian1 ", "不": "bu4 ", "能": "neng2 ", "怨": "yuan4 ", "粒": "li4 ",
        "弗": "fu2 ", "婦": "fu4 ", "愛": "ai4 ", "未": "wei4 ", "珠": "zhu1 ", "起": "qi3 ",
        "嚫": "chen4 ", "渝": "yu2 ", "摩": "mo2 ", "八": "ba1 ", "陂": "po1 ", "髮": "fa4 ",
        "魯": "lu3 ", "痴": "chi1 ", "延": "yan2 ", "白": "bai2 ", "毀": "hui3 ", "集": "ji2 ",
        "均": "jun1 ", "葉": "she4 ", "態": "tai4 ", "降": "xiang2 ", "筏": "fa2 ", "提": "ti2 ",
        "灑": "sa3 ", "他": "ta1 ", "土": "tu3 ", "釜": "fu3 ", "晝": "zhou4 ", "閣": "ge2 ",
        "瘦": "shou4 ", "木": "mu4 ", "坌": "ben4 ", "醫": "yi1 ", "賢": "xian2 ", "種": "zhong3 ",
        "邱": "qiu1 ", "足": "zu2 ", "德": "de2 ", "輸": "shu1 ", "油": "you2 ", "嗏": "cha1 ",
        "戾": "li4 ", "殿": "dian4 ", "結": "jie2 ", "銅": "tong2 ", "蘆": "lu2 ", "逆": "ni4 ",
        "月": "yue4 ", "見": "jian4 ", "邑": "yi4 ", "吒": "zha4 ", "經": "jing1 ", "純": "chun2 ",
        "世": "shi4 ", "林": "lin2 ", "魔": "mo2 ", "夜": "ye4 ", "頂": "ding3 ", "占": "zhan1 ",
        "惡": "e4 ", "屢": "lyu3 ", "緣": "yuan2 ", "若": "ruo4 ", "哩": "li3 ", "沒": "mo4 ",
        "華": "hua2 ", "印": "yin4 ", "惱": "nao3 ", "執": "zhi2 ", "移": "yi2 ", "郁": "yu4 ",
        "求": "qiu2 ", "旃": "zhan1 ", "彈": "tan2 ", "靜": "jing4 ", "遊": "you2 ", "釋": "shi4 ",
        "剎": "cha4 ", "子": "zi3 ", "女": "nyu3 ", "聞": "wen2 ", "湖": "hu2 ", "安": "an1 ",
        "練": "lian4 ", "恚": "hui4 ", "兜": "dou1 ", "伊": "yi1 ", "察": "cha2 ", "負": "fu4 ",
        "客": "ke4 ", "性": "xing4 ", "風": "feng1 ", "師": "shi1 ", "嶮": "xian3 ", "蜱": "pi2 ",
        "主": "zhu3 ", "疾": "ji2 ", "尿": "niao4 ", "漁": "yu2 ", "覆": "fu4 ", "嬉": "xi1 ",
        "羊": "yang2 ", "下": "xia4 ", "二": "er4 ", "氏": "shi4 ", "休": "xiu1 ", "樓": "lou2 ",
        "首": "shou3 ", "頗": "po1 ", "傘": "san3 ", "錙": "zi1 ", "減": "jian3 ", "障": "zhang4 ",
        "親": "qin1 ", "睡": "shui4 ", "詣": "yi4 ", "略": "lue4 ", "顧": "gu4 ", "部": "bu4 ",
        "道": "dao4 ", "繫": "xi4 ", "業": "ye4 ", "差": "cha1 ", "影": "ying3 ", "篲": "hui4 ",
        "宿": "su4 ", "偷": "tou1 ", "裸": "luo3 ", "曼": "man4 ", "好": "hao3 ", "寂": "ji4 ",
        "驃": "biao1 ", "故": "gu4 ", "等": "deng3 ", "之": "zhi1 ", "疲": "pi2 ", "毒": "du2 ",
        "拔": "ba2 ", "虛": "xu1 ", "雜": "za2 ", "喻": "yu4 ", "瑟": "se4 ", "池": "chi2 ",
        "耨": "nou4 ", "輪": "lun2 ", "溫": "wen1 ", "積": "ji1 ", "欲": "yu4 ", "難": "nan2 ",
        "然": "ran2 ", "傷": "shang1 ", "逸": "yi4 ", "放": "fang4 ", "日": "ri4 ", "茂": "mao4 ",
        "毗": "pi2 ", "涅": "nie4 ", "須": "xu1 ", "玉": "yu4 ", "弊": "bi4 ", "事": "shi4 ",
        "憍": "jiao1 ", "伽": "qie2 ", "誓": "shi4 ", "外": "wai4 ", "際": "ji4 ", "屠": "tu2 ",
        "信": "xin4 ", "止": "zhi3 ", "鉤": "gou1 ", "藥": "yao4 ", "僧": "seng1 ", "菩": "pu2 ",
        "罪": "zui4 ", "字": "zi4 ", "燭": "zhu2 ", "浮": "fu2 ", "柱": "zhu4 ", "歲": "sui4 ",
        "其": "qi2 ", "睺": "hou4 ", "衰": "shuai1 ", "病": "bing4 ", "俱": "ju4 ", "偈": "jie2 ",
        "叉": "cha1 ", "與": "yu3 ", "槍": "qiang1 ", "九": "jiu3 ", "近": "jin4 ", "藕": "ou3 ",
        "願": "yuan4 ", "四": "si4 ", "聚": "ju4 ", "瘡": "chuang1 ", "室": "shi4 ", "愧": "kui4 ",
        "利": "li4 ", "斯": "si1 ", "末": "mo4 ", "頭": "tou2 ", "支": "zhi1 ", "新": "xin1 ",
        "趣": "qu4 ", "鐵": "tie3 ", "夷": "yi2 ", "樹": "shu4 ", "人": "ren2 ", "鼻": "bi2 ",
        "鴿": "ge1 ", "門": "men2 ", "瞋": "chen1 ", "肆": "si4 ", "舉": "ju3 ", "國": "guo2 ",
        "後": "hou4 ", "在": "zai4 ", "窒": "chi4 ", "果": "guo3 ", "思": "si1 ", "生": "sheng1 ",
        "晡": "bu1 ", "勢": "shi4 ", "正": "zheng4 ", "古": "gu3 ", "內": "nei4 ", "物": "wu4 ",
        "雪": "xue3 ", "恭": "gong1 ", "蓮": "lian2 ", "即": "ji2 ", "菴": "an1 ", "呵": "a1 ",
        "具": "ju4 ", "觸": "chu4 ", "特": "te4 ", "建": "jian4 ", "杻": "chou3 ", "聽": "ting1 ",
        "繁": "fan2 ", "千": "qian1 ", "便": "bian4 ", "居": "ju1 ", "祇": "qi2 ", "燈": "deng1 ",
        "車": "che1 ", "齋": "zhai1 ", "矌": "guang4 ", "苦": "ku3 ", "問": "wen4 ", "比": "bi3 ",
        "廚": "chu2 ", "佛": "fo2 ", "糞": "fen4 ", "素": "su4 ", "因": "yin1 ", "立": "li4 ",
        "訶": "he1 ", "本": "ben3 ", "炭": "tan4 ", "藍": "lan2 ", "田": "tian2 ", "戲": "xi4 ",
        "害": "hai4 ", "猴": "hou2 ", "耶": "ye1 ", "誹": "fei3 ", "瞻": "zhan1 ", "眼": "yan3 ",
        "樂": "le4 ", "掃": "sao3 ", "耆": "qi2 ", "蘊": "yun4 ", "例": "li4 ", "后": "hou4 ",
        "紐": "niu3 ", "云": "yun2 ", "戒": "jie4 ", "怖": "bu4 ", "鸚": "ying1 ", "供": "gong4 ",
        "蜜": "mi4 ", "盡": "jin4 ", "牢": "lao2 ", "遫": "su4 ", "孤": "gu1 ", "泥": "ni2 ",
        "釧": "chuan4 ", "郭": "guo1 ", "異": "yi4 ", "色": "se4 ", "典": "dian3 ", "竹": "zhu2 ",
        "智": "zhi4 ", "蟻": "yi3 ", "彼": "bi3 ", "壽": "shou4 ", "謗": "bang4 ", "盛": "sheng4 ",
        "獄": "yu4 ", "奈": "nai4 ", "嫉": "ji2 ", "彌": "mi2 ", "豎": "shu4 ", "族": "zu2 ",
        "嵐": "lan2 ", "黑": "hei1 ", "孔": "kong3 ", "法": "fa3 ", "聖": "sheng4 ", "肉": "rou4 ",
        "食": "shi2 ", "作": "zuo4 ", "鍵": "jian4 ", "連": "lian2 ", "鹽": "yan2 ", "骨": "gu3 ",
        "天": "tian1 ", "薪": "xin1 ", "含": "han2 ", "責": "ze2 ", "是": "shi4 ", "諸": "zhu1 ",
        "耳": "er3 ", "岳": "yue4 ", "家": "jia1 ", "澤": "ze2 ", "阿": "a4 ", "憂": "you1 ",
        "切": "qie4 ", "越": "yue4 ", "大": "da4 ", "和": "he2 ", "倒": "dao3 ", "縏": "pan2 ",
        "間": "jian1 ", "輕": "qing1 ", "折": "zhe2 ", "礙": "ai4 ", "鞞": "bi4 ", "曠": "kuang4 ",
        "鵡": "wu3 ", "恣": "zi4 ", "壤": "rang3 ", "實": "shi2 ", "牧": "mu4 ", "煩": "fan2 ",
        "藪": "sou3 ", "得": "de2 ", "修": "xiu1 ", "杵": "chu3 ", "寶": "bao3 ", "沙": "sha1 ",
        "鋸": "ju1 ", "重": "zhong4 ", "鹿": "lu4 ", "雀": "que4 ", "流": "liu2 ", "棄": "qi4 ",
        "密": "mi4 ", "光": "guang1 ", "緊": "jin3 ", "迎": "ying2 ", "燒": "shao1 ", "桓": "huan2 ",
        "何": "he2 ", "取": "qu3 ", "饉": "jin3 ", "拘": "ju1 ", "淚": "lei4 ", "瓜": "gua1 ",
        "陟": "zhi4 ", "閡": "he2 ", "夢": "meng4 ", "患": "huan4 ", "沫": "mo4 ", "箭": "jian4 ",
        "踰": "yu2 ", "釣": "diao4 ", "破": "po4 ", "城": "cheng2 ", "船": "chuan2 ", "治": "zhi4 ",
        "尼": "ni2 ", "眾": "zhong4 ", "一": "yi1 ", "羅": "luo2 ", "計": "ji4 ", "醉": "zui4 ",
        "同": "tong2 ", "角": "jiao3 ", "序": "xu4 ", "閑": "xian2 ", "如": "ru2 ", "枕": "zhen3 ",
        "化": "hua4 ", "記": "ji4 ", "香": "xiang1 ", "甚": "shen4 ", "闡": "chan3 ", "慢": "man4 ",
        "淫": "yin2 ", "知": "zhi1 ", "獦": "ge2 ", "鉗": "qian2 ", "豬": "zhu1 ", "揭": "jie1 ",
        "滯": "zhi4 ", "陰": "yin1 ", "己": "ji3 ", "想": "xiang3 ", "念": "nian4 ", "留": "liu2 ",
        "絺": "chi1 ", "可": "ke3 ", "松": "song1 ", "滿": "man3 ", "陀": "tuo2 ", "勇": "yong3 ",
        "應": "ying4 ", "蓋": "gai4 ", "母": "mu3 ", "低": "di1 ", "驢": "lyu2 ", "酒": "jiu3 ",
        "達": "da2 ", "濕": "shi1 ", "蹟": "ji4 ", "非": "fei1 ", "廟": "miao4 ", "技": "ji4 ",
        "乳": "ru3 ", "春": "chun1 ", "誦": "song4 ", "貪": "tan1 ", "爭": "zheng1 ", "皮": "pi2 ",
        "萍": "ping2 ", "獸": "shou4 ", "悲": "bei1 ", "那": "na4 ", "壹": "yi1 ", "根": "gen1 ",
        "夏": "xia4 ", "於": "yu2 ", "往": "wang3 ", "封": "feng1 ", "清": "qing1 ", "指": "zhi3 ",
        "守": "shou3 ", "舍": "she4 ", "漏": "lou4 ", "向": "xiang4 ", "鼓": "gu3 ", "百": "bai3 ",
        "猗": "yi1 ", "掘": "jue2 ", "雞": "ji1 ", "崛": "jue2 ", "喜": "xi3 ", "初": "chu1 ",
        "弟": "di4 ", "象": "xiang4 ", "飢": "ji1 ", "諦": "di4 ", "況": "kuang4 ", "旬": "xun2 ",
        "目": "mu4 ", "厭": "yan4 ", "山": "shan1 ", "慳": "qian1 ", "致": "zhi4 ", "陵": "ling2 ",
        "護": "hu4 ", "塞": "sai4 ", "穽": "jing3 ", "曾": "ceng2 ", "使": "shi3 ", "陳": "chen2 ",
        "龜": "gui1 ", "賊": "zei2 ", "此": "ci3 ", "前": "qian2 ", "黎": "li2 ", "住": "zhu4 ",
        "惒": "he2 ", "河": "he2 ", "身": "shen1 ", "處": "chu4 ", "論": "lun4 ", "南": "nan2 ",
        "毘": "pi2 ", "琴": "qin2 ", "罵": "ma4 ", "關": "guan1 ", "點": "dian3 ", "眠": "mian2 ",
        "財": "cai2 ", "構": "gou4 ", "麥": "mai4 ", "癡": "chi1 ", "開": "kai1 ", "枯": "ku1 ",
        "地": "di4 ", "常": "chang2 ", "衣": "yi1 ", "父": "fu4 ", "玷": "dian4 ", "寤": "wu4 ",
        "閻": "yan2 ", "瞿": "qu1 ", "最": "zui4 ", "節": "jie2 ", "堂": "tang2 ", "億": "yi4 ",
        "分": "fen1 ", "率": "shuai4 ", "嬈": "rao2 ", "吼": "hou3 ", "尊": "zun1 ", "照": "zhao4 ",
        "劍": "jian4 ", "明": "ming2 ", "怒": "nu4 ", "繩": "sheng2 ", "鬘": "man2 ", "調": "diao4 ",
        "動": "dong4 ", "泡": "pao4 ", "衢": "qu2 ", "解": "jie3 ", "以": "yi3 ", "試": "shi4 ",
        "禁": "jin4 ", "獨": "du2 ", "志": "zhi4 ", "敬": "jing4 ", "竭": "jie2 ", "普": "pu3 ",
        "聲": "sheng1 ", "至": "zhi4 ", "奴": "nu2 ", "究": "jiu1 ", "歸": "gui1 ", "惹": "re3 ",
        "塚": "zhong3 ", "乾": "gan1 ", "忿": "fen4 ", "品": "pin3 ", "槃": "pan2 ", "滅": "mie4 ",
        "婆": "po2 ", "跋": "ba2 ", "界": "jie4 ", "諍": "zheng1 ", "坐": "zuo4 ", "恒": "heng2 ",
        "姓": "xing4 ", "捨": "she3 ", "乞": "qi3 ", "受": "shou4 ", "識": "shi4 ", "痛": "tong4 ",
        "勝": "sheng4 ", "繞": "rao4 ", "濟": "ji4",
        "兔": "tou3", "縈": "jin4", "餅": "beng2", "淳": "seon4", "獲": "wok6",
    }
    code_map.update({'–': '-', '—': '--', '−': '-', '\xad': ''})
    code_map.update({'ṅ': '"n', 'ñ': '~n', 'ḷ': '.l', 'ṭ': '.t', 'ḍ': '.d',
                     'ś': "'s", 'ḥ': '.h', 'ṃ': '.m', 'ā': 'aa', 'ī': 'ii',
                     'ṛ': '.r', 'ṇ': '.n', 'ū': 'uu', 'ṣ': '.s'})
    code_map.update({'ã': 'aa'})  # Some systems use this a for a macron

    for k, v in code_map.copy().items():
        if k.upper() != k:
            code_map[k.upper()] = v

    return {
        "index": {
            "settings": {
                "analysis": {
                    "char_filter": {
                        "coded_name_char_filter": {
                            "type": "mapping",
                            "mappings": ["{}=>{}".format(k, code_map[k])
                                         for k in sorted(code_map)]
                        }
                    }
                }
            }
        }
    }


def _make_extra_filters():
    """ Create extra filters that make use of imm data

    This creates actual files. Other than requiring the imm
    to run this function completes very quickly.

    """
    with (search.indexer_dir / 'coded_name_auto.json').open('w', encoding='utf8') as f:
        print(search.indexer_dir / 'coded_name_auto.json')
        json.dump(_make_coded_name_filter(), f, ensure_ascii=False, indent=2)

    with (search.indexer_dir / 'acro_to_name_and_uid_auto.json').open('w', encoding='utf8') as f:
        json.dump(_make_acro_to_name_and_uid_filter(), f, ensure_ascii=False, indent=2)
