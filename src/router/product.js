const Product = require('../models/product');
const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
router.get('/products',productController.getProduct);
module.exports = router;