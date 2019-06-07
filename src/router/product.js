const Product = require('../models/product');
const {authToken} = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
router.get('/product',productController.getProduct);//bất kì ai cũng có quyền xem sp
router.post('/product',authToken,productController.postProduct);//user : 1 , admin : 0 , customer : 0 (chỉ admin mới có quyền public)
router.patch('/product/:id',productController.patchProduct);//user : 1 , admin : 0 , customer : 0 (admin có quyền public hoặc ẩn)
router.delete('/product/:id',productController.deleteProduct);//admin :1 , user 0 , customer : 0 ()
module.exports = router;