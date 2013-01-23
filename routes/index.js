
/*
 * GET home page.
 */
var config = require('../config').config;
exports.index = function(req, res) {
    res.render('index', { 
        'title': config.name, 
        'brand': config.brand,
        'staticUrl': config.staticUrl,
        'author': config.author
    });
};


