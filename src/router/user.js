const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controller/user');
router.get('/user',userController.getUser);
router.post('/user',userController.postUser);
module.exports = router;