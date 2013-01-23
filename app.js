/**
 * Module dependencies.
 */

var express = require('express')
  , ejs = require('ejs')
  , http = require('http')
  , path = require('path')
  , routes = require('./routes')
  , article = require('./routes/article')
  , comment = require('./routes/comment')
  , rss = require('./routes/rss');
  
var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);

    //设置模板引擎为ejs
    app.set('views', __dirname + '/views');
    /*app.set('view engine', 'jade');*/
    app.set('view engine', 'html');
    app.engine('html', ejs.renderFile);

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/article/recent', article.recent);

/*restfull api*/
app.get('/article/', article.list);
app.get('/article/:id', article.one);
app.get('/comment/:articleId', comment.list);
app.post('/comment/', comment.save);
app.get('/rss', rss.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});
