const Customer = require('../models/customer');
const {sendMail} = require('../../util/helper');
exports.getCustomer = async ()=>{
    console.log("get customer");
}
exports.postCustomer = async (req, res, next) => {
    try {
            const customer = new Customer(req.body);
            await customer.save();
            const token = await customer.generateAuthToken();
            await sendMail(req.body.email);
            res.status(201).send({ customer, token })
    } catch (e) {
            res.status(400).send({error:e.message})
    }
};