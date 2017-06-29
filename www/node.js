
var express = require('express');
    var bodyParser =require('body-parser');
    var  path = require('path');

var route = require('./model/interface');

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


/*
 接口
 1.请求地址
 2.interface.js 里面的方法名
 */
app.post('/api/user/register',route.Register);
app.get('/api/user/login',route.login);
app.post('/api/people/all',route.people);
app.post('/api/people/peopleAll',route.peopleAdd);
app.post('/api/people/peopleDelete',route.peopleDelete);

/**/
app.use(express.static(path.join(__dirname,'static')));

app.use(function (req,res) {
    res.sendFile(path.join(__dirname,'static','index.html'))
    res.writeHeader(200,{
        'content-type':'application/json',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Request-Method':'POST,GET,OPTIONS',
        'Access-Control-Request-Headers':'content-type'});
})

app.listen(3001,function (err) {

    if (err) throw err;
    console.log("服务已启动");
})