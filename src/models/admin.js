const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminSchema = mongoose.Schema({
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




adminSchema.methods.toJSON = function(){//Tùy chỉnh lại các dữ liệu trước khi gửi cho client không gửi các dữ liệu bảo mật
    // toJSON là method trong prototype của object , mặc định là nó trả về một chuỗi kiểu json.
  const admin = this;
  const adminObject = admin.toObject();
  delete adminObject.avatar;
  delete adminObject.password;//Xóa password ra khỏi object
//   delete adminObject.tokens;//Xóa tokens ra khỏi object
  return adminObject;
}


adminSchema.methods.generateAuthToken = async function () {
    try {
        const admin = this;
        const token = jwt.sign(
            { 
            _id: admin._id.toString() 
            },
            process.env.JWT_KEY
            );
        admin.tokens = [...admin.tokens, { token }];//Đẩy token mới vào mảng mỗi lần đăng nhập thành công
        await admin.save();
        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


adminSchema.methods.clearToken = async function(){
    try {
        this.tokens = [];
        return  await this.save();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};




adminSchema.statics.findByCredential = async (email, password) => {
    const admin = await Admin.findOne({ email });
    if (!admin) {
        throw new Error('Wrong email !');
    }
    const flag = await bcrypt.compare(password, admin.password);
    if (!flag) {
        throw new Error('Wrong password !');
    }
    return admin;
};

//Lưu mật khẩu dưới dạng hash trước khi lưu vào db
adminSchema.pre('save', async function (next) {
    const admin = this;
    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next();
});



const Admin = mongoose.model('Amin', adminSchema);

module.exports = Admin;

