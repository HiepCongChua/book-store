
const expressJWT = require('express-jwt');

const authorize = (roles=[])=>{
    //Roles được truyền vào hàm có thể là một chuỗi Ví dụ Role.User hoặc User
    //Hoặc có thể là một mảng (mặc định không truyền gì thì nó là một mảng trống)
    //Ví dụ ([Role.Admin,Role.User] or ['Admin','User'])
    if(typeof roles === 'string')
    {
        roles = [roles];
    }
    return [
        expressJWT({secret:process.env.JWT_KEY})
        ,
        (req,res,next)=>{
            if(roles.length&&!roles.includes(req.user.roles)){
                return res.status(401).json({message:'Unathorized'});
            }
        }
        ,
        next()
    ]

}

const errorHandler = (err,req,res,next)=>{
    if(typeof(err)==='string'){
        return res.status(400).json({message:err});
    }
    if(err.name === 'UnauthorizedError'){
        return res.status(400).json({message:'Invalid token'}0)
    }
    return res.status(500).json({message:err.message});
};

const role = {

    Admin:'Admin',
    User:'User'
    
}

module.exports = {
    authorize,
    errorHandler,
    role
}
