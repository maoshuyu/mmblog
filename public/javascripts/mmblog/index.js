(function() {

    /**
     * template
     */
    var RecentListTemplate = '<h4 class="side-title">最新文章</h4>\
                              <ul class="unstyled recent-list">\
                              <% _.each(obj, function(item, i) { %>\
                                <% if (i == 0) { %>\
                                <li class="recent-item recent-first">\
                                <% } else { %>\
                                <li class="recent-item">\
                                <% } %>\
                                  <a href="#article/<%= item._id %>" class="recent-title"><%= item.title %></a>\
                                </li>\
                              <% }); %>\
                              </ul>';

    var ArticleListTemplate = '<section class="article-list">\
                                 <% _.each(obj, function(item) { %>\
                                 <article class="article">\
                                   <% var d = _.templateHelper.formatDate(item.createTime); %>\
                                   <header class="article-header clearfix">\
                                     <time datatime="<%= item.createTime.year %>-<%= item.createTime.month %>-<%= item.createTime.day %>" class="article-date pull-left">\
                                       <span class="article-month"><%= d.month %>月</span>\
                                       <span class="article-day"><%= d.day %><br><%= d.year %></span>\
                                     </time>\
                                     <h3 class="article-title">\
                                       <a href="#article/<%= item._id %>" title="<%= item.title %>">\
                                       <%= item.title %>\
                                       </a>\
                                     </h3>\
                                   </header>\
                                   <div class="article-content">\
                                   <%= item.content %>\
                                   </div>\
                                   <aside class="article-footer clearfix">\
                                      <a class="pull-left article-footer-commentCount" href="#article/<%= item._id %>" title="<%= item.commentCount %>条评论">\
                                        <i class="icon-comment"></i>\
                                        <span><%= item.commentCount %></span>\
                                      </a>\
                                      <a href="#article/<%= item._id %>" class="pull-right article-more" title="点击阅读更多">点击阅读更多</a>\
                                   </aside>\
                                 </article>\
                                 <% }); %>\
                               </section>';

    var ArticleTemplate = '<article class="article">\
                             <h3>\
                               <%= title %>\
                             </h3>\
                             <div class="article-content">\
                               <%= content %>\
                             </div>\
                             <section class="article-comment" data-article="<%= _id %>">\
                             </section>\
                             <aside class="article-footer">\
                               <ul class="pager">\
                                 <% if (previous) { %>\
                                 <li class="previous">\
                                   <a href="#article/<%= previous %>">\
                                     <i class="icon-arrow-left"></i>\
                                     上一篇\
                                   </a>\
                                 <% } else { %>\
                                 <li class="previous disabled">\
                                   <a href="javascript:;">\
                                     <i class="icon-arrow-left"></i>\
                                     上一篇\
                                   </a>\
                                 <% } %>\
                                 </li>\
                                 <% if (next) { %>\
                                 <li class="next">\
                                   <a href="#article/<%= next %>">\
                                     下一篇\
                                     <i class="icon-arrow-right"></i>\
                                   </a>\
                                 <% } else { %>\
                                 <li class="next disabled">\
                                   <a href="javascript:;">\
                                     下一篇\
                                     <i class="icon-arrow-right"></i>\
                                   </a>\
                                 <% } %>\
                                 </li>\
                               </ul>\
                             </aside>\
                           </article>';

    var CommentTemplate = '<h4><span class="article-comment-count"><%= commentsLength %></span> 条评论</h4>\
                           <div class="article-comment-list">\
                           </div>\
                           <div class="article-comment-editor">\
                             <form class="form-inline article-comment-form" onsubmit="return false">\
                               <div class="alert alert-error article-comment-error">\
                                 <button type="button" class="close" data-dismiss="alert">×</button>\
                                 <p class="alert-text"></p>\
                               </div>\
                               <textarea class="article-comment-textarea" required="required" placeholder="评论..."></textarea>\
                               <i class="icon-envelope-alt icon-large"></i>\
                               <input type="email" name="email" class="article-comment-email input-medium" required="required" placeholder="邮箱（必填）" autocomplete="on" />\
                               <i class="icon-user icon-large"></i>\
                               <input type="text" name="name" class="article-comment-name input-medium" required="required" placeholder="姓名（必填）" autocomplete="on" />\
                               <i class="icon-home icon-large"></i>\
                               <input type="url" name="url" class="article-comment-home input-medium" placeholder="主页" />\
                               <input type="hidden" class="article-comment-articleId" value="<%= articleId %>"/>\
                               <button class="article-comment-reply btn disabled pull-right" disabled="disabled">回复</button>\
                             </form>\
                           </div>';
    var CommentItemTemplate = '<article class="article-comment-item">\
                                 <div class="comment-avatar"><img width="40" height="40" src="<%= avatar %>"/></div>\
                                 <div class="comment-item-head">\
                                    <% if (home) { %>\
                                    <a class="comment-item-name" title="<%= name %>" href="<%= home %>" target="_black"><%= name %></a>\
                                    <% } else { %>\
                                    <span class="comment-item-name" title="<%= name %>"><%= name %></span>\
                                    <% } %>\
                                    <span class="comment-item-bullet" aria-hidden="true">•</span>\
                                    <time datatime="<%= createTime.year %>-<%= createTime.month %>-<%= createTime.day %>" class="comment-item-time"><%= _.templateHelper.diffDate(createTime) %></time>\
                                 </div>\
                                 <div class="comment-item-body">\
                                    <p class="comment-item-content"><%= content %></p>\
                                 </div>\
                               </article>';

    _.templateHelper = {

        months: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],

        formatDate: function(date) {
            return {
                'year': date.year, 
                'month': this.months[date.month],  
                'day': date.day 
            }; 
        },  

        diffDate: function(date) {
            var now = new Date(),   
            date = new Date(date.year, date.month, date.day, date.hours, date.minutes, date.seconds), 
            diff = null,
            base = Math.abs(date - now) / 1000;
            if ((diff = base / 60 / 60 /24) && diff >= 1) {
                return  parseInt(diff) + '天前';
            } else if ((diff = base / 60 / 60) && diff >= 1) {
                return  parseInt(diff) + '小时前';
            } else if ((diff = base / 60) && diff >= 1) {
                return  parseInt(diff) + '分钟前';
            } else if ((diff = base) && diff >= 1){
                return parseInt(diff) + '秒前';
            } else {
                return '刚刚';
            }
        }
    };


    //验证
    var validation = {
        email: function(str) {
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);            
        }, 
        url: function(str) {
            return /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
        }
    };

    var prettify = function(dom) {
        var dom = dom || $(document),
        preEls = dom.find('pre');
        _.each(preEls, function(el){
            $(el).addClass('prettyprint').addClass('linenums');            
        });
        prettyPrint();
    };

    /**
     * model
     */
    var Article = Backbone.Model.extend({

        urlRoot: '/article/' 

    });

    var Recent = Backbone.Model.extend({
    });

    var Comment = Backbone.Model.extend({
        urlRoot: '/comment/'         
    });

    /**
     * collection
     */

    var ArticleList = Backbone.Collection.extend({

        model: Article, 

        url: '/article/' 

    });

    var RecentList = Backbone.Collection.extend({

        model: Recent,
        
        url: 'article/recent'    

    });

    var CommentList = Backbone.Collection.extend({

        model: Comment,

        url: '/comment/'

    });

    /**
     * view
     */

    var BaseView = Backbone.View.extend({

        elements: {
        },

        refreshElement: function() {
            for (var key in this.elements) {
                this[this.elements[key]] = this.$(key); 
            } 
        },
            
        destroy: function() {
            this.remove();          
            if (!this.model) {
                return; 
            }
            //collection
            if (this.model.models) {
                var model;
                while ((model = this.model.models.pop())) {
                    model.destroy(); 
                }
                this.model = null;
            //model
            } else {
                this.model.destroy(); 
                this.model = null;
            }
        }
    });


    var ArticleListView = BaseView.extend({

        template: _.template(ArticleListTemplate),

        el: $('#main'),    
    
        events: {
        }, 

        initialize: function() {
            this.model = new ArticleList;
            this.listenTo(this.model, 'reset', this.render);
            this.model.fetch();
        },

        render: function() {
            this.$el.empty();
            this.$el.append(this.template(this.model.toJSON()));
            //语法着色
            prettify();
        },

        remove: function() {
            this.$el.empty();
            this.stopListening();
            return this;
        }    
    });

    var RecentListView = BaseView.extend({

        template: _.template(RecentListTemplate),

        el: $('#recent'),

        initialize: function() {
            this.model = new RecentList;
            this.listenTo(this.model, 'reset', this.render); 
            this.model.fetch();
        },

        render: function() {
            this.$el.addClass('active');
            this.$el.append(this.template(this.model.toJSON()));
        },

        remove: function() {
            this.$el.removeClass('active');
            this.$el.empty();
            this.stopListening();
            return this;
        }

    });

    var ArticleView = BaseView.extend({

        template: _.template(ArticleTemplate),

        elements: {
            '.article-comment': 'commentEl' 
        },

        el: $('#main'),    

        initialize: function() {
            this.listenTo(this.model, 'change', this.render); 
            this.model.fetch();
        },

        render: function() {
            this.$el.empty();
            this.$el.append(this.template(this.model.toJSON()));
            this.refreshElement();
            this.initComment();
            //语法着色
            prettify();
        },

        //初始化评论功能。
        initComment: function() {
            this.commentView = new CommentView({
                el: this.commentEl             
            });
        },

        remove: function() {
            this.$el.empty();
            this.stopListening();
            return this;
        },

        destroy: function() {
            this.remove();
            this.model.destroy();
            this.commentView.destroy();
        }
    });

    var CommentView = BaseView.extend({

        template: _.template(CommentTemplate),         

        itemTemplate: _.template(CommentItemTemplate),

        events: {
           'focus .article-comment-textarea': 'extendTextarea',   
           'blur .article-comment-textarea': 'retractTextarea',   
           'keyup .article-comment-textarea': 'changeReplyBtnStatus',   
           'keyup .article-comment-email': 'changeReplyBtnStatus',   
           'keyup .article-comment-name': 'changeReplyBtnStatus',   
           'click .article-comment-reply': 'save',
           'click .article-comment-error .close': 'hideError'
        },

        elements: {
            '.article-comment-count': 'commentCountEl',
            '.article-comment-editor': 'commentEditorEl', 
            '.article-comment-error': 'commentErrorEl',
            '.article-comment-textarea': 'commentTextareaEl',
            '.article-comment-email': 'commentEmailEl',
            '.article-comment-name': 'commentNameEl',
            '.article-comment-home': 'commentHomeEl',
            '.article-comment-articleId': 'commentArticleIdEl',
            '.article-comment-reply': 'commentBtnReplyEl',
            '.article-comment-list': 'commentListEl'
        },

        initialize: function() {
            this.model = new CommentList;
            this.listenTo(this.model, 'reset', this.render);
            this.listenTo(this.model, 'add', this.commentAdded);
            this.model.fetch({
                'url': this.model.url + this.$el.attr('data-article')
            });
        },

        render: function() {
            this.$el.append(this.template({
                'articleId': this.$el.attr('data-article'),
                'commentsLength': this.model.length
            })); 
            this.refreshElement();
            this.appendComments();
        },

        appendComments: function() {
            _.each(this.model.models, _.bind(function(model, index) {
                this.appendOne(model);
            }, this));
        },

        appendOne: function(model) {
            this.commentListEl.append(this.itemTemplate(model.toJSON()));
        },

        extendTextarea: function() {
            if (this.commentEditorEl.hasClass('extend')) return;
            this.commentEditorEl.addClass('extend');
        },

        retractTextarea: function() {
            if (!_.isEmpty(this.commentTextareaEl.val())) return; 
            this.commentEditorEl.removeClass('extend');
        },

        changeReplyBtnStatus: function() {
            var commentBtnReply = this.commentBtnReplyEl,
            commentTextareaStr = this.commentTextareaEl.val(),
            commentEmailStr = this.commentEmailEl.val(),
            commentNameStr = this.commentNameEl.val(),
            isEmpty = _.isEmpty(commentTextareaStr) || _.isEmpty(commentEmailStr) || _.isEmpty(commentNameStr); 
            if (isEmpty) {
                commentBtnReply.addClass('disabled').removeClass('btn-primary').attr('disabled', 'disabled');
            } else {
                commentBtnReply.addClass('btn-primary').removeClass('disabled').removeAttr('disabled');
            }
        },

        validForm: function(content, email, name, home) {
            if (_.isEmpty(content) || _.isEmpty(email) || _.isEmpty(name)) {
                return false;
            } else if (!validation.email(email)) {
                this.alertError('请输入格式正确的<strong>电子邮件</strong>地址');
                return false; 
            } else if (!_.isEmpty(home) && !validation.url(home)) {
                this.alertError('请输入格式正确的<strong>个人主页</strong>地址');
                return false;                
            } else {
                return true;
            }
        },

        alertError: function(info) {
            this.commentErrorEl.addClass('comment-alert-active');
            this.commentErrorEl.find('.alert-text').html(info);
        },

        hideError: function() {
            this.commentErrorEl.removeClass('comment-alert-active');
            this.commentErrorEl.find('.alert-text').html('');
        },

        save: function() {
            var content = this.commentTextareaEl.val(),
            email = this.commentEmailEl.val(),
            name = this.commentNameEl.val(),
            home = this.commentHomeEl.val(),
            articleId = this.commentArticleIdEl.val(),
            comment;
            if (!this.validForm(content, email, name, home)) {
                return;
            }
            comment = new Comment({
                'articleId': articleId,
                'content': content, 
                'email': email,
                'name': name,
                'home': home
            });
            this.clearEditor();
            this.model.create(comment, {'wait': true});
            //阻止表单提交
            return false;
        }, 

        commentAdded: function(model) {
            this.appendOne(model);
            this.refreshCommentCount();
        },

        refreshCommentCount: function() {
            this.commentCountEl.html(this.model.length);
        },

        clearEditor: function() {
            this.commentTextareaEl.val('');
            this.changeReplyBtnStatus();
            this.hideError();
            this.commentEditorEl.removeClass('extend');
        }    
    });

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
})();
