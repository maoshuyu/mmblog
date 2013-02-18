/*
 * IB.js
 * 导入BLOG
 */

var fs = require('fs')
  , article = require('../routes/article') 
  , url = process.argv[2] 
  , infoUrl, contentUrl, previewUrl, title, content, preview, info;

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
    console.log('缺少BLOG预览，导入失败！！');   
}
console.log('正在入库...');

article.createArticle({
    'title': title, 
    'content': content, 
    'preview': preview
}, function(err, article) {
    if (err) {
        console.log(err);
        console.log('导入失败。');
        process.exit(1);
    }
    console.log('导入成功!!');
    process.exit(1);
});
