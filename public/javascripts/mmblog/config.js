/*
 * config
 */
seajs.config({
    // 配置别名
    alias: {
        'jquery': 'common/jquery/jquery-1.9.1.min.js',
        'backbone': 'common/backbone/backbone-v0.9.10-min.js',
        'underscore': 'common/underscore/underscore-v1.4.3-min.js',
        'prettify': 'common/prettify/prettify-min.js'
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

