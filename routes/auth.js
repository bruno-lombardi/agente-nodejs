const router = require("express").Router();
const passport = require("passport");
const debug = require("debug")("agente-esp:routes.auth");
/* GET users listing. */
router.post("/local", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(err.status).json({ err });
    }
    res.status(200).json(user);
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json(req.user);
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email", "public_profile"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  debug(req.user);
  res.redirect("/perfil");
});

router.get(
  "/facebook/callback",
  passport.authenticate("facebook"), (req, res) => {
    debug(req.user);
    res.redirect("/perfil");
  }
);

router.get("/current", (req, res) => {
  res.json(req.user);
});

module.exports = router;
