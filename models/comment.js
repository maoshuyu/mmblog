var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    'content': { type: String },
    'articleId': { type: ObjectId, index: true },
    'createTime': { type: Date, default: Date.now },
    'name': { type: String },
    'email': { type: String },
    'home': { type: String }
});

mongoose.model('Comment', CommentSchema);
