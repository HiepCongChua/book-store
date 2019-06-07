const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');
const Customer = require('../models/customer');
const authToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');//Lấy token ra khỏi header.
        const decode = jwt.verify(token,process.env.JWT_KEY);//dùng chữ kí để xác thực token client gửi lên.
        const type_account = decode.type_account;//xác định loại tài khoản
        const id_account = decode._id;
        if (type_account === 'admin') {
            const admin = await Admin.findById(id_account);
            req.token = token;//gán token vào request
            req.user = admin;//gán user vào request (lúc này req.user là một thể hiện của Schema Admin)
        }
        if (type_account === 'user') {
            const user = await User.findById(id_account);
            req.token = token;//gán token vào request
            req.user = user;//gán user vào request (lúc này req.user là một thể hiện của Schema User)
        }
        if (type_account === 'customer') {
            const cus = await Customer.findById(id_account);
            req.token = token;//gán token vào request
            req.user = cus;//gán user vào request (lúc này req.user là một thể hiện của Schema Customer) 
        }
        else {
            throw new Error('Token is invalid !');
        }
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate !' });
    }
}
module.exports = {
    authToken
};