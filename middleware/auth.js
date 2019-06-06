    
const jwt = require('jsonwebtoken');
const User = require('../src/models/user');
const Admin = require('../src/models/admin');
const Customer = require('../src/models/customer');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');//Lấy token ra khỏi header.
        const decode = jwt.verify(token,process.env.JWT_KEY);//dùng chữ kí để xác thực token client gửi lên.
        const user = await User.findOne({ _id: decode._id, 'tokens.token': token });//xác thực người dùng thông qua id được chứa trong paload của token và so sánh token được gửi lên với token trong mảng tokens
        if (!user)
        {
         throw new Error('Token is invalid !');
        }
        req.token = token;//gán token vào request
        req.user = user;//gán user vào request (lúc này req.user là một thể hiện của Schema User)
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate !' });
    }
};

const authenticate = async ({username,password})=>{
  
};

module.exports = {
    auth
};