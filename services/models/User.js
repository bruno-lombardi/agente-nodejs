const bcrypt = require("bcryptjs");
const debug = require("debug")("agente-esp:user-model");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    socialID: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      unique: true
    },
    socialIDProvider: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      // set(val) {
      //   debug("Set password called");
      //   bcrypt.genSalt(10, (err, salt) => {
      //     bcrypt.hash(val, salt, (err, hash) => {
      //       this.setDataValue("password", hash);
      //       debug("Password after hash: ", this.getDataValue("password"));
      //     });
      //   });
      // },
      validate: {
        notEmpty: true,
        min: 6
      }
    }
  });

  User.hook("beforeCreate", (user, options) => {
    debug("beforeCreate called");
    if (!user.changed("password")) return new Promise.reject("Not modified");
    return bcrypt
      .hash(user.password, 10)
      .then(hash => (user.password = hash))
      .catch(err => new Promise.reject(err));
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
