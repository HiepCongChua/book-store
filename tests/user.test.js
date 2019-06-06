const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const {userOne,userOneId,setupDatabase} = require('./fixtures/db');
beforeEach(setupDatabase);
test('Should signup a new user', async () => {
    const response = await request(app).post('/user').send({
        email: 'hiepuser@example.com',
        password: 'MyPass777!'
    }).expect(201);
    // // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull();
});