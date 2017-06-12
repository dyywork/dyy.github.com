var db = require('./model');

var userList = [{
    username:'dyy',
    password:"123456",
    key:'1',
    sex:'men'
}];

function addUser(info) {
    db.user.create(info,function (err) {
        if (err){
            console.log("false");
        }
    })
}

for (var i = 0; i <userList.length;i++){
    var userInfo = {};
    userInfo.username = userList[i].username;
    userInfo.password = userList[i].password;
    userInfo.sex = userList[i].sex;
    userInfo.key = userList[i].key;
    addUser(userInfo);
}


