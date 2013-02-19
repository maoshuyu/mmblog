
/*
 * GET home page.
 */
var config = require('../config').config;
exports.index = function(req, res, next) {
    res.render('index', { 
        'title': config.name, 
        'brand': config.brand,
        'staticUrl': config.staticUrl,
        'author': config.author,
        'mode': global.mode
    });
};


