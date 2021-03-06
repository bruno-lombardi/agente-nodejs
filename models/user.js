const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const debug = require("debug")("agente-esp:user-model");

/**
 *
 * @type {Schema}
 */
var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2
  },
  lastName: {
    type: String,
    minlength: 2
  },
  picture: {
    type: "String"
  },
  local: {
    email: {
      type: String,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email"
      }
    },
    password: {
      type: String,
      required: false,
      minlength: 6
    }
  },
  google: {
    id: String,
    token: String,
    email: String,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
  },
}, {
  timestamps: true
});

/**
 * Override toJSON method of User instance.
 * This is a security function, preventing us from returning
 * bad properties, like user hashed password.
 * @return {[Array]} Array with only _id and email properties of userObject
 */
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ["_id", "firstName", "lastName", "local.email", "google", "facebook", "picture", "createdAt"]);
};

/**
 * Finds a user with the given credentials, verifying that
 * the user with that email exists, and then comparing the
 * given password with the hashed password stored in the
 * database using bcrypt.
 * @param  {String} email    The user email to query
 * @param  {String} password The user password to compare
 * @return {Promise} A Promise with the user found. If user is not found or password is not correct it returns a reject Promise.
 */
UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({ "local.email": email }).then(user => {
    debug("Entered findOne");
    debug("User found:", user);

    if (!user) {
      return Promise.reject({ status: 401, message: "Unable to find user" });
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.local.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject({ status: 401, message: "Incorrect email or password" });
        }
      });
    });
  });
};

/**
 * Function executed before save() runs.
 * This will generate a hash password for the user
 * and then will set it to the password field so
 * the hashed pass is saved
 * @param  {Function} next The next function assures the process keep running
 * @return {[undefined]}   Nothing is returned
 */
UserSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("local.password")) {
    var passToHash = user.local.password;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(passToHash, salt, (err, hash) => {
        if (!err) {
          user.local.password = hash;
          next();
        } else {
          next("Error generating hash");
        }
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
