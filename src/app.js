require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
require('../src/db/mongoose');
const acl = require('acl');
acl = new acl(new acl.mongodbBackend(dbInstance, prefix));
//bắt buộc phải required connect trước khi khai báo các router
const userRouter = require('./router/user');
const adminRouter = require('./router/admin');
app.use(express.json());//Đọc được các req.body gửi lên theo dạng json mà không cần dùng body-parser
app.use(express.static(path.join(__dirname, '../public')));
app.use(userRouter);
app.use(adminRouter);
app.use((error, req, res,next) => {
  res.status(401).send({ error: error.message });
});
module.exports = app;

