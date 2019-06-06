const Product = require('../../src/models/product');
exports.getProduct = async (req, res, next) => {
    console.log('getProduct');
    console.log(req.originalUrl);
}

exports.postProduct = async (req, res, next) => {
    try {
        const prod = new Product({
            ...req.body,
            creator : req.user._id
        });
        await prod.save();
        res.status(201).send({ prod })
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

exports.patchProduct = async (req,res,next)=>{
 
}

exports.deleteProduct = async (req,res,next)=>{

}