/*
 * IB.js
 * 导入BLOG
 */

var fs = require('fs')
  , models = require('../models')
  , Article = models.Article
  , url = process.argv[2] 
  , infoUrl, contentUrl, previewUrl, title, content, preview, info, article;

if (!url) {
    console.log('请输入BLOG所在的路径');
    process.exit(1);
}

infoUrl = url + '/info.json'; 
info = fs.readFileSync(infoUrl, 'utf-8');
info = JSON.parse(info);
contentUrl = url + info.content;
previewUrl = url + info.preview;

title = info.title;
content = fs.readFileSync(contentUrl, 'utf-8');
preview = fs.readFileSync(previewUrl, 'utf-8');
if (!title) {
    console.log('缺少BLOG标题，导入失败！！');
    process.exit(1);
}
if (!content) {
    console.log('缺少BLOG内容，导入失败！！');
    process.exit(1);
}
if (!preview) {
    preview = content;
    console.log('缺少BLOG预览');   
}
console.log('正在入库...');
article = new Article();
article.title = title;
article.content = content;
article.preview = preview;
article.save(function(err) {
    if (err) {
        console.log(err);
        console.log('导入失败。');
        process.exit(1);
    }
    console.log('导入成功!!');
    process.exit(1);
});
