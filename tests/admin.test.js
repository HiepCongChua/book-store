const request = require('supertest');
const app = require('../src/app');
const Admin = require('../src/models/admin');

const {adminOne,adminOneId,setupDatabase} = require('./fixtures/db');
beforeEach(setupDatabase);

test('Should signup a new admin', async () => {
    const response = await request(app).post('/admin').send({
        email: 'admin@example.com',
        password: 'MyPass777!'
    }).expect(201);
    // // Assert that the database was changed correctly
    const admin = await Admin.findById(response.body.admin._id)
    expect(admin).not.toBeNull();
})