const request = require('supertest');
const { expect } = require('chai');
const app = require('../public/js/app.js'); // Import aplikasi

describe('API Testing for User Endpoints', () => {

  it('GET /api/users - should return all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.greaterThan(0);
  });

  it('POST /api/users - should create a new user', async () => {
    const newUser = { name: 'Jane Doe' };
    const res = await request(app)
      .post('/api/users')
      .send(newUser);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body.name).to.equal(newUser.name);
  });

  it('GET /api/users/:id - should return a user by ID', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('id', 1);
    expect(res.body).to.have.property('name', 'John Doe');
  });

  it('GET /api/users/:id - should return 404 for non-existent user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).to.equal(404);
    expect(res.text).to.equal('User not found');
  });
});
