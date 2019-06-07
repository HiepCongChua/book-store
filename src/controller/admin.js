const Admin = require('../models/admin');
const mongoose = require('mongoose');
const {sendMail} = require('../../util/helper');
exports.getAdmin = async(req,res,next)=>{
    console.log('getAdmin');
};
exports.postAdmin = async (req, res, next) => {
    try {
            const admin = new Admin({
                ...req.body,
                type_account: mongoose.Types.ObjectId('5cf9d124440f46410c83aeb6')
            });
            await admin.save();
            const token = await admin.generateAuthToken();
            await sendMail(req.body.email);
            res.status(201).send({ admin, token })
    } catch (e) {
            res.status(400).send({error:e.message})
    }
};