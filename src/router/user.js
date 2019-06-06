const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controller/user');
router.get('/users',userController.getUser);
module.exports = router;