var db = require('./node');

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

    db.user.findOne(user,'username key',function (err,doc) {
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