/*
 * util
 */
define(function(require, exports, module) {    
    var _ = require('underscore')
      , $ = require('jquery')
      , prettify = require('prettify');
    //验证
    exports.validation = {
        email: function(str) {
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);            
        }, 
        url: function(str) {
            return /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
        }
    };

    exports.prettify = function(dom) {
        var dom = dom || $(document),
        preEls = dom.find('pre');
        _.each(preEls, function(el){
            $(el).addClass('prettyprint').addClass('linenums');            
        });
        prettify();
    };
});
