const router = require("express").Router();
const User = require("../services/db").models.User;
const debug = require("debug")("agente-esp:routes.users");
const _ = require("lodash");

router.post("/create", (req, res) => {
  const body = _.pick(req.body, ["email", "password", "firstName", "lastName"]);
  if (!body.email || !body.password || !body.firstName || !body.lastName) {
    debug("body is missing props: ", body);
    return res
      .status(400)
      .json({ error: "One or more required body props is missing." });
  }
  debug("body el: ", body);

  User.findOrCreate({
    where: {
      email: body.email
    },
    defaults: {
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName
    }
  })
    .spread((user, created) => {
      // none user is created but one user is find with that email address
      if (user && !created) {
        res.status(409).json({ message: "User already exists!" });
      } else if (user && created) {
        // user is created
        res.status(201).json({ user });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
