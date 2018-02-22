const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const debug = require("debug")("agente-esp:passport");

const keys = require("../config/keys");

const { User } = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    }, async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ 'google.id': profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        google: {
          id: profile.id,
          email: profile.emails[0].value,
          token: accessToken,
          name: profile.givenName + ' ' + profile.familyName
        }
       }).save();
      done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      debug("Starting local strategy");
      try {
        const user = await User.findByCredentials(email, password);
        debug(user);
        if(user) {
          return done(null, user);
        }
        done(null, false);
      } catch (err) {
        debug("Err catch", err);
        done(err, false);
      }
    }
  )
);
