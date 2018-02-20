const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const sequelize = require("sequelize");
const debug = require("debug")("agente-esp:passport");

const keys = require("../config/keys");
const User = require("./db").models.User;

passport.serializeUser((user, done) => {
  debug("Serializing user ", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  User.findById(user.id).then(user => {
    debug("Deserializing user ", user);
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
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({
          socialID: profile.id,
          socialIDProvider: profile.provider
        });
        if (existingUser) {
          debug("User already exists in database", existingUser);
          return done(null, existingUser);
        }
        const user = await User.create({
          socialID: profile.id,
          socialIDProvider: profile.provider,
          name: profile.name.givenName,
          lastName: profile.name.familyName
        });
        debug("Created a new user in database", user);

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user || !user.validPassword(password)) {
          debug("Incorrect email or password.");
          return done(null, false, {message: "Incorrect email or password"});
        }
        
        done(null, user);
      } catch (err) {
        debug('err catch', err);
        return done(err);
      }
    }
  )
);
