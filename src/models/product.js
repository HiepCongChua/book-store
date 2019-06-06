const mongoose = require('mongoose');
const validator = require('validator');
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    
    isbn: {
        type: String,
    },

    pageCount : {
      type : Number,
      required : true
    },

    publishedDate : {
        type : Date,
        required : true
    },

    thumbnailUrl: {
        type: String,
        required: true,
    },
    "status":{
      type : Number,
      default : 0
    },
    "hasDelete":{
        type : Boolean,
        default : true,
        required : true
    },
    author : {
     type : String,
     required : true
    },
    categories : {
        type : String,

    },

    creator : {

    }
},{
    timestamps:true
});
const Product = mongoose.model('Product',productSchema);
module.exports = Product;

