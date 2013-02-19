/**
 * view
 */

define(function(require, exports, module) {
    var $ = require('jquery') 
      , _ = require('underscore')
      , Backbone = require('backbone')
      , model = require('./model')
      , collection = require('./collection')
      , template = require('./template')
      , util = require('./util')
      , ArticleList = collection.ArticleList 
      , RecentList = collection.RecentList
      , CommentList = collection.CommentList
      , Comment = model.Comment;

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

        template: _.template(template.ArticleList),

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
            util.prettify();
        },

        remove: function() {
            this.$el.empty();
            this.stopListening();
            return this;
        }    
    });

    var RecentListView = BaseView.extend({

        template: _.template(template.RecentList),

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

        template: _.template(template.Article),

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
            util.prettify();
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

        template: _.template(template.Comment),         

        itemTemplate: _.template(template.CommentItem),

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
            } else if (!util.validation.email(email)) {
                this.alertError('请输入格式正确的<strong>电子邮件</strong>地址');
                return false; 
            } else if (!_.isEmpty(home) && !util.validation.url(home)) {
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

    exports.ArticleListView = ArticleListView
    exports.RecentListView = RecentListView
    exports.ArticleView = ArticleView
});
