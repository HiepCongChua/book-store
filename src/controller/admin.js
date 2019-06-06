const Admin = require('../models/admin');
exports.getAdmin = async(req,res,next)=>{
    console.log('getAdmin');
}
exports.postAdmin = async (req, res, next) => {
    try {
            const admin = new Admin(req.body);
            await admin.save();
            const token = await admin.generateAuthToken()
            res.status(201).send({ admin, token })
    } catch (e) {
            res.status(400).send({error:e.message})
    }
};