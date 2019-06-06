const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const customerSchema = mongoose.Schema({
    name: {
        type: String,
        // required: true,
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
    //   unique : true,
    //   required : true
    },

    phone : {
     
        type : Number,
        // required : true
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
    ],
    type_account : {
        type : String,
        default : 'customer'
    }
},{
    timestamps:true
});


customerSchema.methods.toJSON = function(){//Tùy chỉnh lại các dữ liệu trước khi gửi cho client không gửi các dữ liệu bảo mật
    // toJSON là method trong prototype của object , mặc định là nó trả về một chuỗi kiểu json.
  const customer = this;
  const customerObject = customer.toObject();
  delete customerObject.password;//Xóa password ra khỏi object
//   delete customerObject.tokens;//Xóa tokens ra khỏi object
  return customerObject;
}


customerSchema.methods.generateAuthToken = async function () {
    try {
        const customer = this;
        const token = jwt.sign(
            { 
            _id: customer._id.toString(),
            type : customer.type_account
            },
            process.env.JWT_KEY
            );
        customer.tokens = [...customer.tokens, { token }];//Đẩy token mới vào mảng mỗi lần đăng nhập thành công
        await customer.save();
        return token;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


customerSchema.methods.clearToken = async function(){
    try {
        this.tokens = [];
        return  await this.save();
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};




customerSchema.statics.findByCredential = async (email, password) => {
    const customer = await customer.findOne({ email });
    if (!customer) {
        throw new Error('Wrong email !');
    }
    const flag = await bcrypt.compare(password, customer.password);
    if (!flag) {
        throw new Error('Wrong password !');
    }
    return customer;
};

//Lưu mật khẩu dưới dạng hash trước khi lưu vào db
customerSchema.pre('save', async function (next) {
    const customer = this;
    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 8)
    }
    next();
});



const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;

