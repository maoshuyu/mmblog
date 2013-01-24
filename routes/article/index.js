var models = require('../../models')
  , Article = models.Article
  , _ = require('underscore')
  , markdown = require('markdown').markdown
  , EventProxy = require('eventproxy');

function getArticleByQuery(query, fields ,opt, cb) {
    Article.find(query, fields, opt, function(err, articles) {
        if (err) {
            return cb(err); 
        } 
        return cb(null, articles); 
    });
}

function getArticleById(id, cb) {
    Article.findOne({_id: id}, function(err, article) {
        if (err) {
            return cb(err); 
        }
        return cb(null, article); 
    });
}

function getNeighborArticle(id, cb) {
    getArticleByQuery({}, ['_id'], {sort: {'createTime': 1}}, function(err, articles) {
        if (err) {
            return cb(err); 
        }
        var ids = _.pluck(articles, '_id')
          , index;

        for (var i=0,len=ids.length; i<len; i++) {
            if (id == ids[i]) {
                index = i;
                break; 
            } 
        }

        cb(null, {
            previous: index == 0 ? 0 : ids[index - 1], 
            next: index == len - 1 ? 0 : ids[index + 1]
        });
    });
}

/*
 * 获取blog列表
 */
exports.list = function(req, res, next) {
    getArticleByQuery({}, [], {sort: {'createTime': -1}}, function(err, articles) {
        if (err) {
            return next(err);   
        }        
        _.each(articles, function(article, index, list) {
            list[index] = {
                _id: article._id, 
                title: article.title, 
                //使用markdown转化为html.
                content: markdown.toHTML(article.preview), 
                commentCount: article.commentCount,
                createTime: article.createTime
            }; 
        });
        res.json(200, articles);
    });
}

/*
 * 获取最近blog列表
 */
exports.recent = function(req, res, next) {
    getArticleByQuery({}, ['title', '_id', 'createTime', 'updateTime'], {limit: 10, sort: {'createTime': -1}}, function(err, articles) {
        if (err) {
            return next(err);   
        } 
        res.json(200, articles);
    });
}

/*
 * 获取blog
 */
exports.one = function(req, res, next) {
    var id = req.params.id 
      , ep = new EventProxy();

    ep.assign('article', 'neighbor', function(article, neighbor) {
        res.json(200, _.extend(article, neighbor)); 
    });

    getArticleById(id, function(err, article) { 
        if (err) {
            return next(err);   
        }      
        ep.emit('article', {
           _id: article._id, 
            title: article.title, 
            //使用markdown转化为html.
            content: markdown.toHTML(article.content), 
            createTime: article.createTime 
        });
    }); 
    getNeighborArticle(id, function(err, neighbor) {
        if (err) {
            return next(err);   
        }         
        ep.emit('neighbor', neighbor);
    });
}

exports.getArticleByQuery = getArticleByQuery;
exports.getArticleById = getArticleById;
