var db = require('./model');

exports.Register = function (req, res) {
    var user = req.body;
    user.createtime = new Date();

    db.user.find({username: user.username},function (err,docs) {
        if (docs !== null && docs.length>0){
            res.status(200).json({success:false,message:'用户已经存在'});
        }else{
            db.user.create(user, function (err) {
                if (err){
                    res.status(200).json({
                        success:false,message:err
                    });
                }else{
                    res.status(200).json(
                        {
                            success:true
                        }
                    );
                }

            })
        }
    })
}

exports.login = function (req,res) {
    var user = req.query;
    console.log(user)
    db.user.findOne(user,'username password',function (err,doc) {
        if (err){
            res.status(200).json({success:false,message:err})
        }else {
            if (!doc)
            {
                res.status(200).json({success:false,message:"用户名或密码不正确"});
            }else{
                res.status(200).json({success:true,info:doc});
            }
        }
    })
}

exports.people = function (req,res) {
   db.people.find(function (err,docs) {
       if (docs !=null && docs.length > 0){
           res.status(200).json({success:true, data:docs})
       }else{
           res.status(200).json({success:false,data:"请求失败"})
       }
   })
}
/*增加*/
exports.peopleAdd =function (req,res) {
    var peopleInfo = req.body;
    console.log(peopleInfo)
    db.people.create(peopleInfo,function (err,data) {
        if (err){
            res.status(200).json({success:false,data:"请求失败"})
        }else{
            res.status(200).json({success:true, data:"添加成功"})
        }
    })
}

/*删除*/
exports.peopleDelete = function (req,res) {
    var id = req.body.id;

    db.people.find({_id: id},function (err,data) {
        if (data !='' && data !=undefined){
            db.people.remove({_id:id},function (err) {
                if (err){
                    res.status(200).json({success:false,message:"删除失败"})
                }else {
                    res.status(200).json({success:true, message:"删除成功"})
                }
            })
        }else{
            res.status(200).json({success:false,message:"用户不存在"})
        }
    })
}
