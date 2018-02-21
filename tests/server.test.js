const expect = require("expect");
const request = require("supertest");

const app = require("../app");

//TODO: adicionar seeds configurar db para testes
const user1 = {
  email = "myawesomeemail@email.com",
  password = "somerandompassword",
  firstName = "Bruno",
  lastName = "Lombardi",
};

describe("Authentication", () => {
  describe("Local", () => {
    it("/auth/local should return 401 with response message if invalid credentials", done => {
      let email = "somefameemail@fake";
      let password = "randomfakepassword";

      request(app)
        .post("/auth/local")
        .send({ email, password })
        .expect(401)
        .expect(res => {
          expect(res.body.message).toBeTruthy();
        })
        .end(done);
    });
  });
});

describe("Users CRUD", () => {
  it("/users/create should return 201 and create a new user if email is not used by anyone", done => {
    request(app)
      .post('/users/create')
      .send({user1})
      .expect(201)
      .expect(res => {
        
      });
  });

  it('/users/create should return 412 if user with passed data already exists', done => {
    //TODO: terminar testcase
  });

  it('/users/create should return 400 if no data is sent or is invalid', done => {
    //TODO: finalizar test case
  });
});
