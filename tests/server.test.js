const expect = require("expect");
const request = require("supertest");
const debug = require("debug")("agente-esp:server-test");

const app = require("../app");
const User = require("../services/db").models.User;

const { user1, user2, populateUsers } = require("./seed/users");

beforeEach(populateUsers);

describe("Authentication", () => {
  describe("Local", () => {
    it("/auth/local should return 401 with response message if invalid credentials", done => {
      const email = "somefameemail@fake";
      const password = "randomfakepassword";
      request(app)
        .post("/auth/local")
        .send({ email, password })
        .expect(401)
        .expect(res => {
          expect(res.body.message).toBeTruthy();
        })
        .end(done);
    });

    it("/auth/local should return 200 with user data if valid credentials", done => {
      request(app)
        .post("/auth/local")
        .send({email: user1.email, password: user1.password})
        .expect(200)
        .expect(res => {
          expect(res.body).toBeTruthy();
        })
        .end(done);
    });
  });
});

describe("Users Routes", () => {
  it("/users/create should return 201 and create a new user if email is not used by anyone", done => {
    request(app)
      .post("/users/create")
      .send({
        email: user2.email,
        password: user2.password,
        firstName: user2.firstName,
        lastName: user2.lastName
      })
      .expect(201)
      .expect(res => {
        expect(res.body.user).toBeTruthy();
        expect(res.body.user.email).toBe(user2.email);
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        User.findOne({ where: { email: res.body.user.email } }).then(result => {
          expect(result.firstName).toBe(user2.firstName);
          done();
        });
      });
  });

  // it("/users/create should return 412 if user with passed data already exists", done => {
  //   //TODO: terminar testcase
  //   done();
  // });

  // it("/users/create should return 400 if no data is sent or is invalid", done => {
  //   //TODO: finalizar test case
  //   done();
  // });
});
