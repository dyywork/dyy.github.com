const db = require('./model');

const userList = [{
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

for (let i = 0; i <userList.length;i++){
    let userInfo = {};
    userInfo.username = userList[i].username;
    userInfo.password = userList[i].password;
    userInfo.sex = userList[i].sex;
    userInfo.key = userList[i].key;
    addUser(userInfo);
}
/*瞎造的数据*/
const peopleList = [{
    name:"王良杰",
    sex:"woman",
    age:"2",
    edu:"博士"
},{
    name:"刘鑫",
    sex:"woman",
    age:"3",
    edu:"专家"
}
]

function addPeople(info) {
    db.people.create(info,function (err) {
        if (err){
            console.log('false')
        }
    })
}

for (let i =0;i<peopleList.length;i++){
    let data = {};
    data.name = peopleList[i].name;
    data.sex = peopleList[i].sex;
    data.age=peopleList[i].age;
    data.edu = peopleList[i].edu;
    addPeople(data);
}
