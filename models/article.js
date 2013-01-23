var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    'title': { type: String },         
    'content': { type: String },
    'preview': { type: String },
    'createTime': { type: Date, default: Date.now },
    'updateTime': { type: Date, default: Date.now },
    'commentCount': {type: Number, default: 0}
});

mongoose.model('Article', ArticleSchema);
