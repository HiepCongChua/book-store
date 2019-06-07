const Product = require('../../src/models/product');
const User = require('../models/product');
const Admin = require('../models/admin');
const Customer = require('../models/customer');
exports.getProduct = async (req, res, next) => {
    console.log('getProduct');
    console.log(req.originalUrl);
}

exports.postProduct = async (req, res, next) => {
    try {
        const prod = new Product({
            ...req.body,
            creator: req.user._id
        });
        await prod.save();
        res.status(201).send({ prod })
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
}

exports.patchProduct = async (req, res, next) => {
    const updates = Object.keys(req.body);
    const type_account = req.type_account;
    const allowedUpdatesUser = ['title', 'author'];
    const allowedUpdatesAdmin = ['title', 'author','status'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Update fields are invalid !' })
    }
    try {
        if (type_account === 'USER') {
            const prod = await Product.findOne({ _id: req.params.id, creator: req.user._id })
            if (!prod) {
                return res.status(404).send({ error: 'Product does not exist !' });
            }
            updates.forEach((update) => prod[update] = req.body[update]);
            await prod.save()
            res.status(200).send(prod);
        }
        else if (type_account === 'ADMIN') {
            const prod = await Product.findOne({ _id: req.params.id })
            if (!prod) {
                return res.status(404).send({ error: 'Product does not exist !' });
            }
            updates.forEach((update) => prod[update] = req.body[update]);
            if(req.body.publishedDate)
            {
                prod.publishedDate = Date.now();
            }
            await prod.save()
            res.status(200).send(prod);
        }

    } catch (e) {
        res.status(400).send({ error: e.message });
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const type_account = req.type_account;
        if (type_account === 'ADMIN') {//Chỉ admin mới có quyền xóa
            const prod = await Product.findOneAndDelete({ _id: req.params.id })
            if (!prod) {
                return res.status(404).send({ error: 'Product does not exist !' });
            }
            return res.status(200).send({ prod });
        }
        else if (type_account === 'USER') {//User chỉ có quyền ẩn đi.
            const prod = await Product.findById(req.params.id);
            if (!prod) {
                return res.status(404).send({ error: 'Product does not exist !' });
            }
            prod.hasDelete = true;
            await prod.save();
            return res.status(200).send({ prod });
        }
        else {
            res.status(400).send({ error: 'Bad request !' });
        }

    } catch (e) {
        res.status(500).send({ error: e.message });
    }
}
