const request = require('supertest');
const app = require('../src/app');
const Product = require('../src/models/product');
const {setupDatabase,productOne,productOneId} = require('./fixtures/db');
beforeEach(setupDatabase);
test('Should create new product', async () => {
    const response = await request(app).post('/product').send({
        title: 'Mat ma Davinci',
        topic : 'Trinh tham',
        author : 'Dan Brown'
    }).expect(201);
    // // Assert that the database was changed correctly
    const prod = await Product.findById(response.body.prod._id)
    expect(prod).not.toBeNull();
});