exports.config = {
    'name': 'MaoMao\' Blog',	
    'brand': 'MaoMao\' Blog',	
    'description': '',

    'author': {
        'name': '毛毛',
        'head': 'http://s.maoshuyu.com/res/head.jpg',
        'description': '2011年毕业于河北工程大学地理信息系统专业，目前就职于人人网FED。'
    },

    'domain': 'http://blog.maoshuyu.com',
    //静态文件存储的URL
    'staticUrl': 'http://s.maoshuyu.com',
    'db': 'mongodb://127.0.0.1/mmblog',

    'rss': {
        'title': 'MaoMao\' Blog', 
        'link': 'http://blog.maoshuyu.com',
        'language': 'zh-cn',
        'description': '',
        'author': '毛毛',
        'maxRssItem': 50 
    }
};
