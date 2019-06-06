const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid !');
            }
        }

    },
    username : {
      type : String,
      unique : true,
      required : true
    },
    phone : {
     
        type : Number,
        required : true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password" ')
            }
        }

    },
    tokens : [
        {
            token:{
                type : String,
                required : true
            }
        }
    ]
},{
    timestamps:true
});




userSchema.methods.toJSON = function(){//Tùy chỉnh lại các dữ liệu trước khi gửi cho client không gửi các dữ liệu bảo mật
    // toJSON là method trong prototype của object , mặc định là nó trả về một chuỗi kiểu json.
  const user = this;
  const userObject = user.toObject();
  delete userObject.avatar;
  delete userObject.password;//Xóa password ra khỏi object
//   delete userObject.tokens;//Xóa tokens ra khỏi object
  return userObject;
}


userSchema.methods.generateAuthToken = async function () {
    try {
        const user = this;
        const token = jwt.sign(
            { 
            _id: user._id.toString() 
            },
            process.env.JWT_KEY
            );
        user.tokens = [...user.tokens, { token }];//Đẩy token mới vào mảng mỗi lần đăng nhập thành công
        await user.save();
        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


userSchema.methods.clearToken = async function(){
    try {
        this.tokens = [];
        return  await this.save();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};




userSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Wrong email !');
    }
    const flag = await bcrypt.compare(password, user.password);
    if (!flag) {
        throw new Error('Wrong password !');
    }
    return user;
};

//Lưu mật khẩu dưới dạng hash trước khi lưu vào db
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});



const User = mongoose.model('User', userSchema);

module.exports = User;

