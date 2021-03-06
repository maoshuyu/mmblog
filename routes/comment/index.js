var models = require('../../models')
  , crypto = require('crypto')
  , util = require('../../util')
  , Comment = models.Comment
  , articleCtrl = require('../article')
  , _ = require('underscore');


function addComment(newComment, cb) {
    var comment = new Comment(newComment);
    comment.save(function(err, comment) {
        if (err) {
            return cb(err);	
        }
        //更新article的commentCount
        articleCtrl.getArticleById(comment.articleId, function(err, article) {
            if (err) {
                cb(err);	
            }
            article.commentCount += 1;
            article.save();
        });
        cb(null, comment);
    });
}

function getCommentsByArticleId(id, cb) {
    Comment.find({'articleId': id}, [], {sort: {'createTime': 'asc'}}, function(err, list) {
        if (err) {
            cb(err);
        }
        cb(null, list);
    });
}

exports.save = function(req, res, next) {
    var content = req.body.content,
    name = req.body.name,
    email = req.body.email,
    home = req.body.home,
    avatar = util.gravatar(email),
    articleId = req.body.articleId;
    addComment({
        'articleId': articleId,	
        'content': content,
        'name': name,
        'email': email,
        'home': home,
        'avatar': avatar 
    }, function(err, comment) {
        if (err) {
            return next(err);	
        }
        res.json(comment);
    });
};
exports.list = function(req, res, next) {
    var id = req.params.articleId;
    getCommentsByArticleId(id, function(err, list) {
        if (err) {
            return next(err);	
        }
        _.each(list, function(comment, i, list) {
            list[i] = {
                'articleId': comment.articleId, 
                'content': comment.content,
                'name': comment.name,
                'email': comment.email,
                'home': comment.home,
                'avatar': comment.avatar,
                '_id': comment._id,
                'createTime': util.convertTime(comment.createTime)
            };
        });
        res.json(list);
    });
}
