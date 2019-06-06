const mongoose = require('mongoose');
const validator = require('validator');
const User = require('../models/user');
const Author = require('../models/author');
const Topic = require('../models/topic');
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    // isbn: {
    //     type: String,
    // },
    // pageCount : {
    //   type : Number,
    //   required : true
    // },
    // publishedDate : {
    //     type : Date,
    // },
    // thumbnailUrl: {
    //     type: String,
    //     required: true,
    // },
     "status":{
         //trạng thái của cuốn sách ,
         // được public hay chưa , hay vẫn đang bị kiểm duyệt , mặc định = 0
         //(đang chờ kiểm duyệt 0) 
         // đã public (1)
         //đã bị user xóa (2) , user xóa nhưng không bị xóa hẳn mà admin vẫn có thể xem
         //Bị admin ẩn đi (3)
         

      type : Number,
      default : 0
    },
    // "hasDelete":{
    //     type : Boolean,
    //     default : true,
    // },
    author: {//tác giả
        type: String,
        required: true
    },
    topic: {
        type: String,
    }
    ,
    creator : {//người tạo 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
        timestamps: true
    });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;

