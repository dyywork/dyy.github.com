
var express = require('express');
    var bodyParser =require('body-parser');
    var  path = require('path');

var route = require('./node/interface');

var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.post('/api/user/register',route.Register);
app.post('/api/user/login',route.login);



app.use(express.static(path.json(__dirname,'static')));

app.use(function (req,res) {
    res.sendFile(path.json(__dirname,'static','index.html'))
})
app.listen(3001,function (err) {
    if (err) throw err;
    console.log("服务已启动");
})