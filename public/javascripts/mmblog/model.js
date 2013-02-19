/**
* model
*/
define(function(require, exports, module) {
    var $ = require('jquery') 
      , _ = require('underscore')
      , Backbone = require('backbone');
    exports.Article = Backbone.Model.extend({

       urlRoot: '/article/' 

    });

    exports.Recent = Backbone.Model.extend({
    });

    exports.Comment = Backbone.Model.extend({
        urlRoot: '/comment/'         
    });
});
