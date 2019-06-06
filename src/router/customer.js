const Customer = require('../models/customer');
const express = require('express');
const customerController = require('../controller/customer');
const router = express.Router();

router.get('/customer',customerController.getCustomer);

module.exports = router;