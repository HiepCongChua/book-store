const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {authToken} = require('../middleware/auth');
const userController = require('../controller/user');
router.get('/user',authToken,userController.getUser);
router.post('/user',userController.postUser);
module.exports = router;