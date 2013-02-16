exports.config = {

    'name': 'MaoMao\' Blog',	
    'brand': 'MaoMao\' Blog',	
    'description': '',

    //favicon 
    'favicon': './public/favicon.ico',

    //BLOG作者
    'author': {
        'name': '毛毛',
        'head': 'http://s.maoshuyu.com/res/head.jpg',
        'description': '2011年毕业于河北工程大学地理信息系统专业，目前就职于人人网FED。'
    },

    //域名
    'domain': 'http://blog.maoshuyu.com',
    //静态文件存储的URL
    'staticUrl': 'http://s.maoshuyu.com',
    //数据库
    'db': 'mongodb://127.0.0.1/mmblog',

    //log
    'log': {
        'access': './log/access.log', 
        'error': './log/error.log'
    },

    //RSS配置信息
    'rss': {
        'title': 'MaoMao\' Blog', 
        'link': 'http://blog.maoshuyu.com',
        'language': 'zh-cn',
        'description': '',
        'author': '毛毛',
        'maxRssItem': 50 
    }
};
