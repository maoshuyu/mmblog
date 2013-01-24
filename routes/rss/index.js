var data2xml = require('data2xml')()
  , markdown = require('markdown').markdown
  , _ = require('underscore')
  , articleCtrl = require('../article')
  , rssConfig = require('../../config').config.rss;


exports.index = function(req, res, next) {
    var opt = { 
            'limit': rssConfig.maxRssItem, 
            'sort': {'createTime': 'desc'}
        }
      , fields = ['_id', 'title', 'content', 'createTime'];
    articleCtrl.getArticleByQuery({}, fields, opt, function(err, articles) {
        if (err) {			
            return next(err);	
        }
        var rssObj = {
            '_attr': { version: '2.0' },
            'channel': {
                'title': rssConfig.title,	
                'link': rssConfig.link,
                'description': rssConfig.description,
                'language': rssConfig.language,
                'item': []
            }
        };
        _.each(articles, function(article, index) {
            rssObj.channel.item.push({
                'title': article.title,	
                'link': rssConfig.link + '#article' + article._id,
                'guid': rssConfig.link + '#article' + article._id,
                'description': markdown.toHTML(article.content),
                'author': rssConfig.author, 
                'pubDate': article.createTime
            });
        });
        res.contentType('application/xml');
        res.send(data2xml('rss', rssObj));
    });
}
