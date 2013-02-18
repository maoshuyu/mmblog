var crypto = require('crypto')
  , util = require('util') 
  , defaultAvatar = 'http://0.gravatar.com/avatar/ad516503a11cd5ca435acc9bb6523536?s=40'
  , baseGravatar = 'http://www.gravatar.com/avatar/%s?s=40&d=%s';

//使用gravatar的头像服务
exports.gravatar = function(avatar) {
    return util.format(baseGravatar, crypto.createHash('md5').update(avatar).digest('hex'), encodeURIComponent(defaultAvatar));
}

exports.convertTime = function(d) {
    return {
        'year': d.getFullYear(),    
        'month': d.getMonth(),
        'day': d.getDate(),
        'hours': d.getHours(),
        'minutes': d.getMinutes(),
        'seconds': d.getSeconds()
    }
}
