var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/backface',function (err) {
    if (err) throw err;

    console.log('数据库连接成功')
})

var userDb = new mongoose.Schema({
    username:String,
    sex:String,
    password:String,
    key:Number
});

var user = mongoose.model('user',userDb);

exports.user = user;
