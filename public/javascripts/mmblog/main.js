/*
 * main
 */

define(function(require, exports, module) {
    var $ = require('jquery')        
      , _ = require('underscore')
      , Backbone = require('backbone')
      , view = require('./view')
      , model = require('./model')
      , Article = model.Article
      , ArticleListView = view.ArticleListView
      , RecentListView = view.RecentListView
      , ArticleView = view.ArticleView

     /**
     * Router 
     */
    var AppRouter = Backbone.Router.extend({

        views: [],

        'routes': {
            '': 'list', 
            'article/:id': 'article'
        },     

        list: function() {
            this.destroy();
            this.views.push(new ArticleListView);
            this.views.push(new RecentListView);
        },

        article: function(id) {
            this.destroy();
            this.views.push(new ArticleView({
                model: new Article({id:id})     
            }));      
        },

        loading: function() {
            var loadingEl = $('<i class="icon-spinner icon-spin icon-4x icon-loading"></i>').hide(); 
            $('#main').append(loadingEl);
            //0.5秒之后再添加loading。
            setTimeout(function() {
                loadingEl.show();
            }, 500);
        },

        destroy: function() {
            var view;
            while ((view = this.views.pop())) {
                view.destroy(); 
            }
            this.loading();
        }
    }); 
    new AppRouter;
    Backbone.history.start();
});
