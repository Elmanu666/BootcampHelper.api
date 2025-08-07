const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { connectDB, closeDB } = require('../configs/db');

describe('Database connection', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDB(uri);
  });

  afterAll(async () => {
    await closeDB();
    await mongoServer.stop();
  });

  it('should connect to in-memory database', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
