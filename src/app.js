require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
require('../src/db/mongoose');
//bắt buộc phải required connect trước khi khai báo các router
const userRouter = require('./router/user');
const adminRouter = require('./router/admin');
const customerRouter = require('./router/customer');
const productRouter = require('./router/product');
const {errorHandler} = require('../util/helper');
app.use(express.json());//Đọc được các req.body gửi lên theo dạng json mà không cần dùng body-parser
app.use(express.static(path.join(__dirname, '../public')));
app.use(userRouter);
app.use(adminRouter);
app.use(customerRouter);
app.use(productRouter);
app.use(errorHandler);
module.exports = app;

