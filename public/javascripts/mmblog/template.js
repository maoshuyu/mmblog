define(function(require, exports, module) {
    exports.RecentList = '<h4 class="side-title">最新文章</h4>\
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

    exports.ArticleList = '<section class="article-list">\
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

    exports.Article = '<article class="article">\
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

    exports.Comment = '<h4><span class="article-comment-count"><%= commentsLength %></span> 条评论</h4>\
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
    exports.CommentItem = '<article class="article-comment-item">\
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
});
