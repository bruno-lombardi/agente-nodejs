const router = require("express").Router();
const passport = require("passport");
/* GET users listing. */
router.post("/local", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    res.json(user);
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

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.json(req.user);
});

module.exports = router;
