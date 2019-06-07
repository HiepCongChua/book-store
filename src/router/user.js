const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {authToken,authAccount} = require('../middleware/auth');
const userController = require('../controller/user');
router.get('/user',authToken,authAccount(['USER']),userController.getUser);
router.post('/user',userController.postUser);//signup user
module.exports = router;