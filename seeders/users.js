const User = require("../models/user");
const { ObjectID } = require("mongodb");
const faker = require("faker");

const db = require("../app").get("db");

const users = [
  {
    _id: new ObjectID(),
    local: {
      email: faker.internet.email(),
      password: faker.internet.password()
    },
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  },
  {
    _id: new ObjectID(),
    google: {
      id: faker.random.uuid(),
      token: faker.random.uuid(),
      email: faker.internet.email(),
      name: faker.name.findName()
    }
  }
];

const seedUsers = done => {
  db.connect().then(() => {
    User.remove({})
      .then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]);
      })
      .then(() => done());
  });
};

module.exports = {
  seedUsers,
  users
};
