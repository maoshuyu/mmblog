/**
 * Module dependencies.
 */

var express = require('express')
  , ejs = require('ejs')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , config = require('./config').config
  , routes = require('./routes')
  , article = require('./routes/article')
  , comment = require('./routes/comment')
  , rss = require('./routes/rss');

var app = express()
  , accessLogfile = fs.createWriteStream(config.log.access, {'flags': 'a'})
  , errorLogfile = fs.createWriteStream(config.log.error, {'flags': 'a'});

app.set('port', process.env.PORT || 3000);

//设置模板引擎为ejs
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// 设定favicon.ico的过期时间为356d
app.use(express.favicon(config.favicon, {maxAge: 31536000000}));

//访问日志
app.use(express.logger('dev'));
app.use(express.logger({'stream': accessLogfile}));

//启用gzip
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}
if ('production' == app.get('env')) {
    //错误日志
    app.use(function(err, req, res, next) {
        var meta = '[' + new Date() + '] ' + req.url + '\n';        
        errorLogfile.write(meta + err.stack + '\n');
        next();
    });
}

app.get('/', routes.index);
app.get('/article/recent', article.recent);
app.get('/article/', article.list);
app.get('/article/:id', article.one);
app.get('/comment/:articleId', comment.list);
app.post('/comment/', comment.save);
app.get('/rss', rss.index);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port'));
});
