const User = require("../../services/db").models.User;

const user1 = {
  email: "myawesomeemail@email.com",
  password: "somerandompassword",
  firstName: "Ruth",
  lastName: "Bellick"
};

const user2 = {
  email: "nice@greatemail.com",
  password: "anotherrandom",
  firstName: "Jennie",
  lastName: "Danver"
};

const populateUsers = done => {
  User.destroy({ where: {} }).then(() => {
    User.create(user1).then(() => done());
  });
};

module.exports = {
  user1,
  user2,
  populateUsers
};
