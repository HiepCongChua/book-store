const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const adminController = require('../controller/admin');
router.get('/admin',adminController.getAdmin);
router.post('/admin',adminController.postAdmin);
module.exports = router;