exports.config = {
    'name': 'MaoMao\' Blog',	
    'brand': 'MaoMao\' Blog',	
    'description': '',

    'author': {
        'name': '毛毛',
        'head': '/res/head.jpg',
        'description': '2011年毕业于河北工程大学地理信息系统专业，目前就职于人人网FED。'
    },

    'domain': 'http://localhost:3000',
    //静态文件存储的URL
    'staticUrl': 'http://localhost:3000',
    'db': 'mongodb://127.0.0.1/mmblog',

    'rss': {
        'title': 'MaoMao\' Blog', 
        'link': 'http://localhost:3000',
        'language': 'zh-cn',
        'description': '',
        'author': '毛毛',
        'maxRssItem': 50 
    }
};
