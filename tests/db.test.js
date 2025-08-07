const assert = require('assert');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { connectDB, closeDB } = require('../configs/db');

describe('Database connection', function() {
  let mongoServer;

  before(async function() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDB(uri);
  });

  after(async function() {
    await closeDB();
    await mongoServer.stop();
  });

  it('should connect to in-memory database', function() {
    assert.strictEqual(mongoose.connection.readyState, 1);
  });
});
