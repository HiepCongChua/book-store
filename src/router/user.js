const express = require('express');
const router = express.Router();
const User = require('../models/user');
router.get('/users',async (req,res,next)=>{
  console.log("OK");
});
module.exports = router;