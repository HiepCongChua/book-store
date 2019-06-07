
const User = require('../models/user');
const Product = require('../models/product');
const mongoose = require('mongoose');
const {sendMail} = require('../../util/helper');
exports.getUser = async (req, res, next) => {
        res.status(200).send({ user: req.user });
};
exports.postUser = async (req, res, next) => {
        try {
                const user = new User({
                        ...req.body,
                        type_account: mongoose.Types.ObjectId('5cf9d129440f46410c83aeb7')
                });
                await user.save();
                const token = await user.generateAuthToken();
                await sendMail(req.body.email);
                res.status(201).send({ user, token })
        } catch (e) {
                res.status(400).send({ error: e.message })
        }
};

exports.getProductUser = async (req, res, next) => {
        try {
               
        } catch (e) {
                res.status(400).send({ error: e.message })
        }
};

exports.getAllProduct = async (req, res, next) => {
        try {
               
        } catch (e) {
                res.status(400).send({ error: e.message })
        }
}



