const request = require('supertest');
const app = require('../src/app');
const Customer = require('../src/models/customer');
const {customerOne,customerOneId,setupDatabase} = require('./fixtures/db');
beforeEach(setupDatabase);
test('Should signup a new cutomer', async () => {
    const response = await request(app).post('/customer').send({
        email: 'hiepcustomer@example.com',
        password: 'MyPass777!'
    }).expect(201);
    // // Assert that the database was changed correctly
    const cus = await Customer.findById(response.body.customer._id)
    expect(cus).not.toBeNull();
});