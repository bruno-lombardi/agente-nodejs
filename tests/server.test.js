const expect = require("expect");
const request = require("supertest");
const debug = require("debug")("agente-esp:server-test");

const app = require("../app");
const User = require("../models/user");

const { seedUsers, users } = require("../seeders/users");

beforeEach(seedUsers);

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
          expect(res.body.err).toBeTruthy();
          expect(res.body.err.status).toBe(401);
        })
        .end(done);
    });

    it("/auth/local should return 200 with user data if valid credentials", done => {
      request(app)
        .post("/auth/local")
        .send({ email: users[0].local.email, password: users[0].local.password })
        .expect(200)
        .expect(res => {
          expect(res.body._id).toBeTruthy();
        })
        .end(done);
    });
  });
});

describe("Users Routes", () => {
  it("/users/create should return 201 and create a new user if email is not used by anyone", done => {
    const email = "gamingalternative@lol.com";
    request(app)
      .post("/users/create")
      .send({
        email,
        password: "toosimplepasswordForMe",
        firstName: "Gamer",
        lastName: "Devoe"
      })
      .expect(201)
      .expect(res => {
        expect(res.body._id).toBeTruthy();
        expect(res.body.local.email).toBe(email);
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        User.findOne({'local.email': email}).then(result => {
          expect(result.id).toBe(res.body._id);
          done();
        });
      });
  });

  it("/users/create should return 409 if user with that email already exists", done => {
    request(app)
    .post('/users/create')
    .send({
      email: users[0].local.email,
      password: "somerandompassword",
      firstName: users[0].firstName,
      lastName: users[0].lastName
    })
    .expect(409)
    .expect(res => {
      expect(res.body.err).toBeTruthy();
      expect(res.body.err.status).toBe(409);
    })
    .end(done);
  });

  it("/users/create should return 400 if no data is sent or is invalid", done => {
    request(app)
    .post('/users/create')
    .send({})
    .expect(400)
    .expect(res => {
      expect(res.body.err).toBeTruthy();
      expect(res.body.err.status).toBe(400);
    })
    .end(done);
  });
});
