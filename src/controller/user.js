
const User = require('../models/user');
const Product = require('../models/product');
exports.getUser = async (req, res, next) => {
        console.log("get User");
        res.status(200).send({user:req.user});
};
exports.postUser = async (req, res, next) => {
        try {
                const user = new User(req.body);
                await user.save();
                const token = await user.generateAuthToken();
                res.status(201).send({ user, token })
        } catch (e) {
                res.status(400).send({error:e.message})
        }
};

exports.getProductUser = async (req,res,next)=>{

};

exports.getAllProduct = async (req,res,next)=>{

}



