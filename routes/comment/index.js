var models = require('../../models')
  , Comment = models.Comment
  , articleCtrl = require('../article');


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

exports.save = function(req, res) {
    var content = req.body.content,
    name = req.body.name,
    email = req.body.email,
    home = req.body.home,
    articleId = req.body.articleId;
    addComment({
        'articleId': articleId,	
        'content': content,
        'name': name,
        'email': email,
        'home': home
    }, function(err, comment) {
	    if (err) {
            return next(err);	
	    }
	    res.json(comment);
    });
};
exports.list = function(req, res) {
    var id = req.params.articleId;
    getCommentsByArticleId(id, function(err, list) {
        if (err) {
            return next(err);	
        }
        res.json(list);
    });
}
