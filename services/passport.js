const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const debug = require("debug")("agente-esp:passport");
const lodash = require("lodash");

const keys = require("../config/keys");

const User = require("../models/user");

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
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        picture: profile.photos ? normalizeProfileImage(profile.photos[0].value) : "/assets/img/unknown_user.png",
        google: {
          id: profile.id,
          email: profile.emails[0].value,
          token: accessToken,
        }
       }).save();
      done(null, user);
    }
  )
);

passport.use(new FacebookStrategy({
  clientID: keys.facebookClientID,
  clientSecret: keys.facebookClientSecret,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'first_name', 'last_name', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ 'facebook.id': profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }
  const user = await new User({
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    picture: profile.photos ? profile.photos[0].value : "/assets/img/unknown_user.png",
    facebook: {
      id: profile.id,
      email: profile.emails[0].value,
      token: accessToken,
    }
   }).save();
  done(null, user);
}
));

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

function normalizeProfileImage(uri) {
  return uri.replace(/\?.*$/, "");
}