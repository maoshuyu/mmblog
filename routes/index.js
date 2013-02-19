
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
        'domain': config.domain,
        'mode': global.mode
    });
};

exports.nonsupport = function(req, res, next) {
    res.render('nonsupport', { 
        'title': config.name, 
        'domain': config.domain,
        'staticUrl': config.staticUrl,
        'mode': global.mode
    });
};


