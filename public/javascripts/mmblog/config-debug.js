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

    plugins: ['shim'],

    shim: {
        'jquery': {
            exports: 'jQuery'
        },
        'underscore': {
            exports: '_' 
        },
        'backbone': {
            exports: 'Backbone',
            deps: ['underscore', 'jquery']
        },
        'prettify': {
            exports: 'prettyPrint'          
        }
    }
});

