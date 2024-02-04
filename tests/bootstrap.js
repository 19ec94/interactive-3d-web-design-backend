const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create({
    instance: {
      port: 27018, // specify port number
      dbName: 'test', // specify database name
    },
    binary: {
      version: '6.0.12', // specify MongoDB version
    },
  });
  const uri = await mongod.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];

    await collection.deleteMany({});
  }
});
