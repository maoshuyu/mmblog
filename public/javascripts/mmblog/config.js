/*
 * config
 */
seajs.config({
    // 配置别名
    alias: {
        'jquery': 'common/jquery/jquery.js',
        'backbone': 'common/backbone/backbone.js',
        'underscore': 'common/underscore/underscore.js',
        'prettify': 'common/prettify/prettify.js'
    },

    //backbone依赖jquery和underscore,所以先加载
    preload: ['jquery', 'underscore'],

    plugins: ['shim'],

    base: 'http://s.maoshuyu.com/javascripts/',

    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: '_' 
        },
        'backbone': {
            exports: 'Backbone'
        },
        'prettify': {
            exports: 'prettyPrint'          
        }
    }
});
