const router = require("express").Router();
const User = require("../models/user");
const debug = require("debug")("agente-esp:routes.users");
const _ = require("lodash");

router.post("/create", (req, res) => {
  const body = _.pick(req.body, ["email", "password", "firstName", "lastName"]);
  if (!body.email || !body.password || !body.firstName || !body.lastName) {
    debug("body is missing props: ", body);
    return res.status(400).json({
      err: {
        status: 400,
        message: "The data sent is invalid"
      }
    });
  }
  debug("body el: ", body);

  User.findOne({
    $or: [
      { "local.email": body.email },
      { "google.email": body.email },
      { "facebook.email": body.email }
    ]
  }).then(user => {
    if (user) {
      return res.status(409).json({
        err: {
          status: 409,
          message: "User with that email already exists"
        }
      });
    }

    new User({
      firstName: body.firstName,
      lastName: body.lastName,
      local: {
        email: body.email,
        password: body.password
      }
    })
      .save()
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => res.status(400).json(err));
  });
});

module.exports = router;
