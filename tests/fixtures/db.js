const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../src/models/user');
const Admin = require('../../src/models/admin');
const Customer = require('../../src/models/customer');
const Product = require('../../src/models/product');

const userOneId = new mongoose.Types.ObjectId();
const adminOneId = new mongoose.Types.ObjectId();
const customerOneId = new mongoose.Types.ObjectId();
const productOneId = new mongoose.Types.ObjectId();

const userOne = {
    _id: userOneId,
    name: 'MikeUser',
    email: 'user@gmail.com',
    password: '1234567',
    tokens: [{
        token: jwt.sign({ _id: userOneId , type :'user' }, process.env.JWT_KEY)
    }]
}


const adminOne = {
    _id: adminOneId,
    name: 'MikeAdmin',
    email: 'admin@gmail.com',
    password: '1234567',
    tokens: [{
        token: jwt.sign({ _id: adminOneId , type :'admin' }, process.env.JWT_KEY)
    }]
}


const customerOne = {
    _id: customerOneId,
    name: 'MikeCustomer',
    email: 'customer@gmail.com',
    password: '1234567',
    tokens: [{
        token: jwt.sign({ _id: customerOneId , type :'customer' }, process.env.JWT_KEY)
    }]
}

const productOne = {
    _id : productOneId,
    title : 'Thiên thần và ác quỷ',
    author : 'Dan Brown',
    topic :'Trinh thám'
}
const setupDatabase = async () => {
    await User.deleteMany();
    await Customer.deleteMany();
    await Admin.deleteMany();
    await Product.deleteMany();
    await new User(userOne).save();
    await new Admin(adminOne).save();
    await new Customer(customerOne).save();
    await new Product(productOne).save();
}

module.exports = {
    userOneId,
    adminOneId,
    customerOneId,
    adminOne,
    customerOne,
    userOne,
    productOne,
    productOneId,
    setupDatabase
}
