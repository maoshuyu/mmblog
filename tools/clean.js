/*
 * 清空数据库 (慎用）
 */

var models = require('../models')
  , Article = models.Article
  , Comment = models.Comment
  , EventProxy = require('eventproxy')
  , ep = new EventProxy();

ep.assign('Article', 'Comment', function() {
    process.exit(1);
});

Article.remove({}, function(err, count) {
    if (err) {
        console.log(err);		
    }
    console.log('共删除' + count + '篇文章');
    ep.emit('Article');
});

Comment.remove({}, function(err, count) {
    if (err) {
        console.log(err);		
    }
    console.log('共删除' + count + '条评论');
    ep.emit('Comment');
});
