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
var peopleDb = new mongoose.Schema({
    name:String,
    sex:String,
    age:Number,
    edu:String
})
var user = mongoose.model('user',userDb);
var people = mongoose.model('people',peopleDb,'peoples');

exports.user = user;
exports.people = people;
