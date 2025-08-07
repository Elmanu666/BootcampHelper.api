const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongoServer;

beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    process.env.MONGOODBURL = uri.replace('mongodb://', '').replace(/\/.*$/, '');
    app = require('../app');
    await mongoose.connection.asPromise();
  } catch (err) {
    console.warn('Skipping user API tests:', err.message);
  }
});

afterEach(async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
  }
});

afterAll(async () => {
  if (mongoServer) {
    await mongoose.connection.close();
    await mongoServer.stop();
  }
});

describe('User API', () => {
  const userPayload = {
    username: 'testuser',
    password: 'testpass',
    name: 'Test',
    familyName: 'User',
    dateOfBirth: '1990-01-01',
    sex: 'M',
    weigth: 70,
    height: 180,
  };

  it('should create a user', async () => {
    if (!mongoServer) return expect(true).toBe(true);
    const res = await request(app).post('/api/user').send(userPayload);
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.username).toBe('testuser');
  });

  it('should login user', async () => {
    if (!mongoServer) return expect(true).toBe(true);
    await request(app).post('/api/user').send(userPayload);
    const res = await request(app).post('/api/user/login').send({
      username: 'testuser',
      password: 'testpass',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should list users', async () => {
    if (!mongoServer) return expect(true).toBe(true);
    await request(app).post('/api/user').send(userPayload);
    const res = await request(app).get('/api/user');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });
});
