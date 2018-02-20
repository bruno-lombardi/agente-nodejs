const router = require("express").Router();
const User = require("../services/db").models.User;
const debug = require("debug")("agente-esp:routes.users");

router.post("/create", (req, res) => {
  //FIXME: retornar 400 se dados nao estiverem no body
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  User.findOrCreate({
    where: {
      email
    },
    defaults: {
      password,
      firstName,
      lastName
    }
  }).spread((user, created) => {
    debug("Created user");
    if (user && !created) {
      res.status(409).json({ message: "User already exists!" });
    } else if (user && created) {
      res.status(201).json({ user });
    }
    //TODO: tratar o caso de nennhum user ser criado
  });
});

module.exports = router;
