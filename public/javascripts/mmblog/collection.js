/**
 * collection
 */

define(function(require, exports, module) {
    var $ = require('jquery') 
      , _ = require('underscore')
      , Backbone = require('backbone')
      , model = require('./model');

    exports.ArticleList = Backbone.Collection.extend({

        model: model.Article, 

        url: '/article/' 

    });

    exports.RecentList = Backbone.Collection.extend({

        model: model.Recent,
        
        url: 'article/recent'    

    });

    exports.CommentList = Backbone.Collection.extend({

        model: model.Comment,

        url: '/comment/'

    });
});

