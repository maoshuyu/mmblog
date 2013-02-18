/*
 * IB.js
 * 导入BLOG
 */

var fs = require('fs')
  , article = require('../routes/article') 
  , articleId = process.argv[2]
  , url = process.argv[3] 
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
    console.log('缺少BLOG标题，编辑失败！！');
    process.exit(1);
}
if (!content) {
    console.log('缺少BLOG内容，编辑失败！！');
    process.exit(1);
}
if (!preview) {
    preview = content;
    console.log('缺少BLOG预览，编辑失败！！');   
}
console.log('正在入库...');

article.editArticle(articleId, {
    'title': title, 
    'content': content, 
    'preview': preview
}, function(err, article) {
    if (err) {
        console.log(err);
        console.log('编辑失败。');
        process.exit(1);
    }
    console.log('编辑成功!!');
    process.exit(1);
});
