
var express = require('express');
    var bodyParser =require('body-parser');
    var  path = require('path');

var route = require('./model/interface');
var app = express();


// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());
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
app.post('/api/nav',route.nav);

/**/
app.use(express.static(path.join(__dirname,'static')));

app.listen(3001,function (err) {

    if (err) throw err;
    console.log("服务已启动");
})