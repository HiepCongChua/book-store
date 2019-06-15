const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');
const Role = require('../models/role');
const Customer = require('../models/customer');
const authToken = async (req, res, next) => {//Xác thực người dùng dựa trên token gửi lên
    try {
        const token = req.header('Authorization').replace('Bearer ', '');//Lấy token ra khỏi header.
        const decode = jwt.verify(token,process.env.JWT_KEY);//dùng chữ kí để xác thực token client gửi lên.
        const type_account = decode.type_account;//xác định loại tài khoản
        const id_account = decode._id;
        const role = await Role.findById(type_account);
        if (role.name == 'ADMIN') {
            const admin = await Admin.findById(id_account);
            req.token = token;//gán token vào request
            req.type_account = role.name;
            req.user = admin;//gán user vào request (lúc này req.user là một thể hiện của Schema Admin)
            next();
        }
        else if (role.name == 'USER') {
            const user = await User.findById(id_account);
            req.token = token;//gán token vào request
            req.type_account = role.name;
            req.user = user;//gán user vào request (lúc này req.user là một thể hiện của Schema User)
            next();
        }
        else if (role.name == 'CUSTOMER') {
            const cus = await Customer.findById(id_account);
            req.token = token;//gán token vào request
            req.type_account = role.name;
            req.user = cus;//gán user vào request (lúc này req.user là một thể hiện của Schema Customer) 
            next();
        }
        else {
            res.status(401).send({ error: 'Token is valid !' });
        }
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate !' });
    }
};

const authAccount = function (roles=[]){//Xác thực type của account gửi lên.
   return [
     (req,res,next)=>{
        if(roles.length && !roles.includes(req.type_account)){
            return res.status(401).json({message:'You do not have full access !'});
        }
        next();
       }
   ]
};
module.exports = {
    authToken,
    authAccount
};